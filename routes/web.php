<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BasicInformationController;
use App\Http\Controllers\AcademicInformationController;
use App\Http\Controllers\EmploymentInformationController;
use App\Http\Middleware\RoleAccessMiddleware;
use Illuminate\Support\Facades\Redirect;

// Redirigir rutas de Administrador y Coordinador directamente al login
Route::get('Administrador', function () {
    return Redirect::route('login');
});

Route::get('Coordinador', function () {
    return Redirect::route('login');
});

// Ruta principal con middleware de acceso por rol
Route::middleware(RoleAccessMiddleware::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');
});

// Grupo de rutas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Ruta para información básica
    Route::get('basicInformation', [BasicInformationController::class, 'index'])->name('basicInformation');
    Route::post('basicInformation', [BasicInformationController::class, 'store'])->name('basicInformation.store');
    
    // Rutas para información académica
    Route::get('academicInformation', [AcademicInformationController::class, 'index'])->name('academicInformation');
    Route::post('academicInformation', [AcademicInformationController::class, 'store'])->name('academicInformation.store');
    Route::put('academicInformation/{id}', [AcademicInformationController::class, 'update'])->name('academicInformation.update');
    Route::delete('academicInformation/{id}', [AcademicInformationController::class, 'destroy'])->name('academicInformation.destroy');
    Route::post('academicInformation/destroyMultiple', [AcademicInformationController::class, 'destroyMultiple'])->name('academicInformation.destroyMultiple');
    Route::get('academicInformation/certificate/{id}', [AcademicInformationController::class, 'downloadCertificate'])->name('academicInformation.certificate');
    
    // Rutas para informacion laboral
    Route::get('employmentInformation', [EmploymentInformationController::class, 'index'])->name('employmentInformation');
    Route::post('employmentInformation', [EmploymentInformationController::class, 'store'])->name('employmentInformation.store');
    Route::put('employmentInformation/{id}', [EmploymentInformationController::class, 'update'])->name('employmentInformation.update');
    Route::delete('employmentInformation/{id}', [EmploymentInformationController::class, 'destroy'])->name('employmentInformation.destroy');
    Route::post('employmentInformation/destroyMultiple', [EmploymentInformationController::class, 'destroyMultiple'])->name('employmentInformation.destroyMultiple');

    // Rutas de usuarios
    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::post('/', [UsersController::class, 'store'])->name('store');
        Route::put('/{user}', [UsersController::class, 'update'])->name('update');
        Route::delete('/{user}', [UsersController::class, 'destroy'])->name('destroy');
    });
    
    // Rutas de noticias
    Route::group(['prefix' => 'news', 'as' => 'news.'], function () {
        Route::get('/', [NewsController::class, 'index'])->name('index');
        Route::post('/', [NewsController::class, 'store'])->name('store');
        Route::put('/{id}', [NewsController::class, 'update'])->name('update');
        Route::delete('/{id}', [NewsController::class, 'destroy'])->name('destroy');
    });
    
    // Rutas API
    Route::prefix('api')->group(function () {
        Route::get('news', [NewsController::class, 'getAll']);
        Route::get('news/{id}', [NewsController::class, 'show']);
        Route::get('academicInformation', [AcademicInformationController::class, 'getAll']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';