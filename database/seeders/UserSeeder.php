<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'Ver usuarios']);
        Permission::create(['name' => 'Crear usuarios']);
        Permission::create(['name' => 'Editar usuarios']);
        Permission::create(['name' => 'Eliminar usuarios']);

        $AdministradorUser = User::query()->create([
            'name' => 'Administrador',
            'email' => 'administrador@gmail.com',
            'password' => 'administrador',
            'role' => 'Administrador',
            'email_verified_at' => now()
        ]);

        $roleAdministrador = Role::create(['name' => 'Administrador']);
        $AdministradorUser->assignRole($roleAdministrador);
        $permissionsAdministrador = Permission::query()->pluck('name');
        $roleAdministrador->syncPermissions($permissionsAdministrador);

        $CoordinadorUser = User::query()->create([
            'name' => 'Coordinador',
            'email' => 'Coordinador@gmail.com',
            'password' => 'coordinador',
            'role' => 'Coordinador',
            'email_verified_at' => now()
        ]);

        $roleCoordinador = Role::create(['name' => 'Coordinador']);
        $CoordinadorUser->assignRole($roleCoordinador);

    }
}
