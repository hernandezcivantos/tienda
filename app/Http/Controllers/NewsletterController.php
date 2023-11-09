<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $rules = [
            'email' => 'email|required'
        ];

        $customMessages = [
            'required' => __('Es necesario escribir un correo electrónico'),
            'email' => __('El formato del correo electrónico no es correcto'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {

            $newsLetter = new Newsletter();
            $newsLetter->email = $request->email;
            $newsLetter->save();

            $response = [
                'success' => 1,
                'message' => __('Hemos guardado la información correctamente, gracias')
            ];
        }

        return response()->json($response);
    }
}
