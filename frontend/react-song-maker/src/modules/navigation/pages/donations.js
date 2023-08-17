import React from 'react';
import PayPalButton from '../components/payPalButton';

const Donations = () => {
  return (
    <div>
      <h2>DONATIONS</h2>
      <div className='paypal'>
        <h3>PayPal: </h3>
        <PayPalButton />
      </div>
    </div>
  );
};

export default Donations;
