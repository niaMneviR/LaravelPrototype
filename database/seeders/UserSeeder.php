<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'acb',
            'email' => 'acb@gmail.com',
            'password' => Hash::make('asdfghjkl!'),
            'role'=> 'system'
        ]);
    }
}
