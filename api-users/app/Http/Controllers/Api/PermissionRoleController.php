<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Models\PermisoRol;
use Illuminate\Http\Request;

class PermissionRoleController extends Controller
{
    // Mostrar todos los permisos de un rol específico
    public function index(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }
        $permissions = PermisoRol::all(); 
        return response()->json($permissions);
    }

    // Asignar permisos a un rol
    public function store(Request $request)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $request->validate([
            'role_id' => 'required',
            'permisos_id' => 'required',
        ]);

        $role = Role::find($request->role_id);
        if (!$role) {
            return response()->json(["error" => "Rol no encontrado"], 404);
        }

        $permission = Permission::find($request->permisos_id);
        if (!$permission) {
            return response()->json(["error" => "Permiso no encontrado"], 404);
        }

        $permissionRole = new PermisoRol();
        $permissionRole->role_id = $request->role_id;
        $permissionRole->permisos_id = $request->permisos_id;
        $permissionRole->save();

        return response()->json($permissionRole);
    }
    // Eliminar permisos de un rol
    public function destroy(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $permissionRole = PermisoRol::find($id);
        if (!$permissionRole) {
            return response()->json(["error" => "Permiso no encontrado"], 404);
        }

        $permissionRole->delete();

        return response()->json(["message" => "Permiso eliminado"]);
    }

    // Mostrar un permiso de un rol específico
    public function show(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $permissionRole = PermisoRol::find($id);
        if (!$permissionRole) {
            return response()->json(["error" => "Permiso no encontrado"], 404);
        }

        return response()->json($permissionRole);
    }

    // Actualizar un permiso de un rol específico
    public function update(Request $request, $id)
    {
        $authenticatedUser = $request->user();
        
        if (!$authenticatedUser) {
            return response()->json(["error" => "Usuario no autenticado"], 404);
        }

        $permissionRole = PermisoRol::find($id);
        if (!$permissionRole) {
            return response()->json(["error" => "Permiso no encontrado"], 404);
        }

        $request->validate([
            'role_id' => 'required',
            'permisos_id' => 'required',
        ]);

        $role = Role::find($request->role_id);
        if (!$role) {
            return response()->json(["error" => "Rol no encontrado"], 404);
        }

        $permission = Permission::find($request->permisos_id);
        if (!$permission) {
            return response()->json(["error" => "Permiso no encontrado"], 404);
        }

        $permissionRole->role_id = $request->role_id;
        $permissionRole->permisos_id = $request->permisos_id;
        $permissionRole->save();

        return response()->json($permissionRole);
    }

}
