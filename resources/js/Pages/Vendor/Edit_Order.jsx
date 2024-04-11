import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import UpdateOrderForm from './Partials/UpdateOrderForm';


export default function Edit({ auth,orders, checkout, user, courier}) {
    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #</h2>}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #{orders.id}</h2>}

        >
            <Head title={'Orders #' + orders.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateOrderForm order={orders} className="max-w-xl"></UpdateOrderForm>
                            {/* hello */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
