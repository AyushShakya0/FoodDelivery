import TableOrder_Courier from '@/Components/TableOrder_Courier';
import AuthenticatedLayout_Courier from '@/Layouts/AuthenticatedLayout_Courier';
import { Head } from '@inertiajs/react';

const columns = [
    'items',
    // 'customer',
    'status',
];


export default function Dashboard({ auth, orders, checkout, user, vendor, occupied, checkout_total, pending_delivery, current_delivery }) {

    console.log(orders)
    console.log(checkout)
    console.log(user)
    console.log(vendor)
    console.log(orders)

    const delivery_count = checkout_total.length
    const pending_delivery_count = pending_delivery.length
    const current_delivery_count = current_delivery.length


    return (
        <AuthenticatedLayout_Courier
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courier Dashboard</h2>}
        >
            <Head title="Courier Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className='m-10 mb-1 ml-16 flex flex-wrap justify-start gap-4'>
                            <div className="bg-white rounded p-4  mr-4 w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{current_delivery_count}</p>
                                <p className="text-sm text-gray-600 text-center">Current Delivery</p>
                            </div>

                            <div className="bg-white rounded p-4  mr-4 w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{delivery_count}</p>
                                <p className="text-sm text-gray-600 text-center">Total Delivery Completed</p>
                            </div>

                            <div className="bg-white rounded p-4  mr-4 w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{pending_delivery_count}</p>
                                <p className="text-sm text-gray-600 text-center">Pending Deliveries</p>
                            </div>

                        </div>


                        <div className="p-6 text-gray-900">
                            {auth.user.verified === 'yes' ? (
                                <TableOrder_Courier
                                    auth={auth}
                                    orders={orders}
                                    columns={columns}
                                    checkout={checkout}
                                    user={user}
                                    vendor={vendor}
                                    occupied={occupied}
                                    primary="Order Number"
                                    action="courier.orders.edit"
                                />
                            ) : (
                                <p className="text-red-600">You are not verified.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Courier>
    );
}
