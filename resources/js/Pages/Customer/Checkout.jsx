import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';
import { Divider, Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import CheckoutCard from '@/Components/CheckoutCard';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import config from '@/Components/KhaltiConfig';
import KhaltiCheckout from 'khalti-checkout-web';
import { Button } from 'react-bootstrap';
import { Inertia } from "@inertiajs/inertia";

export default function Checkout({ auth, cart, vendors, user, fav }) {
    const userMenuIds = cart.map(cartItem => cartItem.id);
    const vendor_idss = cart.map(cartItem => cartItem.vendor_id);

    // Calculate the total price of the items in the cart array
    const totalPrice = cart.reduce((total, cartItem) => total + parseInt(cartItem.price), 0);
    const shipping = 60 * vendor_idss.length;
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
        reset(); // Reset form after successful submission
    };

    const [paymentMethod, setPaymentMethod] = useState('khalti'); // Default to 'khalti'

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const khaltiConfig = {
        ...config,
        eventHandler: {
            ...config.eventHandler,
            onSuccess: (payload) => {
                console.log("Payment successful", payload);
                Inertia.post("/api/payment/verify", {
                    token: payload.token,
                    amount: payload.amount,
                    user_id: user.id,
                    order_id: userMenuIds,
                    vendor_id: vendor_idss,
                    price: total,
                    customization: " ",
                    address: user.address,
                    status: 'Ordered',
                });
            },
            onError: (error) => {
                console.log("Error during payment", error);
            },
        },
    };
    let checkout = new KhaltiCheckout(khaltiConfig);


    console.log(user.address)

    return (
        <AuthenticatedLayout user={auth.user} order={cart} fav={fav}>
            <Head title="Checkout" />

            <div className=' bg-gray-100'>
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="h-screen bg-gray-100 py-6 sm:py-16 lg:py-8">
                        <div className="flex items-center justify-center mt-1">
                            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                        </div>
                        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex">
                            <section className="flex-1">
                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="bg-white shadow">
                                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                                            <div className="flow-root">
                                                <ul className="-my-8">
                                                    {cart.length === 0 ? (
                                                        <p className="text-gray-500 flex justify-center mt-10">Your cart is empty</p>
                                                    ) : (
                                                        cart.map((listing) => (
                                                            <CheckoutCard key={listing.id} listing={listing} vendor={vendors} />
                                                        ))
                                                    )}
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
                                                    <p className="text-lg font-semibold text-gray-900">Rs. {totalPrice}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">Shipping</p>
                                                    <p className="text-lg font-semibold text-gray-900">Rs. {shipping}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Total</p>
                                                <p className="text-lg font-semibold text-gray-900">Rs. {total}</p>
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
                                                <Link href={route('profile.edit')} className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 item-center">
                                                    Change Address
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                    <div className="mb-4 flex justify-center space-x-4">
                                        <button
                                            type="button"
                                            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${paymentMethod === 'cod' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                                            onClick={() => handlePaymentMethodChange('cod')}
                                        >
                                            Cash on Delivery
                                        </button>
                                        <button
                                            type="button"
                                            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${paymentMethod === 'khalti' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                                            onClick={() => handlePaymentMethodChange('khalti')}
                                        >
                                            Khalti
                                        </button>
                                    </div>

                                    {paymentMethod === 'cod' && (
                                        <div className="bg-white shadow">
                                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className={`flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${cart.length === 0 || user.address===null  || user.address=== '' ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900 text-white'}`}
                                                        disabled={cart.length === 0 || user.address===null  || user.address=== ''}
                                                    >
                                                        Place Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'khalti' && (
                                        <div className="bg-white shadow">
                                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                                <div>
                                                    <button
                                                        type="button"
                                                        className={`flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${cart.length === 0 || user.address===null  || user.address=== '' ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900 text-white'}`}
                                                        onClick={(e) => {
                                                            if (cart.length === 0 || user.address===null || user.address=== '') {
                                                                e.preventDefault();
                                                            } else {
                                                                e.preventDefault();
                                                                checkout.show({ amount: 100 * 100 });
                                                            }
                                                        }}
                                                        disabled={cart.length === 0 || user.address===null || user.address=== ''}
                                                    >
                                                        Place Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
