import React from 'react';
import SvgIcons from '../components/svgIcons';
import SignupForm from '../components/signupForm';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div>
      <div className='align-signup'>
        <div className='grid'>
          <SignupForm />
          <p className='text--center'>
            {'Are you register?'}
            <Link to='/login'>{'Login now'}</Link>
          </p>
        </div>
        <SvgIcons />
      </div>
    </div>
  );
};

export default Signup;
