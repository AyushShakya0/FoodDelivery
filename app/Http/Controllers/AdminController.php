<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vendor;
use App\Models\Courier;
use App\Models\Order;
use Illuminate\Validation\ValidationException; // Import ValidationException
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;


class AdminController extends Controller
{

    public function order(): Response
    {
        $orders = Order::all();

        return Inertia::render('Admin/Order_Admin', [
            'orders' => $orders,
        ]);
    }

    public function vendor()
    {
        $vendors = Vendor::all();

        return Inertia::render('Admin/Vendor_Admin', [
            'vendors' => $vendors,

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

    public function vendor_update(Vendor $vendor, Request $request)
    {
        try {
            $vendor->update([
                'name' => $request->name,
                'email' => $request->email,
                'number' => $request->number,
                'address' => $request->address,
                'city' => $request->city,
                'cuisine' => $request->cuisine,
                'image' => $request->image,
            ]);
            return response()->json(['message' => 'Vendor updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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



    public function courier()
    {
        $couriers = Courier::all();

        return Inertia::render('Admin/Courier_Admin', [
            'couriers' => $couriers,

        ]);
    }

    public function courier_edit(Courier $courier): Response
    {
        return Inertia::render('Admin/EditCourier_Admin', [
            'courier' => $courier,
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
}
