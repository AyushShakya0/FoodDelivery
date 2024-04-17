import TableOrder_Courier_History from '@/Components/TableOrder_Courier_History';
import AuthenticatedLayout_Courier from '@/Layouts/AuthenticatedLayout_Courier';
import { Head } from '@inertiajs/react';


const columns=[
    'items',
    // 'customer',
    'status',
];

export default function All({ auth, orders, checkout, user, vendor}) {

    return (
        <AuthenticatedLayout_Courier
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My delivery order history</h2>}
        >
            <Head title="My delivery order history" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TableOrder_Courier_History orders={orders} columns={columns} checkout={checkout} user={user} vendor={vendor} primary="Order Number" action="courier.orders.edit"></TableOrder_Courier_History>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Courier>
    );
}
