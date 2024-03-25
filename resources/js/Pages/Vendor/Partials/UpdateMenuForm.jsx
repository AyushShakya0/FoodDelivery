import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';


const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: '',
    itemCode: '',
    description: '',
    price: '',
    category: '',
    images: [],
    availability: '',
    customization: ''
});




const submit = (formData) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Logic to handle form submission
    fetch(route('menu.insert'), {
        method: 'POST', // Sending a POST request to insert data
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(formData), // Convert the formData object to JSON string
    })
        .then(response => {
            if (response.ok) {
                // Handle successful submission
                console.log('Data inserted successfully');
                // Optionally, clear the form fields after successful submission
                setData({
                    name: '',
                    itemCode: '',
                    description: '',
                    price: '',
                    category: '',
                    images: [],
                    availability: '',
                    customization: ''
                });
            } else {
                // Handle error response
                console.error('Failed to insert data');
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.error('Error:', error);
        });
};


const statusOptions = [
    'Available',
    'Unavailable'
];



export default function Dashboard_Vendor({ auth, orders }) {
    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu</h2>}
        >
            <Head title="Vendor" />


            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>

                    {/* Add other input fields for itemCode, description, price, category, images, availability, customization */}

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <SelectInput
                            id="status"
                            className="mt-1 block w-full"
                            options={statusOptions}
                            value={data.availability} // Change to data.availability or data.status as per your data structure
                            onChange={(e) => setData({ ...data, availability: e.target.value })} // Change to data.availability or data.status as per your data structure
                        />
                        <InputError className="mt-2" message={errors.availability} /> {/* Change to errors.availability or errors.status as per your data structure */}
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>

            </div>












        </AuthenticatedLayout_Vendor>
    );
}
