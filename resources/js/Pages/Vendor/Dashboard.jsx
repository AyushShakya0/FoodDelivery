import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head, useForm } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function Dashboard({ auth }) {
    const user = usePage().props.auth.user;
    const [status, setStatus] = useState(auth.user.status);

    const { data, setData, patch } = useForm({
        status: auth.user.status // Set initial status from props
    });

    console.log(auth.user.status)

    useEffect(() => {
        setStatus(auth.user.status);
    }, [auth.user.status]);

    const handleClick = () => {
        patch(route('vendor.status', auth.user.id), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission

    };

    return (
        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor Dashboard</h2>}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Vendor Dashboard</div>
                        <div>
                            <button onClick={handleClick} className={`px-4 py-2 rounded-md focus:outline-none ${status === 'open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {status === 'open' ? 'Open' : 'Closed'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout_Vendor>
    );
}
