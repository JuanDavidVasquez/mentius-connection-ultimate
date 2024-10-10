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
            return response()->json(["error" => "Usuario no autenticado"], 401); // Cambiar a 401 para usuario no autenticado
        }
    
        // Validar que `role_id` sea requerido y `permisos_id` sea un array requerido
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permisos_id' => 'required|array', // Asegúrate de que permisos_id sea un array
        ]);
    
        $role = Role::find($request->role_id);
        if (!$role) {
            return response()->json(["error" => "Rol no encontrado"], 404);
        }
    
        // Obtener los permisos actuales
        $currentPermissions = PermisoRol::where('role_id', $request->role_id)
            ->pluck('permisos_id')
            ->toArray();
    
        $newPermissions = $request->permisos_id;
    
        // Verificar que ambas variables sean arrays
        if (!is_array($currentPermissions) || !is_array($newPermissions)) {
            return response()->json(["error" => "Los permisos no son válidos"], 400);
        }
    
        // Obtener permisos a eliminar y a agregar
        $permissionsToRemove = array_diff($currentPermissions, $newPermissions);
        $permissionsToAdd = array_diff($newPermissions, $currentPermissions);
    
        // Eliminar permisos
        if (!empty($permissionsToRemove)) {
            PermisoRol::where('role_id', $request->role_id)
                ->whereIn('permisos_id', $permissionsToRemove)
                ->delete();
        }
    
        // Agregar nuevos permisos
        $createdRecords = [];
        foreach ($permissionsToAdd as $permission_id) {
            $permission = Permission::find($permission_id);
    
            if (!$permission) {
                return response()->json(["error" => "Permiso no encontrado: $permission_id"], 404);
            }
    
            // Crear el registro de PermisoRol
            $permissionRole = new PermisoRol();
            $permissionRole->role_id = $request->role_id;
            $permissionRole->permisos_id = $permission_id;
            $permissionRole->save();
    
            // Añadir el registro creado a la lista de respuestas
            $createdRecords[] = $permissionRole;
        }
    
        // Retornar una respuesta de éxito
        return response()->json([
            "message" => "Permisos asignados correctamente",
            "createdRecords" => $createdRecords,
        ], 201); // 201 para indicar que se han creado nuevos registros
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
