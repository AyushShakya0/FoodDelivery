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
        $vendor = Auth::guard('vendor')->user();
        $vendor->fill($request->validated());

        if ($vendor->isDirty('email')) {
            $vendor->email_verified_at = null;
        }

        $vendor->save();

        return Redirect::route('vendor.profile.edit'); // Ensure the route is defined for vendor
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
