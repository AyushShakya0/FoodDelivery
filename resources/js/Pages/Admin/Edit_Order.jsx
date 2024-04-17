import Table from '@/Components/Table';
import AuthenticatedLayout_Admin from '@/Layouts/AuthenticatedLayout_Admin';
import { Head } from '@inertiajs/react';
import UpdateOrderForm from './Partials/UpdateOrderForm';


export default function Edit({ auth, orders, checkout, user, courier, vendor }) {
    // Assuming filteredUserArray will have only one user object
    const userObject = user.length > 0 ? user[0] : null;
    const courierObject = courier.length > 0 ? courier[0] : null;

    // Now you can access properties of the userObject
    if (userObject) {
        const name = userObject.name;
        const address = userObject.address;
        const city = userObject.city;
        const pincode = userObject.pincode;
        const number = userObject.number;

        // Use userName or any other properties as needed
    }

    if (courierObject) {
        const name = courierObject.name;
        const number = courierObject.number;

        // Use userName or any other properties as needed
    }

    return (
        <AuthenticatedLayout_Admin
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #</h2>}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders #{checkout.id}</h2>}
        >
            <Head title={'Orders #' + checkout.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdateOrderForm order={orders} checkout={checkout} user={userObject} courier={courierObject} vendor={vendor} className="max-w-xl"></UpdateOrderForm>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Admin>
    );
}
