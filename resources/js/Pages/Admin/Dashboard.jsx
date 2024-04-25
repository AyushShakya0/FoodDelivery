import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import TableOrder_Admin from '@/Components/TableOrder_Admin';

const columns = [
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

export default function Dashboard({ auth, checkout, vendor, courier, order_ongoing, pending_vendor, pending_courier, orders, vendors, users, couriers, checkouts }) {

    const orderCount = checkout.length;
    const vendorCount = vendor.length;
    const courierCount = courier.length;
    const orderongoingCount = order_ongoing.length;
    const pending_vendorCount = pending_vendor.length;
    const pending_courierCount = pending_courier.length;

    console.log('pending courier',pending_courier)
    console.log('pending_vendor',pending_vendor)

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='m-10 mb-1 ml-16 flex flex-wrap justify-start gap-4 '>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{orderongoingCount}</p>
                            <p className="text-sm text-gray-600 text-center">Ongoing Orders</p>
                        </div>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{orderCount}</p>
                            <p className="text-sm text-gray-600 text-center">Total Orders</p>
                        </div>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{pending_vendorCount}</p>
                            <p className="text-sm text-gray-600 text-center">Pending Vendors</p>
                        </div>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{vendorCount}</p>
                            <p className="text-sm text-gray-600 text-center">Total Vendors</p>
                        </div>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{pending_courierCount}</p>
                            <p className="text-sm text-gray-600 text-center">Pending Couriers</p>
                        </div>

                        <div className=" rounded p-4  mr-4 w-32 border border-gray-300 bg-gray-100">
                            <p className="text-3xl font-bold text-center">{courierCount}</p>
                            <p className="text-sm text-gray-600 text-center">Total Couriers</p>
                        </div>

                    </div>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <TableOrder_Admin orders={orders} columns={columns} checkout={checkouts} user={users} courier={couriers} vendor={vendors} primary="Order Number" action="admin.orders.edit"></TableOrder_Admin>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
