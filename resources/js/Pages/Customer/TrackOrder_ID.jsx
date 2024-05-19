import { Chip } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import Map from '@/Components/Map';




export default function TrackOrder_ID({ order, checkout, courier, vendor, auth, order_cart, fav, className = '' }) {

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: auth.user ? auth.user.name : 'Anonymous',
    });

    const confirmCancel = (id) => {
        if (confirm('Are you sure you want to cancel the delivery?')) {
            Inertia.delete(route('user.cancel_delivery', { id: id }), {
                onSuccess: () => {
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error cancelling the delivery:', error);
                }
            });
        }
    };

    console.log(checkout)

    const shipping = vendor.length * 60;
    const total_price = checkout.total_price;
    const subtotal = total_price - shipping;

    const [isAnonymous, setIsAnonymous] = useState(false);
    const handleAnonymousToggle = () => {
        setIsAnonymous(!isAnonymous);
        setData('name', isAnonymous ? (auth.user ? auth.user.name : 'Anonymous') : 'Anonymous');
    };

    const review_submit = (e) => {
        e.preventDefault();
        post(route("addreview.courier", { id: courier.id }), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission
    };

    const removeReview = (id) => {
        if (confirm('Are you sure you want to remove this review?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('review.delete', { id: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error removing review:', error);
                    // Handle error, show error message to user, etc.
                }
            });

        }
    };

    return (
        <AuthenticatedLayout user={auth.user} order={order_cart} fav={fav}>
            <section className="w-full h-full bg-white shadow-md rounded-md p-8 overflow-hidden m-4">
                <header className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Order Information</h2>



                    {/* Map for 2 or more vendors still left to do */}
                    <Map user={auth.user} vendor={vendor}  />




                    <div className="flex justify-end mt-8">
                        <Chip label={checkout.status} color="success" size="large" />
                    </div>
                </header>

                <div className="overflow-hidden" style={{ maxHeight: 'calc(90vh - 4rem)', marginTop: '2rem', marginBottom: '2rem' }}>
                    <div className="grid grid-cols-5 gap-6">
                        {/* Order Information */}
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
                                            <p className="text-gray-400 text-sm">Rs. {orders.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {/* Billing Details */}
                        <div className="bg-gray-100 p-4 rounded-md pb-6">
                            <p className="font-semibold mb-2">Billing Details:</p>
                            <p>Subtotal: Rs. {subtotal}</p>
                            <p>Shipping: Rs. {shipping}</p>
                            <p>Total: Rs. {total_price}</p>
                            <p>Payment Method: {checkout.payment}</p>

                        </div>

                        {/* Customization Section */}
                        {checkout.customization && (
                            <div className="bg-gray-100 p-4 rounded-md md:col-span-2">
                                <p className="font-semibold mb-2">Customization:</p>
                                <p>{checkout.customization}</p>
                            </div>
                        )}
                    </div>

                    {/* Auth and Courier Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Vendor Info */}
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

                        {/* Courier Info */}
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

                    {/* Cancel Delivery Button */}
                    {checkout.status !== 'Destination reached' && (
                        <div className="flex items-center gap-4 mt-6 space-y-6">
                            <PrimaryButton onClick={() => confirmCancel(checkout.id)}>Cancel delivery</PrimaryButton>
                        </div>
                    )}
                </div>
            </section>

        </AuthenticatedLayout>
    );
}
