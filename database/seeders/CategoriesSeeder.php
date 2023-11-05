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
                ['name' => 'Ropa deportiva'],
                ['name' => 'Bolsas y mochilas'],
                ['name' => 'Calzado deportivo'],
                ['name' => 'Máquinas'],
                ['name' => 'Relojes deportivos'],
                ['name' => 'Baloncesto'],
                ['name' => 'Tenis de mesa']
            ]
        );
    }
}
