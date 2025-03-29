<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BasicInformationController;
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

        // Ruta para información básica
        Route::get('basicInformation', [BasicInformationController::class, 'index'])->name('basicInformation');
        Route::post('basicInformation', [BasicInformationController::class, 'store'])->name('basicInformation.store');

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
            Route::put('/{id}', [NewsController::class, 'update'])->name('update'); // Cambiado {new} a {id}
            Route::delete('/{id}', [NewsController::class, 'destroy'])->name('destroy'); // Cambiado {new} a {id}
        });
        
        // Rutas API para noticias
        Route::prefix('api')->group(function () {
            Route::get('news', [NewsController::class, 'getAll']); // Ruta para obtener todas las noticias
            Route::get('news/{id}', [NewsController::class, 'show']); // Ruta para detalles de una noticia
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';