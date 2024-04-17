import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, IconButton } from '@mui/material';

export default function UpdateOrderForm({ order, checkout, user, vendor, className = '' }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        status: checkout.status,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('courier.order_status.update', checkout.id), {
            status: data.status, // Include the updated status in the patch request
            preserveScroll: true
        });
    };

    const cancel = (e) => {
        e.preventDefault();
        setShowConfirmation(true); // Show confirmation dialog
    };

    const confirmCancel = () => {
        // Handle cancellation confirmation
        // For example, you can perform the cancellation action here
        patch(route('courier.cancel_delivery', checkout.id), {
            preserveScroll: true
        });
        setShowConfirmation(false); // Hide confirmation dialog after action
    };

    const cancelCancellation = () => {
        setShowConfirmation(false); // Hide confirmation dialog
    };

    const statusOptions = [
        'Ordered',
        'Delivering',
        'Destination reached'
    ];

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
            </header>

            {order.map((orders) => (
                <div key={orders.id}>
                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0">
                            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${orders.image}`} alt="food img" />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div className="pr-8 sm:pr-5">
                                    <p className="text-base font-semibold text-gray-900">{orders.name}</p>
                                </div>

                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"> Qty- {orders.quantity}</p>
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${orders.price}</p>
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                        {vendor.find(vendor => vendor.id === orders.vendor_id) ? vendor.find(vendor => vendor.id === orders.vendor_id).name : `Vendor-${orders.vendor_id}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            ))}

            {/* Customization Section */}
            {checkout.customization && (
                <div className="bg-gray-100 p-4 rounded-md">
                    <div className="mb-4">
                        <p className="font-semibold">Customization:</p>
                        <p>{checkout.customization}</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-100 p-4 mt-4 rounded-md flex flex-wrap">
                {/* User Section */}
                <div className="w-full md:w-1/2 mb-4 md:pr-2">
                    <div>
                        <p className="font-semibold">User</p>
                        <p className="font-semibold">Name:</p>
                        <p>{user.name}</p>
                        <p className="font-semibold">Phone number:</p>
                        <p>{user.number}</p>
                        <p className="font-semibold">Address:</p>
                        <p>{user.address}, {user.city}, {user.pincode}</p>
                    </div>
                </div>

                {/* Courier Section */}
                <div className="w-full md:w-1/2 mb-4 md:pl-2">
                    {Array.from(new Set(order.map(order => order.vendor_id))).map(vendorId => {
                        const vendorInfo = vendor.find(v => v.id === vendorId);
                        return (
                            <div key={vendorId} className='mb-2'>
                                <p className="font-semibold">Vendor</p>
                                <p className="font-semibold">Name: </p>
                                <p className="">{vendorInfo?.name || `Vendor-${vendorId}`} </p>
                                <p className="font-semibold">Phone Number: </p>
                                <p className="">{vendorInfo?.phone || 'N/A'} </p>
                                <p className="font-semibold">Address:</p>
                                <p className="">{vendorInfo?.address || 'N/A'}, {vendorInfo?.city || 'N/A'}</p>
                            </div>
                        );
                    })}
                </div>


                <div>
                    <p className='font-bold text-2xl text-green-600'>
                        {checkout.status}
                    </p>
                </div>
            </div>

            {/* Update Order Form */}
            {checkout.status !== 'Destination reached' && (
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <SelectInput
                            id="status"
                            className="mt-1 block w-full"
                            options={statusOptions}
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.status} />
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
            )}

            {checkout.status !== 'Destination reached' && (
                <form onSubmit={cancel} className="mt-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Cancel delivery</PrimaryButton>
                    </div>
                </form>
            )}

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p>Are you sure you want to cancel the delivery?</p>
                        <div className="flex justify-end mt-4">
                            <PrimaryButton onClick={confirmCancel}>Yes</PrimaryButton>
                            <PrimaryButton onClick={cancelCancellation} className="ml-4">No</PrimaryButton>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
