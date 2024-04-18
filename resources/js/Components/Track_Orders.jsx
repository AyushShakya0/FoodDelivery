import { Card, Chip } from '@mui/material';
import React from 'react';
import Track_Orders_inside_it from '@/Components/Track_Orders_inside_it';

const statusColors = {
    ordered: 'hsl(225, 100%, 50%)',
    prepping: 'hsl(195, 100%, 50%)',
    ready: 'hsl(165, 100%, 50%)',
    delivering: 'hsl(135, 100%, 50%)',
    reached: 'hsl(105, 100%, 50%)'
};

export default function TrackOrders({ checkout, order }) {
    const ordersToShow = order.filter(orderItem => checkout.order_id.includes(orderItem.id));
console.log(order)
console.log(ordersToShow)

    const statuses = ['Ordered', 'Prepping', 'Ready', 'Delivering', 'Reached'];

    const mainOrders = ordersToShow.slice(0, 4); // Get first 4 items

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full">
                <div key={checkout.id} className="mx-4 md:mx-10">
                    <Card className="w-full h-20p p-4 mb-4 overflow-auto">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            {statuses.map((s) => (
                                <Chip
                                    key={s}
                                    size="small"
                                    style={{ backgroundColor: statusColors[s.toLowerCase()] }}
                                    label={s}
                                />
                            ))}
                        </div>
                        <div className="p-4 flex flex-wrap gap-4 justify-center">
                            {mainOrders.map((listing) => (
                                <Track_Orders_inside_it key={listing.id} order={listing} allOrders={ordersToShow} />
                            ))}
                        </div>
                        {ordersToShow.length > 4 && (
                            <div className="p-4">
                                <button>and more...</button>
                            </div>
                        )}

                        <div className="flex justify-center mt-4">
                            <a href={route("track.order_id", checkout.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</a>
                        </div>
                    </Card>


                </div>
            </div>
        </div>
    );
}
