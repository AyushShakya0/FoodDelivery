import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Slider from 'react-slick';
// import Cart_offcanvas from './Customer/Cart_offcanvas';



export default function Restaurants({ auth, vendor, menus, order, fav }) {

    console.log(vendor)

    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Restaurants" />

            <div className='pb-8 m-10'>
                <div>
                    <h1 className='text-xl font-semibold text-gray-500 pb-8'>Restaurants</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                        {vendor.map((listing) => (
                            <div key={listing.id}>
                                <RestaurantCard listing={listing} fav={fav} vendor={vendor} user={auth.user} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );

}
