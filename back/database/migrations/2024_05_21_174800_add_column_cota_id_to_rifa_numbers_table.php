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
        Schema::table('rifa_numbers', function (Blueprint $table) {
            $table->unsignedBigInteger('cota_id');
            $table->foreign("cota_id")->references("id")->on("cotas")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rifa_numbers', function (Blueprint $table) {
            $table->dropColumn('cota_id');
        });
    }
};
