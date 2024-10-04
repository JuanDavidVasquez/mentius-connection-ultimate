<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;

class PermissionRoleController extends Controller
{
    // Mostrar todos los permisos de un rol específico
    public function index(Request $request, Role $role)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $permissions = $role->permissions; // Asumiendo que tienes una relación definida en el modelo Role
        return response()->json($permissions);
    }

    // Almacenar un nuevo permiso para un rol
    public function store(Request $request, Role $role)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $role->permissions()->attach($request->permission_id); // Asumiendo que tienes una relación definida en el modelo Role

        return response()->json(["message" => "Permiso asignado exitosamente."], 201);
    }

    // Eliminar un permiso de un rol
    public function destroy(Request $request, Role $role, $permissionId)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $role->permissions()->detach($permissionId); // Asumiendo que tienes una relación definida en el modelo Role

        return response()->json(["message" => "Permiso eliminado exitosamente."], 204);
    }
}
