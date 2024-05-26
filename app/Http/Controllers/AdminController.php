<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorProfileUpdateRequest;
use App\Models\Checkout;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Courier;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException; // Import ValidationException
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{

    public function order(): Response
    {
        $checkout = Checkout::whereNotIn('status', ['Delivered'])
            ->paginate(15);

        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();

        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        $courierIds = $checkout->pluck('courier_id')->flatten()->toArray();
        $courier = Courier::whereIn('id', $courierIds)->get();

        return Inertia::render('Admin/Order_Admin', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function order_history(): Response
    {
        $checkout = Checkout::whereIn('status', ['Delivered'])
            ->paginate(10);

        $orderIds = $checkout->pluck('order_id')->flatten()->toArray();
        $orders = Order::where(function ($query) use ($orderIds) {
            foreach ($orderIds as $orderId) {
                $query->orWhereJsonContains('id', $orderId);
            }
        })->get();

        $userIds = $checkout->pluck('user_id')->flatten()->toArray();
        $user = User::whereIn('id', $userIds)->get();

        $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        $courierIds = $checkout->pluck('courier_id')->flatten()->toArray();
        $courier = Courier::whereIn('id', $courierIds)->get();


        return Inertia::render('Admin/OrderHistory_Admin', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }

    public function vendor()
    {
        $vendors = Vendor::where('verified', 'yes')->paginate(10);

        return Inertia::render('Admin/Vendor_Admin', [
            'vendors' => $vendors,

        ]);
    }

    public function vendor_verify_display()
    {
        $vendors = Vendor::where('verified', null)->paginate(10);

        return Inertia::render('Admin/Verify_Vendor_Admin', [
            'vendors' => $vendors,
        ]);
    }

    public function courier_verify_display()
    {
        $couriers = Courier::where('verified', null)->paginate(10);

        return Inertia::render('Admin/Verify_Courier_Admin', [
            'couriers' => $couriers,
        ]);
    }



    public function vendor_add(Request $request)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'name' => 'required',
                'email' => 'required',
                'number' => 'required|numeric',
                // 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image type (PNG, JPEG, JPG, GIF) and maximum size of 2MB
                'address' => 'required',
                'city' => 'required',
                'cuisine' => 'nullable|string', // Assuming customization is an array of strings
            ]);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json(['errors' => $e->errors()], 422); // Return JSON response with validation errors and status code 422
        }

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Check if the file is an image
            if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['png', 'jpg', 'jpeg', 'gif'])) {
                return response()->json(['errors' => ['image' => ['The image must be a valid PNG, JPEG, JPG, or GIF file.']]], 422);
            }

            // Store the image
            $imagePath = $image->store('images'); // Change the storage path as per your configuration
        } else {
            $imagePath = null; // Set image path to null if image is not provided
        }

        // Create a new vendor
        $vendor = new Vendor();
        $vendor->name = $validatedData['name'];
        $vendor->email = $validatedData['description'];
        $vendor->number = $validatedData['price'];
        // $menu->image_path = $imagePath;
        $vendor->category = $validatedData['category'];
        $vendor->availability = $validatedData['availability'];
        $vendor->customization = $validatedData['customization'] ?? [];
        $vendor->save();

        // Return success response
        return response()->json(['message' => 'Menu item added successfully'], 200);
    }


    public function vendor_edit($vendorId): Response
    {
        $vendor = Vendor::findOrFail($vendorId);

        return Inertia::render('Admin/EditVendor_Admin', [
            'vendor' => $vendor,
        ]);
    }


    // public function vendor_update(Vendor $vendor, Request $request)
    // {
    //     try {
    //         $existingVendor = Vendor::where('email', $request->input('email'))->first();

    //         // Check if the email exists for another vendor
    //         if ($existingVendor && $existingVendor->id !== $vendor->id) {
    //             return Inertia::back()->with('error', 'Email already exists for another vendor');
    //         }

    //         $vendor->name = $request->input('name');
    //         $vendor->email = $request->input('email');
    //         $vendor->phone_number = $request->input('phone_number');
    //         $vendor->address = $request->input('address');
    //         $vendor->city = $request->input('city');
    //         $vendor->time = $request->input('time');

    //         // Check if a new password is provided
    //         $password = $request->input('password');
    //         if (!empty($password)) {
    //             $vendor->password = bcrypt($password);
    //         }

    //         // Handle image upload if provided
    //         if ($request->hasFile('image')) {
    //             $imagePath = $request->file('image')->store('vendor_images');
    //             $vendor->image = $imagePath;
    //         }

    //         // Save the changes
    //         $vendor->save();

    //         // Redirect back with success message
    //         return Inertia::route('vendor.edit', ['vendor' => $vendor->id])->with('success', 'Vendor updated successfully');
    //     } catch (\Exception $e) {
    //         // Render the edit page with error message
    //         return Inertia::render('Admin/EditVendor_Admin', [
    //             'vendor' => $vendor,
    //             'error' => $e->getMessage()
    //         ])->with('error', $e->getMessage());
    //     }
    // }

    public function vendor_update(Request $request, $vendorid)
    {
        $vendor = Vendor::findOrFail($vendorid);

        // dd($request->all());

        // dd($request->all());
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('vendors')->ignore($vendor->id)],
            // 'number' => ['required', 'integer', 'max:10'],
            'number' => ['required', 'string', 'max:10','min:10'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'longitude' => 'required|string',
            'latitude' => 'required|string',
        ]);

        // Update the vendor with the validated data
        $vendor->update($validatedData);

        // $vendor->update([
        //     'latitude'=> $request->longitude,
        //     'longitude'=> $request->longitude
        // ]);

        return redirect()->route('admin_vendor')->with('success', 'Vendor updated successfully.');
    }


    public function courier_update(Request $request, $courierid)
    {
        $courier = Courier::findOrFail($courierid);

        // dd($request->all());

        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('couriers')->ignore($courier->id)],
            'number' => ['required', 'string', 'max:10','min:10'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        // dd($validatedData);


        // Update the vendor with the validated data
        $courier->update($validatedData);

        return redirect()->route('admin_courier')->with('success', 'Vendor updated successfully.');
    }


    public function vendor_verify($vendorid, Request $request): void
    {
        // dd($vendorid);
        $vendor = Vendor::findOrFail($vendorid);
        $vendor->update([
            'verified' => "yes"
        ]);
    }


    public function courier_verify($courierid, Request $request): void
    {
        $courier = Courier::findOrFail($courierid);
        $courier->update([
            'verified' => "yes"
        ]);
    }



    public function vendor_delete($id)
    {
        // Find the trainer by ID
        $vendor = Vendor::find($id);

        if (!$vendor) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Trainer not found!');
        }

        // Delete the trainer
        $vendor->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Trainer deleted successfully!');
    }

    public function courier_delete($id)
    {
        // Find the trainer by ID
        $courier = Courier::find($id);

        if (!$courier) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Courier not found!');
        }

        // Delete the trainer
        $courier->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Courier deleted successfully!');
    }



    public function courier()
    {
        $couriers = Courier::where('verified', 'yes')->paginate(10);

        return Inertia::render('Admin/Courier_Admin', [
            'couriers' => $couriers,

        ]);
    }

    public function courier_edit($courierid): Response
    {
        // dd($courierid);

        $courier = Courier::findOrFail($courierid);

        return Inertia::render('Admin/EditCourier_Admin', [
            'couriers' => $courier,
        ]);
    }

    public function setting()
    {
        return Inertia::render('Admin/Setting_Admin', []);
    }

    public function finance()
    {
        return Inertia::render('Admin/Finance_Admin', []);
    }


    public function admin_orders_edit($checkoutId): Response
    {
        $checkout = Checkout::findOrFail($checkoutId);

        $orderIds = $checkout->order_id;
        $userIds = $checkout->user_id;
        $vendorIds = $checkout->vendor_id;
        $courierIds = $checkout->courier_id;

        $orders = Order::whereIn('id', $orderIds)
            ->where('status', 'checkedout')
            ->get();

        $user = User::where('id', $userIds)->get();

        // $vendorIds = $checkout->pluck('vendor_id')->flatten()->toArray();
        $vendor = Vendor::whereIn('id', $vendorIds)->get();

        $courier = Courier::where('id', $courierIds)->get();

        return Inertia::render('Admin/Edit_Order', [
            'orders' => $orders,
            'checkout' => $checkout,
            'user' => $user,
            'courier' => $courier,
            'vendor' => $vendor,
        ]);
    }
}
