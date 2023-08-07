import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { getAuth } from '../../../utils/httpRequests';
import { AuthContext } from '../../../context/authContext';
import Loading from '../../songMaker/components/feedback/loading';
import FeedbackCompo from '../../../components/successComponent';
// import { setIsLogged } from '../../../redux/isLoggedSlice';

const LoginForm = () => {
  const { t } = useTranslation();
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  //Refs
  const userNameRef = useRef(null);
  const passRef = useRef(null);

  //States
  const [form, setForm] = useState({
    userName: '',
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

    userNameInput.disabled = isSubmitting;
    passInput.disabled = isSubmitting;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //Block items
    blockItems();
    setIsSubmitting(true);

    const response = await getAuth(form);

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
    <div className='form-login-container'>
      {error.exist ? (
        <FeedbackCompo message={error.message} color={'red'} />
      ) : null}
      <form onSubmit={handleSubmit} method='POST' className='form login'>
        <div className='form__field'>
          <label htmlFor='login__username'>
            <svg className='icon'>
              <use xlinkHref='#icon-user'></use>
            </svg>
            <span className='hidden'>{t('Auth.login.form.user')}</span>
          </label>
          <input
            ref={userNameRef}
            autoComplete='userName'
            id='login__username'
            type='text'
            name='userName'
            onChange={handleChange}
            value={form.userName}
            className='form__input'
            placeholder='Username'
            required
          />
        </div>
        <div className='form__field'>
          <label htmlFor='login__password'>
            <svg className='icon'>
              <use xlinkHref='#icon-lock'></use>
            </svg>
            <span className='hidden'>{t('Auth.login.form.pass')}</span>
          </label>
          <input
            ref={passRef}
            id='login__password'
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
            <input type='submit' value={t('Auth.login.form.submit')} />
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
