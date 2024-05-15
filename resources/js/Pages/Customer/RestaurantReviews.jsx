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

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function RestaurantReview({ auth, vendor, order, fav, rating, rating_exists, order_exists, rating_own }) {

    const { id } = usePage().props; // Access route parameters

    const [isAnonymous, setIsAnonymous] = useState(false);


    const { data, setData, post, processing, errors, reset } = useForm({
        vendor: vendor.id,
        rating: '',
        review: '',
        name: auth.user ? auth.user.name : 'Anonymous',
    });

    const handleAnonymousToggle = () => {
        setIsAnonymous(!isAnonymous);
        setData('name', isAnonymous ? (auth.user ? auth.user.name : 'Anonymous') : 'Anonymous');
    };

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

    const StarRating = ({ rating, setRating }) => {
        const handleStarClick = (index) => {
            setRating(index + 1); // Set rating based on clicked star index
        };

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                    <IconButton key={index} onClick={() => handleStarClick(index)}>
                        {index < rating ? <StarIcon className="text-yellow-600" /> : <StarBorderIcon className="text-yellow-600" />}
                    </IconButton>
                ))}
            </div>
        );
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
                                    {vendor.start_time}-{vendor.end_time}
                                </span>
                            </p>
                            {[...Array(5)].map((_, index) => (
                                index < vendor.rating ? <StarIcon key={index} className='text-yellow-600' /> : <StarBorderIcon key={index} className='text-yellow-600' />
                            ))}
                        </div>
                    </div>
                </section>
                <Divider />
                <div className="flex gap-4 mt-4 mb-4">
                    <span>
                        <Link href={route("restaurant.details", { id: vendor.id })} preserveScroll={true} className="flex items-center">
                            Menu
                        </Link>
                    </span>
                    <span>
                        <Link href={route("restaurant.reviews", { id: vendor.id })} preserveScroll={true} className="flex items-center">
                            Reviews
                        </Link>
                    </span>
                </div>


                <Divider />
                {/* Review form */}
                <div class="lg:w-full mb-8 lg:mb-0 lg:pr-4">
                    {order_exists && !rating_exists && (
                        <form onSubmit={review_submit} encType="multipart/form-data" className="space-y-4 mt-4">
                        {/* Rating input */}
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <StarRating rating={data.rating} setRating={(value) => setData("rating", value)} required />
                                {errors.rating && <span className="text-red-500 ml-1">*</span>} {/* Show asterisk if rating is required and not provided */}
                            </div>
                        </div>

                        {/* Review text area */}
                        <div className="flex flex-col">
                            <textarea
                                id="review"
                                name="review"
                                value={data.review}
                                autoComplete="review"
                                onChange={(e) => setData("review", e.target.value)}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            ></textarea>
                            {errors.review && <span className="text-red-500 text-sm">{errors.review}</span>} {/* Show error message if review is required and not provided */}
                        </div>

                        {/* Anonymous checkbox */}
                        <div className="flex items-center">
                            <input
                                id="anonymous"
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={handleAnonymousToggle}
                                className="mr-2 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                                Anonymous
                            </label>
                        </div>

                        {/* Submit button */}
                        <div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Submit
                            </button>
                        </div>
                    </form>

                    )}

                    {rating_exists && (
                        rating_own.map((rating) => (
                            <div className="mb-4 bg-white rounded p-4 m-2 mt-4 border-gray-800">
                                <div className="text-xl font-medium text-gray-700">{rating.name}</div>
                                <div className="text-sm font-medium text-gray-700">
                                    {[...Array(5)].map((_, index) => (
                                        index < rating.rating ? <StarIcon key={index} className='text-yellow-600' /> : <StarBorderIcon key={index} className='text-yellow-600' />
                                    ))}
                                </div>
                                <div className="text-md text-gray-700">{rating.review}</div>
                                <div>
                                    <IconButton onClick={() => removeReview(rating.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    )}

                </div>
                {/* Reviews display */}
                <div class="lg:w-full lg:mt-4 lg:pr-4">
                    {rating.map((rating) => (
                        <div class="mb-4  bg-white rounded p-4 m-2 mt-4 border-gray-800">
                            <div className="text-xl font-medium text-gray-700">{rating.name}</div>
                            <div className="text-sm font-medium text-gray-700">
                                {[...Array(5)].map((_, index) => (
                                    index < rating.rating ? <StarIcon key={index} className='text-yellow-600' /> : <StarBorderIcon key={index} className='text-yellow-600' />
                                ))}
                            </div>
                            <div className="text-md text-gray-700">{rating.review}</div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
