import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';
import { Divider, Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import CheckoutCard from '@/Components/CheckoutCard';
import TextInput from '@/Components/TextInput';



export default function Checkout({ auth, cart, vendors, user, fav }) {
    const userMenus = cart.filter(cartItem => {
        return cartItem.user_id === auth.user.id && cartItem.status !== "checkedout";
    });
    const userMenuIds = userMenus.map(cartItem => cartItem.id);
    const vendor_idss = userMenus.map(cartItem => cartItem.vendor_id);

    // Calculate the total price of the items in the userMenus array
    const totalPrice = userMenus.reduce((total, cartItem) => total + parseInt(cartItem.price), 0);
    const orders = cart.filter(cart => cart.status === null);
    const shipping = 12;
    const total = totalPrice + shipping;


    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        order_id: userMenuIds,
        vendor_id: vendor_idss,
        price: total,
        customization: " ",
        address: user.address,
        status: 'Ordered',
    });

    const submit = (e) => {
        e.preventDefault();
        setData({ ...data, price: total }); // Update total before submission
        post(route("checkout_store"), { ...data }); // Pass data to the backend

        // patch(route('updatecart', userMenuIds),{
        //     status: datas.status, // Include the updated status in the patch request
        //     preserveScroll: true
        // });
        reset(); // Reset form after successful submission
    };

    return (
        <AuthenticatedLayout user={auth.user} order={orders} fav={fav}>
            <Head title="Checkout" />

            <div className=' bg-gray-100'>
                <form onSubmit={submit} encType="multipart/form-data">


                    <div className="h-screen bg-gray-100 py-6 sm:py-16 lg:py-8">
                        <div class="flex items-center justify-center mt-10">
                            <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
                        </div>
                        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex">
                            <section className="flex-1">
                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <div className="flow-root">
                                                <ul className="-my-8">
                                                    {userMenus.map((listing) => (
                                                        <CheckoutCard key={listing.id} listing={listing} vendor={vendors} />
                                                    ))}

                                                </ul>
                                            </div>

                                        </div>
                                        <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                            <div className="bg-white shadow">
                                                <div className="px-4 py-6 sm:px-8 sm:py-10">
                                                    <h2 className="text-2xl font-semibold text-gray-900">Customization</h2>
                                                    <TextInput className=" text-gray-700 w-full"
                                                        id="customization"
                                                        name="customization"
                                                        value={data.customization}
                                                        autoComplete="description"
                                                        onChange={(e) => setData("customization", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="flex-1">
                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <div className="mt-1 border-b py-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Subtotal</p>
                                                    <p className="text-lg font-semibold text-gray-900">${totalPrice}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Shipping</p>
                                                    <p className="text-lg font-semibold text-gray-900">${shipping}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Total</p>
                                                <p className="text-lg font-semibold text-gray-900">${total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <h2 className="text-2xl font-semibold text-gray-900">Delivery Address</h2>
                                            <p className="mt-2 text-sm text-gray-600">{user.address}, {user.city}, {user.pincode}</p>

                                            <div className="mt-6 flex justify-between">
                                                {/* <button type="button" className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Change Address</button> */}
                                                <Link href={route('profile.edit')} className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 item-center">
                                                    Change Address
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
                                            <p className="mt-2 text-sm text-gray-600">Credit Card ending in ****1234</p>

                                            <div className="mt-6 flex justify-center">
                                                <Link href={route('profile.edit')} className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                                    Change Payment Method
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <div>
                                                <button type="submit" className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
