import React from 'react';
import axios from 'axios';

const Khalti = () => {
    const base_url = 'http://your_base_url_here'; // Define your base URL
    const Key = 'your_khalti_key_here'; // Define your Khalti key
    const orderData = {}; // Define your orderData object

    const initiatePayment = async () => {
        const payload = {
            "return_url": `${base_url}payment-success`,
            "website_url": 'http://localhost:3000/',
            "amount": parseInt(orderData?.totalPrice),
            "purchase_order_id": "Order01",
            "purchase_order_name": "Almadi",
            "merchant_username": 'Almadi',
            "customer_info": {
                name: orderData?.user.name ?? '',
                email: orderData?.user.email ?? '',
                phone: orderData?.user.phoneNumber ?? '',
            },
        };

        try {
            const { data } = await axios.post(
                'https://a.khalti.com/api/v2/epayment/initiate/',
                payload,
                {
                    headers: {
                        "authorization": Key,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (data?.payment_url) {
                const paymentUrl = data.payment_url;
                console.log('Navigating to payment URL:', paymentUrl);
                window.location.href = paymentUrl;
            }

            console.log('data', data);
        } catch (err) {
            console.log('Error', err);
        }
    };

    return (
        <div>
            {/* You can call initiatePayment function on a button click */}
            <button onClick={initiatePayment}>Initiate Payment</button>
        </div>
    );
};

export default Khalti;
