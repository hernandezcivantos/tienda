<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

# Landing
Route::get('/', [LandingController::class, 'index']);

# Autorización
//Auth::routes();
// Login and Logout Routes...
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Registration Routes...
Route::get('register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('register', [RegisterController::class, 'register']);

// Newsletter
Route::post('/newsletter/store', [UserController::class, 'store'])->name('newsletter.store');
Route::get('/category/{name}', [CategoryController::class, 'url']);

# User
Route::group(['middleware' => 'auth'], function () {
    Route::get('/user/self', [UserController::class, 'myUser'])->name('user.self');
    Route::get('/purchase/view/{id}', [ShoppingController::class, 'view']);
    Route::post('/user/store', [UserController::class, 'update'])->name('user.update');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
});

# Admin
Route::group(['middleware' => 'admin'], function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});
