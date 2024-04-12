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
        'quantity' => 'integer',
    ];

    protected $appends = [
        // 'user',
        'last_updated',
    ];

    protected $fillable = [
        'user_id',
        'vendor_id',
        'menu_id',
        'name',
        'price',
        'original_price',
        'image',
        'quantity',
        'status',
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
