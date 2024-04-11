export default function Table({ checkout, orders, columns, primary, action }) {
    
    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">{primary}</th>
                    {/* <th scope="col" className="px-6 py-3">ID</th> */}
                    <th scope="col" className="px-6 py-3">User</th>
                    <th scope="col" className="px-6 py-3">Courier</th>
                    <th scope="col" className="px-6 py-3">Order</th>
                    <th scope="col" className="px-6 py-3">Phone Number</th>
                    <th scope="col" className="px-6 py-3">Address</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {checkout.map((checkouts) => (
                    <tr key={checkouts.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #{checkouts.id}
                        </td>
                        {/* <td className="px-6 py-4">{vendor.id}</td> */}
                        <td className="px-6 py-4">{checkouts.user_id}</td>
                        <td className="px-6 py-4">{checkouts.courier_id}</td>
                        <td className="px-6 py-4">{checkouts.order_id}</td>
                        <td className="px-6 py-4">{checkouts.number}</td>
                        <td className="px-6 py-4">{checkouts.address}</td>
                        <td className="px-6 py-4">

                            <a href={route(action, checkouts.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">View Details</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}
