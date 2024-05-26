import RestaurantCard from '@/Components/RestaurantCard';
import Track_Orders from '@/Components/Track_Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function TrackOrder({ auth, order, fav, checkout, order_cart }) {

    console.log(checkout)

    return (
        <AuthenticatedLayout user={auth} order={order_cart} fav={fav}>
            <Head title="Track Order" />

            <div className='flex justify-center text-2xl '>
                Track my Order
            </div>

            <div className='pb-8'>
                <div>
                    {checkout.data.map((listing) => {
                        const ordersInCheckout = order.filter(orderItem => listing.order_id.includes(orderItem.id));

                        return (
                            <div key={listing.id}>
                                <Track_Orders checkout={listing} order={ordersInCheckout} user={auth} />
                            </div>
                        );
                    })}
                    <Pagination
                        meta={checkout}
                        pageSize={2}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
