export default function TableOrder_Admin({ user, courier, vendor, checkout, orders, columns, primary, action }) {

    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{primary}</th>
                        {/* <th scope="col" className="px-6 py-3">ID</th> */}
                        <th scope="col" className="px-6 py-3">User</th>
                        <th scope="col" className="px-6 py-3">Vendor</th>
                        <th scope="col" className="px-6 py-3">Courier</th>
                        <th scope="col" className="px-6 py-3">Order</th>
                        <th scope="col" className="px-6 py-3">Phone Number</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {checkout.map((checkouts) => {
                        const matchingUser = user.find(u => u.id === checkouts.user_id);
                        const userName = matchingUser ? matchingUser.name : '';
                        const userNumber = matchingUser ? matchingUser.number : '';

                        const matchingCourier = courier.find(u => u.id === checkouts.courier_id);
                        const userCourier = matchingCourier ? matchingCourier.name : '';

                        // Assuming vendor is an array of vendor objects
                        const vendorNames = checkouts.vendor_id.map(checkoutVendorId => {
                            const matchingVendor = vendor.find(vendor => vendor.id === checkoutVendorId);
                            return matchingVendor ? matchingVendor.name : '';
                        });

                        console.log("Vendor Names:", vendorNames);

                        const orderName = checkouts.order_id.map(orderId => {
                            const matchingOrder = orders.find(order => order.id === orderId);
                            return matchingOrder ? matchingOrder.name : '';
                        });

                        // Assuming vendor is an array of vendor objects
                        const uniqueVendorNames = new Set(checkouts.vendor_id.map(checkoutVendorId => {
                            const matchingVendor = vendor.find(vendor => vendor.id === checkoutVendorId);
                            return matchingVendor ? matchingVendor.name : '';
                        }));

                        console.log("Unique Vendor Names:", Array.from(uniqueVendorNames));

                        return (
                            <tr key={checkouts.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    #{checkouts.id}
                                </td>
                                <td className="px-6 py-4">{userName}</td>
                                <td className="px-6 py-4">{uniqueVendorNames}</td>
                                <td className="px-6 py-4">{userCourier}</td>
                                <td className="px-6 py-4">{orderName}</td>
                                <td className="px-6 py-4">{userNumber}</td>
                                <td className="px-6 py-4">{checkouts.address}</td>
                                <td className="px-6 py-4">{checkouts.status}</td>
                                <td className="px-6 py-4">
                                    <a href={route(action, checkouts.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">View Details</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
