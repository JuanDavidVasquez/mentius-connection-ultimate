<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SistemaUsuario;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SistemaUsuarioController extends Controller
{
    /**
     * Mostrar una lista de todos los usuarios del sistema.
     */
    public function index()
    {
        try {
            // Obtener todos los usuarios
            $usuarios = SistemaUsuario::all();

            // Respuesta exitosa con código 200
            return response()->json([
                'message' => 'Usuarios obtenidos correctamente',
                'data' => $usuarios
            ], 200);

        } catch (QueryException $e) {
            // Error en la consulta
            return response()->json([
                'message' => 'Error al obtener los usuarios',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar el formulario para crear un nuevo usuario.
     */
    public function create()
    {
        // Aquí podrías retornar una vista con el formulario de creación si usas vistas
        return view('sistema_usuarios.create');
    }

    /**
     * Almacenar un nuevo usuario en la base de datos.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'cedula' => 'nullable|string|unique:sistema_usuarios,cedula',
            'usuario_RED' => 'nullable|string',
            'id_walter_bridge' => 'nullable|string',
            'id_biometrico' => 'nullable|string',
            'correo_mentius' => 'nullable|string',
            'pure_cloud' => 'nullable|string',
            'usuario_sap' => 'nullable|string',
            'usuario_c4c' => 'nullable|string',
            'rtrweb' => 'nullable|string',
            's4hanna' => 'nullable|string',
            'usuario_crm' => 'nullable|string',
            'codigo_vendedor' => 'nullable|string',
            'usuario_ucontact' => 'nullable|string',
            'agent_genesys' => 'nullable|string',
            'usuario_confronta' => 'nullable|string',
            'usuario_app_times' => 'nullable|string',
        ]);

        try {
            // Crear un nuevo usuario con los datos validados
            $usuario = SistemaUsuario::create($validatedData);

            // Respuesta exitosa con código 201
            return response()->json([
                'message' => 'Usuario creado correctamente',
                'data' => $usuario
            ], 201);

        } catch (QueryException $e) {
            // Error en la consulta
            return response()->json([
                'message' => 'Error al crear el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar un usuario específico.
     */
    public function show($id)
    {
        try {
            // Buscar el usuario por su id
            $usuario = SistemaUsuario::findOrFail($id);

            // Respuesta exitosa con código 200
            return response()->json([
                'message' => 'Usuario obtenido correctamente',
                'data' => $usuario
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Usuario no encontrado con código 404
            return response()->json([
                'message' => 'Usuario no encontrado',
                'error' => $e->getMessage()
            ], 404);
        } catch (QueryException $e) {
            // Error en la consulta
            return response()->json([
                'message' => 'Error al obtener el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar el formulario para editar un usuario específico.
     */
    public function edit($id)
    {
        // Buscar el usuario por su id
        $usuario = SistemaUsuario::findOrFail($id);

        // Retornar la vista para editar (si usas vistas)
        return view('sistema_usuarios.edit', compact('usuario'));
    }

    /**
     * Actualizar un usuario específico en la base de datos.
     */
    public function update(Request $request, $id)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'cedula' => 'nullable|string|unique:sistema_usuarios,cedula,' . $id,
            'usuario_RED' => 'nullable|string',
            'id_walter_bridge' => 'nullable|string',
            'id_biometrico' => 'nullable|string',
            'correo_mentius' => 'nullable|string',
            'pure_cloud' => 'nullable|string',
            'usuario_sap' => 'nullable|string',
            'usuario_c4c' => 'nullable|string',
            'rtrweb' => 'nullable|string',
            's4hanna' => 'nullable|string',
            'usuario_crm' => 'nullable|string',
            'codigo_vendedor' => 'nullable|string',
            'usuario_ucontact' => 'nullable|string',
            'agent_genesys' => 'nullable|string',
            'usuario_confronta' => 'nullable|string',
            'usuario_app_times' => 'nullable|string',
        ]);

        try {
            // Buscar el usuario por su id y actualizarlo
            $usuario = SistemaUsuario::findOrFail($id);
            $usuario->update($validatedData);

            // Respuesta exitosa con código 200
            return response()->json([
                'message' => 'Usuario actualizado correctamente',
                'data' => $usuario
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Usuario no encontrado con código 404
            return response()->json([
                'message' => 'Usuario no encontrado',
                'error' => $e->getMessage()
            ], 404);
        } catch (QueryException $e) {
            // Error en la consulta
            return response()->json([
                'message' => 'Error al actualizar el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un usuario específico de la base de datos.
     */
    public function destroy($id)
    {
        try {
            // Buscar el usuario por su id y eliminarlo
            $usuario = SistemaUsuario::findOrFail($id);
            $usuario->delete();

            // Respuesta exitosa con código 200
            return response()->json([
                'message' => 'Usuario eliminado correctamente'
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Usuario no encontrado con código 404
            return response()->json([
                'message' => 'Usuario no encontrado',
                'error' => $e->getMessage()
            ], 404);
        } catch (QueryException $e) {
            // Error en la consulta
            return response()->json([
                'message' => 'Error al eliminar el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
