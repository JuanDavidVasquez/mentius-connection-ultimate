<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = [
            'user_name' => $request->user_name,
            'password' => $request->password
        ];
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('Token')->accessToken;
    
            return response()->json(['token' => $token, 'user_name' => $user->user_name], 200);
        } else {
            return response()->json(['error' => 'credenciales incorrectas'], 401);
        }
    }



    public function register(Request $request)
    {
        try {
            $request->validate([
                'user_name' => ['required', 'string', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Password::defaults()],
            ]);
        
            $user = User::create([
                'user_name' => $request->user_name,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);
        
            $token = $user->createToken('Token')->accessToken;

            return response()->json(['token' => $token], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function perfil(Request $request)
    {
        $usuario = $request->user();
        return response()->json($usuario);
    }

    public function logout(){
        $token = auth()->user()->token();

        $token->revoke();

        return response()->json(['succes' => 'Logout successfuly']);
    }
}
