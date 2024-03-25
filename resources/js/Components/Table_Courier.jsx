import React from 'react';

export default function Table_Vendor({ couriers = [], primary, action }) {


    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Editing couriers with ID ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete functionality
        console.log(`Deleting couriers with ID ${id}`);
    };

    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{primary}</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {couriers.map((courier) => (
                        <tr key={courier.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                #{courier.id}
                            </th>
                            <td className="px-6 py-4">{courier.name}</td>
                            <td className="px-6 py-4">{courier.email}</td>
                            <td className="px-6 py-4">
                                <td className="px-6 py-4">
                                    <a href={route(action, couriers.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={route(action, couriers.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
