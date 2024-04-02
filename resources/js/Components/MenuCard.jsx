import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm } from '@inertiajs/react';
// import { route } from '@inertiajs/inertia-react';

const MenuCard = ({ listing, vendor }) => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        // initialValues: { count: count }, // Use initialValues instead of passing count directly
        count:count,
        menu_id: listing.id,
        vendor_id: vendor,
    });

    // console.log("listing ID", listing);
    // console.log("Vendor ID", vendor);

    const submit = (e) => {
        e.preventDefault();
        post(route("addtocart", { id: listing.id }));
        // Inertia.visit(route("restaurant.details", { id: listing.id }));

        reset(); // Reset form after successful submission
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
                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                        <div className="absolute top-0 right-0 flex items-center">
                            <div className='p-2'>
                                <RemoveCircleIcon onClick={handleDecrement} />
                                <span className='p-2'>{count} </span>
                                <AddCircleIcon onClick={handleIncrement} />
                            </div>
                            <div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
