import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import { Divider, Modal } from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Card, Button, Box, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Chip, IconButton } from '@mui/material';


const Cart = ({ cart, menus }) => {
    const createOrderUsingSelectedAddress = () => {

    }

    const filteredMenus = menus.filter(menuItem => {
        return cart.some(cartItem => cartItem.menu_id === menuItem.id);
    });


    console.log("menu", menus)
    console.log("cart", cart)
    console.log("filtered menu", filteredMenus)




    const handleOpenAddressModel = () => setOpen(true);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        // outline: none,
    };

    const initialValues = {
        streetAddress: "",
        state: "",
        pincode: "",
        city: "",
    }

    const handleSubmit = (value) => {
        console.log("value", value);
    }


    return (
        <>
            <main className='lg:flex justify-between '>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {/* {filteredMenus.map((item) =>
                        <CartItem cart={filteredMenus} quantity={cart} />
                    )} */}

                    {cart.map((carts) => (
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
                                                {carts.quantity}
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

                    ))}
                    <Divider />
                    <div className='billDetail px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3 '>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs 1499</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Fee</p>
                                <p>Rs 81</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>GST and Restaurant charges</p>
                                <p>Rs 199</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Total pay</p>
                            <p>Rs 2100</p>
                        </div>

                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>
                            Choose Delivery Address
                        </h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1, 1, 1, 1].map((item, index) => (
                                <AddressCard
                                    key={index}
                                    handleSelectAddress={createOrderUsingSelectedAddress}
                                    item={item}
                                    showButton={true}
                                />
                            ))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-gray-800'>Add new Address</h1>

                                    <Button variant="outlined" onClick={handleOpenAddressModel}>Add</Button>

                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        // validationSchema={validationSchema}
                        onSubmit={handleSubmit}>

                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                    // error={!ErrorMessage("street address")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=>
                                    //         <span className='text-red-600'>{msg}</span>
                                    //         }
                                    //     </ErrorMessage>
                                    // }
                                    >

                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name="state"
                                        label="state"
                                        fullWidth
                                        variant="outlined"
                                    // error={!ErrorMessage("street address")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=>
                                    //         <span className='text-red-600'>{msg}</span>
                                    //         }
                                    //     </ErrorMessage>
                                    // }
                                    >

                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name="city"
                                        label="city"
                                        fullWidth
                                        variant="outlined"
                                    // error={!ErrorMessage("street address")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=>
                                    //         <span className='text-red-600'>{msg}</span>
                                    //         }
                                    //     </ErrorMessage>
                                    // }
                                    >

                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name="pincode"
                                        label="pincode"
                                        fullWidth
                                        variant="outlined"
                                    // error={!ErrorMessage("street address")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=>
                                    //         <span className='text-red-600'>{msg}</span>
                                    //         }
                                    //     </ErrorMessage>
                                    // }
                                    >

                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type='submit' color='primary'>
                                        Deliver here
                                    </Button>

                                </Grid>

                            </Grid>
                        </Form>


                    </Formik>
                </Box>
            </Modal>
        </>

    )
}

export default Cart
