<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\RoleAccessMiddleware;
use Illuminate\Support\Facades\Redirect;

// Redirigir rutas de Administrador y Coordinador directamente al login
Route::get('Administrador', function () {
    return Redirect::route('login');
});

Route::get('Coordinador', function () {
    return Redirect::route('login');
});

Route::middleware(RoleAccessMiddleware::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        // Rutas existentes...
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        
        Route::get('news', function () {
            return Inertia::render('news');
        })->name('news');

        Route::get('basicInformation', function () {
            return Inertia::render('basicInformation');
        })->name('basicInformation');

        // Rutas de usuarios 
        Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
            Route::get('/', [UsersController::class, 'index'])->name('index');
            Route::post('/', [UsersController::class, 'store'])->name('store');
            Route::put('/{user}', [UsersController::class, 'update'])->name('update');
            Route::delete('/{user}', [UsersController::class, 'destroy'])->name('destroy');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';