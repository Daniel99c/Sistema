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
        Schema::create('basic_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('document_type');
            $table->string('document_number');
            $table->date('graduation_date')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('department')->nullable();
            $table->string('country')->nullable();
            $table->text('additional_info')->nullable();
            $table->timestamps();

            // Índice para búsquedas rápidas
            $table->index('user_id');
            $table->unique(['user_id', 'document_type', 'document_number']);
        });
    }

    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basic_information');
    }
};