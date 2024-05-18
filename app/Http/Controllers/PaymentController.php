<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function verify(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Key ' . env('KHALTI_SECRET_KEY'),
        ])->post('https://khalti.com/api/v2/payment/verify/', [
            'token' => $request->token,
            'amount' => $request->amount,
        ]);
        if ($response->successful()) {

            // Ensure user is authenticated
            $user_id = Auth::id();

            // dd($request->all());

            // Add the item to the cart
            $cartItem = new Checkout();
            $cartItem->user_id = $user_id;
            // $cartItem->vendor_id = $request->vendor_id;
            $cartItem->order_id = $request->order_id;
            $cartItem->vendor_id = $request->vendor_id;
            $cartItem->address = $request->address;
            $cartItem->total_price = $request->price;
            $cartItem->customization = $request->customization;
            $cartItem->status = "Ordered";

            $cartItem->save();

            $orderIds = $request->order_id;

            Order::whereIn('id', $orderIds)->update([
                'status' => 'checkedout'
            ]);

            // Return a response, such as a success message or redirect
            Log::info('successful');
            return redirect()->route('track.order');
        } else {
            // Include more detailed error handling as needed
            return response()->with(['success' => false, 'message' => 'Payment failed!', 'details' => $response->json()], 422);
        }
    }
}
