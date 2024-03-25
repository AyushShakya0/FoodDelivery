import React from 'react';
import { Card, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const AddressCard = ({ item, showButton, handleSelectAddress }) => {


    return (
        <div>
            <Card className="flex gap-5 w-64 p-5">
                <HomeIcon />
                <div className='space-y-3 text-gray-500'>
                    <h1 className='font-semibold text-lg text-gray-800'>Home</h1>
                    <p>
                        Kathmandu, 550032 Nepal Address
                    </p>
                    {showButton && (
                        <Button variant="outlined" onClick={() => handleSelectAddress(item)}>select</Button>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AddressCard;
