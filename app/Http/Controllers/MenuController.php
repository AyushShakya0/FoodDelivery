<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException; // Import ValidationException
use App\Models\Menu;
use App\Models\Vendor;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;


class MenuController extends Controller
{
    // public function index()
    // {
    //     return Inertia::render('Vendor/Menu', []);
    // }
    // public function store(Request $request)

    public function index(): Response
    {
        $menu = Menu::all();

        return Inertia::render('Vendor/Menu_Display', [
            'menu' => $menu,
        ]);
    }
    // {
    //     try {
    //         // Validate the request
    //         $validatedData = $request->validate([
    //             'name' => 'required',
    //             'description' => 'required',
    //             'price' => 'required|numeric',
    //             'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image type (PNG, JPEG, JPG, GIF) and maximum size of 2MB
    //             'category' => 'required',
    //             'availability' => 'required',
    //             'customization.*' => 'nullable|string', // Assuming customization is an array of strings
    //         ]);
    //     } catch (ValidationException $e) {
    //         // Handle validation errors
    //         return response()->json(['errors' => $e->errors()], 422); // Return JSON response with validation errors and status code 422
    //     }

    //     // Handle image upload if provided
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');

    //         // Check if the file is an image
    //         if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['png', 'jpg', 'jpeg', 'gif'])) {
    //             return response()->json(['errors' => ['image' => ['The image must be a valid PNG, JPEG, JPG, or GIF file.']]], 422);
    //         }

    //         // Store the image
    //         $imagePath = $image->store('images'); // Change the storage path as per your configuration
    //     } else {
    //         $imagePath = null; // Set image path to null if image is not provided
    //     }

    //     // Create a new menu item
    //     $menu = new Menu();
    //     $menu->name = $validatedData['name'];
    //     $menu->description = $validatedData['description'];
    //     $menu->price = $validatedData['price'];
    //     $menu->image = $imagePath;
    //     $menu->category = $validatedData['category'];
    //     $menu->availability = $validatedData['availability'];
    //     $menu->customization = $validatedData['customization'] ?? [];
    //     $menu->save();

    //     // Return success response
    //     return response()->json(['message' => 'Menu item added successfully'], 200);
    // }

    public function add(): Response
    {
    

        return Inertia::render('Vendor/Menu', [
        ]);
    }

    public function show($id)
    {
       // Product Detail
       $product = Menu::find($id);
       if(!$product){
         return response()->json([
            'message'=>'Product Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'menu' => $product
       ],200);
    }

    public function store(Request $request)
    {
        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

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


    // public function store(Request $request): Response
    // {
    //     // Validate the request data including file upload
    //     $validatedData = $request->validate([
    //         'name' => 'required|string',
    //         'description' => 'required|string',
    //         'price' => 'required|numeric',
    //         'image' => 'nullable|image|mimes:png,jpg,jpeg,gif|max:2048', // Adjust validation rules as needed
    //         'category' => 'required|string',
    //         'availability' => 'required|string',
    //         'customization' => 'nullable|array',
    //     ]);

    //     // Check if file is uploaded
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');

    //         // Validate the uploaded image
    //         if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['png', 'jpg', 'jpeg', 'gif'])) {
    //             return response()->json(['errors' => ['image' => ['The image must be a valid PNG, JPEG, JPG, or GIF file.']]], 422);
    //         }

    //         // Store the image
    //         $imagePath = $image->store('images'); // Change the storage path as per your configuration
    //     } else {
    //         $imagePath = null; // Set image path to null if image is not provided
    //     }

    //     // Create a new menu item
    //     $menu = new Menu();
    //     $menu->name = $validatedData['name'];
    //     $menu->description = $validatedData['description'];
    //     $menu->price = $validatedData['price'];
    //     // $menu->image = $imagePath; // Assign the image path
    //     $menu->category = $validatedData['category'];
    //     $menu->availability = $validatedData['availability'];
    //     $menu->customization = $validatedData['customization'] ?? [];
    //     $menu->save();

    //     // Return success response
    //     // return response()->json(['message' => 'Menu item added successfully'], 200);
    //     return Inertia::render('/vendor/menu', $menu);
    // }

    public function update(Request $request, $id)
    {
        try {
            // Find product
            $menu = Menu::find($id);
            if(!$menu){
              return response()->json([
                'message'=>'Product Not Found.'
              ],404);
            }

            //echo "request : $request->image";
            $menu->name = $request->name;
            $menu->description = $request->description;

            if($request->image) {

                // Public storage
                $storage = Storage::disk('public');

                // Old iamge delete
                if($storage->exists($menu->image))
                    $storage->delete($menu->image);

                // Image name
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $menu->image = $imageName;

                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            // Update menu
            $menu->save();

            // Return Json Response
            return response()->json([
                'message' => "menu successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }


    // public function index(): Response
    // {
    //     $menu = Menu::all();

    //     return Inertia::render('Vendor/Menu', [
    //         'menu' => $menu,
    //     ]);
    // }


    public function toggleAvailability($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->availability = $menu->availability === 'available' ? 'unavailable' : 'available';
        $menu->save();

        return response()->json(['message' => 'Availability toggled successfully']);
    }


    public function destroy($id)
    {
        // Detail
        $product = Menu::find($id);
        if(!$product){
          return response()->json([
             'message'=>'Product Not Found.'
          ],404);
        }

        // Public storage
        $storage = Storage::disk('public');

        // Iamge delete
        if($storage->exists($product->image))
            $storage->delete($product->image);

        // Delete Product
        $product->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted."
        ],200);
    }


}
