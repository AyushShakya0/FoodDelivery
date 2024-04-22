import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm, usePage } from '@inertiajs/react'; // Import usePage hook
// import { route } from '@inertiajs/inertia-react';

const MenuCard = ({ listing }) => {
    const [count, setCount] = useState(1);
    const { props: { success } } = usePage(); // Access success message from props
    // const [checkOut,setCheckOut] = useState([])
    // const [itemn,setCheckOut] = useState([])


    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: count,
        name: listing.name,
        price: listing.price * count,
        image: listing.image,
        // menu_id: listing.id,
        vendor: listing.vendor_id,
    });

    useEffect(() => {
        setData({
            quantity: count,
            price: listing.price * count,
            name: listing.name,
            image: listing.image,
            vendor: listing.vendor_id,
        });
    }, [count, setData, listing.price]);


    const handleIncrement = () => {
        setCount(Math.floor(count) + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(Math.floor(count) - 1);
        }
    };

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("addtocart", { id: listing.id }),{
    //         preserveScroll:true
    //     });
    //     reset(); // Reset form after successful submission
    // };

    const submit = (e) => {
        e.preventDefault();
        post(route("addtocart", { id: listing.id }), {
            preserveScroll: true
        }).then(() => {
            // Show success message using react-toastify
            toast.success('Item added to cart successfully', {
                position: 'top-right',
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            reset(); // Reset form after successful submission
        }).catch((error) => {
            console.error('Error adding item to cart:', error);
            // Handle error, show error message to user, etc.
        });
    };

    return (
        <div className="relative">
            <div key={listing.id}>
                {success && ( // Check if success message exists
                    <div className="bg-green-200 text-green-800 p-3 mb-3 rounded">
                        {success}
                    </div>
                )}
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img className="w-[7rem] h-[7rem] object-cover" src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                        <div className="space-y-1 lg:space-y-5 lg:max-2xl">
                            <p className="font font-semibold text-xl">{listing.name}</p>
                            <p>{listing.price * count}</p>
                            <p className="text-gray-400">{listing.description}</p>
                            {/* <p className="text-gray-400">{listing.vendor_id}</p> */}
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
