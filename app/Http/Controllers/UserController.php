<?php

namespace App\Http\Controllers;

use App\Models\shopping;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function myUser()
    {
        $data = [
            'bc' => true,
            'routes' => [
                ['name' => 'Inicio', 'redirect' => '/'],
                ['name' => 'Mi usuario', 'redirect' => route('user.self')]
            ],
            'shoppings' => Shopping::getAllByUserID()
        ];

        return view('user.self', $data);
    }

    /**
     * Update user data, checking if name exist and max characters for name and address
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'address' => 'nullable|max:255',
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario.'),
            'max' => __('Demasiados caracteres.'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $user = User::find(Auth::user()->id);
            $user->name = $request->name;
            $user->address = $request->address;
            $user->save();

            $response = [
                'success' => 1,
                'message' => __('Usuario actualizado correctamente.')
            ];
        }

        return response()->json($response);
    }
}
