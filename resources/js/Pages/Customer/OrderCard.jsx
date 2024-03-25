import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-betweena items-centera p-5'>
        <div className=' flex items-center space-x-5'>
        <img className='h-16 w-16' src="./r1.jpg" alt="image" />
        <div>
            <p>Burger</p>
            <p>Rs 200</p>
        </div>
        </div>
        {/* <div className="flex justify-end"  style={{ display: 'grid', placeItems: 'end' }}> */}
        <div>
            <Button className='cursor-not-allowed'>completed</Button>
        </div>
    </Card>
  )
}

export default OrderCard
