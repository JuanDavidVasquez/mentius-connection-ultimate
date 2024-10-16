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
        try {
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
                'usuario_app_times' => 'nullable|string|unique:sistema_usuarios,usuario_app_times',
            ]);
    
            // Verificar que no exista otra cédula con el mismo id_biometrico
            if (!empty($validatedData['cedula']) && !empty($validatedData['id_biometrico'])) {
                $existingUser = SistemaUsuario::where('cedula', '!=', $validatedData['cedula'])
                    ->where('id_biometrico', $validatedData['id_biometrico'])
                    ->first();
    
                if ($existingUser) {
                    return response()->json([
                        'message' => 'El ID biométrico ya está asociado a otra cédula',
                        'error' => 'conflict_id_biometrico'
                    ], 422);  // 422 - Unprocessable Entity
                }
            }
    
            // Crear un nuevo usuario con los datos validados
            $usuario = SistemaUsuario::create($validatedData);
    
            // Respuesta exitosa con código 201
            return response()->json([
                'message' => 'Usuario creado correctamente',
                'data' => $usuario
            ], 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Error de validación
            return response()->json([
                'message' => 'Error de validación de datos',
                'errors' => $e->errors()  // Devuelve los errores de validación detallados
            ], 422);
    
        } catch (\Illuminate\Database\QueryException $e) {
            // Error de base de datos
            return response()->json([
                'message' => 'Error en la base de datos al crear el usuario',
                'error' => $e->getMessage()
            ], 500);  // 500 - Internal Server Error
    
        } catch (\Exception $e) {
            // Cualquier otro error inesperado
            return response()->json([
                'message' => 'Ocurrió un error inesperado',
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
    public function update(Request $request, $cedula)
    {
        try {
            // Verificar si el usuario con la cédula existe
            $usuario = SistemaUsuario::where('cedula', $cedula)->first();
    
            if (!$usuario) {
                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'error' => 'user_not_found'
                ], 404);  // 404 - Not Found
            }
    
            // Validar los datos recibidos
            $validatedData = $request->validate([
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
                'usuario_app_times' => 'nullable|string|unique:sistema_usuarios,usuario_app_times,' . $usuario->id, // Ignora el actual si ya está registrado
            ]);
    
            // Verificar que no exista conflicto con el id_biometrico
            if (!empty($validatedData['id_biometrico'])) {
                $existingUserBiometrico = SistemaUsuario::where('cedula', '!=', $cedula)
                    ->where('id_biometrico', $validatedData['id_biometrico'])
                    ->first();
    
                if ($existingUserBiometrico) {
                    return response()->json([
                        'message' => 'El ID biométrico ya está asociado a otra cédula',
                        'error' => 'conflict_id_biometrico'
                    ], 422);  // 422 - Unprocessable Entity
                }
            }
    
            // Verificar que no exista conflicto con el usuario_app_times
            if (!empty($validatedData['usuario_app_times'])) {
                $existingUserAppTimes = SistemaUsuario::where('cedula', '!=', $cedula)
                    ->where('usuario_app_times', $validatedData['usuario_app_times'])
                    ->first();
    
                if ($existingUserAppTimes) {
                    return response()->json([
                        'message' => 'El usuario App Times ya está asociado a otra cédula',
                        'error' => 'conflict_usuario_app_times'
                    ], 422);  // 422 - Unprocessable Entity
                }
            }
    
            // Actualizar solo los datos que llegan
            $usuario->update($validatedData);
    
            // Respuesta exitosa
            return response()->json([
                'message' => 'Usuario actualizado correctamente',
                'data' => $usuario
            ], 200);  // 200 - OK
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Error de validación
            return response()->json([
                'message' => 'Error de validación de datos',
                'errors' => $e->errors()
            ], 422);
    
        } catch (\Illuminate\Database\QueryException $e) {
            // Error de base de datos
            return response()->json([
                'message' => 'Error en la base de datos al actualizar el usuario',
                'error' => $e->getMessage()
            ], 500);  // 500 - Internal Server Error
    
        } catch (\Exception $e) {
            // Cualquier otro error inesperado
            return response()->json([
                'message' => 'Ocurrió un error inesperado',
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
