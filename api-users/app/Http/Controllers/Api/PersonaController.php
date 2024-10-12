<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PersonaController extends Controller
{
    // Mostrar todas las personas
    public function index()
    {
        $personas = Persona::all();

        return response()->json([
            'message' => 'Lista de personas obtenida correctamente',
            'data' => $personas
        ], 200);
    }

    // Mostrar una persona específica
    public function show($id)
    {
        $persona = Persona::find($id);

        if (!$persona) {
            return response()->json(['message' => 'Persona no encontrada'], 404);
        }

        return response()->json([
            'message' => 'Persona obtenida correctamente',
            'data' => $persona
        ], 200);
    }

    // Crear una nueva persona
    public function store(Request $request)
    {
        // Validar los datos
        $validatedData = $request->validate([
            'id_user' => 'required|exists:users,id',
            'cedula' => [
                'required',
                'max:20',
                Rule::unique('personas')->where(function ($query) use ($request) {
                    return $query->where('id_user', $request->id_user);
                }),
            ],
            'primer_nombre' => 'required|string|max:50',
            'segundo_nombre' => 'nullable|string|max:50',
            'primer_apellido' => 'required|string|max:50',
            'segundo_apellido' => 'nullable|string|max:50',
            'genero' => 'nullable|in:masculino,femenino,otro',
            'fecha_nacimiento' => 'nullable|date',
            'ciudad_nacimiento' => 'nullable|string|max:100',
            'edad' => 'nullable|string|max:50',
            'rango_edad' => 'nullable|string|max:50',
            'estado_civil' => 'nullable|string',
            'estado_en_la_empresa' => 'required|string',
        ]);
    
        // Crear una nueva persona
        $persona = Persona::create($validatedData);
    
        return response()->json([
            'message' => 'Persona creada correctamente',
            'data' => $persona
        ], 201); // Código 201 para creación exitosa
    }
    

    // Actualizar una persona existente
    public function update(Request $request, $id)
    {
        // Buscar la persona por ID
        $persona = Persona::find($id);
    
        if (!$persona) {
            return response()->json(['message' => 'Persona no encontrada'], 404);
        }
    
        // Validar solo los campos presentes en la solicitud
        $validatedData = $request->validate([
            'id_user' => 'sometimes|exists:users,id', // 'sometimes' valida solo si el campo está presente en la solicitud
            'cedula' => 'sometimes|max:20|unique:personas,cedula,' . $persona->id, // Validación única con excepción
            'primer_nombre' => 'sometimes|string|max:50',
            'segundo_nombre' => 'sometimes|nullable|string|max:50',
            'primer_apellido' => 'sometimes|string|max:50',
            'segundo_apellido' => 'sometimes|nullable|string|max:50',
            'genero' => 'sometimes|in:masculino,femenino,otro',
            'fecha_nacimiento' => 'sometimes|date',
            'ciudad_nacimiento' => 'sometimes|string|max:100',
            'edad' => 'sometimes|integer|min:0',
            'rango_edad' => 'sometimes|string|max:50',
            'estado_civil' => 'sometimes|string',
            'estado_en_la_empresa' => 'sometimes|required|string', // Este campo aún es obligatorio pero solo si es enviado
        ]);
    
        // Actualizar solo los campos que llegan en la solicitud
        $persona->fill($validatedData);
        
        // Guardar los cambios en la base de datos
        $persona->save();
    
        return response()->json([
            'message' => 'Persona actualizada correctamente',
            'data' => $persona
        ], 200);
    }
    

    // Eliminar una persona
    public function destroy($id)
    {
        // Buscar la persona por ID
        $persona = Persona::find($id);

        if (!$persona) {
            return response()->json(['message' => 'Persona no encontrada'], 404);
        }

        // Eliminar la persona
        $persona->delete();

        return response()->json([
            'message' => 'Persona eliminada correctamente'
        ], 200);
    }
}