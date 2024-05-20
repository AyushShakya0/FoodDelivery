import React, { useState } from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { InertiaApp } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';
import PrimaryButton from './PrimaryButton';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Table_Vendor_verify({ vendors, primary, action }) {
    console.log("Vendors from table vendor:", vendors);

    const [verifiedVendorId, setVerifiedVendorId] = useState(null);

    // const verifyVendor = (id) => {
    //     Inertia.post(route('vendor.verify', { id }), {
    //         verified: 'yes',
    //     }).then(() => {
    //         setVerifiedVendorId(id);
    //     }).catch((error) => {
    //         console.error('Error verifying vendor:', error);
    //         // Handle error, show error message to user, etc.
    //     });
    // };

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        verified: 'yes',
    });

    const submit = (e, vendorId) => {
        e.preventDefault();

        // Patch the checkout with the given ID
        patch(route('vendor.verify', vendorId), {
            verified: 'yes',
            preserveScroll: true
        });
    };

    const deleteVendor = (id) => {
        if (confirm('Are you sure you want to delete this vendor?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('vendor.delete', { id: id }), {
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error deleting vendor:', error);
                    // Handle error, show error message to user, etc.
                }
            });
        }
    };


    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{primary}</th>
                        {/* <th scope="col" className="px-6 py-3">ID</th> */}
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone Number</th>
                        <th scope="col" className="px-6 py-3">City</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                #{vendor.id}
                            </td>
                            {/* <td className="px-6 py-4">{vendor.id}</td> */}
                            <td className="px-6 py-4">{vendor.name}</td>
                            <td className="px-6 py-4">{vendor.email}</td>
                            <td className="px-6 py-4">{vendor.phone_number}</td>
                            <td className="px-6 py-4">{vendor.city}</td>
                            <td className="px-6 py-4">{vendor.address}</td>
                            <td className="px-6 py-4">

                                <div className="button-container" style={{ display: "flex", alignItems: "center" }}>
                                    <form onSubmit={(e) => submit(e, vendor.id)} className="">
                                        {/* Button for submitting */}
                                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">
                                            <PrimaryButton disabled={processing}>
                                                <DoneIcon />
                                            </PrimaryButton>
                                        </div>
                                    </form>

                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2"
                                        onClick={() => deleteVendor(vendor.id)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
