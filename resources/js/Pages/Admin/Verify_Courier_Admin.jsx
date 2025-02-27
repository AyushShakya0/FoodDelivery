import React from 'react';
import Table_Courier_verify from '@/Components/Table_Courier_verify';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';


const columns = [
    'Name',
    'Email',
    'Action',
];

export default function Index({ auth, couriers }) {
    console.log("from couriers verify",couriers);

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Verify Couriers</h2>}
        >
            <Head title="courier Admin" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Table_Courier_verify couriers={couriers.data} columns={columns} primary="Courier Number" action="courier.edit"></Table_Courier_verify>
                            <Pagination
                                meta={couriers}
                                pageSize={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
