<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

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
            'productFiles.*' => 'required|image|mimes:png,jpg,jpeg|max:2048'
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
            'productFiles.*.mimes' => __('Formato de imagen no admitido. Admitidos: [jpg o png]'),
            'productFiles.*.image' => __('El archivo tiene que ser una imagen'),
            'productFiles.*.max' => __('Tamaño de imágen excedido, las imágenes no deben superar los 2Mb')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            try {
                DB::beginTransaction();
                $product = new Product();
                $product->name = $request->name;
                $product->category_id = $request->category;
                $product->vat = $request->vat;
                $product->discount = $request->discount;
                $product->price = $request->price;
                $product->weight = $request->weight;
                $product->measures = $request->measures;
                $product->save();

                $count = 1;

                if($request->hasFile('productFiles')) {
                    foreach($request->productFiles as $file) {

                        $file->store('public/products');

                        $image = new ProductImage();
                        $image->product_id = $product->id;
                        $image->image = $file->getClientOriginalName();
                        $image->save();
                    }
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                return response()->json([
                    'success' => 0,
                    'message' => $e->getMessage()
                ]);
            }

            $response = [
                'success' => 1,
                'message' => __('El producto se ha creado correctamente'),
                'extra' => $product
            ];

        }

        return response()->json($response);
    }
}
