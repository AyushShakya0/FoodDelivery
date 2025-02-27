import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import Table_Menu from '@/Components/Table_Menu';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Pagination from '@/Components/Pagination';


const columns = [
    'Menu Number',
    'Dish',
    'Action',
];

export default function Menu_Display({ auth, menu }) {


    return (
        <Router> {/* Wrap your component with BrowserRouter */}
            <AuthenticatedLayout_Vendor
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu Display</h2>}
            >
                <Head title="Menu Display" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {auth.user.verified === 'yes' ? (
                                    <div className="p-6 text-gray-900">
                                        <Table_Menu menus={menu.data} columns={columns} primary="menu number"></Table_Menu>
                                        <a href={route('menu.add')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Add Menu
                                        </a>
                                        <Pagination
                                            meta={menu}
                                            pageSize={2}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-6 text-gray-900">
                                        <p>This vendor is not verified.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout_Vendor>
        </Router>
    );
}
