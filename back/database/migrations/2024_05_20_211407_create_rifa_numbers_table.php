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
        Schema::create('rifa_numbers', function (Blueprint $table) {
            $table->id();
            $table->integer('numbers');
            $table->unsignedBigInteger('rifa_id');
            $table->foreign("rifa_id")->references("id")->on("rifas")->onDelete("cascade");

            $table->unsignedBigInteger('client_id');
            $table->foreign("client_id")->references("id")->on("clients")->onDelete("cascade");

            $table->unsignedBigInteger('cota_id');
            $table->foreign("cota_id")->references("id")->on("cotas")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rifa_numbers');
    }
};
