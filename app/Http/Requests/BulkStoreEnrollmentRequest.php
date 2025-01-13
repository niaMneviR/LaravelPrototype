<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreEnrollmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => 'required|integer|exists:users,id',
            'courseId'=> 'required|integer|exists:courses,id',
            'deadline'=> 'required|date_format:Y-m-d'
        ];
    }

    public function prepareforValidation(){
        $this->merge([
            'user_id'=> $this->userId,
            'course_id'=> $this->courseId,
        ]);
    }
}
