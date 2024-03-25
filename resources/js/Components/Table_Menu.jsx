import axios from 'axios';

export default function Table({ menus, columns, primary }) {
    const toggleAvailability = (id) => {
        // Implement the logic to toggle availability for the item with the given id
        // You can use Inertia or any other method to handle the state change
        console.log('Toggle availability for item with id:', id);

        axios.patch(`/menu/${id}/toggleAvailability`)
            .then(response => {
                console.log(response.data.message); // Log success message
                // Optionally, update the state or trigger a re-fetch of menu items
            })
            .catch(error => {
                console.error('Error toggling availability:', error); // Log error message
                // Optionally, display an error message to the user
            });
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
