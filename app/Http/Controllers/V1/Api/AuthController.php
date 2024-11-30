<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message'=> 'Email or Password is incorrect'
            ], 422);
        }
        /** @var User user */
        $user = Auth::user();
        $token = $user->createToken()->plainTextToken;
        return response()->json(
            [
                'user'=>$user,
                'token'=>$token
            ]
        );
    }
}
