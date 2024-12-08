<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'code',
        'description',
        'type',
        'training_mode',
        'mandatory',
        'duration',
        'archived'
    ];

    public function enrollments(): HasMany{
        return $this->hasMany(Enrollment::class);
    }
}
