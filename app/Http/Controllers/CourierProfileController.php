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
        $admin = Auth::guard('courier')->user();
        $admin->fill($request->validated());

        if ($admin->isDirty('email')) {
            $admin->email_verified_at = null;
        }

        $admin->save();

        return Redirect::route('admin.profile.edit'); // Ensure the route is defined for admin
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
