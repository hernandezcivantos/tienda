<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function url(Request $request)
    {
        $category = Category::getByUrl($request['name']);

        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Productos'],
                ['name' => $category->name]
            ],
            'products' => Product::all()->where('category_id', $category->id)
        ];

        return view('category.view', $data);
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|max:255',
            'route' => 'required'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'route.required' => __('La ruta es necesaria'),
            'max' => __('Demasiados caracteres'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $category = new Category();
            $category->name = $request->name;
            $category->route = $request->route;
            $category->save();

            $response = [
                'success' => 1,
                'message' => __('La categoría se ha creado correctamente'),
                'extra' => $category
            ];
        }

        return response()->json($response);
    }
}
