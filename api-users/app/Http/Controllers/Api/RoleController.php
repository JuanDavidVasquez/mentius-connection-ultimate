<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }
        
        $roles = Role::all();
        return response()->json($roles);
    }

  
    public function store(Request $request)
    {
   
        $authenticatedUser = $request->user();
      
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:roles|nullable',
            'description' => 'nullable|string',
        ]);

        $role = Role::create($request->all());
        
        return response()->json($role, 201);
    }

    // Mostrar un rol específico
    public function show(Request $request, Role $role)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        return response()->json($role);
    }

    // Actualizar un rol existente
    public function update(Request $request, Role $role)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'description' => 'nullable|string',
        ]);

        $role->update($request->all());

        return response()->json($role);
    }

    // Eliminar un rol
    public function destroy(Request $request, Role $role)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $role->delete();

        return response()->json(null, 204);
    }
}