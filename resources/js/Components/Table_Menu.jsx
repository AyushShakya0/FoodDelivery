import { useForm } from '@inertiajs/inertia-react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import PrimaryButton from './PrimaryButton';
import { Inertia } from '@inertiajs/inertia';


export default function Table({ auth, menus, columns, primary }) {

    const { data, setData, patch, processing, reset } = useForm({
    });

    const toggleAvailability = (id) => {

        patch(route('toggle.availability', id), {
            preserveScroll: true
        });
        reset(); // Reset form after successful submission

    };

    const deleteMenu = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            // Send a DELETE request to the appropriate endpoint
            Inertia.delete(route('menu.delete', { id: id }), {
                onSuccess: () => {
                    // Reload the page after successful deletion
                    Inertia.reload();
                },
                onError: (error) => {
                    console.error('Error deleting menu:', error);
                    // Handle error, show error message to user, etc.
                }
            });
        }
    };



    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* <th scope="col" className="px-6 py-3">{primary}</th> */}
                        <th scope="col" className="px-6 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Availability</th>
                        <th scope="col" className="px-6 py-3">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                #{menu.id}
                            </th> */}
                            <td className="px-6 py-4">
                                {/* <img src={menu.image} alt={menu.name} className="w-16 h-16" /> */}
                                <img src={`http://127.0.0.1:8000/storage/${menu.image}`} alt="food img" className="w-16 h-16" />
                            </td>
                            <td className="px-6 py-4">{menu.name}</td>
                            <td className="px-6 py-4">{menu.category}</td>
                            <td className="px-6 py-4">{menu.price}</td>
                            <td className="px-6 py-4">
                                <button
                                    className={`px-3 py-1 rounded-full ${menu.availability === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                    onClick={() => toggleAvailability(menu.id)}
                                >
                                    {menu.availability === 'available' ? 'Available' : 'Unavailable'}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <span>
                                    <a href={route('menu.edit', menu.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">edit</a>
                                </span>
                                <span>
                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2"
                                        onClick={() => deleteMenu(menu.id)}
                                    >
                                        <DangerousIcon />
                                    </button>
                                </span>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
