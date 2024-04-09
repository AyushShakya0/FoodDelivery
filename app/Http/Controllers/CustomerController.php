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

        // return Inertia::render('Customer/Cart_offcanvas',[
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

    public function addtocart(Request $request, $menu_id)
    {
        // Ensure user is authenticated
        $user_id = Auth::id();

        // Add the item to the cart
        $cartItem = new Order();
        $cartItem->menu_id = $menu_id;
        $cartItem->user_id = $user_id;
        $cartItem->quantity = $request->quantity;
        $cartItem->name = $request->name;
        $cartItem->price = $request->price;
        $cartItem->image = $request->image;

        $cartItem->save();



        // Return a response, such as a success message or redirect
        return response()->json(['message' => 'Product added to cart successfully']);
    }


    public function removecartitem($id)
    {

        return Inertia::render('Customer/Payments', []);
    }
}
