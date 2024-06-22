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
        Schema::create('rifas', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->longText("description");
            $table->string("thumbnail");
            $table->string("rifa_status");
            $table->string("rifa_date");
            $table->string("price");
            $table->string("first_pacote_numbers");
            $table->string("first_pacote_discount")->default(0);
            $table->string("second_pacote_numbers");
            $table->string("second_pacote_discount")->default(0);
            $table->string("third_pacote_numbers");
            $table->string("third_pacote_discount")->default(0);
            $table->string("fourth_pacote_numbers");
            $table->string("fourth_pacote_discount")->default(0);

            $table->string("fifth_pacote_numbers");
            $table->string("fifth_pacote_discount")->default(0);
            $table->string("sixth_pacote_numbers");
            $table->string("sixth_pacote_discount")->default(0);
            $table->integer("rifa_numbers");
            $table->integer("rifa_numbers_remaining");
            $table->bigInteger('max_numbers')->nullable();
            $table->bigInteger('min_numbers')->nullable();
            $table->bigInteger('winner_id')->nullable();
            $table->string('winner_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rifas');
    }
};
