import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';



const columns=[
    'User',
    'Courier',
    'Order',
    'Price',
    'Number',
    'Address',
    'Customization',
    'status',
];

export default function Order({ auth, orders, checkout, user, courier}) {

    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Table auth={auth} checkout={checkout.data} orders={orders} user={user} courier={courier}  columns={columns} primary="Order Number" action="orders.edit"></Table>
                            <Pagination
                                meta={checkout}
                                pageSize={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
