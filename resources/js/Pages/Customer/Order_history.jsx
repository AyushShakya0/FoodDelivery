import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Order_history({ auth, order, fav }) {
    const orders = order.filter(order => order.status === 'checkedout');

    return (
        <AuthenticatedLayout user={auth.user} order={orders} fav={fav}>
            <Head title="Dashboard" />

            <div className='pb-8'>
                <section className='p-5 lg:p-20 flex justify-center items-center h-full'> {/* Centering content */}
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-8'>Order history</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                            <ul className="-my-8">
                                {orders.map((listing, index) => (
                                    <li key={index} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 bg-gray-200 rounded  m-4 p-6">
                                        <div className="shrink-0">
                                            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                                        </div>

                                        <div className="relative flex flex-1 flex-col justify-between">
                                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                <div className="pr-8 sm:pr-5">
                                                    <p className="text-base font-semibold text-gray-900">{listing.name}</p>
                                                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">${listing.price}</p>
                                                </div>

                                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"></p>

                                                    <div className='p-2 absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                                                        <span className='p-2'> Qty- {listing.quantity} </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
