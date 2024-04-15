import TableOrder_Admin from '@/Components/TableOrder_Admin';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';


const columns=[
    'items',
    // 'customer',
    'status',
];

export default function All({ auth, orders, checkout, user , courier, vendor}) {

    const delivered = checkout.filter(checkout => checkout.status === 'Destination reached');

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order History</h2>}
        >
            <Head title="Order History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TableOrder_Admin orders={orders} columns={columns} checkout={delivered} user={user} courier={courier} vendor={vendor} primary="Order Number" action="admin.orders.edit"></TableOrder_Admin>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
