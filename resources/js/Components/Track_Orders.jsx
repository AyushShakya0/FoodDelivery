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
    const statuses = ['Ordered', 'Prepping', 'Ready', 'Delivering', 'Reached'];

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full">
                <div key={checkout.id}>
                    <Card className="w-full h-20p p-4 mb-4 overflow-auto">
                        <div className="flex space-x-2">
                            {statuses.map((s) => (
                                <Chip
                                    key={s}
                                    size="small"
                                    style={{ backgroundColor: statusColors[s.toLowerCase()] }}
                                    label={s}
                                />
                            ))}
                        </div>
                        <div className="p-4 flex flex-wrap ">
                            {ordersToShow.map((listing) => (
                                <Track_Orders_inside_it key={listing.id} order={listing} />
                            ))}
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
}
