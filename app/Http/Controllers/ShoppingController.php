<?php

namespace App\Http\Controllers;

use App\Models\shopping;
use Illuminate\Http\Request;

class ShoppingController extends Controller
{
    public function view(Request $request)
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Ver compra', 'redirect' => url('/') . '/purchase/view/' . $request['id']]
            ],
            'purchase' => Shopping::find($request['id'])
        ];

        return view('purchase.view', $data);
    }
}
