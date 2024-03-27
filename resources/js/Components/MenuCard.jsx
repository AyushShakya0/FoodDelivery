import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { post, route } from '@inertiajs/inertia-react';

const MenuCard = ({ listing }) => {
    const [count, setCount] = useState(2);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await post(route('addtocart', { product_id: productId }));

            if (response && response.status) {
                if (response.status === 'success') {
                    console.log('Item added to cart successfully');
                } else {
                    console.error('Failed to add item to cart:', response.message);
                }
            } else {
                console.error('Invalid response from server:', response);
            }
        } catch (error) {
            console.error('An error occurred while adding item to cart:', error.message);
        }
    };

    return (
        <div className="relative">
            <div key={listing.id}>
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img className="w-[7rem] h-[7rem] object-cover" src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                        <div className="space-y-1 lg:space-y-5 lg:max-2xl">
                            <p className="font font-semibold text-xl">{listing.name}</p>
                            <p>{listing.price}</p>
                            <p className="text-gray-400">{listing.description}</p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center">
                        <div className='p-2'>
                            <RemoveCircleIcon onClick={handleDecrement} />
                            <span className='p-2'>{count} </span>
                            <AddCircleIcon onClick={handleIncrement} />
                        </div>
                        <button onClick={() => addToCart(listing.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
