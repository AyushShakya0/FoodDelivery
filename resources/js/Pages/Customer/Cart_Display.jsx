import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';




export default function Cart_Display({ auth, menus, cart, vendors, fav }) {

    const vendor_length = vendors.length;
    const subTotal = cart.reduce((total, cartItem) => total + parseInt(cartItem.price), 0);
    const shipping = 20 * vendor_length;
    const total = subTotal + shipping;


    console.log(cart)

    const [count, setCount] = useState(cart.quantity);

    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
        quantity: cart.quantity,
        price: cart.original_price * cart.quantity,
        subTotal_D: subTotal,
        total_D: total,
    });


    useEffect(() => {
        setData({
            quantity: count,
            price: cart.original_price * count,
            subTotal_D: subTotal,
            total_D: total,
        });
    }, [count, cart.original_price]);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('updatecart', cart.id), {
            quantity: count,
            price: cart.original_price * count,
            preserveScroll: true
        })
    };

    return (
        <AuthenticatedLayout user={auth.user} order={cart} fav={fav}>
            <Head title="Dashboard" />

            <div className=' '>
                <div>
                    <h1 className='text-xl font-semibold text-gray-500 pb-3 flex justify-center mt-8'>My Cart</h1>
                    <div className='flex flex-wrap justify-between gap-5'>
                        <form onSubmit={submit} encType="multipart/form-data">

                            <div className="flow-root">
                                <ul className="-my-8">
                                    {cart.length === 0 ? (
                                        <p className="text-gray-500 flex justify-center mt-10">Your cart is empty</p>
                                    ) : (
                                        cart.map((carts) => (
                                            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                <div className="shrink-0">
                                                    <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${carts.image}`} alt="food img" />
                                                </div>

                                                <div className="relative flex flex-1 flex-col justify-between">
                                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                        <div className="pr-8 sm:pr-5">
                                                            <p className="text-base font-semibold text-gray-900">{carts.name}</p>
                                                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">${data.price}</p>
                                                        </div>

                                                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"></p>

                                                            <div className='p-2'>
                                                                <RemoveCircleIcon onClick={handleDecrement} />
                                                                <span className='p-2'>{count} </span>
                                                                <AddCircleIcon onClick={handleIncrement} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                        <div>
                                                            <button type="submit" onClick={() => deleteProduct(carts.id)} className=" py-2 px-4 "><CloseIcon /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>))
                                    )}
                                </ul>
                            </div>
                            <div className="mx-auto mt-8 max-w-2xl md:mt-4">
                                <div className="bg-white shadow">
                                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                                        <div className="mt-1 border-b py-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-400">Subtotal</p>
                                                <p className="text-lg font-semibold text-gray-900">Rs. {subTotal}</p>
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
                                        <div>
                                            <button type="submit" className="flex-1 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Proceed to Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
