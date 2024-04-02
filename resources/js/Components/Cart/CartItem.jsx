import React from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, IconButton } from '@mui/material';

const CartItem = ({ cart, quantity }) => {

    // console.log("cart from cartitem", cart)
    // console.log("quantity from cartitem", quantity)
    // console.log("menus from cartitem",menus)
    return (
        <div className='px-5'>

            {/* {cart.map((carts) => (
                <div className='lg:flex items-center lg:space-x-5'>
                    <div>
                        <img src={`http://127.0.0.1:8000/storage/${carts.image}`} alt="food img" />

                    </div>
                    <div className='flex items-center justify-between lg:w-[70%]'>
                        <div className='space-y-1 lg:space-y-3 w-full'>
                            <p>{carts.name}</p>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center space-x-1'>
                                    <IconButton>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                        5
                                    </div>
                                    <IconButton>
                                        <AddCircleIcon />
                                    </IconButton>

                                </div>
                                <div>
                                    <p>Rs. {carts.price}</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            ))} */}


            {/* <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img src={`http://127.0.0.1:8000/storage/${carts.image}`} alt="food img" className="w-16 h-16" />

                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{cart.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <RemoveCircleIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    5
                                </div>
                                <IconButton>
                                    <AddCircleIcon />
                                </IconButton>

                            </div>
                            <div>
                                <p>Rs. {cart.price}</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div> */}

            {/* <img src={menu.image} alt={menu.name} className="w-16 h-16" /> */}

            {/* <div className='pt-3 space-x-2'>
                        {[1,1,1,].map((item)=><Chip label={"bread"} />)}

                    </div> */}
        </div>
    )
}

export default CartItem
