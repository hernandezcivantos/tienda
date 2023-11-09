<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert(
            [
                ['name' => 'Ropa deportiva', 'route' => 'ropa-deportiva'],
                ['name' => 'Bolsas y mochilas', 'route' => 'bolsas-y-mochilas'],
                ['name' => 'Calzado deportivo', 'route' => 'calzado-deportivo'],
                ['name' => 'Máquinas', 'route' => 'mquinas'],
                ['name' => 'Relojes deportivos', 'route' => 'relojes-deportivos'],
                ['name' => 'Baloncesto', 'route' => 'baloncesto'],
                ['name' => 'Tenis de mesa', 'route' => 'tenis-de-mesa'],
                ['name' => 'Categoría desactivada', 'route' => 'categoria-desactivada']
            ]
        );
    }
}
