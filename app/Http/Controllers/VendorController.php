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
        $vendor = Auth::id();

        $checkout = Checkout::whereJsonContains('vendor_id', $vendor)
            ->where('status', 'Destination reached')
            ->get();

        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();

        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $courierids = $checkout->pluck('courier_id')->flatten()->toArray();
        $courier = Courier::whereIn('id', $courierids)->get();

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


    public function status_update(Request $request, $id)
    {
        $vendor = Vendor::findOrFail($id);
        // Determine the new status based on the current status
        $newStatus = $vendor->status === 'open' ? 'closed' : 'open';

        // Update the vendor's status
        $vendor->update([
            'status' => $newStatus
        ]);

        // Return the new status as a response
        return redirect()->back();
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
