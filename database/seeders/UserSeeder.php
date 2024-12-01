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
        User::factory()->count(25)->create();
        DB::table('users')->insert([
            'name' => 'acb',
            'email' => 'acb@gmail',
            'password' => Hash::make('asdfghjkl!'),
            'role'=> 'learner'
        ]);
        DB::table('users')->insert([
            'name' => 'acb',
            'email' => 'acb@gmail.com',
            'password' => Hash::make('asdfghjkl!'),
            'role'=> 'system'
        ]);
        DB::table('users')->insert([
            'name' => 'acb',
            'email' => 'acb@gmail.co',
            'password' => Hash::make('asdfghjkl!'),
            'role'=> 'course'
        ]);
    }
}
