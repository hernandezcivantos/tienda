<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

# Landing
Route::get('/', [LandingController::class, 'index']);

# Autorización
Auth::routes();

# Panel admin
Route::get('/home', [HomeController::class, 'index'])->name('home');
