import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  const [donationAmount, setDonationAmount] = useState('2.00');
  const paypalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    'disable-funding': 'credit,card',
  };

  function changeDonationAmount(e) {
    setDonationAmount(e.target.value);
  }

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
      // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de agradecimiento.
    });
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className='donation-input'>
        <input
          type='number'
          step='0.01'
          value={donationAmount}
          onChange={changeDonationAmount}
        />
      </div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical' }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
