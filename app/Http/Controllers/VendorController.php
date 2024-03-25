<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    //

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
