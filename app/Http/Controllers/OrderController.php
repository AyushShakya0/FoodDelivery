<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Courier;
use App\Models\Menu;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(): Response
    {
        $vendor=Auth::id();

        $checkout = Checkout::
        whereJsonContains('vendor_id', $vendor)
        ->whereNot('status','Delivered')
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

        return Inertia::render('Vendor/Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
        ]);
    }

    public function edit($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);

        $orderIds = $checkout->order_id;
        $userIds = $checkout->user_id;
        $courierIds = $checkout->courier_id;

        $orders = Order::whereIn('id', $orderIds)
        ->where('status','checkedout')
        ->get();

        $user = User::where('id', $userIds)->get();
        $courier = Courier::where('id', $courierIds)->get();

        return Inertia::render('Vendor/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
        ]);
    }

    public function update($checkout, Request $request): void
    {

        // dd($request->status);
        $checkout = Checkout::findOrFail($checkout);
        $checkout->update([
            'status' => $request->status
        ]);
    }

    public function order_delete($id)
    {
        // Find the trainer by ID
        $order = Order::find($id);

        if (!$order) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Trainer not found!');
        }

        // Delete the trainer
        $order->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Trainer deleted successfully!');
    }


    public function order(Order $order): Response
    {
        return Inertia::render('Vendor/Edit_Order', [
            'order' => $order,
        ]);
    }

    public function store(Request $request)
    {

        // $user_id=Auth::id();
        // dd($request->all());
        // dd($product_id);
        // $product=Menu::findOrFail($product_id);

        // $cart=session()->get('cart');

        // if(!$cart){
        //     $cart=[
        //         $product->id=[
        //             'name'=> $product.name,
        //             'image'=> $product.image,
        //             'price'=> $product.price,
        //             'quantity'=> $product.quantity,
        //         ]
        //         ];
        //         session()->put('cart',$cart)
        // }

        // return Inertia::render(request()->fullUrl(), [
        //     'order' => $order,
        // ]);
    }
}
