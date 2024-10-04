<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    // Mostrar todos los roles de un usuario específico
    public function index(Request $request, User $user)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $roles = $user->roles; // Asumiendo que tienes una relación definida en el modelo User
        return response()->json($roles);
    }

    // Almacenar un nuevo rol para un usuario
    public function store(Request $request, User $user)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->roles()->attach($request->role_id); // Asumiendo que tienes una relación definida en el modelo User

        return response()->json(["message" => "Rol asignado exitosamente."], 201);
    }

    // Eliminar un rol de un usuario
    public function destroy(Request $request, User $user, $roleId)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $user->roles()->detach($roleId); // Asumiendo que tienes una relación definida en el modelo User

        return response()->json(["message" => "Rol eliminado exitosamente."], 204);
    }
}
