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

import Map from '@/Components/Map';


export default function UpdateOrderForm({ auth, order, checkout, user, vendor, courier, className = '' }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        status: checkout.status,
    });

    const statusOptions = [
        'Ordered',
        'Prepping',
        'Ready',
        'Delivering',
        'Reached'
    ];

    // console.log(user)
    // console.log(vendor)

    const shipping = vendor.length * 60;
    const total_price = checkout.total_price;
    const subtotal = total_price - shipping;

    // Grouping orders by vendor
    const groupedOrders = order.reduce((acc, curr) => {
        const vendorName = vendor.find(v => v.id === curr.vendor_id)?.name || `Vendor-${curr.vendor_id}`;
        acc[vendorName] = acc[vendorName] || [];
        acc[vendorName].push(curr);
        return acc;
    }, {});

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
            </header>

            <Map user={user} vendor={vendor} courier={courier} />



            {Object.entries(groupedOrders).map(([vendorName, orders]) => (
                <div key={vendorName}>
                    <p className="font-semibold">{vendorName}</p>
                    {orders.map((order) => (
                        <div key={order.id}>
                            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                <div className="shrink-0">
                                    <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${order.image}`} alt="food img" />
                                </div>

                                <div className="relative flex flex-1 flex-col justify-between">
                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                        <div className="pr-8 sm:pr-5">
                                            <p className="text-base font-semibold text-gray-900">{order.name}</p>
                                        </div>

                                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"> Qty- {order.quantity}</p>
                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${order.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </div>
            ))}


            {/* Customization Section */}
            {checkout.customization && (  // Checking if checkout.customization is not null or undefined
                <div className="bg-gray-100 p-4 rounded-md">
                    <div className="mb-4">
                        <p className="font-semibold">Customization:</p>
                        <p>{checkout.customization}</p>
                    </div>
                </div>
            )}



            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <div className="mb-4">
                    <p className="font-semibold mb-2">Billing Details:</p>
                    <p>Subtotal: Rs. {subtotal}</p>
                    <p>Shipping: Rs. {shipping}</p>
                    <p>Total: Rs. {total_price}</p>
                    <p>Payment Method: {checkout.payment}</p>
                </div>
            </div>

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
                    {courier ? (
                        <div>
                            <p className="font-semibold">Courier</p>
                            <p className="font-semibold">Name:</p>
                            <p>{courier.name}</p>
                            <p className="font-semibold">Phone Number:</p>
                            <p>{courier.number}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="font-semibold">Courier: Pending</p>
                            <p className="font-semibold">Name: </p>
                            <p className="font-semibold">Phone Number: </p>
                        </div>
                    )}
                </div>

                {/* Vendor Section */}
                <div className="w-full md:w-1/2 mb-4 md:pl-2">
                    {Array.from(new Set(order.map(order => order.vendor_id))).map(vendorId => {
                        const vendorInfo = vendor.find(v => v.id === vendorId);
                        return (
                            <div key={vendorId} className='mb-2'>
                                <p className="font-semibold  text-2xl">{vendorInfo?.name || `Vendor-${vendorId}`} </p>
                                <p className="font-semibold">Phone Number: </p>
                                <p className="">{vendorInfo?.number || 'N/A'} </p>
                                <p className="font-semibold">Address:</p>
                                <p className="">{vendorInfo?.address || 'N/A'}, {vendorInfo?.city || 'N/A'}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Checkout Status */}
                <div className="w-full mb-4">
                    <p className='font-bold text-2xl text-green-600'>
                        {checkout.status}
                    </p>
                </div>
            </div>

        </section>
    );
}
