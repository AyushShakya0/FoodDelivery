import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddHomeIcon from '@mui/icons-material/AddHome';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, Divider, useMediaQuery } from '@mui/material'; // Added Divider import
import NavLink from '@/Components/NavLink';
import { red } from '@mui/material/colors';


const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Events", icon: <EventIcon /> },
    { title: "Notification", icon: <NotificationsActiveIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },
];

const handleNavigate = (e) => {
    console.log(listing.id);
    Inertia.visit(route("myprofile.next", { id: listing.id }));
};

export const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:900px)");

    return (
        <div>
            <Drawer variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                anchor='left'
                sx={{ zIndex: 1 }}>

                <div className='w-[50vw] lg:w-[20vw] h-[80vh] flex flex-col justify-center text-sm gap-6 pt-30'>
                    {/* {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </React.Fragment>
                    ))} */}


                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer text-lg' href={route('dashboard')} active={route().current('dashboard')}>
                        <HomeIcon />
                        Home
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer text-lg' href={route('myorders')} active={route().current('myorders')}>
                        <ShoppingBagIcon />
                        Orders
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('favorites')} active={route().current('favorites')}>
                        <FavoriteIcon />
                        Favorites
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('address')} active={route().current('address')}>
                        <AddHomeIcon />
                        Address
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('payments')} active={route().current('payments')}>
                        <AccountBalanceWalletIcon />
                        Payments
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('notification')} active={route().current('notification')}>
                        <NotificationsActiveIcon />
                        Notification
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('notification')} active={route().current('notification')}>
                        <NotificationsActiveIcon />
                        add for profile later

                    </NavLink>
                    {/* <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('profile.edit')} active={route().current('profile.edit')}>
                        <ManageAccountsIcon />
                        Personal Information
                    </NavLink>
                    <NavLink className='px-5 flex items-center space-x-5 cursor-pointer' href={route('dashboard')} active={route().current('dashboard')}>
                        <LogoutIcon />
                        Logout
                    </NavLink> */}
                </div>

            </Drawer>
        </div>
    );
};

// export default ProfileNavigation;
