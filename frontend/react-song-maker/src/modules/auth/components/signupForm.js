import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createUser } from '../../../utils/httpRequests';
import { AuthContext } from '../../../context/authContext';
import FeedbackCompo from '../../../components/successComponent';

const SignupForm = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  //States
  const { handleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    exist: false,
    message: '',
  });

  function handleChange(e) {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError({ exist: false, message: '' });

    const response = await createUser(form);

    if (response.token) {
      //Switch auth context
      handleLogin();

      setCookie(response.token);

      navigate('/profile');
    } else {
      setError({ exist: true, message: response.message });
    }
  }

  async function setCookie(sessionToken) {
    Cookies.set('sesionToken', sessionToken);
  }

  return (
    <div className='form-signup-container'>
      {error.exist && <FeedbackCompo message={error.message} color={'red'} />}
      <form onSubmit={handleSubmit} method='POST' className='form signup'>
        <div className='form__field'>
          <label htmlFor='signup__username'>
            <svg className='icon'>
              <use xlinkHref='#icon-user'></use>
            </svg>
            <span className='hidden'>{t('Auth.signup.form.user')}</span>
          </label>
          <input
            autoComplete='username'
            id='signup__username'
            type='text'
            name='username'
            onChange={handleChange}
            value={form.username}
            className='form__input'
            placeholder='Username'
            required
          />
        </div>
        <div className='form__field'>
          <label htmlFor='signup__email'>
            <svg className='icon'>
              <use xlinkHref='#icon-email'></use>
            </svg>
            <span className='hidden'>{t('Auth.signup.form.email')}</span>
          </label>
          <input
            id='signup__email'
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='form__input'
            placeholder='Email Address'
            required
          />
        </div>
        <div className='form__field'>
          <label htmlFor='signup__password'>
            <svg className='icon'>
              <use xlinkHref='#icon-lock'></use>
            </svg>
            <span className='hidden'>{t('Auth.signup.form.pass')}</span>
          </label>
          <input
            id='signup__password'
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='form__input'
            placeholder='Password'
            required
          />
        </div>
        <div className='form__field'>
          <input type='submit' value={t('Auth.signup.form.submit')} />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
