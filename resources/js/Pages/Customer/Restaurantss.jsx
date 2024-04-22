import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Slider from 'react-slick';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

// import Cart_offcanvas from './Customer/Cart_offcanvas';



export default function Restaurants({ auth, vendor, menus, order, fav }) {
    const [searchQuery, setSearchQuery] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform actions with the searchQuery state, like making an API call
        Inertia.visit(route('search', { search: searchQuery })); // Assuming you have a named route 'search' defined in your Laravel routes
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Restaurants" />

            <div className='pb-8 m-10'>
                <div>
                    <div className=''>
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative flex justify-start items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search Restaurants and more..."
                                    value={searchQuery}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
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
