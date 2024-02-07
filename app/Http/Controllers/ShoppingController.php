<?php

namespace App\Http\Controllers;

use App\Models\Shopping;
use Illuminate\Http\Request;

class ShoppingController extends Controller
{
    public function view(Request $request)
    {

        $purchase = Shopping::where('id', $request['id'])
            ->with('shoppingProducts.product')
            ->first();

        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Mi usuario', 'redirect' => route('user.self')],
                ['name' => 'Ver compra', 'redirect' => url('/') . '/purchase/view/' . $request['id']]
            ],
            'purchase' => $purchase,
            'totals' => $purchase->getTotals(),
            'products' => $purchase->getProducts()
        ];

        return view('purchase.view', $data);
    }
}
