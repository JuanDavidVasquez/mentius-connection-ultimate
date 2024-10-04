<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
        
        $users = User::all();
        return response()->json($users);
    }

    public function myTeamUsers(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
    
        // Obtener los IDs de los usuarios del array
        $userIds = $request->input('colaboradores');
    
        // Buscar los usuarios en base a los IDs proporcionados
        $users = DB::table('users')
                    ->select('id', 'name', 'user_name') 
                    ->whereIn('id', $userIds)
                    ->get();
    
        if ($users->isEmpty()) {
            return response()->json("No se encontraron usuarios con los IDs proporcionados", 404);
        }
    
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
        
        // Validación de los datos de entrada
        $request->validate([
            'user_name' => 'required|string',
            'password' => 'required|string',
            'role' => 'required|string'
        ]);

        // Crear un nuevo usuario
        $user = User::create([
            'user_name' => $request->user_name,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'name' => $request->name
        ]);

        return response()->json($user, 201);
    }

    public function show(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
        
        $user = User::find($id);

        if (!$user) {
            return response()->json("Usuario no encontrado", 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
        
        // Validación de los datos de entrada
        $request->validate([
            'user_name' => 'string',
            'password' => 'string',
            'role' => 'string'
        ]);
    
        $user = User::find($id);
    
        if (!$user) {
            return response()->json("Usuario no encontrado", 404);
        }
    
        // Actualizar los datos del usuario
        $userData = $request->all();
    
        // Verificar si el campo de contraseña está presente en la solicitud
        if (!isset($userData['password'])) {
            // Si no está presente, eliminar el campo de contraseña de los datos del usuario
            unset($userData['password']);
        }
    
        $user->update($userData);
    
        return response()->json($user, 200);
    }
    

    public function destroy(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json("Usuario no autenticado", 404);
        }
        
        $user = User::find($id);

        if (!$user) {
            return response()->json("Usuario no encontrado", 404);
        }

        // Eliminar el usuario
        $user->delete();

        return response()->json("Usuario eliminado con éxito", 200);
    }
}
