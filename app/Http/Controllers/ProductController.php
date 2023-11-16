<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'category' => 'required|exists:categories,id',
            'vat' => 'required|numeric|between:0,100.0',
            'discount' => 'nullable|numeric|between:0,100.0',
            'price' => 'required|numeric',
            'weight' => 'nullable|numeric',
            'measures' => 'nullable',
            'description' => 'nullable',
            'productFiles.*' => 'required|image|mimes:png,jpg,jpeg|max:2048',
            'active' => 'required|bool'
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
            'productFiles.*.max' => __('Tamaño de imágen excedido, las imágenes no deben superar los 2Mb'),
            'active.required' => __('El estado es necesario'),
            'active.bool' => __('El estado tiene que ser activo o inactivo'),
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
                $product->desription = $request->desription;
                $product->active = $request->active;
                $product->save();

                if ($request->hasFile('productFiles')) {
                    $this->_updaloadFiles($request->productFiles, $product->id);
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
                'extra' => $product,
                'category' => $product->category->name
            ];

        }

        return response()->json($response);
    }

    public function get(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|exists:products,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de producto'),
            'exists' => __('El producto no existe')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $product = Product::where('id', $request->id)
                ->with('images')
                ->first()
                ->toArray();

            $response = [
                'success' => 1,
                'message' => __('Producto obtenido correctamente'),
                'extra' => $product
            ];
        }

        return response()->json($response);
    }

    public function update(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|numeric|exists:products,id',
            'name' => 'required|max:255',
            'category' => 'required|exists:categories,id',
            'vat' => 'required|numeric|between:0,100.0',
            'discount' => 'nullable|numeric|between:0,100.0',
            'price' => 'required|numeric',
            'weight' => 'nullable|numeric',
            'measures' => 'nullable',
            'description' => 'nullable',
            'productFiles.*' => 'required|image|mimes:png,jpg,jpeg|max:2048',
            'active' => 'required|bool'
        ];

        $customMessages = [
            'id.required' => __('Es necesaria una ID de producto'),
            'id.numeric' => __('La ID tiene que ser numérica'),
            'id.exists' => __('El producto tiene que existir'),
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
            'productFiles.*.max' => __('Tamaño de imágen excedido, las imágenes no deben superar los 2Mb'),
            'active.required' => __('El estado es necesario'),
            'active.bool' => __('El estado tiene que ser activo o inactivo'),
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
                $product = Product::find($request->id);
                $product->name = $request->name;
                $product->category_id = $request->category;
                $product->vat = $request->vat;
                $product->discount = $request->discount;
                $product->price = $request->price;
                $product->weight = $request->weight;
                $product->measures = $request->measures;
                $product->desription = $request->desription;
                $product->active = $request->active;
                $product->update();

                if ($request->hasFile('productFiles')) {
                    $this->_updaloadFiles($request->productFiles, $product->id);
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
                'message' => __('El producto se ha modificado correctamente'),
                'extra' => $product,
                'category' => $product->category->name
            ];

        }

        return response()->json($response);
    }

    public function delete(Request $request)
    {
        $rules = [
            'id' => 'required|exists:products,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de producto'),
            'exists' => __('El producto no existe')
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

                $product = Product::where('id', $request->id)
                    ->with('images')
                    ->first();

                $images = $product->images;

                $product->delete();

                foreach($images as $image)
                {
                    Storage::delete('public/products/' . $image->image);
                }

                $response = [
                    'success' => 1,
                    'message' => __('Imágenes eliminadas correctamente'),
                ];

                DB::commit();
            } catch (Exception $exception) {
                DB::rollBack();
                $response = [
                    'success' => 0,
                    'message' => $exception->getMessage()
                ];
            }
        }

        return response()->json($response);
    }

    public function view(Request $request)
    {
        $product = Product::where('id', $request->id)
            ->with('images')
            ->with('category')
            ->first();

        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => $product->category->name, 'redirect' => url('/category/' . $product->category->route)],
                ['name' => $product->name],
            ],
            'product' => $product
        ];

        return view('products.view', $data);
    }

    private function _updaloadFiles($files, $id): void
    {
        foreach ($files as $file) {

            $name = $file->hashName();

            $file->store('public/products');

            $image = new ProductImage();
            $image->product_id = $id;
            $image->image = $name;
            $image->save();
        }
    }
}
