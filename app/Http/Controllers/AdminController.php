<?php

namespace App\Http\Controllers;

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
            ]
        ];

        return view('panel', $data);
    }
}
