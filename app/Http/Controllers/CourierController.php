<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Requests\VendorProfileUpdateRequest;
use App\Models\Checkout;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Courier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException; // Import ValidationException
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CourierController extends Controller
{
    //
    public function order(): Response
    {
        $orders = Order::all();
        $checkout = Checkout::all();
        $user = User::all();
        $courier = Courier::all();
        $vendor = Vendor::all();

        return Inertia::render('Courier/Order_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function my_order(): Response
    {
        $orders = Order::all();
        $checkout = Checkout::all();
        $user = User::all();
        $courier = Courier::all();
        $vendor = Vendor::all();

        return Inertia::render('Courier/MyOrder_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function courier_orders_edit($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);
        $orders = Order::all();
        $user = User::all();
        $courier = Courier::all();
        $vendor = Vendor::all();

        return Inertia::render('Courier/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function update( $checkout, Request $request): void
    {
        // dd($request->courier_id);
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'courier_id' => $request->courier_id
        ]);
    }


    public function status_update( $checkout, Request $request): void
    {
        // dd($request->status);
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'status' => $request->status
        ]);
    }

    public function cancel_delivery( $checkout, Request $request): RedirectResponse
    {
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'courier_id' => $request->courier_id,
            'status' => 'Ordered',
        ]);

        return redirect()->route('courier_order');
    }

    public function my_order_history(): Response
    {
        $orders = Order::all();
        $checkout = Checkout::all();
        $user = User::all();
        $courier = Courier::all();
        $vendor = Vendor::all();

        return Inertia::render('Courier/MyOrderhistory_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function courier_orders_history($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);
        $orders = Order::all();
        $user = User::all();
        $courier = Courier::all();
        $vendor = Vendor::all();

        return Inertia::render('Courier/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }
}
