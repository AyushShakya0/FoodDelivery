import { Chip } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';


export default function TrackOrder_ID({ order, checkout, courier, vendor, auth, order_cart, fav, className = '' }) {
    // const [showConfirmation, setShowConfirmation] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        status: checkout.status,
    });

    const confirmCancel = (id) => {
        if (confirm('Are you sure you want to cancel the delivery?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('user.cancel_delivery', { id: id }), {
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error cancelling the delivery:', error);
                    // Handle error, show error message to user, etc.
                }
            });
        }
    };


    return (
        <AuthenticatedLayout user={auth.user} order={order_cart} fav={fav}>
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200"> {/* Fixed container covering entire viewport */}
                <section className="w-full h-90vh bg-white shadow-md rounded-md p-8 overflow-auto mt-20 mb-4 ml-4 mr-4"> {/* Adjusted width and height */}
                    <header className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Order Information</h2>

                        {/* Checkout Status */}
                        <div className="flex justify-end mt-8">
                            <Chip label={checkout.status} color="success" size="large" />
                        </div>
                    </header>

                    {/* Order Information */}
                    <div className="grid grid-cols-5 gap-6">
                        {order.map((orders, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <div className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover rounded-lg"
                                                src={`http://127.0.0.1:8000/storage/${orders.image}`}
                                                alt="food img"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900">{orders.name}</p>
                                            <p className="text-gray-400 text-sm">Qty: {orders.quantity}</p>
                                            <p className="text-gray-400 text-sm">${orders.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Customization Section */}
                    {checkout.customization && (
                        <div className="bg-gray-100 p-4 mt-8 rounded-md">
                            <p className="font-semibold mb-2">Customization:</p>
                            <p>{checkout.customization}</p>
                        </div>
                    )}

                    {/* Auth and Courier Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-gray-100 p-4 rounded-md">
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

                        <div className="bg-gray-100 p-4 rounded-md">
                            <p className="font-semibold mb-2">Courier</p>
                            {courier ? (
                                <>
                                    <p className="mb-1"><span className="font-semibold">Name:</span> {courier.name}</p>
                                    <p><span className="font-semibold">Phone Number:</span> {courier.number}</p>
                                </>
                            ) : (
                                <p className="font-semibold">Pending</p>
                            )}
                        </div>
                    </div>

                    {checkout.status !== 'Destination reached' && (
                        <div className="flex items-center gap-4 mt-6 space-y-6">
                            <PrimaryButton onClick={() => confirmCancel(checkout.id)}>Cancel delivery</PrimaryButton>
                        </div>

                    )}

                </section>
            </div>
        </AuthenticatedLayout>
    );
}
