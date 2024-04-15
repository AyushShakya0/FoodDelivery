import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <nav className="bg-white border-b border-gray-100 w-64 fixed top-0 bottom-0 overflow-y-auto" style={{ overflow: 'hidden' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between h-screen">
                        <div>
                            <div className="flex items-center mt-8 mb-8">
                                <Link href={route('vendor.dashboard')} className="flex items-center">
                                    <img
                                        src="/logo.png"
                                        alt="GoFood Logo"
                                        className="h-4 w-auto text-gray-800" // Adjusted classes
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center mt-6"> {/* Wrap icon and text in a flex container */}
                                <AccountCircleIcon style={{ fontSize: 32 }} />
                                <div className="ml-2">
                                    <div className="font-medium text-base text-gray-800">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>

                            <div className="mt-8 pb-8 text-5xl">
                                <div>
                                    <NavLink href={route('vendor.dashboard')} active={route().current('vendor.dashboard')} className="block py-2 px-4 text-sm text-gray-700">
                                        Vendor Dashboard
                                    </NavLink>
                                </div>
                                <div>

                                    <NavLink href={route('orders.index')} active={route().current('orders.index')} className="block py-2 px-4 text-sm text-gray-700">
                                        Order
                                    </NavLink>
                                </div>
                                <div>

                                    <NavLink href={route('menu.index')} active={route().current('menu.index')} className="block py-2 px-4 text-sm text-gray-700">
                                        Menu
                                    </NavLink>
                                </div>
                                <div>

                                    <NavLink href={route('order_history_vendor')} active={route().current('order_history_vendor')} className="block py-2 px-4 text-sm text-gray-700">
                                        Order History
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink href={route('vendor.finance')} active={route().current('vendor.finance')} className="block py-2 px-4 text-sm text-gray-700">
                                        Order & Transaction
                                    </NavLink>
                                </div>


                                {/* <div>

                                    <NavLink href={route('vendor.setting')} active={route().current('vendor.setting')} className="block py-2 px-4 text-sm text-gray-700">
                                        Settings
                                    </NavLink>
                                </div> */}


                            </div>
                        </div>

                        <div className="pb-4">
                            <div className="mt-6">
                                <ResponsiveNavLink href={route('vendor.profile.edit')} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('vendor.logout')} as="button" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-1 ml-64 overflow-y-auto"> {/* Added ml-64 class to create space for the fixed sidebar */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
