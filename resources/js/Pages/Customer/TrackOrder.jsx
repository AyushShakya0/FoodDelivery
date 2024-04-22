import RestaurantCard from '@/Components/RestaurantCard';
import Track_Orders from '@/Components/Track_Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TrackOrder({ auth, order, fav, checkout, order_cart }) {

    return (
        <AuthenticatedLayout user={auth} order={order_cart} fav={fav}>
            <Head title="Track Order" />

            <div className='flex justify-center text-2xl '>
                Track my Order
            </div>

            <div className='pb-8'>
                <div>
                    {checkout.map((listing) => {
                        // Filter orders based on the order_ids in the current listing
                        const ordersInCheckout = order.filter(orderItem => listing.order_id.includes(orderItem.id));

                        return (
                            <div key={listing.id}>
                                <Track_Orders checkout={listing} order={ordersInCheckout} user={auth} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
