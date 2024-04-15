import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { InertiaApp } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';


export default function Table_Courier_verify({ couriers, primary, action }) {
    console.log("couriers from table couriers:", couriers);

    const [verifiedCourierId, setVerifiedCourierId] = useState(null);


    const verifyCourier = (id) => {
        Inertia.post(route('courier.verify', { id }), {
            verified: 'yes',
        }).then(() => {
            setVerifiedCourierId(id);
        }).catch((error) => {
            console.error('Error verifying courier:', error);
            // Handle error, show error message to user, etc.
        });
    };

    const deleteCourier = (id) => {
        if (confirm('Are you sure you want to delete this vendor?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('courier.delete', { id: id }), {
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error deleting courier:', error);
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
                    {couriers.map((courier) => (
                        <tr key={courier.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                #{courier.id}
                            </td>
                            {/* <td className="px-6 py-4">{vendor.id}</td> */}
                            <td className="px-6 py-4">{courier.name}</td>
                            <td className="px-6 py-4">{courier.email}</td>
                            <td className="px-6 py-4">{courier.phone_number}</td>
                            <td className="px-6 py-4">{courier.city}</td>
                            <td className="px-6 py-4">{courier.address}</td>
                            <td className="px-6 py-4">

                            <button
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2"
                                    onClick={() => verifyCourier(courier.id)}
                                >
                                    <DoneIcon/>
                                </button>


                                <button
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2"
                                    onClick={() => deleteCourier(courier.id)}
                                >
                                    <DangerousIcon/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
