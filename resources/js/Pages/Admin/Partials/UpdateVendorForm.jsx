import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";
import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react'; // Import usePage hook

export default function UpdateVendorForm({ vendor, className = '' }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({

        email: vendor.email || '',
        name: vendor.name || '',
        number: vendor.number || '',
        address: vendor.address || '',
        city: vendor.city || '',
        start_time: vendor.start_time || '',
        end_time: vendor.end_time || '',
        image: vendor.image || '',
        longitude: vendor.longitude || '',
        latitude: vendor.latitude || '',
    });


    const submit = (e) => {
        e.preventDefault();

        patch(route('vendor.update', vendor.id), {
            email: vendor.email || '',
            name: vendor.name || '',
            number: vendor.number || '',
            address: vendor.address || '',
            city: vendor.city || '',
            start_time: vendor.start_time || '',
            end_time: vendor.end_time || '',
            image: vendor.image || '',
            longitude: vendor.longitude || '',
            latitude: vendor.latitude || '',
            preserveScroll: true,
            data: data
        });
    };

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
                    <InputLabel htmlFor="longitude" value="longitude" />
                    <TextInput
                        id="longitude"
                        className="mt-1 block w-full"
                        value={data.longitude}
                        // onChange={(e) => setData({ ...data, longitude: e.target.value })}
                        onChange={(e) => setData('longitude', e.target.value)}

                    />
                    {errors && errors.longitude && <InputError message={errors.longitude[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="latitude" value="latitude" />
                    <TextInput
                        id="latitude"
                        className="mt-1 block w-full"
                        value={data.latitude}
                        // onChange={(e) => setData({ ...data, latitude: e.target.value })}
                        onChange={(e) => setData('latitude', e.target.value)}

                    />
                    {errors && errors.latitude && <InputError message={errors.latitude[0]} />}
                </div>

                {/* <TextInput
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    value={data.longitude}
                    autoComplete="longitude"
                    onChange={(e) =>
                        setData("longitude", e.target.value)
                    }
                />

                <InputError
                    message={errors.longitude}
                    className="mt-2"
                /> */}



                {/* Time */}
                <div>
                    <InputLabel htmlFor="start_time" value="start_time" />
                    <TextInput
                        type="time"
                        value={data.start_time}
                        onChange={(e) => setData("start_time", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.start_time} />
                </div>

                <div>
                    <InputLabel htmlFor="end_time" value="end_time" />
                    <TextInput
                        type="time"
                        value={data.end_time}
                        onChange={(e) => setData("end_time", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.end_time} />
                </div>

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
