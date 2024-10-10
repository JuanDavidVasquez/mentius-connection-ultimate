<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiometricosPrestamo extends Model
{
    use HasFactory;

    protected $table = 'biometricos_prestamos';

    protected $fillable = [
        'biometrico_id',
        'cedula',
    ];

    public function biometrico()
    {
        return $this->belongsTo(Biometrico::class);
    }
}
