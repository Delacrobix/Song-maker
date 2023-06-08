import React, { useEffect, useState } from 'react';
import { getAuth } from '../controllers/httpRequests';

const LoginForm = () => {
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {});

  function handleChange(e) {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await getAuth(form);
    // console.log('form: ' + JSON.stringify(form));
  }

  return (
    <div className='form-login-container'>
      <form onSubmit={handleSubmit} method='POST' className='form login'>
        <div className='form__field'>
          <label htmlFor='login__username'>
            <svg className='icon'>
              <use xlinkHref='#icon-user'></use>
            </svg>
            <span className='hidden'>Username</span>
          </label>
          <input
            autoComplete='username'
            id='login__username'
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
          <label htmlFor='login__password'>
            <svg className='icon'>
              <use xlinkHref='#icon-lock'></use>
            </svg>
            <span className='hidden'>Password</span>
          </label>
          <input
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
          <input type='submit' value='Sign In' />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
