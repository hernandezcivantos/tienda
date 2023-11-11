<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductImageController extends Controller
{
    public function delete(Request $request)
    {
        $rules = [
            'id' => 'required|exists:product_images,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de imagen'),
            'exists' => __('El producto no existe')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            ProductImage::find($request->id)
                ->delete();

            $response = [
                'success' => 1,
                'message' => __('Imagen eliminada correctamente'),
            ];
        }

        return response()->json($response);
    }
}
