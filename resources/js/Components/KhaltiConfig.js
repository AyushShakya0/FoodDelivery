import KhaltiCheckout from "khalti-checkout-web";
import React from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

let config = {
    // replace this key with yours
    publicKey: "test_public_key_ac9fa02798af42758975954e73365de0",
    productIdentity: "1234567890",
    productName: "GoFood",
    productUrl: "http://127.0.0.1:8000/",
    eventHandler: {
        onSuccess: (payload) => {
            console.log("Payment successful", payload);
            // Directly using Inertia inside the event handler
            Inertia.post("/api/payment/verify", {
                token: payload.token,
                amount: payload.amount,
            });
        },
        onError: (error) => {
            console.log("Error during payment", error);
        },
        onClose: () => {
            console.log("Payment widget is closing");
        },
    },
    paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
    ],
};

export default config;
