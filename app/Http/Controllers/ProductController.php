<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'category' => 'required|numeric|exists:categories,id',
            'vat' => 'required|numeric|between:0,100.0',
            'discount' => 'nullable|numeric|between:0,100.0',
            'price' => 'required|numeric',
            'weight' => 'nullable|numeric',
            'measures' => 'nullable',
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'name.max' => __('Máximo de caracteres para nombre excedido'),
            'category.required' => __('La categoría es necesaria'),
            'category.exists' => __('La categoría no existe'),
            'vat.required' => __('El impuesto es necesario'),
            'vat.numeric' => __('El impuesto tiene que ser numérico'),
            'vat.between' => __('El impuesto tiene que estar entre 0 y 100'),
            'discount.numeric' => __('El descuento tiene que ser numérico'),
            'discount.between' => __('El descuento tiene que estar entre 0 y 100'),
            'price.required' => __('El precio es necesario'),
            'price.numeric' => __('El precio tiene que ser numérico'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $product = new Product();
            $product->name = $request->name;
            $product->category_id = $request->category;
            $product->vat = $request->vat;
            $product->discount = $request->discount;
            $product->price = $request->price;
            $product->weight = $request->weight;
            $product->measures = $request->measures;
            $product->save();

            $response = [
                'success' => 1,
                'message' => __('El producto se ha creado correctamente'),
                'extra' => $product
            ];
        }

        return response()->json($response);
    }
}
