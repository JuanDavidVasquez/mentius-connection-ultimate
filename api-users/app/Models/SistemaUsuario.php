<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SistemaUsuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'cedula',
        'usuario_RED',
        'id_walter_bridge',
        'id_biometrico',
        'correo_mentius',
        'pure_cloud',
        'usuario_sap',
        'usuario_c4c',
        'rtrweb',
        's4hanna',
        'usuario_crm',
        'codigo_vendedor',
        'usuario_ucontact',
        'agent_genesys',
        'usuario_confronta',
        'usuario_app_times',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
