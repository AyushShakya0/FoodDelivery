import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// import "./Dashboard.css"
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Profile from '@/Components/Profile/Profile';
import { ProfileNavigation } from '@/Components/Profile/ProfileNavigation';
import { useState } from 'react';



export default function Favorites({ auth, vendor, food }) {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div>
            <Head title="Favorites" />

            <div className='lg:flex'>
                <div className='sticky background-red-500' style={{ position: 'relative', width: '100%' }}>
                    {/* <div className='sticky h-[80vh] lg:w-{20%} background-red-500'> */}
                    <ProfileNavigation open={openSideBar} />


                </div>
                <div className='h-auto ' style={{ position: 'absolute', right: '0', width: '80%', }}>
                    {/* <div className='lg:w-[80%]   text-red-500 ' style={{ position: 'absolute', right: '0', width: '80%', backgroundColor: 'yellow' }}> */}
                    {/* <p className='text-gray-700'>hello</p> */}
                    <div>
                        <h1 className='py-5 text-xl font-semibold text-center'> My Favorites</h1>

                        <div className='flex flex-wrap gap-5 justify-center'>

                            {/* {[1, 1, 1].map((item) => <RestaurantCard />)} */}

                            {/* {[1, 1, 1].map((item, index) => (
                                <RestaurantCard key={index} restaurant={{ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-NSEUHWmQsGxt4SfVM3f8VMW7vN8JsHnL-CnVII5E4A&s' }} />
                            ))} */}


                            {/* {[1, 1, 1].map((item, index) => <RestaurantCard key={index} />)} */}


                            {vendor && vendor.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />

                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </div>






    );
}
