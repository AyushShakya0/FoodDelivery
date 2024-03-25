<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Vendor/Order', [
            'orders' => $orders,
        ]);
    }

    public function edit(Order $order): Response
    {
        return Inertia::render('Vendor/Edit_Order', [
            'order' => $order,
        ]);
    }

    public function update(Order $order, Request $request): void
    {
        $order->update([
            'status' => $request->status
        ]);
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
