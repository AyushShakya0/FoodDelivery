import RestaurantCard from '@/Components/RestaurantCard';
import Track_Orders from '@/Components/Track_Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TrackOrder({ auth, order, fav, checkout }) {

    return (
        <AuthenticatedLayout user={auth} order={order} fav={fav}>
            <Head title="Track Order" />

            <div className='flex justify-center text-2xl '>
                Track my Order
            </div>

            <div className='pb-8'>
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
