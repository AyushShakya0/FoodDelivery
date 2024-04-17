import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useForm } from '@inertiajs/react';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Favorite } from '@mui/icons-material';
import { Inertia } from "@inertiajs/inertia";
import { Card, Chip, IconButton } from '@mui/material';





export default function Favorites_offcanvas({ open, onClose, fav, user }) {

    const onClickHandler = (product) => {
        console.log(product.vendor_id);
        Inertia.visit(route("restaurant.details", { id: product.vendor_id }));
    };


    const removeFavorite = (id) => {

        // console.log('works till here',id)
        Inertia.delete(route('favorites.delete', id), {
            onSuccess: () => {
                // Reload the page after successful deletion
                Inertia.reload();
            },
            onError: (error) => {
                console.error('Error deleting vendor:', error);
                // Handle error, show error message to user, etc.
            }
        });
    };


    return (
        <Transition.Root show={open}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={onClose}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">

                                                <h2 className='m-4'>
                                                    Favorites
                                                </h2>
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {fav.map((product) => (
                                                            <li key={product.id} className="flex py-6" onClick={() => onClickHandler(product)}>
                                                            {/* <li key={product.id} className="flex py-6" > */}
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                                                                        alt="food image"
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                {product.name}
                                                                            </h3>
                                                                            <p className="ml-4">{product.rating}<StarIcon /></p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500"></p>
                                                                    </div>
                                                                    <div>
                                                                        <h2 className='text-gray-600'>
                                                                            {product.address}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">{product.status}</p>
                                                                        <div className="flex">
                                                                            <IconButton onClick={() => removeFavorite(product.id)}>


                                                                                <FavoriteIcon className='text-red-600' />
                                                                            </IconButton>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
