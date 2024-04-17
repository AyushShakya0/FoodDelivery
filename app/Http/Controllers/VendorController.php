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
use Illuminate\Support\Facades\Auth;


use Inertia\Response;

class VendorController extends Controller
{
    //

    public function order_history(): Response
    {
        $vendor=Auth::id();
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

    // public function order_history(): Response
    // {
    //     $vendor = Auth::id();

    //     $checkout = Checkout::where('vendor_id', $vendor)->get();
    //     $orders = Order::where('user_id', $vendor)
    //         ->where('status', 'checkedout')
    //         ->get();

    //     $user = User::all();
    //     $courier = Courier::all();

    //     return Inertia::render('Vendor/OrderHistory_Vendor', [
    //         'orders' => $orders,
    //         'checkout' => $checkout,
    //         'user' => $user,
    //         'courier' => $courier,
    //     ]);
    // }

    public function order_history_details($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);
        $order = $checkout->order_id ? Order::whereIn('id', $checkout->order_id)->get() : [];
        $user = $checkout->user_id ? User::whereIn('id', $checkout->user_id)->get() : [];
        $courier = $checkout->courier_id ? Courier::findOrFail($checkout->courier_id) : null;

        return Inertia::render('Vendor/Edit_Order', [
            'orders' => $order,
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
