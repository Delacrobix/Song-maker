import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getAuth } from '../../../utils/httpRequests';
import { AuthContext } from '../../../context/authContext';
import ErrorInfo from './errorInfo';
import Loading from '../../songMaker/components/feedback/loading';
import { setIsLogged } from '../../../redux/isLoggedSlice';

const LoginForm = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const userNameRef = useRef(null);
  const songNameRef = useRef(null);

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
    const songNameInput = songNameRef.current;

    userNameInput.disabled = isSubmitting;
    songNameInput.disabled = isSubmitting;
    songNameInput.disabled = isSubmitting;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    blockItems();
    setIsSubmitting(true);

    const response = await getAuth(form);

    setIsSubmitting(false);
    blockItems();

    if (response.token) {
      //Switch auth context
      handleLogin();
      //Switch auth slice
      setIsLogged(true);

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
      {error.exist ? <ErrorInfo error={error.message} /> : null}
      <form onSubmit={handleSubmit} method='POST' className='form login'>
        <div className='form__field'>
          <label htmlFor='login__username'>
            <svg className='icon'>
              <use xlinkHref='#icon-user'></use>
            </svg>
            <span className='hidden'>Username</span>
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
            <span className='hidden'>Password</span>
          </label>
          <input
            ref={songNameRef}
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
          {isSubmitting ? <Loading /> : <input type='submit' value='Sign In' />}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
