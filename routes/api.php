<?php

use App\Http\Controllers\V1\Api\AuthController;
use App\Http\Controllers\V1\Api\CourseController;
use App\Http\Controllers\V1\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request){
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/courses', CourseController::class);
});

Route::post('/login', [AuthController::class, 'login']);