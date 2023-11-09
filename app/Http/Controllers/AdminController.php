<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index ()
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Admin', 'redirect' => route('admin')]
            ],
            'categories' => Category::all(),
            'products' => Product::with('category')->get()
        ];

        return view('panel', $data);
    }
}
