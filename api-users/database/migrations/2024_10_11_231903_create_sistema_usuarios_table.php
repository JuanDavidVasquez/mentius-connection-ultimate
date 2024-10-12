<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sistema_usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('cedula')->nullable();
            $table->string('usuario_RED')->nullable();
            $table->string('id_walter_bridge')->nullable();
            $table->string('id_biometrico')->nullable();
            $table->string('correo_mentius')->nullable();
            $table->string('pure_cloud')->nullable();
            $table->string('usuario_sap')->nullable();
            $table->string('usuario_c4c')->nullable();
            $table->string('rtrweb')->nullable();
            $table->string('s4hanna')->nullable();
            $table->string('usuario_crm')->nullable();
            $table->string('codigo_vendedor')->nullable();
            $table->string('usuario_ucontact')->nullable();
            $table->string('agent_genesys')->nullable();
            $table->string('usuario_confronta')->nullable();
            $table->string('usuario_app_times')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sistema_usuarios');
    }
};
