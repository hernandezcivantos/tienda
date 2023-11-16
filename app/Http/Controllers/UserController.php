<?php

namespace App\Http\Controllers;

use App\Models\shopping;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'name.required' => __('El nombre es necesario'),
            'max' => __('Demasiados caracteres'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $user = new User();

            $user->name = $request->name;
            $user->address = $request->address ?? '';
            $user->update();

            $response = [
                'success' => 1,
                'message' => __('Usuario actualizado correctamente')
            ];
        }

        return response()->json($response);
    }

    /**
     * Update user data, checking if name exist and max characters for name and address
     * @param Request $request
     * @return JsonResponse
     */
    public function updateForm(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|min:8|max:255',
            'access_level' => 'required|numeric|min:1|max:2',
            'active' => 'required|bool'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'name.max' => __('El nombre es demasiado largo'),
            'email.required' => __('El correo electrónico es necesario'),
            'email.email' => __('El formato del correo electrónico es incorrecto'),
            'email.max' => __('El correo electrónico es demasiado largo'),
            'password.min' => __('La contraseña debe tener al menos 8 dígitos'),
            'password.max' => __('La contraseña es demasiado larga'),
            'access_level.required' => __('El rol es necesario'),
            'access_level.numeric' => __('El rol tiene que ser tipo numérico'),
            'access_level.min' => __('El rol debe ser Administrador o Cliente'),
            'access_level.max' => __('El rol debe ser Administrador o Cliente'),
            'active.bool' => __('El activo debe ser verdadero o falso'),
            'active.required' => __('Es necesario un estado'),
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $user = User::find($request->id);

            $user->name = $request->name;
            $user->email = $request->email;
            if ($request->password) {
                $user->password = Hash::make($request->password);
            }
            $user->access_level = $request->access_level;
            $user->active = $request->active;
            $user->update();

            $response = [
                'success' => 1,
                'message' => __('Usuario actualizado correctamente')
            ];
        }

        return response()->json($response);
    }

    public function store(Request $request): JsonResponse
    {
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|min:8|max:255',
            'access_level' => 'required|numeric|min:1|max:2',
            'active' => 'nullable|bool'
        ];

        $customMessages = [
            'name.required' => __('El nombre es necesario'),
            'name.max' => __('El nombre es demasiado largo'),
            'email.required' => __('El correo electrónico es necesario'),
            'email.email' => __('El formato del correo electrónico es incorrecto'),
            'email.max' => __('El correo electrónico es demasiado largo'),
            'password.required' => __('La contraseña es necesaria'),
            'password.min' => __('La contraseña debe tener al menos 8 dígitos'),
            'password.max' => __('La contraseña es demasiado larga'),
            'access_level.required' => __('El rol es necesario'),
            'access_level.numeric' => __('El rol tiene que ser tipo numérico'),
            'access_level.min' => __('El rol debe ser Administrador o Cliente'),
            'access_level.max' => __('El rol debe ser Administrador o Cliente'),
            'active.bool' => __('El activo debe ser verdadero o falso')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            try {
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->access_level = $request->access_level;
                $user->active = $request->active;
                $user->save();

            } catch (\Exception $e) {
                return response()->json([
                    'success' => 0,
                    'message' => $e->getMessage()
                ]);
            }

            $response = [
                'success' => 1,
                'message' => __('El usuario se ha creado correctamente'),
                'extra' => $user
            ];

        }

        return response()->json($response);
    }


    public function get(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|exists:users,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de usuario'),
            'exists' => __('El usuario no existe')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $user = User::where('id', $request->id)
                ->first()
                ->toArray();

            $response = [
                'success' => 1,
                'message' => __('Usuario obtenido correctamente'),
                'extra' => $user
            ];
        }

        return response()->json($response);
    }

    public function delete(Request $request): JsonResponse
    {
        $rules = [
            'id' => 'required|exists:users,id',
        ];

        $customMessages = [
            'required' => __('Es necesario proporcionar un ID de usuario'),
            'exists' => __('El usuario no existe')
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            $response = [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            try {
                User::find($request->id)
                    ->delete();

                $response = [
                    'success' => 1,
                    'message' => __('Usuario eliminado correctamente'),
                ];

            } catch (Exception $exception) {
                $response = [
                    'success' => 0,
                    'message' => $exception->getMessage()
                ];
            }
        }

        return response()->json($response);
    }
}
