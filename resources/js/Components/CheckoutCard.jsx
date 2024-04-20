import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm } from '@inertiajs/react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Inertia } from "@inertiajs/inertia";

const CheckoutCard = ({ listing, vendor }) => {
    const [count, setCount] = useState(listing.quantity);

    useEffect(() => {
        setData({
            quantity: count,
            price: listing.original_price * count,
        });
    }, [count, listing.original_price]);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
        quantity: listing.quantity,
        price: listing.original_price * listing.quantity,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('updatecart', listing.id), {
            quantity: count,
            price: listing.original_price * count,
            preserveScroll: true
        }).then(() => {
            console.log("Cart Items in Local Storage:", localStorage.getItem('cartItems'));
        });
    };

    return (
        <div>
            <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">{listing.name}</p>
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
                            <PrimaryButton disabled={processing}> <DoneIcon /> Save</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>

                            <div>
                                <button type="submit" onClick={() => deleteProduct(listing.id)} className=" py-2 px-4 "><CloseIcon /></button>
                            </div>
                        </div>
                    </div>
                </li>
            </form>
        </div>
    );
};

export default CheckoutCard;
