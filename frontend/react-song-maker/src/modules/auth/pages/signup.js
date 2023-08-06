import React from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcons from '../components/svgIcons';
import SignupForm from '../components/signupForm';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='align-signup'>
        <div className='grid'>
          <SignupForm />
          <p className='text--center'>
            {t('Auth.signup.isNot')}
            <Link to='/login'>{t('Auth.signup.login')}</Link>
          </p>
        </div>
        <SvgIcons />
      </div>
    </div>
  );
};

export default Signup;
