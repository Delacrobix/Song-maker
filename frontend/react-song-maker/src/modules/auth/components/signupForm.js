import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../utils/httpRequests';
import { AuthContext } from '../../../context/authContext';
import FeedbackCompo from '../../../components/successComponent';
import { useRef } from 'react';
import Loading from '../../songMaker/components/feedback/loading';

const SignupForm = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  //Refs
  const userNameRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function blockItems() {
    const userNameInput = userNameRef.current;
    const passInput = passRef.current;
    const emailInput = emailRef.current;

    userNameInput.disabled = isSubmitting;
    passInput.disabled = isSubmitting;
    emailInput.disabled = isSubmitting;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError({ exist: false, message: '' });

    //Block items
    blockItems();
    setIsSubmitting(true);

    const response = await createUser(form);

    setIsSubmitting(false);
    //Unblock items
    blockItems();

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
            ref={userNameRef}
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
            ref={emailRef}
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
            ref={passRef}
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
          {isSubmitting ? (
            <div className='loading-container'>
              <Loading />
            </div>
          ) : (
            <input type='submit' value={t('Auth.signup.form.submit')} />
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
