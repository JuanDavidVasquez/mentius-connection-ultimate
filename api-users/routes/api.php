<?php

use App\Http\Controllers\Api\AuthController;
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


});