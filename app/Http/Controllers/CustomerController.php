<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Vendor;
use App\Models\Menu;
use App\Models\Favorite;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;




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
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/RestaurantDetails', [
            'vendor' => $ven,
            'menus' => $menus,
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function cart()
    {
        $cart = Order::all();
        $menus = Menu::all();
        $vendors = Vendor::all();
        $fav = Favorite::all();


        return Inertia::render('Customer/Checkout', [
            'cart' => $cart,
            'menus' => $menus,
            'vendors' => $vendors,
            'fav' => $fav,

        ]);
    }

    public function checkout()
    {
        $user = Auth::user();
        $cart = Order::all();
        $menus = Menu::all();
        $vendors = Vendor::all();
        $fav = Favorite::all();

        return Inertia::render('Customer/Checkout', [
            'cart' => $cart,
            'menus' => $menus,
            'vendors' => $vendors,
            'user' => $user,
            'fav' => $fav,

        ]);
    }

    public function myprofile()
    {
        $cart = Order::all();
        $fav = Favorite::all();


        return Inertia::render('Customer/Profile_Display', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }


    public function order_history()
    {
        $order = Order::all();
        $fav = Favorite::all();


        return Inertia::render('Customer/Order_history', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function favorites()
    {
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/Favorites', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function myorders()
    {
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/MyOrders', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function address()
    {
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/Address', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function notification()
    {
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/Notification', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function payments()
    {
        $cart = Order::all();
        $fav = Favorite::all();



        return Inertia::render('Customer/Payments', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }

    public function addtocart(Request $request, $menu_id)
    {
        // Ensure user is authenticated
        $user_id = Auth::id();

        // dd($request->all());
        $price=$request->price;
        $quantity=$request->quantity;

        $original_price=$price/$quantity;

        // Add the item to the cart
        $cartItem = new Order();
        $cartItem->menu_id = $menu_id;
        $cartItem->user_id = $user_id;
        $cartItem->vendor_id = $request->vendor;
        $cartItem->quantity = $request->quantity;
        $cartItem->name = $request->name;
        $cartItem->price = $request->price;
        $cartItem->original_price = $original_price;
        $cartItem->image = $request->image;

        $cartItem->save();



        // Return a response, such as a success message or redirect
        return response()->json(['message' => 'Product added to cart successfully']);
    }


    public function checkout_store(Request $request)
    {
        // Ensure user is authenticated
        $user_id = Auth::id();

        // dd($request->all());

        // Add the item to the cart
        $cartItem = new Checkout();
        $cartItem->user_id = $user_id;
        // $cartItem->vendor_id = $request->vendor_id;
        $cartItem->order_id = $request->order_id;
        $cartItem->address = $request->address;
        $cartItem->total_price = $request->price;
        $cartItem->customization = $request->customization;
        $cartItem->status = "Ordered";

        $cartItem->save();

        // Return a response, such as a success message or redirect
        return response()->json(['message' => 'Product checked out successfully']);
    }

    public function updatecart(Request $request, $id): RedirectResponse
    {

        dd($request);

        // Fetch the cart based on the id
        $cart = Order::findOrFail($id);

        dd($cart);

        // Fill the cart model with the form data
        // $cart->fill($request->all());

        $cart->update([
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);

        // Save the changes to the database
        $cart->save();

        // Redirect back to the checkout page
        return redirect()->route('checkout');
    }


    public function removecartitem($id)
    {

        return Inertia::render('Customer/Payments', []);
    }


    public function addfavorite(Request $request, $id)
    {

        $user_id = Auth::id();
        $vendor=Vendor::findOrFail($id);

        try {
            // Create Product
            Favorite::create([
                'user_id' => $user_id,
                'vendor_id' => $vendor->id,
                'name' => $vendor->name,
                'image' => $vendor->image,
                'address' => $vendor->address,
                'city' => $vendor->city,
                'time' => $vendor->time,
                'status' => $vendor->status,
                'rating' => $vendor->rating,
            ]);

            // Save Image in Storage folder
            // Redirect back to the index page or any other appropriate page
            return Inertia::location(route('dashboard'));
        } catch (\Exception $e) {
            // Handle exception
            // Log the exception if necessary

            // Redirect back with an error message
            return redirect()->back()->with('error', 'Something went really wrong!');
        }
    }



    public function favorite_delete($id)
    {
        // Find the trainer by ID
        $fav = Favorite::find($id);

        if (!$fav) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Trainer not found!');
        }

        // Delete the trainer
        $fav->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Trainer deleted successfully!');
    }

}
