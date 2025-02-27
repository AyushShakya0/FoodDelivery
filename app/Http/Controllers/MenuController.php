<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException; // Import ValidationException
use App\Models\Menu;
use App\Models\Vendor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;


class MenuController extends Controller
{
    public function index(): Response
    {
        $vendor = Auth::user();
        $menus = Menu::where('vendor_id', $vendor->id)->paginate(10);

        return Inertia::render('Vendor/Menu_Display', [
            'menu' => $menus,
        ]);
    }

    public function add(): Response
    {
        return Inertia::render('Vendor/Menu', []);
    }

    public function show($id)
    {
        // Product Detail
        $product = Menu::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'menu' => $product
        ], 200);
    }

    public function store(Request $request)
    {
        $user_id = Auth::id();

        try {
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();

            // Create Product
            Menu::create([
                'name' => $request->name,
                'image' => $imageName,
                'description' => $request->description,
                'price' => $request->price,
                // 'quantity' => $request->quantity,
                'category' => $request->category,
                'availability' => $request->availability,
                'customization' => $request->customization,
                'vendor_id' => $user_id,
            ]);

            // Save Image in Storage folder
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            // Redirect back to the index page or any other appropriate page
            return Inertia::location(route('menu.index'));
        } catch (\Exception $e) {
            // Handle exception
            // Log the exception if necessary

            // Redirect back with an error message
            return redirect()->back()->with('error', 'Something went really wrong!');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Find product
            $menu = Menu::find($id);
            if (!$menu) {
                return response()->json([
                    'message' => 'Product Not Found.'
                ], 404);
            }

            //echo "request : $request->image";
            $menu->name = $request->name;
            $menu->description = $request->description;

            if ($request->image) {

                // Public storage
                $storage = Storage::disk('public');

                // Old iamge delete
                if ($storage->exists($menu->image))
                    $storage->delete($menu->image);

                // Image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $menu->image = $imageName;

                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            // Update menu
            $menu->save();

            // Return Json Response
            return response()->json([
                'message' => "menu successfully updated."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }


    public function toggleAvailability($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->availability = $menu->availability === 'available' ? 'unavailable' : 'available';
        $menu->save();

        return  redirect()->back();
    }


    public function destroy($id)
    {
        // Detail
        $product = Menu::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        // Public storage
        $storage = Storage::disk('public');

        // Iamge delete
        if ($storage->exists($product->image))
            $storage->delete($product->image);

        // Delete Product
        $product->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted."
        ], 200);
    }

    public function delete_menuItem($id)
    {
        // Find the trainer by ID
        $menu = Menu::find($id);

        if (!$menu) {
            // Trainer not found, you may want to handle this case differently (e.g., show error message)
            return redirect()->back()->with('error', 'Menu not found!');
        }

        // Delete the trainer
        $menu->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Menu deleted successfully!');
    }


    public function edit_menu($menuId): Response
    {
        $menu = Menu::findOrFail($menuId);

        return Inertia::render('Vendor/Edit_Menu', [
            'menu' => $menu,
        ]);
    }


    public function update_menu($id, Request $request)
    {
        // dd($request->status);
        $menu = Menu::findOrFail($id);
        $menu->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image,
            'category' => $request->category,
        ]);

        return redirect()->route('menu.index')->with('success', 'Menu updated successfully.');

    }
}
