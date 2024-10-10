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
        'created_at',
        'updated_at'
    ];

    protected $table = 'permisos_roles';

    // Definición de la relación con el modelo Role
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    // Definición de la relación con el modelo Permission
    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permisos_id');
    }
}
