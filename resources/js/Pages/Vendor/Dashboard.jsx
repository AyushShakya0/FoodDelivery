import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor Dashboard</h2>}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Vendor Dashboard</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
