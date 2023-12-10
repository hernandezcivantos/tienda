<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function view(Request $request)
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Cesta']
            ]
        ];

        return view('cart.view', $data);
    }

    public function calculate(Request $request): JsonResponse
    {
        $groupedItems = [];

        $totals = [
            'items' => 0,
            'base_price' => 0,
            'final_price' => 0,
            'vat' => 0
        ];

        if($request->items)
        {
            foreach ($request->items as $item) {
                $item = json_decode($item);

                $totals['items'] += $item->qty;
                $totals['base_price'] += ($item->price - $item->price * $item->vat / 100) * $item->qty;
                $totals['final_price'] += $item->price * $item->qty;
                $totals['vat'] += ($item->price * $item->vat / 100) * $item->qty;

                $key = $item->id;

                if (!isset($groupedItems[$key])) {
                    $groupedItems[$key] = $item;
                } else {
                    $groupedItems[$key]->price += $item->price;
                    $groupedItems[$key]->qty += $item->qty;
                }
            }
        }

        $response = [
            'success' => 1,
            'message' => __('La categoría se ha creado correctamente'),
            'extra' => [
                'totals' => $totals,
                'items' => $groupedItems
            ]
        ];

        return response()->json($response);
    }
}
