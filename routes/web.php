<?php

use App\Http\Controllers\PanelController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

# Landing
Route::get('/', [LandingController::class, 'index']);

# Autorización
Auth::routes();

# Panel admin
Route::get('/home', [PanelController::class, 'index'])->name('home');
