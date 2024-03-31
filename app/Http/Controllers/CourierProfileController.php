<?php

namespace App\Http\Controllers;

// use App\Http\Requests\VendorProfileUpdateRequest;
use App\Http\Requests\VendorProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CourierProfileController extends Controller
{

    public function edit(Request $request): Response
    { // Assuming admins have a separate guard named 'admin'
        $admin = Auth::guard('courier')->user();

        return Inertia::render('Courier/Profile/Edit', [
            'mustVerifyEmail' => $admin instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    public function update(CourierProfileController $request): RedirectResponse
    {
        $courier = Auth::guard('vendor')->user();

        // Fill the vendor model with all fields from the request
        $courier->fill($request->all());

        // Check if email is being updated
        if ($courier->isDirty('email')) {
            // If email is being updated, mark email as unverified
            $courier->email_verified_at = null;
        }

        // Save the changes to the database
        $courier->save();

        // Redirect back to the profile edit page
        return redirect()->route('courier.profile.edit');
    }


    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'password:courier'],]);

        $admin = Auth::guard('courier')->user();

        Auth::guard('courier')->logout();

        $admin->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/courier/login'); // Redirect to admin login after account deletion
    }
}
