<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Biometrico;
use Illuminate\Http\Request;

class BiometricoController extends Controller
{
    /**
     * Mostrar una lista de biométricos.
     */
    public function index()
    {
        $biometricos = Biometrico::all();
        return response()->json($biometricos);
    }

    /**
     * Almacenar un nuevo biométrico.
     */
    public function store(Request $request)
    {
        $request->validate([
            'numero' => 'required|unique:biometricos,numero'
        ]);

        $biometrico = Biometrico::create([
            'numero' => $request->numero
        ]);

        return response()->json(['message' => 'Biométrico creado correctamente', 'biometrico' => $biometrico], 201);
    }

    /**
     * Mostrar un biométrico específico.
     */
    public function show($id)
    {
        $biometrico = Biometrico::find($id);

        if (!$biometrico) {
            return response()->json(['message' => 'Biométrico no encontrado'], 404);
        }

        return response()->json($biometrico);
    }

    /**
     * Actualizar un biométrico específico.
     */
    public function update(Request $request, $id)
    {
        $biometrico = Biometrico::find($id);

        if (!$biometrico) {
            return response()->json(['message' => 'Biométrico no encontrado'], 404);
        }

        $request->validate([
            'numero' => 'required|unique:biometricos,numero,' . $biometrico->id
        ]);

        $biometrico->update([
            'numero' => $request->numero
        ]);

        return response()->json(['message' => 'Biométrico actualizado correctamente', 'biometrico' => $biometrico]);
    }

    /**
     * Eliminar un biométrico específico.
     */
    public function destroy($id)
    {
        $biometrico = Biometrico::find($id);

        if (!$biometrico) {
            return response()->json(['message' => 'Biométrico no encontrado'], 404);
        }

        $biometrico->delete();

        return response()->json(['message' => 'Biométrico eliminado correctamente']);
    }
}