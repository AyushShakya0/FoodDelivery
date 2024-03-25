<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'items' => 'array',
    ];

    protected $appends = [
        // 'user',
        'last_updated',
    ];

    protected $hidden = [
        'customer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getCustomerAttribute(): ?string
    {
        return $this->user ? $this->user->name : null;
    }

    public function getLastUpdatedAttribute(): ?string
    {
        return $this->updated_at ? $this->updated_at->diffForHumans() : null;
    }
}
