import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Profile from '@/Components/Profile/Profile';


export default function Cart_Display({ auth, vendor, food ,order, fav }) {
    console.log(vendor);
    console.log(food);
    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Dashboard" />

            <div className='pb-10'>
                <section className='p-5 lg:p-20'>
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-3'>My Cart</h1>
                        <div className='flex flex-wrap justify-between gap-5'>

                            <div className="flex flex-col gap-5">

                                <Profile />


                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
