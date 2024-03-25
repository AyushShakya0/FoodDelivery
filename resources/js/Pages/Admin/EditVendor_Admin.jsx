import Table from '@/Components/Table';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import UpdateVendorForm from './Partials/UpdateVendorForm';

export default function Edit({ auth, vendor }) {
    console.log("from edit vendor admin ", vendor);

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor # {vendor ? vendor.id : ''}</h2>}
        >
            <Head title={vendor ? 'Vendor #' + vendor.id : ''} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateVendorForm vendor={vendor} className="max-w-xl"></UpdateVendorForm>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
