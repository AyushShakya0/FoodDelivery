import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// import "./Dashboard.css"
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Profile from '@/Components/Profile/Profile';
import { ProfileNavigation } from '@/Components/Profile/ProfileNavigation';
import { useState } from 'react';



export default function Address({ auth, vendor, food ,order }) {
    console.log(vendor);
    console.log(food);
    const [openSideBar, setOpenSideBar] = useState(false);

    return (

        <div>
            <Head title="Dashboard" />

            <div className='lg:flex'>
                <div className='sticky background-red-500' style={{ position: 'relative', width: '100%' }}>
                    {/* <div className='sticky h-[80vh] lg:w-{20%} background-red-500'> */}
                    <ProfileNavigation open={openSideBar} />


                </div>
                <div className='h-auto ' style={{ position: 'absolute', right: '0', width: '80%', }}>
                    {/* <div className='lg:w-[80%]   text-red-500 ' style={{ position: 'absolute', right: '0', width: '80%', backgroundColor: 'yellow' }}> */}
                    {/* <p className='text-gray-700'>hello</p> */}
                    <div className='text-red-300'>address</div>

                </div>
            </div>
        </div>


    );
}
