import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TrackOrder({ auth, order, fav, checkout }) {

    // console.log('authhhh',auth)
    // console.log('fav',fav)
    // console.log('order',order)
    // console.log('checkout',checkout)

    return (
        <AuthenticatedLayout user={auth} order={order} fav={fav}>
            <Head title="Track Order" />

            <div className='pb-8'>
                <section className='p-5 lg:p-20 flex justify-center items-center h-full'> {/* Centering content */}
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-8'>Track my Order</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                            <ul className="-my-8">

                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
