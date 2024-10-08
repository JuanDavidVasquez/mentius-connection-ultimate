<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    // Mostrar todos los permisos
    public function index(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }
        
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    // Almacenar un nuevo permiso
    public function store(Request $request,)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:permissions',
            'description' => 'nullable|string',
        ]);

        $permission = Permission::create($request->all());

        return response()->json($permission, 201);
    }

    // Mostrar un permiso específico
    public function show(Request $request, Permission $permission)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        return response()->json($permission);
    }

    // Actualizar un permiso existente
    public function update(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }
        
        $permission = Permission::find($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $id,
            'description' => 'nullable|string',
        ]);

      

        $permission->update($request->all());

        return $permission;

        return response()->json($permission);
    }

    // Eliminar un permiso
    public function destroy(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $permission = Permission::find($id);

        $permission->delete();

        return response()->json(null, 204);
    }
}
