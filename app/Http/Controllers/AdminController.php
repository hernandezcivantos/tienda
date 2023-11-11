<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function categories()
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Admin'],
                ['name' => 'Categorías', 'redirect' => route('admin.categories')],
            ],
            'categories' => Category::all()
        ];

        return view('panel.categories', $data);
    }

    public function products()
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Admin'],
                ['name' => 'Productos', 'redirect' => route('admin.products')],
            ],
            'products' => Product::with('category')->get(),
            'categories' => Category::all()
        ];

        return view('panel.products', $data);
    }
}
