import TableOrder_Courier from '@/Components/TableOrder_Courier';
import AuthenticatedLayout_Courier from '@/Layouts/AuthenticatedLayout_Courier';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';



const columns = [
    'items',
    // 'customer',
    'status',
];

export default function All({ auth, orders, checkout, user, vendor, occupied }) {
    console.log('checkout check', checkout)

    return (
        <AuthenticatedLayout_Courier
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {auth.user.verified === 'yes' ? (
                                <TableOrder_Courier
                                    auth={auth}
                                    orders={orders}
                                    columns={columns}
                                    checkout={checkout.data}
                                    user={user}
                                    vendor={vendor}
                                    occupied={occupied}
                                    primary="Order Number"
                                    action="courier.orders.edit"
                                />

                            ) : (
                                <p className="text-red-600">You are not verified.</p>
                            )}
                            <Pagination
                                meta={checkout}
                                pageSize={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Courier>
    );
}
