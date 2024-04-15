<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\CourierProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\VendorProfileController;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Vendor;
use App\Models\Favorite;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    $res = Vendor::all();
    $food = Menu::all();
    $order= Order::all();
    $fav= Favorite::all();

    return Inertia::render('Dashboard', [
        'vendor' => $res,
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
    Route::get('/payments', [CustomerController::class, 'payments'])->name('payments');
    Route::get('/notification', [CustomerController::class, 'notification'])->name('notification');

    Route::get('/mycart', [CustomerController::class, 'cart'])->name('cart');
    Route::get('/orderhistory', [CustomerController::class, 'order_history'])->name('order.history');

    Route::post('/addtocart/{menu_id}', [CustomerController::class, 'addtocart'])->name('addtocart');
    Route::patch('/updatecart/{id}', [CustomerController::class, 'updatecart'])->name('updatecart');

    Route::post('/addfavorite/{id}', [CustomerController::class, 'addfavorite'])->name('addfavorite');


    // Route::delete('/deleteproduct/{id}', [CustomerController::class, 'order_delete'])->name('order.delete');
    Route::delete('/orders/{id}', [CustomerController::class, 'order_delete'])->name('order.delete');
    Route::delete('/favorite/{id}', [CustomerController::class, 'favorite_delete'])->name('favorites.delete');


    Route::get('/checkout', [CustomerController::class, 'checkout'])->name('checkout');
    Route::post('/checkout_store', [CustomerController::class, 'checkout_store'])->name('checkout_store');

    Route::get('/order/{id}', [OrderController::class, 'trackorder'])->name('track.order');

});

require __DIR__ . '/auth.php';


//ADMIN
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
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
    Route::get('/admin/couriers/edit', [AdminController::class, 'courier_edit'])->name('courier.edit');
    Route::patch('/admin/couriers/{courier}', [AdminController::class, 'courier_update'])->name('courier.update');
    Route::delete('/admin/deletecourier/{id}', [AdminController::class, 'courier_delete'])->name('courier.delete');



    Route::get('/admin/finance', [AdminController::class, 'finance'])->name('admin_finance');
    Route::get('/admin/setting', [AdminController::class, 'setting'])->name('admin_setting');
});



require __DIR__ . '/adminauth.php';







//COURIER
Route::get('/courier/dashboard', function () {
    return Inertia::render('Courier/Dashboard');
})->middleware(['auth:courier', 'verified'])->name('courier.dashboard');

Route::middleware('auth:courier')->group(function () {
    Route::get('/courier/profile', [CourierProfileController::class, 'edit'])->name('courier.profile.edit');
    Route::patch('/courier/profile', [CourierProfileController::class, 'update'])->name('courier.profile.update');
    Route::delete('/courier/profile', [CourierProfileController::class, 'destroy'])->name('courier.profile.destroy');


    Route::get('/courier/orders', [CourierController::class, 'order'])->name('courier_order');
    Route::get('/courier/orders/selected', [CourierController::class, 'my_order'])->name('courier_order_selected');

    Route::get('/courier/orders/{id}', [CourierController::class, 'courier_orders_edit'])->name('courier.orders.edit');
    Route::patch('/courier/orders/{id}', [CourierController::class, 'update'])->name('courier.orders.update');

    Route::get('/courier/orders/history', [CourierController::class, 'my_order_history'])->name('courier_order_history');
    Route::get('/courier/orders/history/{id}', [CourierController::class, 'courier_orders_history'])->name('courier.orders.history');









});


require __DIR__ . '/courierauth.php';


//VENDOR
Route::get('/vendor/dashboard', function () {
    return Inertia::render('Vendor/Dashboard');
})->middleware(['auth:vendor', 'verified'])->name('vendor.dashboard');


Route::middleware('auth:vendor')->group(function () {
    Route::get('/vendor/profile', [VendorProfileController::class, 'edit'])->name('vendor.profile.edit');
    Route::patch('/vendor/profile', [VendorProfileController::class, 'update'])->name('vendor.profile.update');
    Route::delete('/vendor/profile', [VendorProfileController::class, 'destroy'])->name('vendor.profile.destroy');

    // Route::patch('/vendor/status', [VendorProfileController::class, 'status_update'])->name('vendor.status');


    // Route::patch('/vendor/profile', [VendorProfileController::class, 'status_update'])->name('vendor.status.update');

});



Route::middleware(['auth:vendor'])->prefix('vendor')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'edit'])->name('orders.edit');
    Route::patch('/orders/{id}', [OrderController::class, 'update'])->name('orders.update');

    Route::get('/vendor/orders/history', [VendorController::class, 'order_history'])->name('order_history_vendor');
    Route::get('/vendor/orders/history/{id}', [VendorController::class, 'order_history_details'])->name('order_history_details_vendor');


    Route::patch('/vendor/dashboard/{id}', [VendorController::class, 'status_update'])->name('vendor.status');


    Route::get('/courier', [VendorController::class, 'courier'])->name('vendor.courier');
    Route::get('/finance', [VendorController::class, 'finance'])->name('vendor.finance');
    Route::get('/setting', [VendorController::class, 'setting'])->name('vendor.setting');

    Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
    // Route::get('/menu_add', [MenuController::class, 'index'])->name('menu.index');
    Route::get('/menu/{id}', [MenuController::class, 'show'])->name('menu.show');
    Route::post('/addmenu', [MenuController::class, 'store'])->name('menu.store');
    Route::put('menuupdate/{id}', [MenuController::class, 'update'])->name('menu.update');
    Route::get('/addmenu', [MenuController::class, 'add'])->name('menu.add');
    // Route::delete('menudelete/{id}', [MenuController::class, 'destroy'])->name('menu.store');

    // Route::get('products', [MenuController::class, 'index']);
    // Route::get('products/{id}', [MenuController::class, 'show']);
    // Route::post('products', [MenuController::class, 'store']);



    // Route::get('/menu/{id}/toggleAvailability', [MenuController::class,'toggleAvailability'])->name('menu.toggleAvailability');
    Route::patch('/menu/{id}/toggleAvailability', 'MenuController@toggleAvailability')->name('menu.toggleAvailability');





    // Route::post('/uploadfood', [MenuController::class, 'store'])->name('menu.store');


    // Route::get('/menu/show', [MenuController::class,'show'])->name('menu.show');
    // Route::post('/menu/insert', [VendorController::class,'insert'])->name('menu.insert');
});




require __DIR__ . '/vendorauth.php';
