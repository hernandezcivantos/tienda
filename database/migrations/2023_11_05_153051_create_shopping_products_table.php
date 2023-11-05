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
        Schema::create('shopping_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shopping_id')->index();
            $table->unsignedBigInteger('product_id')->index();
            $table->timestamps();

            $table->foreign('shopping_id')->references('id')->on('shoppings')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_products');
    }
};
