import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart_offcanvas from '@/Pages/Customer/Cart_offcanvas';
import Favorites_offcanvas from '@/Pages/Customer/Favorites_offcanvas';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Grid, Divider } from '@mui/material';



export default function Authenticated({ user, header, children, food, order, fav }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const [showingNavigationDropdownn, setShowingNavigationDropdownn] = useState(false);
    const [cartOpenn, setCartOpenn] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <nav className="bg-gray-100 border-b border-gray-100 fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')} className="flex items-center">
                                    <img
                                        src="/logo.png"
                                        alt="GoFood Logo"
                                        className="h-4 w-auto text-gray-800" // Adjusted classes
                                    />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex pl-80">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Home
                                </NavLink>

                                <NavLink href={route('restaurants')} active={route().current('restaurants')}>
                                    Restaurants
                                </NavLink>

                                <NavLink href={route('cart')} active={route().current('cart')}>
                                    My Cart
                                </NavLink>

                                <NavLink href={route('track.order')} active={route().current('track.order')}>
                                    Track Order
                                </NavLink>


                                {/* <NavLink href={route('myprofile')} active={route().current('myprofile')}>
                                    My profile
                                </NavLink> */}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className='pr-2'>
                                <button onClick={() => setCartOpenn(true)}><FavoriteIcon className='text-red-600' /></button>
                                <Favorites_offcanvas open={cartOpenn} fav={fav} onClose={() => setCartOpenn(false)} />
                            </div>
                            <div className='pr-2'>
                                <button onClick={() => setCartOpen(true)}><ShoppingCartIcon /></button>
                                <Cart_offcanvas open={cartOpen} order={order} user={user.id} onClose={() => setCartOpen(false)} />
                            </div>
                            <div className='pr-2'>
                                <button onClick={() => setCartOpenn(true)}><NotificationsIcon /></button>
                                <Favorites_offcanvas open={cartOpenn} fav={fav} user={user.id} onClose={() => setCartOpenn(false)} />
                            </div>
                            <div className="ms-3 relative  className='bg-gray-100'">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md bg-gray-100">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-100 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className='bg-gray-100'>
                                        <Dropdown.Link href={route('profile.edit')} className='bg-gray-100'>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('checkout')} className='bg-gray-100'>Checkout</Dropdown.Link>
                                        {/* <Dropdown.Link href={route('track.order')} className='bg-gray-100'>Track my Order</Dropdown.Link> */}
                                        <Dropdown.Link href={route('order.history')} className='bg-gray-100'>Order History</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className='bg-gray-100'>
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('checkout')}>Checkout</ResponsiveNavLink>
                            {/* <ResponsiveNavLink href={route('track.order')}>Track my Order</ResponsiveNavLink> */}
                            <ResponsiveNavLink href={route('order.history')} >Order History</ResponsiveNavLink>

                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div style={{ paddingTop: '4rem' }} />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className='mb-10 flex-grow'>{children}</main>

            {/* <Divider />
                <footer className="bg-gray-100 text-gray-800 py-8 px-4 md:px-16">
                    <div className="container mx-auto flex flex-wrap justify-between">
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">WE'RE GOFOOD</h4>
                            <ul className='text-gray-500 text-md'>
                                <li>About Us</li>
                                <li>Available Areas</li>
                                <li>Delivery Charges</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">SERVICE HOURS</h4>
                            <p className='text-gray-500'>08:00 AM to 9:00 PM (NST)</p>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">GET HELP</h4>
                            <ul className='text-gray-500'>
                                <li>How to Order?</li>
                                <li>FAQs</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">CALL US</h4>
                            <p className='text-gray-500'>Kathmandu: 5970477, 4544177, 4540979, 9802034008</p>
                            <p className='text-gray-500'>Pokhara: 9802859990, 9802853330</p>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">DOWNLOAD APP</h4>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Download Now</button>
                        </div>
                        <div className="footer__section mb-4">
                            <h4 className="text-lg font-semibold mb-2">CONNECT WITH US</h4>
                            <ul className='text-gray-500'>
                                <li>Terms of Usage</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="container mx-auto text-center mt-8">
                        <p>© 2020 GoFood Pvt. Ltd. All Rights Reserved</p>
                    </div>
                </footer> */}

        </div>
    );
}
