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

    console.log(listing)

    useEffect(() => {
        setData({
            quantity: count,
            price: listing.original_price * count,
        });
    }, [count, listing.original_price]);

    const handleIncrement = () => {
        console.log('increase')
        setCount(prevCount => prevCount + 1);
        patch(route('addquantity', listing.id), {
            quantity: count,
            price: listing.original_price,
            preserveScroll: true,
        });
    };

    const handleDecrement = () => {
        console.log('decrease')
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
            patch(route('subtractquantity', listing.id), {
                quantity: count,
                price: listing.original_price,
                preserveScroll: true,
            });
        }
    };

    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
        quantity: listing.quantity,
        price: listing.original_price * listing.quantity,
    });

    const submit = (e) => {
        //e.preventDefault(); // Prevent default form submission behavior
        console.log("Form submitted");

        // Submit the form asynchronously using Inertia
        // patch(route('updatecart', listing.id), {
        //     quantity: count,
        //     price: listing.original_price * count,
        //     preserveScroll: true,
        //     data: data
        // });
    };

    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('order.delete', { id: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error deleting product:', error);
                    // Handle error, show error message to user, etc.
                }
            });

        }
    };

    return (
        <div>
            {/* <form onSubmit={submit} encType="multipart/form-data" className="space-y-4"> */}
                {/* <div className='space-y-4' onClick={submit} > */}
                <div className='space-y-4' >
                <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div>
                                <p className="text-base font-semibold text-gray-900">{listing.name}</p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">Rs. {listing.original_price}</p>
                            </div>
                            <div className="flex items-center"> {/* Updated */}
                                <div className="flex items-center space-x-2"> {/* Updated */}
                                    <RemoveCircleIcon onClick={handleDecrement} className="cursor-pointer" />
                                    <span>{count}</span>
                                    <AddCircleIcon onClick={handleIncrement} className="cursor-pointer" />
                                </div>
                                {/* Empty space to push the buttons to the right */}
                                <div className="flex-grow pl-6">Rs. {data.price}</div> {/* Updated */}



                                {/* <div>
                                    <button  onClick={() => submit(listing.id)} className="hover-text-red text-blue font-bold py-2 px-4 pr-3 rounded"><DoneIcon /></button>
                                </div> */}


                                <div className='p-2'>
                                    <button onClick={() => deleteProduct(listing.id)} className="py-2 px-4"><CloseIcon /></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </li>
                </div>
            {/* </form> */}
        </div>
    );
};

export default CheckoutCard;
