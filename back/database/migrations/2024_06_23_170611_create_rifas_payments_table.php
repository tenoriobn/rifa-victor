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
        Schema::create('rifas_payments', function (Blueprint $table) {
            $table->id();
            $table->mediumInteger('time_pay')->comment('o tempo é em minutos');
            $table->string('type_pay');
            $table->string('service_charge')->nullable();
            $table->string('text_service_charge')->nullable();
            $table->unsignedBigInteger('rifa_id');
            $table->foreign("rifa_id")->references("id")->on("rifas");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rifas_payments');
    }
};
