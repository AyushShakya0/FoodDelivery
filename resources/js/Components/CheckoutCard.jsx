import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm } from '@inertiajs/react';

const CheckoutCard = ({ listing, vendor }) => {
    const [count, setCount] = useState(listing.quantity);
    const { data, setData, patch, processing, errors, reset } = useForm();

    useEffect(() => {
        setData({
            quantity: count,
            price: listing.price * count,
        });
    }, [count, setData,]);

    const handleIncrement = () => {
        setCount(Math.floor(count) + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(Math.floor(count) - 1);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await patch(route('updatecart', { id: listing.id }), data); // Pass the data object directly
            if (response.ok) {
                // Reset form after successful submission
                reset();
            } else {
                // Handle error response
                console.error('Failed to update cart:', response);
            }
        } catch (error) {
            // Handle request error
            console.error('Error updating cart:', error);
        }
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
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{listing.price}</p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${listing.price}</p>

                                <div className='p-2'>
                                    <RemoveCircleIcon onClick={handleDecrement} />
                                    <span className='p-2'>{count} </span>
                                    <AddCircleIcon onClick={handleIncrement} />
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 flex items-center">
                            <div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </form>
        </div>
    );
};

export default CheckoutCard;
