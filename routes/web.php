<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DatatablesController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\UserController;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Route;

# Landing
Route::get('/', [LandingController::class, 'index']);


// Shop Category to product list

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
Route::post('/newsletter/store', [NewsletterController::class, 'store'])->name('newsletter.store');

// Menu
Route::post('/category/menu', [CategoryController::class, 'menu'])->name('category.menu');

# Users
Route::group(['middleware' => 'auth'], function () {

    Route::group(['prefix' => 'purchase', 'as' => 'purchase.', 'name' => 'purchase'], function () {
        Route::get('view/{id}', [ShoppingController::class, 'view']);
    });

    Route::group(['prefix' => 'user', 'as' => 'user.', 'name' => 'user'], function () {
        Route::get('self', [UserController::class, 'myUser'])->name('self');
        Route::post('update', [UserController::class, 'update'])->name('update');
    });

    Route::post('/cart/payment', [CartController::class, 'payment'])->name('cart.payment');

});

# Admin
Route::group(['middleware' => 'admin'], function () {

    Route::group(['prefix' => 'category', 'as' => 'category.', 'name' => 'category'], function () {
        Route::post('store', [CategoryController::class, 'store'])->name('store');
        Route::post('update', [CategoryController::class, 'update'])->name('update');
        Route::post('get', [CategoryController::class, 'get'])->name('get');
        Route::post('delete', [CategoryController::class, 'delete'])->name('delete');
        Route::get('all', [DatatablesController::class, 'categories'])->name('all');
    });

    Route::group(['prefix' => 'product', 'as' => 'product.', 'name' => 'product'], function () {
        Route::post('store', [ProductController::class, 'store'])->name('store');
        Route::post('update', [ProductController::class, 'update'])->name('update');
        //Route::post('get', [ProductController::class, 'get'])->name('get');
        Route::post('delete', [ProductController::class, 'delete'])->name('delete');
        Route::get('all', [DatatablesController::class, 'products'])->name('all');
    });

    Route::group(['prefix' => 'admin', 'as' => 'admin.', 'name' => 'admin', 'middleware' => 'admin'], function () {
        Route::get('categories', [AdminController::class, 'categories'])->name('categories');
        Route::get('products', [AdminController::class, 'products'])->name('products');
        Route::get('users', [AdminController::class, 'users'])->name('users');
        Route::get('users.all', [DatatablesController::class, 'users'])->name('users.all');
    });

    Route::group(['prefix' => 'image', 'as' => 'image.', 'name' => 'image', 'middleware' => 'admin'], function () {
        Route::post('delete', [ProductImageController::class, 'delete'])->name('delete');
    });

    Route::group(['prefix' => 'user', 'as' => 'user.', 'name' => 'user'], function () {
        Route::post('store', [UserController::class, 'store'])->name('store');
        Route::post('get', [UserController::class, 'get'])->name('get');
        Route::post('delete', [UserController::class, 'delete'])->name('delete');
        Route::post('updateForm', [UserController::class, 'updateForm'])->name('updateForm');

    });
});

Route::post('/product/get', [ProductController::class, 'get'])->name('product.get');
Route::post('/cart/calculate', [CartController::class, 'calculate'])->name('cart.calculate');
Route::get('/category/{name}', [CategoryController::class, 'url']);
Route::get('/product/view/{id}', [ProductController::class, 'view']);
Route::get('/cart/view', [CartController::class, 'view'])->name('cart.view');
