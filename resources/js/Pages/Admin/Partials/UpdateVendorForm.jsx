import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";
import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react'; // Import usePage hook

export default function UpdateVendorForm({ vendor, className = '' }) {
    // const [data, setData] = useState({
    //     email: vendor.email || '',
    //     name: vendor.name || '',
    //     number: vendor.number || '',
    //     address: vendor.address || '',
    //     city: vendor.city || '',
    //     cuisine: vendor.cuisine || '',
    // });

    // const [errors, setErrors] = useState(null);
    // const [processing, setProcessing] = useState(false);
    // const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // const { patch } = usePage().props; // Access the patch function from page props

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({

        email: vendor.email || '',
        name: vendor.name || '',
        number: vendor.number || '',
        address: vendor.address || '',
        city: vendor.city || '',
        cuisine: vendor.cuisine || '',
        image: vendor.image || '',
    });


    const submit = (e) => {
        e.preventDefault();

        patch(route('vendor.update', vendor.id), {
            preserveScroll: true,
        });
    };


    // const submit = (e) => {
    //     e.preventDefault();
    //     setProcessing(true);

    //     patch(route('vendor.update', vendor.id), { data }) // Use patch function to send a PATCH request
    //         .then(() => {
    //             setProcessing(false);
    //             setRecentlySuccessful(true);
    //         })
    //         .catch(error => {
    //             setProcessing(false);
    //             setErrors(error.response.data.errors);
    //         });
    // };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Restaurants Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your Restaurant's profile information.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        // onChange={(e) => setData({ ...data, name: e.target.value })}
                        onChange={(e) => setData('name', e.target.value)}

                    />
                    {errors && errors.name && <InputError message={errors.name[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        // onChange={(e) => setData({ ...data, email: e.target.value })}
                        onChange={(e) => setData('email', e.target.value)}

                    />
                    {errors && errors.email && <InputError message={errors.email[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="number" value="Phone number" />
                    <TextInput
                        id="number"
                        className="mt-1 block w-full"
                        value={data.number}
                        // onChange={(e) => setData({ ...data, number: e.target.value })}
                        onChange={(e) => setData('number', e.target.value)}

                    />
                    {errors && errors.number && <InputError message={errors.number[0]} />}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="text-sm font-medium text-gray-700">Image</label>
                    <TextInput
                        id="image"
                        name="image"
                        type="file"
                        autoComplete="image"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        // onChange={(e) => setData({ ...data, address: e.target.value })}
                        onChange={(e) => setData('address', e.target.value)}

                    />
                    {errors && errors.address && <InputError message={errors.address[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />
                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        // onChange={(e) => setData({ ...data, city: e.target.value })}
                        onChange={(e) => setData('city', e.target.value)}

                    />
                    {errors && errors.city && <InputError message={errors.city[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="cuisine" value="Cuisine Type" />
                    <TextInput
                        id="cuisine"
                        className="mt-1 block w-full"
                        value={data.cuisine}
                        // onChange={(e) => setData({ ...data, cuisine: e.target.value })}
                        onChange={(e) => setData('cuisine', e.target.value)}

                    />
                    {errors && errors.cuisine && <InputError message={errors.cuisine[0]} />}
                </div>

                {/* Other input fields omitted for brevity */}

                <PrimaryButton type="submit" disabled={processing}>Update</PrimaryButton>

                {recentlySuccessful && (
                    <Transition
                        show={recentlySuccessful}
                        enter="transition duration-1000"
                        enterFrom="transform opacity-0"
                        enterTo="transform opacity-100"
                        leave="transition duration-1000"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0"
                    >
                        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> Vendor information updated successfully.</span>
                        </div>
                    </Transition>
                )}
            </form>
        </section>
    );
}
