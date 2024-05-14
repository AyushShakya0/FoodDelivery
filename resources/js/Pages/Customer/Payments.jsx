import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios'; // Import axios for making HTTP requests

export default function Payments({ auth, order, fav }) {
    const handleKhaltiPayment = async () => {
        const payload = {
          "return_url": `http://127.0.0.1/payment-success`,
          "website_url": 'http://127.0.0.1:8000/payments',
          amount: 200,
          // "amount": orderData?.,
          "purchase_order_id": `GoFood`,
          "purchase_order_name": `GoFood`,
          "merchant_username":'goFood',
          "customer_info": {
            name: 'Resh',
            email: 'reshambhattarai05@gmail.com',
            phone: '9860130046',
          },
        };
        try {
          const { data } = await axios.post(
            'https://a.khalti.com/api/v2/epayment/initiate/',
            payload,
            {
              headers: {
                "authorization": `Key 52b222e00d044f29b81490ff963e8b6b`,
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
        <AuthenticatedLayout user={auth.user} order={order} fav={fav}>
            <Head title="Restaurants" />
            <div>
                <div className="text-blue-600 text-2xl">
                    <button id="payment-button" onClick={handleKhaltiPayment}>
                        Pay with Khalti
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
