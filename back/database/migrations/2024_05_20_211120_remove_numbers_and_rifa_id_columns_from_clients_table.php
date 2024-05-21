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
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn("numbers");
            $table->dropColumn("rifa_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->integer("numbers");
            $table->unsignedInteger('rifa_id');
            $table->foreign("rifa_id")->references("id")->on("rifas")->onDelete("cascade");
        });
    }
};
