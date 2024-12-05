<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if($this->user()->cannot('update', User::class)){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'branch'=> 'required',
            'department' => 'required',
            'role' => Rule::in(['learner', 'system', 'course']),
            'status' => ['required', Rule::in(['active', 'archive'])],
            'password' => [
                'confirmed',
                Password::min(8)->letters()->symbols()
            ]
        ];
    }
}
