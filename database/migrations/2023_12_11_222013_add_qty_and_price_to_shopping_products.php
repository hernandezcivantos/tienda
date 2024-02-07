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
        Schema::table('shopping_products', function (Blueprint $table) {
            $table->integer('qty')->after('product_id');
            $table->float('price')->after('qty');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shopping_products', function (Blueprint $table) {
            $table->dropColumn('price');
            $table->dropColumn('description');
        });
    }
};
