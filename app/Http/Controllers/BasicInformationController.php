<?php

namespace App\Http\Controllers;

use App\Models\BasicInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BasicInformationController extends Controller
{
    /**
     * Mostrar el formulario de información básica con datos precargados.
     */
    public function index()
    {
        $user = Auth::user();
        $basicInfo = $user->basicInformation ?? null;
        
        // Manejar la distribución de nombres y apellidos
        $firstName = '';
        $lastName = '';
        
        if ($basicInfo) {
            // Si ya existe información básica, usamos esos valores
            $firstName = $basicInfo->first_name;
            $lastName = $basicInfo->last_name;
        } else {
            // Si no hay información básica, procesamos el nombre del usuario
            $fullName = $user->name ?? '';
            $nameParts = explode(' ', trim($fullName));
            
            // Determinar nombres y apellidos basado en la cantidad de palabras
            $totalParts = count($nameParts);
            
            if ($totalParts >= 4) {
                // Con 4 o más palabras, asumimos 2 nombres y 2 apellidos
                // Los dos últimos elementos son apellidos
                $lastName = implode(' ', array_slice($nameParts, -2));
                // Los demás son nombres
                $firstName = implode(' ', array_slice($nameParts, 0, $totalParts - 2));
            } else if ($totalParts == 3) {
                // Con 3 palabras, asumimos 1 nombre y 2 apellidos
                $lastName = implode(' ', array_slice($nameParts, -2));
                $firstName = $nameParts[0];
            } else if ($totalParts == 2) {
                // Con 2 palabras, asumimos 1 nombre y 1 apellido
                $lastName = $nameParts[1];
                $firstName = $nameParts[0];
            } else {
                // Con 1 palabra o vacío, la ponemos en nombre
                $firstName = $fullName;
                $lastName = $user->lastname ?? '';
            }
        }
        
        // Calcular el progreso basado en campos completados
        $progress = 0;
        if ($basicInfo) {
            $totalFields = 9; // Número de campos principales que contamos para el progreso
            $filledFields = 0;
            
            $fieldsToCheck = [
                'document_type', 'document_number', 'graduation_date', 
                'address', 'phone', 'city', 'department', 'country'
            ];
            
            foreach ($fieldsToCheck as $field) {
                if (!empty($basicInfo->$field)) {
                    $filledFields++;
                }
            }
            
            $progress = ($filledFields / $totalFields) * 100;
        }
        
        return Inertia::render('basicInformation', [
            'userData' => [
                'first_name' => $firstName,
                'last_name' => $lastName,
            ],
            'basicInfo' => $basicInfo,
            'progress' => $progress,
        ]);
    }

    /**
     * Almacenar o actualizar información básica del usuario.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'document_type' => 'required|string|max:50',
            'document_number' => 'required|string|max:50',
            'graduation_date' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'additional_info' => 'nullable|string',
        ]);
        
        $user = Auth::user();
        
        // Actualizar o crear la información básica
        BasicInformation::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );
        
        // También actualizar el nombre y apellido en la tabla de usuarios
        $user->update([
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
        ]);
        
        return back()->with('success', 'La información básica ha sido guardada correctamente');
    }
}