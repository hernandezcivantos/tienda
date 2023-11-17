<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index ()
    {
        $products = Product::where('discount', '>', 0)
            ->orderBy('discount', 'DESC')
            ->get();

        $data = [
            'bc' => false,
            'products' => $products
        ];

        return view('welcome', $data);
    }
}
