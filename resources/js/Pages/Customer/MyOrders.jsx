import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// import "./Dashboard.css"
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import Profile from '@/Components/Profile/Profile';
import OrderCard from './OrderCard';
import { ProfileNavigation } from '@/Components/Profile/ProfileNavigation';
import { useState } from 'react';



export default function MyOrders({ auth, vendor, food ,order }) {

    const [openSideBar, setOpenSideBar] = useState(false);

    return (

        <div>
            <Head title="My orders" />
            <div className='lg:flex'>
                <div className='sticky background-red-500' style={{ position: 'relative', width: '100%' }}>
                    {/* <div className='sticky h-[80vh] lg:w-{20%} background-red-500'> */}
                    <ProfileNavigation open={openSideBar} />


                </div>
                <div className='h-auto ' style={{ position: 'absolute', right: '0', width: '80%', }}>
                    <div className='pb-10'>
                        <div className='flex items-center flex-col' style={{ justifyContent: "center" }}  >
                            <h1 className='text-xl text-center py-7 font-semibold '>My orders</h1>
                            <div className='space-y-5 w-96 '>
                                {/* <div className='space-y-5 w-full lg:w-1/2'> */}
                                {
                                    [1, 1, 1, 1].map((item) => <OrderCard />)
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>






    );
}
