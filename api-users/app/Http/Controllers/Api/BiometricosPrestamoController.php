<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BiometricosPrestamo;
use Illuminate\Http\Request;

class BiometricosPrestamoController extends Controller
{
    /**
     * Mostrar una lista de préstamos de biométricos.
     */
    public function index()
    {
        $prestamos = BiometricosPrestamo::all();
        return response()->json($prestamos);
    }

    /**
     * Almacenar un nuevo préstamo de biométrico.
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'biometrico_id' => 'required|exists:biometricos,id',
            'cedula' => 'required|string|max:255',
        ]);
    
        // Obtener la fecha actual en formato 'YYYY-MM-DD'
        $today = now()->toDateString();
    
        // Verificar si la cédula ya tiene un préstamo en el día actual
        $existingPrestamoCedula = BiometricosPrestamo::where('cedula', $request->cedula)
            ->whereDate('created_at', $today)
            ->first();
    
        if ($existingPrestamoCedula) {
            return response()->json(['message' => 'Esta cédula ya tiene un préstamo en el día de hoy'], 409); // 409 = Conflicto
        }
    
        // Verificar si el biométrico ya está asignado a otra cédula en el día actual
        $existingPrestamoBiometrico = BiometricosPrestamo::where('biometrico_id', $request->biometrico_id)
            ->whereDate('created_at', $today)
            ->first();
    
        if ($existingPrestamoBiometrico) {
            return response()->json(['message' => 'Este biométrico ya está asignado a otra cédula en el día de hoy'], 409); // 409 = Conflicto
        }
    
        // Crear el nuevo préstamo de biométrico
        $prestamo = BiometricosPrestamo::create([
            'biometrico_id' => $request->biometrico_id,
            'cedula' => $request->cedula
        ]);
    
        return response()->json(['message' => 'Préstamo creado correctamente', 'prestamo' => $prestamo], 201);
    }
    
    
    

    /**
     * Mostrar un préstamo de biométrico específico.
     */
    public function show($id)
    {
        $prestamo = BiometricosPrestamo::find($id);

        if (!$prestamo) {
            return response()->json(['message' => 'Préstamo no encontrado'], 404);
        }

        return response()->json($prestamo);
    }

    /**
     * Actualizar un préstamo de biométrico específico.
     */
    public function update(Request $request, $id)
    {
        $prestamo = BiometricosPrestamo::find($id);

        if (!$prestamo) {
            return response()->json(['message' => 'Préstamo no encontrado'], 404);
        }

        $request->validate([
            'biometrico_id' => 'required|exists:biometricos,id',
            'cedula' => 'required|string|max:255'
        ]);

        $prestamo->update([
            'biometrico_id' => $request->biometrico_id,
            'cedula' => $request->cedula
        ]);

        return response()->json(['message' => 'Préstamo actualizado correctamente', 'prestamo' => $prestamo]);
    }

    /**
     * Eliminar un préstamo de biométrico específico.
     */
    public function destroy($id)
    {
        $prestamo = BiometricosPrestamo::find($id);

        if (!$prestamo) {
            return response()->json(['message' => 'Préstamo no encontrado'], 404);
        }

        $prestamo->delete();

        return response()->json(['message' => 'Préstamo eliminado correctamente']);
    }
}