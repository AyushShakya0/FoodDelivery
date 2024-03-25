import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';



export default function Cart_Display({ auth, vendor, food }) {
    console.log(vendor);
    console.log(food);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className=' '>
                    {/* <div className='lg:w-[80%]   text-red-500 ' style={{ position: 'absolute', right: '0', width: '80%', backgroundColor: 'yellow' }}> */}
                    {/* <p className='text-gray-700'>hello</p> */}
                    <section className='p-5 lg:p-20'>
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-3'>My Cart</h1>
                        <div className='flex flex-wrap justify-between gap-5'>

                            <div className="flex flex-col gap-5">

                                <Cart />


                            </div>

                        </div>
                    </div>
                </section>


                </div>
        </AuthenticatedLayout>
    );
}
