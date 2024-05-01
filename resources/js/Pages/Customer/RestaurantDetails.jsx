import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import { Grid, Divider, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
import MenuCard from '@/Components/MenuCard';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Inertia } from "@inertiajs/inertia";
import { Link } from '@inertiajs/react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const foodTypes = [
    { label: "All", value: "all", },
    { label: "Main Course", value: "main_course", },
    { label: "Appetizers", value: "appetizer", },
    { label: "Desserts", value: "dessert", },

]


export default function RestaurantDetails({ auth, vendor, menus, order, fav, desserts, main_course, appetizers }) {
    const [foodType, setFoodType] = useState('all'); // Initialize state for selected food type

    const handleFilter = (e) => {
        setFoodType(e.target.value); // Update selected food type when radio button changes
    };

    // Filter menus based on selected food type
    let filteredMenus = [];
    switch (foodType) {
        case 'main_course':
            filteredMenus = main_course;
            break;
        case 'dessert':
            filteredMenus = desserts;
            break;
        case 'appetizer':
            filteredMenus = appetizers;
            break;
        default:
            filteredMenus = menus;
    }


    console.log('desserts', desserts)
    console.log('main_course', main_course)
    console.log('appetizers', appetizers)


    const paymentSubmit = {

    }

    const { id } = usePage().props; // Access route parameters

    const { data, setData, post, processing, errors, reset } = useForm({
        vendor: vendor.id,
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

    return (
        <AuthenticatedLayout
            user={auth.user} order={order} fav={fav}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
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

                <section className='pt-[2 rem ] lg:flex relative'>
                    <div className='space-y-10 lg:w-[20%] filter p-5 shadow-md'>
                        <div className='box space-y-5 lg:sticky top-28'>
                            <div className=''>
                                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                    Food Category
                                </Typography>

                                <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                    <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                        {foodTypes.map((item) => (
                                            <FormControlLabel
                                                key={item.value}
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />
                                        ))}
                                    </RadioGroup>

                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='flex lg:w-[80%] lg:pl-10 pt-5'>
                        <div className="flex-1">
                            <div className="space-y-5">
                                {filteredMenus.map((listing) => (
                                    <MenuCard key={listing.id} listing={listing} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>

    );
}
