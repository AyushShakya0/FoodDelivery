import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';


const columns=[
    'User',
    'Courier',
    'Order',
    'Order',
    'Price',
    'Number',
    'Address',
    'Customization',
    'status',
];

export default function All({ auth, orders, checkout, user, courier}) {
    console.log("order",orders)
    console.log("checkout",checkout)
    console.log("user",user)
    console.log("courier",courier)

    // const filteredUser = user.filter(userItem => userItem.id === checkout);




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
                            <Table checkout={checkout} orders={orders} columns={columns} primary="Order Number" action="orders.edit"></Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
