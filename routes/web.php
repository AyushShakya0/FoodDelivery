<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\CourierProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\VendorProfileController;
use App\Models\Menu;
use App\Models\Vendor;
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

Route::get('/dashboard', function () {
    $res = Vendor::all();
    $food = Menu::all();
    return Inertia::render('Dashboard', [
        'vendor' => $res,
        'food' => $food,
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

    // Route::get('/addtocart/{product_id}', [CustomerController::class, 'addtocart'])->name('addtocart');
    Route::post('/addtocart/{menu_id}', [CustomerController::class, 'addtocart'])->name('addtocart');
    Route::patch('/updatecart/{id}', [CustomerController::class, 'updatecart'])->name('updatecart');



    Route::get('/checkout', [CustomerController::class, 'checkout'])->name('checkout');

    Route::post('/checkout_store', [CustomerController::class, 'checkout_store'])->name('checkout_store');



    // Route::get('/addtocart/{product}', [CustomerController::class, 'addtocart'])->name('addtocart');
    // Route::get('/removecartitem/{id}', [CustomerController::class, 'removecartitem'])->name('removecartitem');

});

require __DIR__ . '/auth.php';









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



    Route::get('/admin/vendors', [AdminController::class, 'vendor'])->name('admin_vendor');
    Route::get('/admin/vendor/{id}/edit', [AdminController::class, 'vendor_edit'])->name('vendor.edit');
    Route::patch('/admin/vendor/{id}/edit', [AdminController::class, 'vendor_update'])->name('vendor.update');
    Route::delete('/admin/deletevendor4/{id}', [AdminController::class, 'vendor_delete'])->name('vendor.delete');

    Route::get('/admin/vendors/verify', [AdminController::class, 'vendor_verify_display'])->name('admin_vendor_display');
    Route::patch('/admin/vendor/{id}/verify', [AdminController::class, 'vendor_verify'])->name('vendor.verify');


    // Route::patch('/vendor/profile', [VendorProfileController::class, 'update'])->name('vendor.profile.update');







    Route::get('/admin/courier', [AdminController::class, 'courier'])->name('admin_courier');
    Route::get('/admin/couriers/edit', [AdminController::class, 'courier_edit'])->name('courier.edit');
    Route::patch('/admin/couriers/{courier}', [AdminController::class, 'courier_update'])->name('courier.update');
    Route::delete('/admin/deletecourier/{id}', [AdminController::class, 'courier_delete'])->name('courier.delete');



    Route::get('/admin/finance', [AdminController::class, 'finance'])->name('admin_finance');
    Route::get('/admin/setting', [AdminController::class, 'setting'])->name('admin_setting');
});



require __DIR__ . '/adminauth.php';









Route::get('/courier/dashboard', function () {
    return Inertia::render('Courier/Dashboard');
})->middleware(['auth:courier', 'verified'])->name('courier.dashboard');

Route::middleware('auth:courier')->group(function () {
    Route::get('/courier/profile', [CourierProfileController::class, 'edit'])->name('courier.profile.edit');
    Route::patch('/courier/profile', [CourierProfileController::class, 'update'])->name('courier.profile.update');
    Route::delete('/courier/profile', [CourierProfileController::class, 'destroy'])->name('courier.profile.destroy');
});








require __DIR__ . '/courierauth.php';








Route::get('/vendor/dashboard', function () {
    return Inertia::render('Vendor/Dashboard');
})->middleware(['auth:vendor', 'verified'])->name('vendor.dashboard');


Route::middleware('auth:vendor')->group(function () {
    Route::get('/vendor/profile', [VendorProfileController::class, 'edit'])->name('vendor.profile.edit');
    Route::patch('/vendor/profile', [VendorProfileController::class, 'update'])->name('vendor.profile.update');
    Route::delete('/vendor/profile', [VendorProfileController::class, 'destroy'])->name('vendor.profile.destroy');

    // Route::patch('/vendor/profile', [VendorProfileController::class, 'status_update'])->name('vendor.status.update');

});

Route::middleware(['auth:vendor'])->prefix('vendor')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'edit'])->name('orders.edit');
    Route::patch('/orders/{id}', [OrderController::class, 'update'])->name('orders.update');

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
