<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Checkout;
use App\Models\Courier;
use App\Models\Menu;
use App\Models\Order;
use App\Models\User;

use Inertia\Response;

class VendorController extends Controller
{
    //

    public function order_history(): Response
    {
        $orders = Order::all();
        $checkout = Checkout::all();
        $user = User::all();
        $courier = Courier::all();

        return Inertia::render('Vendor/OrderHistory_Vendor', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
        ]);
    }

    public function order_history_details($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);
        $orders = Order::all();
        $user = User::all();
        $courier = Courier::all();

        return Inertia::render('Vendor/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
        ]);
    }

    public function status_update( $id, Request $request): void
    {

        dd($request->status);
        $vendor = Vendor::findOrFail($id);
        $vendor->update([
            'status' => $request->status
        ]);
    }

    public function courier()
    {
        return Inertia::render('Vendor/Courier_Vendor', []);
    }

    public function setting()
    {
        return Inertia::render('Vendor/Setting_Vendor', []);
    }

    public function finance()
    {
        return Inertia::render('Vendor/Finance_Vendor', []);
    }
}
