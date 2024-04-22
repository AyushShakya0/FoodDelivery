import { Card, Chip } from '@mui/material';
import React from 'react';
import Track_Orders_inside_it from '@/Components/Track_Orders_inside_it';

const statusColors = {
    ordered: 'hsl(225, 100%, 50%)',
    prepping: 'hsl(195, 100%, 50%)',
    ready: 'hsl(165, 100%, 50%)',
    delivering: 'hsl(135, 100%, 50%)',
    'destination reached': 'hsl(105, 100%, 50%)' // Updated key to 'destination reached'
};

export default function TrackOrders({ checkout, order }) {
    const statuses = ['Ordered', 'Prepping', 'Ready', 'Delivering', 'Destination reached']; // Updated to 'Destination reached'

    console.log('checkout status',checkout.status)
    console.log('checkout',checkout)
    console.log('order',order)

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
                                    style={{
                                        backgroundColor: checkout.status.toLowerCase() === s.toLowerCase() ? statusColors[s.toLowerCase()] : 'transparent',
                                        fontSize: '14px', // Set font size to 14px
                                    }}
                                    label={s}
                                />
                            ))}
                        </div>

                        <div className="p-4 flex flex-wrap gap-4 justify-center">
                            {order.slice(0, 4).map((listing) => (
                                <Track_Orders_inside_it key={listing.id} order={listing} allOrders={order} />
                            ))}
                        </div>
                        {order.length > 4 && (
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
