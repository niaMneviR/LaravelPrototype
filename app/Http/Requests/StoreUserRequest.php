<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if($this->user()->cannot('create', User::class)){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

     //Role not required because the defaullt is learner
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'role' => Rule::in(['learner', 'system', 'course']),
            'branch'=> 'required',
            'department' => 'required',
            'status' => ['required', Rule::in(['active', 'archive'])],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->symbols()]
        ];
    }
}
