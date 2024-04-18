import { Chip } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TrackOrder_ID({ order, checkout, courier, vendor, auth, fav, className = '' }) {

    console.log('ven', vendor)
    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200"> {/* Fixed container covering entire viewport */}
                <section className="w-full h-90vh bg-white shadow-md rounded-md p-8 overflow-auto mt-20 mb-4 ml-4 mr-4"> {/* Adjusted width and height */}
                    <header className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Order Information</h2>
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
                            <p className="font-semibold mb-2">Vendor</p>
                            {vendor.map((vendor, ) => (
                                <div>
                                    <p className="mb-1"><span className="font-semibold">Name:</span> {vendor.name}</p>
                                    <p className="mb-1"><span className="font-semibold">Phone number:</span> {vendor.number}</p>
                                    <p><span className="font-semibold">Address:</span> {vendor.address}, {vendor.city}</p>
                                </div>
                            ))}

                        </div>

                        <div className="bg-gray-100 p-4 rounded-md">
                            <p className="font-semibold mb-2">Courier</p>
                            {courier ? (
                                <>
                                    <p className="mb-1"><span className="font-semibold">Name:</span> {courier.name}</p>
                                    <p><span className="font-semibold">Phone Number:</span> {courier.number}</p>
                                </>
                            ) : (
                                <p className="font-semibold">Courier: Pending</p>
                            )}
                        </div>
                    </div>

                    {/* Checkout Status */}
                    <div className="flex justify-end mt-8">
                        <Chip label={checkout.status} color="success" size="large" />
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
