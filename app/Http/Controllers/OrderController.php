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
        $orders = Order::all();
        $checkout = Checkout::all();
        $user = User::all();
        $courier = Courier::all();

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

    public function update( $checkout, Request $request): void
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

    public function trackorder(Checkout $checkout): Response
    {
        return Inertia::render('Customer/TrackOrder', [
            'order' => $checkout,
        ]);
    }
}
