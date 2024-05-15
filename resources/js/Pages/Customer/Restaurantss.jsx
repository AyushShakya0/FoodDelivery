import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Slider from 'react-slick';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

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

            <div className='p-10'>
                <form onSubmit={handleSubmit} className="mb-8">
                    <label htmlFor="default-search" className="sr-only">Search</label>
                    <div className="relative">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search Restaurants and more..."
                            value={searchQuery}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-3 py-1 text-sm focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Search
                        </button>

                    </div>
                </form>

                <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Restaurants</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {vendor.map((listing) => (
                        <div key={listing.id}>
                            <RestaurantCard listing={listing} fav={fav} vendor={vendor} user={auth.user} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
