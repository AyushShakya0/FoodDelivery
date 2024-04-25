import Table from '@/Components/Table';
import AuthenticatedLayout_Courier from '@/Layouts/AuthenticatedLayout_Courier';
import { Head } from '@inertiajs/react';
import UpdateOrderForm from './Partials/UpdateOrderForm';


export default function Edit_Order({ auth, orders, checkout, user, vendor }) {

    console.log('user',user)
    console.log('vendor',vendor)

    return (
        <AuthenticatedLayout_Courier
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #{checkout.id}</h2>}

        >
            <Head title={'Orders #' + checkout.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateOrderForm order={orders} checkout={checkout} user={user} courier={auth} vendor={vendor} className="max-w-xl"></UpdateOrderForm>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Courier>
    );
}
