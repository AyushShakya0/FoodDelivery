<?php

use App\Models\Menu;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable();
            $table->foreignIdFor(Menu::class)->nullable();
            $table->foreignIdFor(Vendor::class)->nullable();
            $table->decimal('quantity', 8, 2)->nullable(); // Use decimal for price
            $table->string('name')->nullable();
            $table->string('price')->nullable();
            $table->string('original_price')->nullable();
            $table->string('image')->nullable();
            $table->string('status')->nullable();
            // $table->foreignId('user_id')->constrained();
            // $table->json('items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
