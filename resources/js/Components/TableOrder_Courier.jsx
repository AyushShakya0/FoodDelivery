import { useForm } from "@inertiajs/inertia-react";
import PrimaryButton from "./PrimaryButton";

export default function TableOrder_Courier({ auth, user, courier, vendor, checkout, orders, columns, primary, action }) {
    // Filter checkout records where courier_id is null
    const checkoutsWithoutCourier = checkout.filter(checkout => !checkout.courier_id);
    // Filter out checkout items with status "Destination reached"
    const filteredCheckout = checkout.filter(item => item.status !== 'Destination reached');
    // Check if the authenticated user is a courier for any non "Destination reached" checkout
    const isCourier = filteredCheckout.some(item => item.courier_id === auth.user.id);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        courier_id: auth.user.id,
    });

    const submit = (e, checkoutId) => {
        e.preventDefault();

        // Patch the checkout with the given ID
        patch(route('courier.orders.update', checkoutId), {
            courier_id: auth.user.id,
            preserveScroll: true
        });
    };
    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{primary}</th>
                        {/* <th scope="col" className="px-6 py-3">ID</th> */}
                        <th scope="col" className="px-6 py-3">User</th>
                        <th scope="col" className="px-6 py-3">Vendor</th>
                        <th scope="col" className="px-6 py-3">Order</th>
                        <th scope="col" className="px-6 py-3">Phone Number</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {checkoutsWithoutCourier.map((checkouts) => {
                        const matchingUser = user.find(u => u.id === checkouts.user_id);
                        const userName = matchingUser ? matchingUser.name : '';
                        const userNumber = matchingUser ? matchingUser.number : '';

                        const orderName = checkouts.order_id.map(orderId => {
                            const matchingOrder = orders.find(order => order.id === orderId);
                            return matchingOrder ? matchingOrder.name : '';
                        });

                        // Assuming vendor is an array of vendor objects
                        const uniqueVendorNames = new Set(checkouts.vendor_id.map(checkoutVendorId => {
                            const matchingVendor = vendor.find(vendor => vendor.id === checkoutVendorId);
                            return matchingVendor ? matchingVendor.name : '';
                        }));

                        return (
                            <tr key={checkouts.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    #{checkouts.id}
                                </td>
                                <td className="px-6 py-4">{userName}</td>
                                <td className="px-6 py-4">{uniqueVendorNames}</td>
                                <td className="px-6 py-4">{orderName}</td>
                                <td className="px-6 py-4">{userNumber}</td>
                                <td className="px-6 py-4">{checkouts.address}</td>
                                <td className="px-6 py-4">{checkouts.status}</td>
                                <td className="px-6 py-4">
                                    {isCourier ? (
                                        <p>Delivery Pending</p>

                                    ) : (
                                        <form onSubmit={(e) => submit(e, checkouts.id)} className="">
                                            {/* Button for submitting */}
                                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">
                                                <PrimaryButton disabled={processing}>Accept</PrimaryButton>
                                            </div>
                                        </form>)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
