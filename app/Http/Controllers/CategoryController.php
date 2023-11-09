<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

    public function store(Request $request): JsonResponse
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

    public function get(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|exists:categories,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de categoría'),
            'exists' => __('La categoría no existe')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $category = Category::find($request->id)->toArray();

            $response = [
                'success' => 1,
                'message' => __('Categoría obtenida correctamente'),
                'extra' => $category
            ];
        }

        return response()->json($response);
    }

    public function update(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'route' => 'required'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'route.required' => __('La ruta es necesaria'),
            'id.required' => __('Es necesario proporcionar un ID de categoría'),
            'id.exists' => __('La categoría no existe'),
            'max' => __('Demasiados caracteres'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $category = Category::find($request->id);

            $category->name = $request->name;
            $category->route = $request->route;
            $category->save();

            $response = [
                'success' => 1,
                'message' => __('La categoría se ha modificado correctamente'),
                'extra' => $category
            ];
        }

        return response()->json($response);
    }
}
