<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    //

    public function status_update( $id, Request $request): void
    {

        dd($request->status);
        $vendor = Vendor::findOrFail($id);
        $vendor->update([
            'status' => $request->status
        ]);
    }

    public function courier()
    {
        return Inertia::render('Vendor/Courier_Vendor', []);
    }

    public function setting()
    {
        return Inertia::render('Vendor/Setting_Vendor', []);
    }

    public function finance()
    {
        return Inertia::render('Vendor/Finance_Vendor', []);
    }
}
