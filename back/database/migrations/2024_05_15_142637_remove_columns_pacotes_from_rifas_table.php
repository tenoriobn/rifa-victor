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
        Schema::table('rifas', function (Blueprint $table) {
            $table->dropColumn("seventh_pacote_numbers");
            $table->dropColumn("seventh_pacote_discount");
            $table->dropColumn("eighth_pacote_numbers");
            $table->dropColumn("eighth_pacote_discount");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rifas', function (Blueprint $table) {
            $table->string("seventh_pacote_numbers");
            $table->string("seventh_pacote_discount")->default(0);
            $table->string("eighth_pacote_numbers");
            $table->string("eighth_pacote_discount")->default(0);
        });
    }
};
