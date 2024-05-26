<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Requests\VendorProfileUpdateRequest;
use App\Models\Checkout;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Courier;
use App\Models\Rating;
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
        $checkout = Checkout::whereNotIn('status', ['Delivered'])
            ->where('courier_id', null)
            ->paginate(10);

        $courierId = Auth::id();
        $occupied = Checkout::where('courier_id', $courierId)
            ->whereNot('status', 'Delivered')->get();


        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();

        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        return Inertia::render('Courier/Order_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'vendor' => $vendor,
            'occupied' => $occupied,
        ]);
    }

    public function my_order(): Response
    {
        $courier = Auth::id();

        $checkout = Checkout::whereNotIn('status', ['Delivered'])
            ->where('courier_id', $courier)
            ->get();

        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();

        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        return Inertia::render('Courier/MyOrder_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'vendor' => $vendor,
        ]);
    }

    public function courier_orders_edit($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);

        $orderIds = $checkout->order_id;
        $userIds = $checkout->user_id;
        $vendorIds = $checkout->vendor_id;

        $orders = Order::whereIn('id', $orderIds)
            ->where('status', 'checkedout')
            ->get();

        $user = User::where('id', $userIds)->get();

        // $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        // dd($vendor);

        return Inertia::render('Courier/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'vendor' => $vendor,
        ]);
    }

    public function update($checkout, Request $request): void
    {
        // dd($request->courier_id);
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'courier_id' => $request->courier_id
        ]);
    }


    public function status_update($checkout, Request $request): void
    {
        // dd($request->status);
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'status' => $request->status
        ]);
    }

    public function cancel_delivery($checkout, Request $request): RedirectResponse
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
        $courier = Auth::id();

        $checkout = Checkout::whereIn('status', ['Delivered'])
            ->where('courier_id', $courier)
            ->paginate(10);


        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();


        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();


        return Inertia::render('Courier/MyOrderhistory_Courier', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'vendor' => $vendor,
        ]);
    }

    public function courier_orders_history($checkoutId): Response
    {
        $checkout = Checkout::whereIn('status', ['Delivered'])
            ->where('courier_id', $checkoutId)
            ->get();

        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();


        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();


        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        return Inertia::render('Courier/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'vendor' => $vendor,
        ]);
    }


    public function courier_reviews()
    {
        $user=Auth::id();

        $rating = Rating::where('courier_id', $user)
        ->get();

        return Inertia::render('Courier/View_Reviews', [
            'rating' => $rating,
        ]);
    }
}
