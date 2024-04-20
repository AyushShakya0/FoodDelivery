import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function UpdateMenuForm({ auth, menu }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: menu.name,
        description: menu.description,
        price: menu.price,
        image: menu.image,
        category: menu.category, // Default category option
        availability: menu.availability,
        customization: [""],
        // vendor_id: vendor.id // Set the vendor ID as default value
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('menu.update', menu.id), {
            name: menu.name || '',
            description: menu.description || '',
            price: menu.price || '',
            category: menu.category || '',
            availability: menu.availability || '',
            image: menu.image || '',
            preserveScroll: true,
            data: data
        });
        reset(); // Reset form after successful submission
    };

    function handleCustomizationChange(index, value) {
        const newCustomization = [...data.customization];
        newCustomization[index] = value;
        setData("customization", newCustomization);
    }

    function handleAddCustomization() {
        setData("customization", [...data.customization, ""]);
    }

    return (


            <div className="max-w-md mx-auto">
                <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <TextInput
                            id="description"
                            name="description"
                            value={data.description}
                            autoComplete="description"
                            onChange={(e) => setData("description", e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            value={data.price}
                            autoComplete="price"
                            onChange={(e) => setData("price", e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700">Image</label>
                        <TextInput
                            id="image"
                            name="image"
                            type="file"
                            autoComplete="image"
                            onChange={(e) => setData("image", e.target.files[0])}
                            // required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                            required
                            className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="appetizers">Appetizers</option>
                            <option value="main_course">Main Course</option>
                            <option value="desserts">Desserts</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="availability" className="text-sm font-medium text-gray-700">Availability</label>
                        <select
                            id="availability"
                            name="availability"
                            value={data.availability}
                            onChange={(e) => setData("availability", e.target.value)}
                            required
                            className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>

                    {data.customization.map((customization, index) => (
                        <div key={index} className="flex flex-col">
                            <label htmlFor={`customization${index}`} className="text-sm font-medium text-gray-700">Customization {index + 1}</label>
                            <TextInput
                                id={`customization${index}`}
                                name={`customization${index}`}
                                value={customization}
                                onChange={(e) => handleCustomizationChange(index, e.target.value)}
                            />
                        </div>
                    ))}

                    <button type="button" onClick={handleAddCustomization} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Customization</button>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    </div>
                </form>
            </div>
    );
}
