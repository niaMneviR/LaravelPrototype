<?php

namespace App\Http\Resources\V1\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=> $this->name,
            'code'=>$this->code,
            'description'=>$this->description,
            'type'=> $this->type,
            'trainingMode'=> $this->training_mode,
            'mandatory'=>$this->mandatory,
            'duration'=>$this->duration,
            'isArchived'=>$this->archived,
            'createdAt' => $this->created_at->format('Y-m-d'),

        ];
    }
}
