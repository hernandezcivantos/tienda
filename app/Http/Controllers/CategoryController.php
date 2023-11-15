<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class CategoryController extends Controller
{
    public function url(Request $request)
    {
        $category = Category::getByUrl($request['name']);

        if(!$category)
        {
            return redirect('/');
        }

        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Productos'],
                ['name' => $category->name]
            ],
            'products' => Product::where('category_id', $category->id)
                ->with('images', function ($query) {
                    $query->take(2);
                })
                ->get()
        ];

        return view('category.view', $data);
    }

    public function store(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'route' => 'required',
            'active' => 'required|bool'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'route.required' => __('La ruta es necesaria'),
            'active.required' => __('El estado es necesario'),
            'active.bool' => __('El estado debe ser activo o inactivo'),
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
            $category->active = $request->active;
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
            'route' => 'required',
            'active' => 'required|bool'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'route.required' => __('La ruta es necesaria'),
            'active.required' => __('El estado es necesario'),
            'active.bool' => __('El estado debe ser activo o inactivo'),
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
            $category->active = $request->active;
            $category->save();

            $response = [
                'success' => 1,
                'message' => __('La categoría se ha modificado correctamente'),
                'extra' => $category
            ];
        }

        return response()->json($response);
    }

    public function delete(Request $request)
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
            try {

                $categoryHasProducts = Product::where('category_id', $request->id)
                    ->exists();

                if($categoryHasProducts)
                    throw new Exception('No se puede eliminar una categoría con productos asignados');

                Category::find($request->id)
                    ->delete();

                $response = [
                    'success' => 1,
                    'message' => __('Categoría eliminada correctamente'),
                ];

            } catch (Exception $exception ) {
                $response = [
                    'success' => 0,
                    'message' => $exception->getMessage()
                ];
            }
        }

        return response()->json($response);
    }

    public function menu()
    {
        return response()->json(Category::where('active', 1)
            ->get());
    }
}
