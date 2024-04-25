<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Courier;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Vendor;
use App\Models\Menu;
use App\Models\Favorite;
use App\Models\Rating;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class RatingController extends Controller
{
    //
    public function restaurant_review($id)
    {

        $user = Auth::id();
        $ven = Vendor::findOrFail($id);

        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        // $rating=Rating::all();
        $rating = Rating::where('vendor_id', $ven->id)
            ->whereNot('user_id', $user)
            ->get();

        $order_exists = Checkout::whereJsonContains('vendor_id', $ven->id)
            ->where('user_id', $user)
            ->where('status', 'Destination reached')
            ->exists();

        $rating_exists = Rating::where('user_id', $user)
            ->where('vendor_id', $ven->id)
            ->exists();

        $rating_own = Rating::where('user_id', $user)
            ->where('vendor_id', $ven->id)
            ->get();

        return Inertia::render('Customer/RestaurantReviews', [
            'vendor' => $ven,
            'order' => $cart,
            'fav' => $fav,
            'rating' => $rating,
            'order_exists' => $order_exists,
            'rating_exists' => $rating_exists,
            'rating_own' => $rating_own,

        ]);
    }
    public function addreview(Request $request)
    {
        $user_id = Auth::id();

        try {
            // Create Product
            Rating::create([
                'user_id' => $user_id,
                'vendor_id' => $request->vendor,
                'rating' => $request->rating,
                'review' => $request->review,
            ]);

            // Get the total count and sum of ratings for the vendor
            $vendor_ratings = Rating::where('vendor_id', $request->vendor)->get(['rating']);
            $total_ratings = $vendor_ratings->count();
            $sum_ratings = $vendor_ratings->sum('rating');

            // Calculate the average rating
            $average_rating = is_null($total_ratings) ? $request->rating : round($sum_ratings / $total_ratings);

            // Update the vendor's rating
            Vendor::where('id', $request->vendor)->update([
                'rating' => $average_rating
            ]);

            // Redirect back to the index page or any other appropriate page
            return Inertia::location(route('restaurant.reviews'));
        } catch (\Exception $e) {
            // Handle exception
            // Log the exception if necessary

            // Redirect back with an error message
            return redirect()->back()->with('error', 'Something went really wrong!');
        }
    }

    public function review_delete($id)
    {
        // Find the trainer by ID
        $review = Rating::find($id);

        // dd($fav);

        if (!$review) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Review not found!');
        }

        // Delete the trainer
        $review->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Review deleted successfully!');
    }

    public function courier_review($id)
    {

        $user = Auth::id();
        $ven = Vendor::findOrFail($id);

        $cart = Order::where('user_id', $user)
            ->where('status', null)
            ->get();
        $fav = Favorite::where('user_id', $user)->get();

        // $rating=Rating::all();
        $rating = Rating::where('vendor_id', $ven->id)
            ->whereNot('user_id', $user)
            ->get();

        $order_exists = Checkout::whereJsonContains('vendor_id', $ven->id)
            ->where('user_id', $user)
            ->where('status', 'Destination reached')
            ->exists();

        $rating_exists = Rating::where('user_id', $user)
            ->where('vendor_id', $ven->id)
            ->exists();

        $rating_own = Rating::where('user_id', $user)
            ->where('vendor_id', $ven->id)
            ->get();

        return Inertia::render('Customer/RestaurantReviews', [
            'vendor' => $ven,
            'order' => $cart,
            'fav' => $fav,
            'rating' => $rating,
            'order_exists' => $order_exists,
            'rating_exists' => $rating_exists,
            'rating_own' => $rating_own,

        ]);
    }
    public function addreview_courier(Request $request)
    {
        $user_id = Auth::id();

        try {
            // Create Product
            Rating::create([
                'user_id' => $user_id,
                'vendor_id' => $request->vendor,
                'rating' => $request->rating,
                'review' => $request->review,
            ]);

            // Get the total count and sum of ratings for the vendor
            $vendor_ratings = Rating::where('vendor_id', $request->vendor)->get(['rating']);
            $total_ratings = $vendor_ratings->count();
            $sum_ratings = $vendor_ratings->sum('rating');

            // Calculate the average rating
            $average_rating = is_null($total_ratings) ? $request->rating : round($sum_ratings / $total_ratings);

            // Update the vendor's rating
            Vendor::where('id', $request->vendor)->update([
                'rating' => $average_rating
            ]);

            // Redirect back to the index page or any other appropriate page
            return Inertia::location(route('restaurant.reviews'));
        } catch (\Exception $e) {
            // Handle exception
            // Log the exception if necessary

            // Redirect back with an error message
            return redirect()->back()->with('error', 'Something went really wrong!');
        }
    }

    public function review_delete_courier($id)
    {
        // Find the trainer by ID
        $review = Rating::find($id);

        // dd($fav);

        if (!$review) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Review not found!');
        }

        // Delete the trainer
        $review->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Review deleted successfully!');
    }
}
