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
            'data.*.userId' => 'required|integer|exists:users,id',
            'data.*.courseId'=> 'required|integer|exists:courses,id',
            'data.*.deadline'=> 'required|date_format:Y-m-d'
        ];
    }

    public function prepareforValidation(){
        $data = [];
        foreach($this->toArray() as $obj){
            $obj['user_id'] = $obj['userId'] ?? null;
            $obj['course_id'] = $obj['courseId'] ?? null;

            $data[] = $obj;
        }

        $this->merge($data);
    }
}
