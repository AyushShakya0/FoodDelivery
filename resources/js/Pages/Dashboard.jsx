import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import "./Dashboard.css"
// import Cart from '@/Components/Cart/Cart';

import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Slider from 'react-slick';
import Cart_offcanvas from './Customer/Cart_offcanvas';



export default function Dashboard({ auth, vendor, food, order, fav }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false

    };

    const verifiedVendors = vendor.filter(vendor => vendor.verified === 'yes');

    const food_available = food.filter(food => food.availability === 'available');

    const orders = order.filter(order => order.status === null);



    return (
        <AuthenticatedLayout user={auth.user} order={orders} fav={fav}>
            <Head title="Dashboard" />


            <div className='pb-8'>
                <section className='relative bg-green h-screen flex items-center' style={{ backgroundImage: `url(./db1.jpg)`, backgroundSize: 'cover' }}>
                    <div className='absolute inset-y-0 left-0 bg-white bg-opacity-10'></div>
                    <div className='max-w-md mx-auto px-5  ml-10'>
                        <p className='text-gray-800 text-xl lg:text-3xl'>Taste the Convenience: Food, Fast and Delivered</p>
                        {/* Logo and Search Container */}
                        <form className="mt-8">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative flex justify-start items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search Restaurants and more..." required />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                            </div>
                        </form>
                    </div>
                </section>



                <section className='p-5 lg:p-20 lg:pb-0'>
                    <p className='text-xl font-semibold text-gray-500 pb-8'>Popular Items</p>
                    <Slider {...settings}>
                        {food_available.map((listing) => (
                            <MultiItemCarousel key={listing.id} listing={listing} />
                        ))}
                    </Slider>
                </section>

                <section className='p-5 lg:p-20 '>
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-8'>Popular Restaurants</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 '>
                            {verifiedVendors.map((listing) => (
                                <div key={listing.id}>
                                    <RestaurantCard listing={listing} fav={fav} vendor={vendor} user={auth.user} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );

}
