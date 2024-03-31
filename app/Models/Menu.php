<?php
// app/Models/Menu.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'name',
        'description',
        'price',
        'image',
        // 'quantity',
        'category',
        'availability',
        'customization',
    ];

    protected $casts = [
        'customization' => 'array',
    ];
}
