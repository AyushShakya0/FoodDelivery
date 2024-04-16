import RestaurantCard from '@/Components/RestaurantCard';
import Track_Orders from '@/Components/Track_Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TrackOrder({ auth, order, fav, checkout }) {

    // console.log('authhhh',auth.id)
    // console.log('fav',fav)
    // console.log('order',order)
    // console.log('checkout',checkout)

    // Filter checkout items by user_id
    const userCheckouts = checkout.filter(item => item.user_id === auth.id && item.status !== 'Destination reached');

    // const checkedout_orders = order.filter(orderItem => checkout.order_id.some(id => id === orderItem.id));

    console.log('userCheckouts', userCheckouts)

    return (
        <AuthenticatedLayout user={auth} order={order} fav={fav}>
            <Head title="Track Order" />

            <div className='flex justify-center text-2xl '>
                Track my Order
            </div>

            <div className='pb-8'>
                <div>
                    {userCheckouts.map((listing) => (
                        <div key={listing.id}>
                            <Track_Orders checkout={listing} order={order} user={auth} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
