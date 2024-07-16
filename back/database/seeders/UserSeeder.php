<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserSeeder::create([
            'name' => 'Ana Lima',
            'role' => 'admin',
            'email' => 'analima@gmail.com',
            'email_verified_at' => now(),
            'password' => hash::make('password'),
            'remember_token' => \Str::random(10),
        ]);
    }
}
