<?php

use App\Models\Courier;
use App\Models\Order;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('checkouts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable();
            // $table->foreignIdFor(Order::class)->nullable();
            // $table->foreignIdFor(Vendor::class)->nullable();
            // $table->foreignIdFor(Courier::class)->nullable();

            $table->json('order_id')->nullable();
            // $table->integer('vendor_id')->nullable();
            $table->integer('courier_id')->nullable();
            $table->string('address')->nullable();
            $table->string('customization')->nullable();
            $table->string('status')->nullable();
            $table->integer('total_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkouts');
    }
};
