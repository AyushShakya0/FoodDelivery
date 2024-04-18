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




const categories = [
    "pizza",
    "burger",
    "sandwich",
    "pasta",
    "momo",
]

const foodTypes = [
    { label: "All", value: "all", },
    { label: "Vegetarian only", value: "vegitarian", },
    { label: "Non-vegetarian", value: "non_vegetarian", },
    { label: "Seasonal", value: "seasonal", },

]


export default function RestaurantDetails({ auth, vendor, menus, order, fav }) {
    const [foodType, setFoodType] = useState("all")
    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name)
    }

    console.log('menus',menus)
    console.log('vendor',vendor)
    console.log('order',order)
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
        post(route("addfavorite", { id: vendor.id }),{
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
                        <h1 className='text-4xl font-semibold'>{vendor.name}</h1>
                        <p className='text-gray-500 mt-1'>
                            {vendor.description}
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ab saepe voluptas blanditiis deleniti quia ut repellendus explicabo accusantium non laboriosam quos eaque iusto a, soluta necessitatibus aperiam mollitia quam!
                        </p>
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
                </section>
                <Divider />
                <section className='pt-[2 rem ] lg:flex relative'>
                    <div className='space-y-10 lg:w-[20%] filter p-5 shadow-md'>
                        <div className='box space-y-5 lg:sticky top-28'>
                            <div className=''>
                                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                    Food Type
                                </Typography>

                                <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                    <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                        {foodTypes.map((item) =>
                                            <FormControlLabel
                                                key={item}
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />)}

                                    </RadioGroup>

                                </FormControl>
                            </div>
                            <Divider />

                            <div className=''>
                                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                    Food Category
                                </Typography>

                                <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                    <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                        {categories.map((item) =>
                                            <FormControlLabel
                                                key={item}
                                                value={item}
                                                control={<Radio />}
                                                label={item}
                                            />)}

                                    </RadioGroup>

                                </FormControl>
                            </div>

                        </div>
                    </div>
                    <div className='flex lg:w-[80%] lg:pl-10 pt-5'>
                        <div className="flex-1">
                            <div className="space-y-5">
                                {menus.map((listing) => (
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
