import React from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, IconButton } from '@mui/material';

const CartItem = () => {
  return (
    <div className='px-5'>
        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img src="./r1.jpg" alt="image" />
            </div>
            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>
                    <p>biryani</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>
                            <IconButton>
                                <RemoveCircleIcon/>
                            </IconButton>
                            <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                {5}
                            </div>
                            <IconButton>
                                <AddCircleIcon/>
                            </IconButton>

                        </div>
                        <div>
                            <p>Rs 1200</p>
                        </div>

                    </div>
                    {/* <div className='pt-3 space-x-2'>
                        {[1,1,1,].map((item)=><Chip label={"bread"} />)}

                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem
