import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SvgIcons from '../components/svgIcons';
import LoginForm from '../components/loginForm';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='align-login'>
        <div className='grid'>
          <LoginForm />
          <p className='text--center'>
            {t('Auth.login.isNot')}
            <Link to='/signup'>{t('Auth.login.signup')}</Link>
          </p>
        </div>
        <SvgIcons />
      </div>
    </div>
  );
};

export default Login;
