import Table from '@/Components/Table';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import UpdateMenuForm from './Partials/UpdateMenuForm';


export default function Edit_Menu({ auth, menu }) {

console.log(menu)
    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #</h2>}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu #{menu.id}</h2>}

        >
            <Head title={'Menu #' + menu.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateMenuForm auth={auth} menu={menu} className="max-w-xl"></UpdateMenuForm>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
