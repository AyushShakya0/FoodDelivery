<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'order_id' => 'array',
        'vendor_id' => 'array',
    ];

    protected $appends = [
        // 'customer',
        'last_updated',
    ];

    protected $fillable = [
        'user_id',
        'order_id',
        'vendor_id',
        'courier_id',
        'customization',
        'address',
        'total_price',
        'status',
        'payment',

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
