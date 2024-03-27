import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import "./Dashboard.css"
// import Cart from '@/Components/Cart/Cart';

import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Slider from 'react-slick';



export default function Dashboard({ auth, vendor, food }) {
    console.log("Restaurants: ", vendor);
    console.log("Food: ", food);

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


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className='pb-8'>
                <section className='relative text-center bg-green h-screen' style={{ backgroundImage: `url(./dashboard.jpg)`, backgroundSize: 'cover' }}>
                    <div className='absolute inset-0 bg-black bg-opacity-50'></div>
                    <div className='flex flex-col justify-center h-full'>
                        <div className='mx-auto'>
                            <p className='text-2xl lg:text-6xl font-bold text-white py-5'>Go Food</p>
                            <p className='text-red-500 text-xl lg:text-4xl'>Taste the Convenience: Food, Fast and Delivered</p>
                            {/* Logo and Search Container */}

                            <form class="max-w-md mx-auto bg-white">
                                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className='p-5 lg:p-20 lg:pb-0'>
                    <p className='text-xl font-semibold text-gray-500 pb-8'>Popular Items</p>
                    <Slider {...settings}>
                        {food.map((listing) => (
                            <MultiItemCarousel key={listing.id} listing={listing} />

                        ))}
                    </Slider>
                </section>

                <section className='p-5 lg:p-20'>
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-8'>Popular Restaurants</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                            {vendor.map((listing) => (
                                <div key={listing.id}>
                                    <RestaurantCard listing={listing} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


            </div>

        </AuthenticatedLayout>
    );
}
