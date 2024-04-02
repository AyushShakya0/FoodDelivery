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
use Illuminate\Validation\Rule;

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

    public function vendor_verify_display()
    {
        $vendors = Vendor::all();

        return Inertia::render('Admin/Verify_Vendor_Admin', [
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

    public function vendor_update(Request $request, Vendor $vendor)
    {
        // Dump request data for debugging
        // dd($request->all())

        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            // 'email' => ['required', 'string', 'email', 'max:255', Rule::unique('vendors')->ignore($vendor->id)],
            // 'phone_number' => ['required', 'string', 'max:20'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        // Dump validated data for debugging
        // dd("updated successfully");


        // Update the vendor with the validated data
        $vendor->update($validatedData);

        // Redirect back to the vendor list page with a success message
        // return redirect()->route('vendor.edit')->with('success', 'Vendor updated successfully.');
        return redirect()->route('admin_vendor')->with('success', 'Vendor updated successfully.');
    }



    public function vendor_verify(Vendor $vendor, Request $request)
    {
        try {
            $vendor->verified = $request->input('verified');

            // Save the changes excluding the password field
            $vendor->save(['timestamps' => false, 'touch' => false]);

            return response()->json(['message' => 'Vendor verified successfully'], 200);
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
