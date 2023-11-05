<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShoppingStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shopping_statuses')->insert(
            [
                ['name' => 'Confirmado'],
                ['name' => 'En preparación'],
                ['name' => 'Preparado'],
                ['name' => 'Entregado'],
                ['name' => 'Con problemas'],
                ['name' => 'Anulado']
            ]
        );
    }
}
