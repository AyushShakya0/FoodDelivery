<?php

namespace App\Http\Controllers;

// use App\Http\Requests\VendorProfileUpdateRequest;
use App\Http\Requests\VendorProfileUpdateRequest;
use App\Models\Vendor;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;



class VendorProfileController extends Controller
{

    public function edit(Request $request): Response
    { // Assuming admins have a separate guard named 'admin'
        $vendor = Auth::guard('vendor')->user();

        return Inertia::render('Vendor/Profile/Edit', [
            'mustVerifyEmail' => $vendor instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    public function update(VendorProfileUpdateRequest $request): RedirectResponse
    {

        // dd($request->all());
        try {
            $vendor = Auth::guard('vendor')->user();

            // Fill the vendor model with all fields from the request
            $vendor->fill($request->except(['image']));

            // Check if email is being updated
            if ($vendor->isDirty('email')) {
                // If email is being updated, mark email as unverified
                $vendor->email_verified_at = null;
            }

            // Check if image is being uploaded
            if ($request->hasFile('image')) {
                // Generate a unique image name
                $imageName = Str::random(32) . '.' . $request->image->getClientOriginalExtension();

                // Store the image in the storage disk
                Storage::disk('public')->put($imageName, file_get_contents($request->image));

                // Set the image path in the vendor model
                $vendor->image = $imageName;
            }

            // Save the changes to the database
            $vendor->save();

            // Redirect back to the profile edit page
            return redirect()->route('vendor.profile.edit');
        } catch (\Exception $e) {
            // Log the error or handle it appropriately
            dd($e->getMessage()); // Use dd() for debugging
        }
    }





    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'password:vendor'],]);

        $vendor = Auth::guard('vendor')->user();

        Auth::guard('vendor')->logout();

        $vendor->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/vendor/login'); // Redirect to vendor login after account deletion
    }
}
