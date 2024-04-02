<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Vendor;
use App\Models\Menu;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;


class CustomerController extends Controller
{
    //

    // public function dashboard()
    // {
    //     $res = Vendor::all();
    //     $food = Menu::all();
    //     return Inertia::render('Dashboard', [
    //         'vendor'=>$res,
    //         'food'=>$food,
    //     ]);
    // }

    public function restaurantdetails($id)
    {
        $ven = Vendor::findOrFail($id);
        $menus = Menu::all();

        return Inertia::render('Customer/RestaurantDetails', [
            'vendor' => $ven,
            'menus' => $menus,
        ]);
    }

    public function cart()
    {
        $cart=Order::all();
        $menus = Menu::all();

        return Inertia::render('Customer/Cart_Display',[
            'cart' => $cart,
            'menus' => $menus,
        ]);
    }

    public function myprofile()
    {

        return Inertia::render('Customer/Profile_Display', []);
    }

    public function favorites()
    {

        return Inertia::render('Customer/Favorites', []);
    }

    public function myorders()
    {

        return Inertia::render('Customer/MyOrders', []);
    }

    public function address()
    {

        return Inertia::render('Customer/Address', []);
    }

    public function notification()
    {

        return Inertia::render('Customer/Notification', []);
    }

    public function payments()
    {

        return Inertia::render('Customer/Payments', []);
    }

    // public function cartstore($id,Menu $menu)
    // {

    //     $ven = Vendor::findOrFail($id);
    //     $menus=Menu::all();

    //     return Inertia::render('Customer/RestaurantDetails', [
    //         'vendor' => $ven,
    //         'menus' => $menus,
    //     ]);
    // }

    // public function addtocart(Menu $menu)
    // {
    //     $cart=session()->get('cart');

    //     if(!$cart){
    //         $cart=[
    //             $menu->id=>[
    //                 'name'=> $menu->name,
    //                 'quantity'=> $menu->quantity,
    //                 'price'=> $menu->price,
    //                 'image'=> $menu->image,

    //             ]
    //         ];
    //         session()->put('cart',$cart);
    //         return Inertia::render('cart', [
    //             ])->with('success',"Added to Cart");
    //     }

    //     if(isset($cart[$menu->id])){
    //         $cart[$menu->id]['quantiy']++;
    //         session()->put('cart',$cart);
    //         return Inertia::render('cart', [
    //         ])->with('success',"Added to Cart");
    //     }

    //     $cart[$menu->id]=[
    //         'name'=> $menu->name,
    //         'quantity'=> 1,
    //         'price'=> $menu->price,
    //         'image'=> $menu->image,
    //     ];
    //     session()->put('cart',$cart);
    //     return Inertia::render('cart', [
    //         ])->with('success',"Added to Cart");


    // }

    // public function addtocart($product_id)
    // {
    //     // dd($product_id); // Remove or comment out this line once confirmed

    //     $product = Menu::findOrFail($product_id);

    //     $cart = session()->get('cart');

    //     if (!$cart) {
    //         $cart = [
    //             $product->id => [
    //                 'id' => $product->id,
    //                 'name' => $product->name,
    //                 'image' => $product->image,
    //                 'quantity' =>  $product->quantity,
    //                 'price' => $product->price,
    //             ]
    //         ];
    //         session()->put('cart', $cart);
    //         return redirect()->route('cart');
    //     }

    //     return redirect()->route('cart');

    // }

    public function addtocart(Request $request, $menu_id)
    {
        // Ensure user is authenticated
        $user_id = Auth::id();

        // Validate the incoming request data
        // $request->validate([
        //     'quantity' => 'required|integer|min:1', // Ensure quantity is provided and it's an integer greater than 0
        // ]);
        // dd($request->all());

        // Add the item to the cart
        $cartItem = new Order();
        $cartItem->menu_id = $menu_id;
        $cartItem->user_id = $user_id;
        $cartItem->quantity = $request->count;
        // You may need to adjust this part according to your database schema

        // Save the cart item to the database
        $cartItem->save();

        // Return a response, such as a success message or redirect
        return response()->json(['message' => 'Product added to cart successfully']);
    }




    public function removecartitem($id)
    {

        return Inertia::render('Customer/Payments', []);
    }
}
