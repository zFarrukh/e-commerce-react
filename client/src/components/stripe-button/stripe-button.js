import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JVZEFIqkSYRMPqrKLk6j3aO8W09bdP6W8I1N9zSOxssFURf4mrUgLoBKsp04447Lgmm1P8ChWMB8K80kjQnSw7f0015xQlwNR';

    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'POST',
            data: {
                amount: priceForStripe,
                token,
            }
        })
        .then(res => {
            alert('Payment successful')
        })
        .catch(err => {
            console.log("Payment error: ", JSON.parse(err));
            alert(
                'There was an issue with your payment. Please sure use the provided credit cart.'
            )
        })
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            />
    )
}

export default StripeCheckoutButton;