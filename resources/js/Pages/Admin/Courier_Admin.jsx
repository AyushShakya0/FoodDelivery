import Table from '@/Components/Table';
import Table_Courier from '@/Components/Table_Courier';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';


const columns=[
    'Name',
    'Email',
    'Action',
];


export default function Index({ auth, couriers}) {
    // const verifiedCouriers = couriers.filter(courier => courier.verified === 'yes');

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Couriers</h2>}
        >
            <Head title="couriers Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Table_Courier couriers={couriers.data} columns={columns} primary="couriers Number" action="courier.edit"></Table_Courier>
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
