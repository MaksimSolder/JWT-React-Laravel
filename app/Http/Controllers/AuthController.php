<?php

namespace App\Http\Controllers;
use App\Models\User;
use http\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{
    public function user() {
        return Auth::user();
    }

    public function register(Request $request) {
        return User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
               'message' => 'Invalid user!'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 24); // 1 day
        return \response([
            'message' => 'success'
        ])->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        $cookie = \Illuminate\Support\Facades\Cookie::forget('jwt');
         return \response([
            'message' => 'success'
         ])->withCookie($cookie);
    }
}
