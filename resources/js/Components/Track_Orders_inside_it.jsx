import React from 'react';

const TrackOrdersInsideIt = ({ order }) => {
    // Function to truncate text if it exceeds a certain length
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-64 bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={`http://127.0.0.1:8000/storage/${order.image}`}
                                alt="food img"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{truncateText(order.name, 15)}</p>
                            <p className="text-gray-400 text-sm">Qty: {order.quantity}</p>
                            <p className="text-gray-400 text-sm">${order.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrdersInsideIt;
