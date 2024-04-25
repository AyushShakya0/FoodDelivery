import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Track_Orders from '@/Components/Track_Orders';


export default function Order_history({ auth, order, fav, checkout, cart }) {

    return (
        <AuthenticatedLayout user={auth.user} order={cart} fav={fav}>
            <Head title="Dashboard" />

            <div className='pb-8'>
                <div className='flex justify-center text-2xl '>
                    Order History
                </div>
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
