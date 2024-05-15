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
            $table->string("fifth_pacote_numbers");
            $table->string("fifth_pacote_discount")->default(0);
            $table->string("sixth_pacote_numbers");
            $table->string("sixth_pacote_discount")->default(0);
            $table->string("seventh_pacote_numbers");
            $table->string("seventh_pacote_discount")->default(0);
            $table->string("eighth_pacote_numbers");
            $table->string("eighth_pacote_discount")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rifas', function (Blueprint $table) {
            $table->dropColumn([
                "fifth_pacote_numbers",
                "fifth_pacote_discount",
                "sixth_pacote_numbers",
                "sixth_pacote_discount",
                "seventh_pacote_numbers",
                "seventh_pacote_discount",
                "eighth_pacote_numbers",
                "eighth_pacote_discount"
            ]);
        });
    }
};
