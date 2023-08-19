import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = (props) => {
  const { donationAmount } = props;

  //PayPal options
  const payPalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    'disable-funding': 'credit,card',
  };

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: donationAmount,
          },
        },
      ],
    });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then((details) => {
      console.log('Donation successful', details);
      alert('Donation successful', details);
    });
  }

  return (
    <PayPalScriptProvider options={payPalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical' }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
