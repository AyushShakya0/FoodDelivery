import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Track_Orders from '@/Components/Track_Orders';


export default function Order_history({ auth, order, fav, checkout }) {

    console.log('checkout', checkout)

    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Dashboard" />

            <div className='pb-8'>
                <div className='flex justify-center text-2xl '>
                    Order History
                </div>
                <div>
                    {checkout.map((listing) => (
                        <div key={listing.id}>
                            <Track_Orders checkout={listing} order={order} user={auth} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
