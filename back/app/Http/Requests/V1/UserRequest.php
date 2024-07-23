<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            "name" => ["required", "max:255"],
            "role" => ["required", "max:255"],
            "cellphone" => ["nullable", "max:255"],
            "cpf" => ["nullable", "max:255"],
            "email" => ["required", "email"],
            "password" => ["required", "min:5", "max:255"],
        ];
    }
}
