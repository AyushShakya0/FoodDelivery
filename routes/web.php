<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\CourierProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\VendorProfileController;
use App\Models\Checkout;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Vendor;
use App\Models\Favorite;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Courier;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//CUSTOMER
Route::get('/dashboard', function () {

    $user = Auth::id();

    $order = Order::where('user_id', $user)
        ->where('status', null)
        ->get();
    $fav = Favorite::where('user_id', $user)->get();

    $vendor = Vendor::where('verified', 'yes')->get();
    $food = Menu::where('availability', 'available')->get();

    return Inertia::render('Dashboard', [
        'vendor' => $vendor,
        'food' => $food,
        'order' => $order,
        'fav' => $fav,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/restaurantdetails/{id}', [CustomerController::class, 'restaurantdetails'])->name('restaurant.details');
    Route::get('/myprofile', [CustomerController::class, 'myprofile'])->name('myprofile');
    Route::get('/myorders', [CustomerController::class, 'myorders'])->name('myorders');
    Route::get('/favorites', [CustomerController::class, 'favorites'])->name('favorites');
    Route::get('/address', [CustomerController::class, 'address'])->name('address');
    Route::get('/notification', [CustomerController::class, 'notification'])->name('notification');

    Route::get('/mycart', [CustomerController::class, 'cart'])->name('cart');
    Route::get('/orderhistory', [CustomerController::class, 'order_history'])->name('order.history');

    Route::post('/addtocart/{menu_id}', [CustomerController::class, 'addtocart'])->name('addtocart');
    Route::patch('/checkout/{id}', [CustomerController::class, 'updatecart'])->name('updatecart');
    Route::patch('/checkout/addquantity/{id}', [CustomerController::class, 'addquantity'])->name('addquantity');
    Route::patch('/checkout/subtractquantity/{id}', [CustomerController::class, 'subtractquantity'])->name('subtractquantity');

    Route::post('/addfavorite/{id}', [CustomerController::class, 'addfavorite'])->name('addfavorite');


    // Route::delete('/deleteproduct/{id}', [CustomerController::class, 'order_delete'])->name('order.delete');
    Route::delete('/orders/{id}', [CustomerController::class, 'order_delete'])->name('order.delete');
    Route::delete('/favorite/{id}', [CustomerController::class, 'favorite_delete'])->name('favorites.delete');


    Route::get('/checkout', [CustomerController::class, 'checkout'])->name('checkout');
    Route::post('/checkout_store', [CustomerController::class, 'checkout_store'])->name('checkout_store');

    Route::delete('/checkout/{id}', [CustomerController::class, 'checkout_order_delete'])->name('checkout.order.delete');


    Route::get('/trackorder', [CustomerController::class, 'trackorder'])->name('track.order');
    Route::get('/trackorder/{id}', [CustomerController::class, 'trackorder_id'])->name('track.order_id');
    //history one
    Route::get('/trackorder_history/{id}', [CustomerController::class, 'trackorder_id_history'])->name('track.order_id.history');


    Route::get('/restaurants', [CustomerController::class, 'restaurants'])->name('restaurants');

    Route::get('/search', [CustomerController::class, 'search'])->name('search');
    Route::get('/category', [CustomerController::class, 'category'])->name('category');

    //rating and reviews
    Route::get('/restaurantdetails/reviews/{id}', [RatingController::class, 'restaurant_review'])->name('restaurant.reviews');
    Route::post('/addreview/{id}', [RatingController::class, 'addreview'])->name('addreview');
    Route::delete('/review/{id}', [RatingController::class, 'review_delete'])->name('review.delete');

    Route::get('/courier/reviews/{id}', [RatingController::class, 'courier_review'])->name('courier.reviews');
    Route::post('/addreviewcourier/{id}', [RatingController::class, 'addreview_courier'])->name('addreview.courier');
    Route::delete('/reviewcourier/{id}', [RatingController::class, 'review_delete_courier'])->name('review.delete.courier');

    //cancel delivery
    Route::delete('/cancelDelivery/{id}', [CustomerController::class, 'cancel_delivery'])->name('user.cancel_delivery');

    Route::get('/payment/khalti/{id}', [CustomerController::class, 'payment'])->name('payment');

    Route::get('/payments', [CustomerController::class, 'payments'])->name('payments');

    Route::post('/khalti/payment/verify', [PaymentController::class, 'verifyPayment'])->name('khalti.verifyPayment');

    Route::post('/khalti/payment/store', [PaymentController::class, 'storePayment'])->name('khalti.storePayment');
});

require __DIR__ . '/auth.php';


//ADMIN
Route::get('/admin/dashboard', function () {
    $checkout = Checkout::all();
    $order_ongoing = Checkout::whereNot('status', 'Delivered')->get();
    $courier = Courier::all();
    $pending_courier = Courier::whereNull('verified')->get();
    $pending_vendor = Vendor::whereNull('verified')->get();
    $vendor = Vendor::all();

    $checkouts = Checkout::whereNot('status', 'Delivered')->take(5)->get();

    $orderIds = $checkouts->pluck('order_id')->flatten()->toArray();
    $orders = Order::where(function ($query) use ($orderIds) {
        foreach ($orderIds as $orderId) {
            $query->orWhereJsonContains('id', $orderId);
        }
    })->get();

    $userIds = $checkouts->pluck('user_id')->flatten()->toArray();
    $users = User::whereIn('id', $userIds)->get();

    $vendorIds = $checkouts->pluck('vendor_id')->flatten()->toArray();
    $vendors = Vendor::whereIn('id', $vendorIds)->get();

    $courierIds = $checkouts->pluck('courier_id')->flatten()->toArray();
    $couriers = Courier::whereIn('id', $courierIds)->get();


    return Inertia::render('Admin/Dashboard', [
        'vendor' => $vendor,
        'checkout' => $checkout,
        'order_ongoing' => $order_ongoing,
        'courier' => $courier,
        'pending_courier' => $pending_courier,
        'pending_vendor' => $pending_vendor,

        'orders' => $orders,
        'users' => $users,
        'vendors' => $vendors,
        'couriers' => $couriers,
        'checkouts' => $checkouts,
    ]);
})->middleware(['auth:admin', 'verified'])->name('admin.dashboard');

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('/admin/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('/admin/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');
});


Route::middleware(['auth:admin'])->group(function () {

    Route::get('/admin/orders', [AdminController::class, 'order'])->name('admin_order');
    Route::get('/admin/orders/history', [AdminController::class, 'order_history'])->name('admin_order_history');
    Route::get('/admin/orders/{id}', [AdminController::class, 'admin_orders_edit'])->name('admin.orders.edit');



    Route::get('/admin/vendors', [AdminController::class, 'vendor'])->name('admin_vendor');
    Route::get('/admin/vendor/{id}/edit', [AdminController::class, 'vendor_edit'])->name('vendor.edit');
    Route::patch('/admin/vendor/{id}/edit', [AdminController::class, 'vendor_update'])->name('vendor.update');
    Route::delete('/admin/deletevendor4/{id}', [AdminController::class, 'vendor_delete'])->name('vendor.delete');


    Route::get('/admin/vendors/verify', [AdminController::class, 'vendor_verify_display'])->name('admin_vendor_display');
    Route::patch('/admin/vendor/verify/{id}', [AdminController::class, 'vendor_verify'])->name('vendor.verify');


    Route::get('/admin/couriers/verify', [AdminController::class, 'courier_verify_display'])->name('admin_courier_display');
    Route::patch('/admin/courier/verify/{id}', [AdminController::class, 'courier_verify'])->name('courier.verify');


    Route::get('/admin/courier', [AdminController::class, 'courier'])->name('admin_courier');
    Route::get('/admin/couriers/edit/{id}', [AdminController::class, 'courier_edit'])->name('courier.edit');
    Route::patch('/admin/couriers/edit/{id}', [AdminController::class, 'courier_update'])->name('courier.update');
    Route::delete('/admin/deletecourier/{id}', [AdminController::class, 'courier_delete'])->name('courier.delete');



    Route::get('/admin/finance', [AdminController::class, 'finance'])->name('admin_finance');
    Route::get('/admin/setting', [AdminController::class, 'setting'])->name('admin_setting');
});

require __DIR__ . '/adminauth.php';







//COURIER
Route::get('/courier/dashboard', function () {
    $checkout = Checkout::whereNotIn('status', ['Delivered'])
        ->where('courier_id', null)
        ->take(5)
        ->get();

    $courierId = Auth::id();

    $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
    $orders = Order::where(function ($query) use ($orderIds) {
        foreach ($orderIds as $orderId) {
            $query->orWhereJsonContains('id', $orderId);
        }
    })->get();

    $occupied = Checkout::where('courier_id', $courierId)
        ->whereNot('status', 'Delivered')->get();

    $userIds = $checkout->pluck('user_id')->flatten()->toArray();
    $user = User::whereIn('id', $userIds)->get();

    $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
    $vendor = Vendor::whereIn('id', $vendorIds)->get();

    $checkout_total = Checkout::whereIn('status', ['Delivered'])
        ->where('courier_id', $courierId)
        ->get();

    $current_delivery = Checkout::whereNotIn('status', ['Delivered'])
        ->where('courier_id', $courierId)
        ->get();

    $pending_delivery = Checkout::whereNotIn('status', ['Delivered'])
        ->where('courier_id', null)
        ->get();

    return Inertia::render('Courier/Dashboard', [
        'orders' => $orders,
        'checkout' => $checkout,
        'user' => $user,
        'vendor' => $vendor,
        'occupied' => $occupied,
        'checkout_total' => $checkout_total,
        'pending_delivery' => $pending_delivery,
        'current_delivery' => $current_delivery,
    ]);
})->middleware(['auth:courier', 'verified'])->name('courier.dashboard');

Route::middleware('auth:courier')->group(function () {
    Route::get('/courier/profile', [CourierProfileController::class, 'edit'])->name('courier.profile.edit');
    Route::patch('/courier/profile', [CourierProfileController::class, 'update'])->name('courier.profile.update');
    Route::delete('/courier/profile', [CourierProfileController::class, 'destroy'])->name('courier.profile.destroy');


    Route::get('/courier/orders', [CourierController::class, 'order'])->name('courier_order');
    Route::get('/courier/orders/selected', [CourierController::class, 'my_order'])->name('courier_order_selected');

    Route::get('/courier/orders/{id}', [CourierController::class, 'courier_orders_edit'])->name('courier.orders.edit');
    Route::patch('/courier/orders/{id}', [CourierController::class, 'update'])->name('courier.orders.update');

    Route::patch('/courier/orders/status/{id}', [CourierController::class, 'status_update'])->name('courier.order_status.update');
    Route::patch('/courier/orders/cancel_delivery/{id}', [CourierController::class, 'cancel_delivery'])->name('courier.cancel_delivery');

    Route::get('/courier/delivery/history', [CourierController::class, 'my_order_history'])->name('courier_order_history');
    Route::get('/courier/delivery/history/{id}', [CourierController::class, 'courier_orders_history'])->name('courier.orders.history');

    Route::get('/courierreviews', [CourierController::class, 'courier_reviews'])->name('courier.view_reviews');
});

require __DIR__ . '/courierauth.php';


//VENDOR
Route::get('/vendor/dashboard', function () {

    $vendor = Auth::id();

    $checkout = Checkout::whereJsonContains('vendor_id', $vendor)
        ->get();
    $checkout_completed = Checkout::where('status', 'Delivered')
        ->whereJsonContains('vendor_id', $vendor)
        ->get();
    $menu_completed = Menu::where('availability', 'available')
        ->where('vendor_id', $vendor)
        ->get();
    $menu = Menu::where('vendor_id', $vendor)->get();

    $checkouts = Checkout::whereJsonContains('vendor_id', $vendor)
        ->whereNot('status', 'Delivered')
        ->take(5)
        ->get();

    $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
    $orders = Order::where(function ($query) use ($orderIds) {
        foreach ($orderIds as $orderId) {
            $query->orWhereJsonContains('id', $orderId);
        }
    })->get();

    $userIds = $checkout->pluck('user_id')->flatten()->toArray();
    $users = User::whereIn('id', $userIds)->get();

    $courierids = $checkout->pluck('courier_id')->flatten()->toArray();
    $couriers = Courier::whereIn('id', $courierids)->get();

    return Inertia::render('Vendor/Dashboard', [
        'menu' => $menu,
        'checkout' => $checkout,
        'checkout_c' => $checkout_completed,
        'menu_c' => $menu_completed,
        'checkouts' => $checkouts,
        'orders' => $orders,
        'users' => $users,
        'couriers' => $couriers,
    ]);
})->middleware(['auth:vendor', 'verified'])->name('vendor.dashboard');


Route::middleware('auth:vendor')->group(function () {
    Route::get('/vendor/profile', [VendorProfileController::class, 'edit'])->name('vendor.profile.edit');
    Route::patch('/vendor/profile', [VendorProfileController::class, 'update'])->name('vendor.profile.update');
    Route::delete('/vendor/profile', [VendorProfileController::class, 'destroy'])->name('vendor.profile.destroy');
});



Route::middleware(['auth:vendor'])->prefix('vendor')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'edit'])->name('orders.edit');
    Route::patch('/orders/{id}', [OrderController::class, 'update'])->name('orders.update');

    Route::get('/vendor/orders/history', [VendorController::class, 'order_history'])->name('order_history_vendor');
    Route::get('/vendor/orders/history/{id}', [VendorController::class, 'order_history_details'])->name('order_history_details_vendor');

    Route::patch('/vendor/status_update/{id}', [VendorController::class, 'status_update'])->name('vendor.status');

    Route::get('/courier', [VendorController::class, 'courier'])->name('vendor.courier');
    Route::get('/vendorreviews', [VendorController::class, 'vendor_reviews'])->name('vendor.view_reviews');
    Route::get('/setting', [VendorController::class, 'setting'])->name('vendor.setting');

    Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
    // Route::get('/menu_add', [MenuController::class, 'index'])->name('menu.index');
    Route::get('/menu/{id}', [MenuController::class, 'show'])->name('menu.show');
    Route::post('/addmenu', [MenuController::class, 'store'])->name('menu.store');
    Route::put('menuupdate/{id}', [MenuController::class, 'update'])->name('menu.updates');
    Route::get('/addmenu', [MenuController::class, 'add'])->name('menu.add');
    Route::get('/editmenu/{id}', [MenuController::class, 'edit_menu'])->name('menu.edit');
    Route::patch('/editmenu/{id}', [MenuController::class, 'update_menu'])->name('menu.update');
    // Route::delete('menudelete/{id}', [MenuController::class, 'destroy'])->name('menu.store');

    // Route::get('products', [MenuController::class, 'index']);
    // Route::get('products/{id}', [MenuController::class, 'show']);
    // Route::post('products', [MenuController::class, 'store']);

    Route::patch('/vendor/menu/{id}', [MenuController::class, 'toggleAvailability'])->name('toggle.availability');
    Route::delete('/vendor/menu/delete/{id}', [MenuController::class, 'delete_menuItem'])->name('menu.delete');
});

require __DIR__ . '/vendorauth.php';
