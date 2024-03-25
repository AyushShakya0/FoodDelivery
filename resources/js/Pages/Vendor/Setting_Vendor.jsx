import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';


export default function Setting_Vendor({ auth, orders }) {
    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"> Setting Vendor</h2>}
        >
            <Head title="Setting Vendor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Setting Vendor
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
