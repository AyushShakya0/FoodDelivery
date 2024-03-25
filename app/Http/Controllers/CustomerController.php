<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Vendor;
use App\Models\Menu;
use Inertia\Inertia;
use Inertia\Response;

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

    public function restaurantdetails($id,Menu $menu)
    {
        $ven = Vendor::findOrFail($id);
        $menus=Menu::all();

        return Inertia::render('Customer/RestaurantDetails', [
            'vendor' => $ven,
            'menus' => $menus,
        ]);
    }

    public function cart()
    {

        return Inertia::render('Customer/Cart_Display', [
        ]);
    }

    public function myprofile()
    {

        return Inertia::render('Customer/Profile_Display', [
        ]);
    }

    public function favorites()
    {

        return Inertia::render('Customer/Favorites', [
        ]);
    }

    public function myorders()
    {

        return Inertia::render('Customer/MyOrders', [
        ]);
    }

    public function address()
    {

        return Inertia::render('Customer/Address', [
        ]);
    }

    public function notification()
    {

        return Inertia::render('Customer/Notification', [
        ]);
    }

    public function payments()
    {

        return Inertia::render('Customer/Payments', [
        ]);
    }

}
