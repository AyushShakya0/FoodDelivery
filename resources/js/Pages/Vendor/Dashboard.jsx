import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head, useForm } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Table from '@/Components/Table';


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

export default function Dashboard({ auth, checkout, menu, checkout_c, menu_c, orders, checkouts, users, couriers }) {
    const user = usePage().props.auth.user;
    const [status, setStatus] = useState(auth.user.status);

    const { data, setData, patch } = useForm({
        status: auth.user.status // Set initial status from props
    });

    console.log(auth.user.status)

    useEffect(() => {
        setStatus(auth.user.status);
    }, [auth.user.status]);

    const handleClick = () => {
        patch(route('vendor.status', auth.user.id), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission

    };

    const orderCount = checkout.length;
    const menuCount = menu.length;
    const checkout_count = checkout_c.length;
    const menu_count = menu_c.length;

    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor Dashboard</h2>}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-end mb-8 m-10'>
                            <button onClick={handleClick} className={`px-4 py-2 rounded-md focus:outline-none ${status === 'open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {status === 'open' ? 'Open' : 'Closed'}
                            </button>
                        </div>
                        <div className='m-10 mb-1 ml-16 flex flex-wrap justify-start gap-4'>
                            <div className="bg-white rounded p-4  mr-4 w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{checkout_count}</p>
                                <p className="text-sm text-gray-600 text-center">Orders Completed</p>
                            </div>

                            <div className="bg-white rounded p-4  mr-4 w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{orderCount}</p>
                                <p className="text-sm text-gray-600 text-center">Total Orders</p>
                            </div>

                            <div className="bg-white rounded p-4  w-32 border border-gray-300">
                                <p className="text-3xl font-bold text-center">{menu_count} /{menuCount}</p>
                                <p className="text-sm text-gray-600 text-center">Items Available</p>
                            </div>
                        </div>

                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <Table auth={auth} checkout={checkouts} orders={orders} user={users} courier={couriers} columns={columns} primary="Order Number" action="orders.edit"></Table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
