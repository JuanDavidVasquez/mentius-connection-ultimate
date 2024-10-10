<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biometrico extends Model
{
    use HasFactory;

    protected $table = 'biometricos';

    protected $fillable = ['numero'];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    
}
