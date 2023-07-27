import React from 'react';
import { Link } from 'react-router-dom';
import SvgIcons from '../components/svgIcons';
import LoginForm from '../components/loginForm';

const Login = () => {
  return (
    <div>
      <div className='align-login'>
        <div className='grid'>
          <LoginForm />
          <p className='text--center'>
            {'Not a member? '}
            <Link to='/signup'>{' Sign up'}</Link>
          </p>
        </div>
        <SvgIcons />
      </div>
    </div>
  );
};

export default Login;
