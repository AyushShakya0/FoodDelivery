import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import "./Dashboard.css"
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import Slider from 'react-slick';
import RestaurantCard from '@/Components/RestaurantCard';
import { Grid, Divider } from '@mui/material';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

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

    const staticItems = [
        { id: 1, name: "Burger", image: '/burger.jpg' },
        { id: 2, name: "Pizza", image: "./pizza.jpg" },
        { id: 3, name: "Momo", image: "momo.jpeg" },
        { id: 4, name: "Sandwich", image: "sandwich.jpg" },
        { id: 5, name: "Pasta", image: "pasta.jpg" },
        { id: 6, name: "Pancake", image: "pancake.jpeg" },
        { id: 7, name: "Cake", image: "cake.jpeg" },
    ];

    const displayRestaurants = vendor.slice(0, 4);

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
            <Head title="Dashboard" />

            <div className='pb-8'>
                <section className='relative bg-green h-screen flex items-center' style={{ backgroundImage: `url(./db1.jpg)`, backgroundSize: 'cover' }}>
                    <div className='absolute inset-y-0 left-0 bg-white bg-opacity-10'></div>
                    <div className='max-w-md mx-auto px-5  ml-10'>
                        <p className='text-gray-800 text-xl lg:text-3xl'>Taste the Convenience: Food, Fast and Delivered</p>
                        {/* Logo and Search Container */}
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
                </section>

                <section className='p-5 lg:p-20 lg:pb-0'>
                    <p className='text-xl font-semibold text-gray-500 pb-8'>Categories</p>
                    <Slider {...settings}>
                        {staticItems.map((listing) => (
                            <MultiItemCarousel key={listing.id} listing={listing} />
                        ))}
                    </Slider>
                </section>
                <section className="p-5 lg:p-20">
                    <div>
                        <div className="flex items-center justify-between pb-8">
                            <h1 className="text-xl font-semibold text-gray-500">Restaurants</h1>
                            <Link href={route('restaurants')} className="text-sm font-sm text-blue-500">
                                View all
                            </Link>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {displayRestaurants.map((listing) => (
                                <div key={listing.id}>
                                    <RestaurantCard listing={listing} fav={fav} vendor={vendor} user={auth.user} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Divider />

                <section className="bg-white py-12 mt-10 mb-10">
                    <div className="container mx-auto text-center">
                        <div className="mb-8">
                            <h2 className="text-red-600 text-2xl font-bold mb-4">What we serve</h2>
                            <div className="text-4xl text-black mb-6">
                                <p>Just sit back at home</p>
                                <p>we will <span className="text-red-500">take care</span></p>
                            </div>
                            <p className="text-gray-700 mb-10">Lorem ipsum dolor sit amet consectetur adipisicing e</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-1/3 px-4">
                                <img src="/quick_delivery.png" alt="Quick Delivery" className="mx-auto mb-4 w-32 h-32" />
                                <h3 className="text-lg font-semibold mb-2">Quick Delivery</h3>
                                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="w-1/3 px-4">
                                <img
                                    src="/dine_in.png"
                                    alt="Dine In"
                                    className="mx-auto mb-4 w-32 h-32" // Adjusted classes
                                />
                                <h3 className="text-lg font-semibold mb-2">Super Dine In</h3>
                                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className="w-1/3 px-4">
                                <img src="/easy_pickup.png" alt="Easy Pickup" className="mx-auto mb-4 w-32 h-32" />
                                <h3 className="text-lg font-semibold mb-2">Easy Pick Up</h3>
                                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 mt-10 mb-10 bg-white mr-4 ml-4">
                    <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between">
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                            <img src="/whyGoFood.png" alt="Why GoFood?" className="mx-auto mb-4 md:mb-0 w-72 h-auto" />
                        </div>
                        <div className="w-full md:w-2/3 md:pl-8 md:pr-4">
                            <h2 className="text-4xl font-bold mb-4">Why <span className=" text-green-500">GoFood</span>?</h2>
                            <p className="text-md mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <ul className="list-disc pl-6 mb-2">
                                <li className="text-lg mb-2">Convenient Ordering</li>
                                <p className="text-md mb-2">Lorem ipsum dolor sit amet,incididunt ut labore et dolore magna aliqua.</p>

                                <li className="text-lg mb-2">Fast Delivery</li>
                                <p className="text-md mb-2">Lorem Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                <li className="text-lg mb-2">Quality Food</li>
                                <p className="text-md">Lorem ipsum dolor sctetur labore et dolore magna aliqua.</p>
                            </ul>
                        </div>
                    </div>
                </section>

                <Divider />
                <footer className="bg-gray-100 text-gray-800 py-8 px-4 md:px-16">
                    <div className="container mx-auto flex flex-wrap justify-between">
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">WE'RE GOFOOD</h4>
                            <ul className='text-gray-500 text-md'>
                                <li>About Us</li>
                                <li>Available Areas</li>
                                <li>Delivery Charges</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">SERVICE HOURS</h4>
                            <p className='text-gray-500'>08:00 AM to 9:00 PM (NST)</p>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">GET HELP</h4>
                            <ul className='text-gray-500'>
                                <li>How to Order?</li>
                                <li>FAQs</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">CALL US</h4>
                            <p className='text-gray-500'>Kathmandu: 5970477, 4544177, 4540979, 9802034008</p>
                            <p className='text-gray-500'>Pokhara: 9802859990, 9802853330</p>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">DOWNLOAD APP</h4>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Download Now</button>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">CONNECT WITH US</h4>
                            <ul className='text-gray-500'>
                                <li>Terms of Usage</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="container mx-auto text-center mt-10 mb-1">
                        <p>© 2020 GoFood Pvt. Ltd. All Rights Reserved</p>
                    </div>
                </footer>
            </div>
        </AuthenticatedLayout>
    );

}
