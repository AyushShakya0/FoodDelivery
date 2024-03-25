import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { OtherHouses } from '@mui/icons-material';
import { Card, Chip, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import TextInput from '@/Components/TextInput';


const MenuCard = ({ listing, menus }) => {
    const handleCheckboxChange = (value) => {
        console.log(value)

    }

    // const ingredients = [
    //     {
    //         category: "Nuts & seeds",
    //         ingredients: "listing"
    //     },
    //     {
    //         category: "Protein",
    //         ingredients: "Beef"
    //     },
    //     {
    //         category: "Carbs",
    //         ingredients: "Bacon Strips"
    //     },

    // ]

    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        user_id: "",
        items: [""],
        quantity: "",
        price: "",
        status: "",
    });

    // console.error('Menu from menucard:', menus);
    // console.log("listing id", listing.id);
    // console.log("listing", listing);

    const [count, setCount] = useState(2);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };


    const submit = (e) => {
        e.preventDefault();
        post(route("cart.store"));
        reset(); // Reset form after successful submission
    };





    return (
        <div>
            <div key={listing.id}>

                {/* <div className='lg:flex items-center justify-between' key={listing.id} onClick={() => onClickHandler(listing.id)}> */}
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-[7rem] h-[7rem] object-cover' src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
                        <div className='space-y-1 lg:space-y-5 lg:max-2xl'>
                            <p className='font font-semibold text-xl'>
                                {listing.name}
                            </p>
                            {/* <AttachMoneyIcon/> */}
                            <p>{listing.price}</p>
                            <p className='text-gray-400'>{listing.description}</p>
                        </div>
                    </div>
                </div>

                {/* <form action="{{ route('cart.store') }}" method="POST"> */}
                <form action="{{ route('cart.store') }}" method="POST">



                <div className='pt-5 gap-4'>
                    <button onClick={handleDecrement}><RemoveCircleIcon /></button>
                    {/* <span>{listing.quantity}</span> */}
                    <span>{count}</span>
                    <button onClick={handleIncrement}><AddCircleIcon /></button>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.quantity}
                        onChange={(e) => setData({ ...data, quantity: e.target.value })}
                    />

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>


                    {/* :href */}
                    {/* <InertiaLink href="`/addtocart/${product_id}`" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Add to cart</InertiaLink> */}


                </div>

            </form>



        </div>




        </div >








        // <form onSubmit={submit}>
        //     <div key={listing.id}>
        //         <Accordion>
        //             <AccordionSummary
        //                 expandIcon={<ExpandMoreIcon />}
        //                 aria-controls="panel1-content"
        //                 id="panel1-header"
        //             >

        //                 <div className='lg:flex items-center justify-between' key={listing.id} onClick={() => onClickHandler(listing.id)}>
        //                     <div className='lg:flex items-center lg:gap-5'>
        //                         <img className='w-[7rem] h-[7rem] object-cover' src={`http://127.0.0.1:8000/storage/${listing.image}`} alt="food img" />
        //                         <div className='space-y-1 lg:space-y-5 lg:max-2xl'>
        //                             <p className='font font-semibold text-xl'>
        //                                 {listing.name}
        //                             </p>
        //                             {/* <AttachMoneyIcon/> */}
        //                             <p>{listing.price}</p>
        //                             <p className='text-gray-400'>{listing.description}</p>
        //                         </div>
        //                     </div>
        //                 </div>

        //             </AccordionSummary>
        //             <AccordionDetails>


        //                 {/* <div style={{ display: "flex", gap: "5%" }} key={listing.id} >
        //                     {ingredients.map((item) => (
        //                         <div>
        //                             <Checkbox />{listing.customization}

        //                         </div>

        //                     ))}
        //                 </div> */}

        //                 <div className='pt-5'>
        //                     <button onClick={handleDecrement}><RemoveCircleIcon /></button>
        //                     <span>{count}</span>
        //                     <button onClick={handleIncrement}><AddCircleIcon /></button>
        //                     <div>
        //                         {/* :href */}
        //                         <InertiaLink href="`/addtocart/${listing.id}`" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</InertiaLink>
        //                     </div>


        //                     {/* <Button variant='contained' disabled={false} type="submit">
        //                     {true ? "Add to Cart" : "Out of Stock"}

        //                 </Button> */}

        //                 </div>



        //             </AccordionDetails>
        //         </Accordion>
        //     </div>


        // </form>

    )
}

export default MenuCard
