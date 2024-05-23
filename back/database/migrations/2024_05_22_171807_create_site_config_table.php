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
        Schema::create('site_config', function (Blueprint $table) {
            $table->id();
            $table->string('meta_pixel', 1000);
            $table->string('instagram_link', 200);
            $table->string('whatsapp_link', 200);
            $table->string('url_logo_site', 200);
            $table->string('url_favicon_site', 200);
            $table->string('site_name', 100);
            $table->string('plataform_name', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_config');
    }
};
