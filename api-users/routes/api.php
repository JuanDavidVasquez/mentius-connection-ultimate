<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BiometricoController;
use App\Http\Controllers\Api\BiometricosPrestamoController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PermissionRoleController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\RoleUserController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('test', function () {
    return "¡Esta es una prueba exitosa de la ruta 'test'!";
});



/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api'); */

Route::post('login', [AuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {

    Route::get('test-auth', function () {
        return "¡Esta es una prueba exitosa de la ruta 'test auth'!";
    });


    Route::get('perfil', [AuthController::class, 'perfil']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| users
|--------------------------------------------------------------------------
*/
    Route::resource('users',UserController::class);

 /*
|--------------------------------------------------------------------------
| Roles
|--------------------------------------------------------------------------
*/
    Route::resource('roles',RoleController::class);
    Route::resource('roles-permissions',PermissionRoleController::class);
    Route::resource('roles-users',RoleUserController::class);
    Route::resource('permisos',PermissionController::class);

/*
|--------------------------------------------------------------------------
| Biometricos
|--------------------------------------------------------------------------
*/

    Route::resource('biometricos',BiometricoController::class);
    Route::resource('biometricos-prestamos',BiometricosPrestamoController::class);

});


