<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Courier;
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

    public function restaurantdetails($id)
    {

        $user = Auth::id();
        $ven = Vendor::findOrFail($id);

        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        $menus = Menu::where('vendor_id', $ven->id)
            ->where('availability', 'available')
            ->get();

        $main_course = Menu::where('vendor_id', $ven->id)
            ->where('availability', 'available')
            ->where('category', 'main_course')
            ->get();

        $appetizers = Menu::where('vendor_id', $ven->id)
            ->where('availability', 'available')
            ->where('category', 'appetizers')
            ->get();


        $desserts = Menu::where('vendor_id', $ven->id)
            ->where('availability', 'available')
            ->where('category', 'desserts')
            ->get();




        return Inertia::render('Customer/RestaurantDetails', [
            'vendor' => $ven,
            'menus' => $menus,
            'order' => $cart,
            'fav' => $fav,
            'main_course' => $main_course,
            'appetizers' => $appetizers,
            'desserts' => $desserts,

        ]);
    }


    public function restaurants()
    {
        $user = Auth::id();
        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        $menus = Menu::all();
        $vendors = Vendor::all();



        return Inertia::render('Customer/Restaurantss', [
            'order' => $cart,
            'menus' => $menus,
            'vendor' => $vendors,
            'fav' => $fav,

        ]);
    }

    public function cart()
    {
        $user = Auth::id();
        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        $menus = Menu::all();
        $vendors = Vendor::all();



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
        $users = Auth::id();
        $cart = Order::where('user_id', $users)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $users)->get();
        $menus = Menu::all();
        $vendors = Vendor::all();

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
        $user = Auth::id();
        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();


        return Inertia::render('Customer/Profile_Display', [
            'order' => $cart,
            'fav' => $fav,

        ]);
    }


    public function order_history()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', 'checkedout')
            ->get();
        $fav = Favorite::where('user_id', $user)->get();
        $checkout = Checkout::where('user_id', $user)
            ->whereIn('status', ['Destination reached'])
            ->get();;


        return Inertia::render('Customer/Order_history', [
            'order' => $order,
            'fav' => $fav,
            'checkout' => $checkout,

        ]);
    }

    public function favorites()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        return Inertia::render('Customer/Favorites', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function myorders()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();


        return Inertia::render('Customer/MyOrders', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function address()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();


        return Inertia::render('Customer/Address', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function notification()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();


        return Inertia::render('Customer/Notification', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function payments()
    {
        $user = Auth::id();
        $order = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();


        return Inertia::render('Customer/Payments', [
            'order' => $order,
            'fav' => $fav,

        ]);
    }

    public function addtocart(Request $request, $menu_id)
    {
        // Ensure user is authenticated
        $user_id = Auth::id();

        // dd($request->all());
        $price = $request->price;
        $quantity = $request->quantity;

        $original_price = $price / $quantity;

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
        return redirect()->back()->with('success', 'Product added to cart successfully');
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
        $cartItem->vendor_id = $request->vendor_id;
        $cartItem->address = $request->address;
        $cartItem->total_price = $request->price;
        $cartItem->customization = $request->customization;
        $cartItem->status = "Ordered";

        $cartItem->save();

        $orderIds = $request->order_id;

        Order::whereIn('id', $orderIds)->update([
            'status' => 'checkedout'
        ]);

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
        $vendor = Vendor::findOrFail($id);

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
            return Inertia::location(url()->previous());
        } catch (\Exception $e) {
            // Handle exception
            // Log the exception if necessary

            // Redirect back with an error message
            return redirect()->back()->with('error', 'Something went really wrong!');
        }
    }

    public function order_delete($id)
    {
        // Find the trainer by ID
        $order = Order::find($id);

        // dd($fav);

        if (!$order) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Order not found!');
        }

        // Delete the trainer
        $order->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Order deleted successfully!');
    }

    public function checkout_order_delete($id)
    {
        // Find the trainer by ID
        $order = Order::find($id);

        if (!$order) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Order not found!');
        }

        // Delete the trainer
        $order->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Order deleted successfully!');
    }


    public function favorite_delete($id)
    {
        // Find the trainer by ID
        $fav = Favorite::find($id);

        // dd($fav);

        if (!$fav) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Fav not found!');
        }

        // Delete the trainer
        $fav->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Fav deleted successfully!');
    }


    public function trackorder(): Response
    {
        $users = Auth::id();
        $order = Order::where('user_id', $users)
            ->where('status', 'checkedout')
            ->get();
        $fav = Favorite::where('user_id', $users)->get();
        $checkout = Checkout::where('user_id', $users)
            ->whereNotIn('status', ['Destination reached'])
            ->get();;
        $user = Auth::user();

        return Inertia::render('Customer/TrackOrder', [
            'order' => $order,
            'fav' => $fav,
            'checkout' => $checkout,
            'auth' => $user,
        ]);
    }

    public function trackorder_id($id): Response
    {
        $user = Auth::id();
        $fav = Favorite::where('user_id', $user)->get();

        $checkout = Checkout::findOrFail($id);
        $order = $checkout->order_id ? Order::whereIn('id', $checkout->order_id)->get() : [];
        $vendor = $checkout->vendor_id ? Vendor::whereIn('id', $checkout->vendor_id)->get() : [];
        $courier = $checkout->courier_id ? Courier::findOrFail($checkout->courier_id) : null;

        return Inertia::render('Customer/TrackOrder_ID', [
            'order' => $order,
            'fav' => $fav,
            'checkout' => $checkout,
            'vendor' => $vendor,
            'courier' => $courier,
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->search;

        $checkout = Checkout::where(function ($query) use ($search) {
            $query->where('title', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
        })
            ->orWhereHas('category', function ($query) use ($search) {
                $query->where('title', 'like', "%$search%");
            })->get();

        return Inertia::render('Customer/Restaurantss', [
            'checkout' => $checkout,

        ]);
    }
}
