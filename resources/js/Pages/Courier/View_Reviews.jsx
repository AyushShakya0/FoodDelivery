import AuthenticatedLayout_Courier from '@/Layouts/AuthenticatedLayout_Courier';
import { Head } from '@inertiajs/react';
import Table_Menu from '@/Components/Table_Menu';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Menu_Display({ auth, rating }) {

console.log(rating,'its working')
    return (
        <Router> {/* Wrap your component with BrowserRouter */}
            <AuthenticatedLayout_Courier
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu Display</h2>}
            >
                <Head title="Menu Display" />

                <div className="py-12">
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
            </AuthenticatedLayout_Courier>
        </Router>
    );
}
