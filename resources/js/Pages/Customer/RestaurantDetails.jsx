import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import MultiItemCarousel from '@/Components/MultiItemCarousel';
import RestaurantCard from '@/Components/RestaurantCard';
import { Grid, Divider, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
import MenuCard from '@/Components/MenuCard';



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





export default function RestaurantDetails({ auth, vendor, menus }) {
    const [foodType, setFoodType] = useState("all")
    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name)
    }

    const { id } = usePage().props; // Access route parameters

    const vendorMenus = menus.filter(menuItem => menuItem.vendor_id === vendor.id && menuItem.availability === 'available');

    // console.log("vendorr",vendor);
    // console.log("menuss",menus);
    // console.log("vendormenuss",vendorMenus);



    return (
        <AuthenticatedLayout
            user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Restaurant Details" />

            <div className='px5 lg:px-20 '>
                <section>
                    <h3 className='text-gray-500 py-0 mt-3'>Home/Nepal/Moyes Royos/3</h3>
                    <div>
                        <img className="w-full h-[60vh] object-cover" src={`http://127.0.0.1:8000/storage/${vendor.image}`} alt="Restaurant image" />
                    </div>

                    <div className='pt-2 pb-5'>
                        <h1 className='text-4xl font-semibold'>{vendor.name}</h1>
                        <p className='text-gray-500 mt-1'>
                            {vendor.name}
                            {/* {vendor.description} */}
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ab saepe voluptas blanditiis deleniti quia ut repellendus explicabo accusantium non laboriosam quos eaque iusto a, soluta necessitatibus aperiam mollitia quam!
                        </p>
                        <div className='space-y-3 mt-2'>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <LocationOnIcon />
                                <span>
                                    {/* Kathmandu, Nepal */}
                                    {vendor.address}
                                </span>

                            </p>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <CalendarTodayIcon />
                                <span>
                                    {/* {vendor.name} */}
                                    {vendor.time}

                                </span>
                            </p>

                        </div>

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
                                {vendorMenus.map((listing) => (
                                    <MenuCard key={listing.id} listing={listing} vendor={vendor.id}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



            </div>



        </AuthenticatedLayout>

    );
}
