<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisoRol extends Model
{
    use HasFactory;
    protected $fillable = [
        'role_id',
        'permisos_id',
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $table = 'permisos_roles';

}
