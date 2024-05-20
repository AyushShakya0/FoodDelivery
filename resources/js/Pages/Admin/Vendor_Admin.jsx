import Table_Vendor from '@/Components/Table_Vendor';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';

const columns = [
    'Name',
    'Email',
    'Action',
];

export default function Index({ auth, vendors }) {

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Restaurants</h2>}
        >
            <Head title="Vendor Admin" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Table_Vendor vendors={vendors} columns={columns} primary="vendors Number" action="vendor.edit"></Table_Vendor>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
