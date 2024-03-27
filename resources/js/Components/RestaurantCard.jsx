import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, usePage } from '@inertiajs/inertia-react'; // Import usePage hook
import Button from '@mui/material/Button';
import { Inertia } from "@inertiajs/inertia";



export default function RestaurantCard({ listing }) {
    const onClickHandler = (e) => {
        console.log(listing.id);
        Inertia.visit(route("restaurant.details", { id: listing.id }));
    };

    return (
        <div>
            <div>
                {/* commenting this for now */}
                {/* <IconButton>
                                {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton>
                                {listing.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton> */}

                {/* <a href={route("restaurant.details",  { id: listing.id })} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View </a> */}



            </div>

            {/* <div key={listing.id} onClick={() => onClickHandler(listing.id)}>
                <Card className='w-[18rem]'>
                    <div className={`${true ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                        <img className='w-full h-[10rem] rounded-t-md object-cover' src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="restaurant img" />

                        <Chip
                            size="small"
                            className="absolute top-2 left-2"
                            color={true ? "success" : "error"}
                            label={true ? "open" : "closed"}
                        />
                    </div>
                    <div className='p-4 textPart lg:flex w-full justify-between'>
                        <div className='space-y-1'>
                            <p className='font-semibold text-lg'>{listing.name}</p>
                            <p className='text-gray-500 text-sm'>{listing.address}</p>
                            <p className='text-gray-500 text-sm'>{listing.cuisine}</p>
                        </div>
                        <div>


                        </div>
                        <FavoriteIcon/>

                        <Button variant="contained" size="small" onClick={onClickHandler}>
                            View
                        </Button>


                    </div>
                </Card>
            </div> */}
            <div key={listing.id} onClick={() => onClickHandler(listing.id)}>
                <Card style={{ width: '18rem', height: '18rem', display: 'flex', flexDirection: 'column' }}>
                    <div className={`${true ? 'cursor-pointer' : 'cursor-not-allowed'} relative`} style={{ width: '100%', height: '10rem' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="restaurant img" />

                        <Chip
                            size="small"
                            className="absolute top-2 left-2"
                            color={listing.status === "open" ? "success" : "error"}
                            label={listing.status === "open" ? "Open" : "Closed"}
                        />

                    </div>
                    <div className='p-4 textPart lg:flex w-full justify-between' style={{ flex: '1' }}>
                        <div className='space-y-1'>
                            <p className='font-semibold text-lg'>{listing.name}</p>
                            <p className='text-gray-500 text-sm'>{listing.address}</p>
                            <p className='text-gray-500 text-sm'>{listing.cuisine}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                            {/* <Button
                                variant="contained"
                                size="small"
                                onClick={listing.status === "closed" ? null : onClickHandler}
                                disabled={listing.status === "closed"}
                            >
                                View
                            </Button> */}

                            {listing.status === "open" && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={onClickHandler}
                                >
                                    View
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
