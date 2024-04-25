import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Grid, Divider, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Inertia } from "@inertiajs/inertia";
import { Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RestaurantReview({ auth, vendor, order, fav, rating, rating_exists, order_exists, rating_own }) {

    const { id } = usePage().props; // Access route parameters

    const { data, setData, post, processing, errors, reset } = useForm({
        vendor: vendor.id,
        rating: '',
        review: '',
    });

    const isFavoritedByUser = fav.some(favorite => favorite.user_id === auth.user.id && favorite.vendor_id === vendor.id);

    const favoriteIds = fav
        .filter(favorite => favorite.user_id === auth.user.id && favorite.vendor_id === vendor.id)
        .map(favorite => favorite.id);

    const submit = (e) => {
        e.preventDefault();
        post(route("addfavorite", { id: vendor.id }), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission
    };

    const review_submit = (e) => {
        e.preventDefault();
        post(route("addreview", { id: vendor.id }), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission
    };

    const removeFavorite = (id) => {
        Inertia.delete(route('favorites.delete', { id: favoriteIds }), {
            preserveScroll: true,
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

    // const removeReview = (id) => {
    //     Inertia.delete(route('review.delete', { id: id }), {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             // Reload the page after successful deletion
    //             Inertia.reload();
    //         },
    //         onError: (error) => {
    //             console.error('Error deleting vendor:', error);
    //             // Handle error, show error message to user, etc.
    //         }
    //     });
    // };

    const removeReview = (id) => {
        if (confirm('Are you sure you want to remove this review?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('review.delete', { id: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error removing review:', error);
                    // Handle error, show error message to user, etc.
                }
            });

        }
    };

    return (
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Restaurant Details" />
            <div className='px5 lg:px-20 '>
                <section>
                    <div className='mt-6'>
                        <img className="w-full h-[60vh] object-cover" src={`http://127.0.0.1:8000/storage/${vendor.image}`} alt="Restaurant image" />
                    </div>

                    <div className='pt-3 pb-5'>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className='text-4xl font-semibold'>{vendor.name}</h1>
                                <p className='text-gray-500 mt-1'>
                                    {vendor.description}
                                </p>
                            </div>

                            {/* Favorite button */}
                            <div>
                                {isFavoritedByUser ? (
                                    <IconButton onClick={() => removeFavorite(vendor.id)}>
                                        <FavoriteIcon className='text-red-600' />
                                    </IconButton>
                                ) : (
                                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                                        <button type="submit" className="">
                                            <FavoriteBorderIcon />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className='space-y-3 mt-2'>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <LocationOnIcon />
                                <span>
                                    {/* Kathmandu, Nepal */}
                                    {vendor.address}, {vendor.city}
                                </span>
                            </p>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <CalendarTodayIcon />
                                <span>
                                    {vendor.time}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
                <Divider />
                <div className="flex gap-4 mt-4 mb-4">
                    <span>
                        <Link href={route("restaurant.details", { id: vendor.id })} className="flex items-center">
                            Menu
                        </Link>
                    </span>
                    <span>
                        <Link href={route("restaurant.reviews", { id: vendor.id })} className="flex items-center">
                            Reviews
                        </Link>
                    </span>
                </div>


                <Divider />
                {/* Review form */}
                <div class="lg:w-full mb-8 lg:mb-0 lg:pr-4">
                    {order_exists && !rating_exists && (
                        <form onSubmit={review_submit} encType="multipart/form-data" className="space-y-4">
                            {/* Rating input */}
                            <div className="flex flex-col">
                                <label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating</label>
                                <input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    value={data.rating}
                                    autoComplete="rating"
                                    onChange={(e) => setData("rating", Math.min(Math.max(parseInt(e.target.value), 1), 5))}
                                    min="1"
                                    max="5"
                                    required
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            {/* Review text area */}
                            <div className="flex flex-col">
                                <label htmlFor="review" className="text-sm font-medium text-gray-700">Review</label>
                                <textarea
                                    id="review"
                                    name="review"
                                    value={data.review}
                                    autoComplete="review"
                                    onChange={(e) => setData("review", e.target.value)}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                            {/* Submit button */}
                            <div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            </div>
                        </form>
                    )}

                    {rating_exists && (
                        rating_own.map((rating) => (
                            <div class="mb-4">
                                <div class="text-sm font-medium text-gray-700">Name: {rating.user_id}</div>
                                <div class="text-sm font-medium text-gray-700">Rating: {rating.rating}</div>
                                <div class="text-sm text-gray-700">Review: {rating.review}</div>
                                <div>
                                    <IconButton onClick={() => removeReview(rating.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>

                        ))
                    )}

                </div>
                <div>
                    Other Reviews
                </div>
                {/* Reviews display */}
                <div class="lg:w-full lg:mt-4 lg:pr-4">
                    {rating.map((rating) => (
                        <div class="mb-4">
                            <div class="text-sm font-medium text-gray-700">Name: {rating.user_id}</div>
                            <div class="text-sm font-medium text-gray-700">Rating: {rating.rating}</div>
                            <div class="text-sm text-gray-700">Review: {rating.review}</div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
