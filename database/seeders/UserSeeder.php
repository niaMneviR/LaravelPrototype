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
        // User::factory()->count(25)->hasEnrollment(5)->create();
        DB::table('users')->insert([
            'name' => 'systemadmin',
            'email' => 'systemadmin@mail.com',
            'branch'=> 'Novaliches',
            'department'=> 'IT Department',
            'password' => Hash::make('ganern'),
            'role'=> 'system'
        ]);
        DB::table('users')->insert([
            'name' => 'courseadmin',
            'email' => 'courseadmin@mail.com',
            'branch'=> 'Novaliches',
            'department'=> 'IT Department',
            'password' => Hash::make('ganern'),
            'role'=> 'course'
        ]);
        DB::table('users')->insert([
            'name' => 'learner',
            'email' => 'learner@mail.com',
            'branch'=> 'Novaliches',
            'department'=> 'IT Department',
            'password' => Hash::make('ganern'),
            'role'=> 'learner'
        ]);
    }
}
