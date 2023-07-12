import React, { useState } from 'react';
import { createUser } from '../controllers/httpRequests';
import Cookies from 'js-cookie';

const SignupForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
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

    const response = await createUser(form);

    console.log('Token signup: ', response);

    // Cookies.set('sesionToken', response.token, { httpOnly: true });
  }

  return (
    <div className='form-signup-container'>
      <form onSubmit={handleSubmit} method='POST' className='form signup'>
        <div className='form__field'>
          <label htmlFor='signup__username'>
            <svg className='icon'>
              <use xlinkHref='#icon-user'></use>
            </svg>
            <span className='hidden'>Username</span>
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
            <span className='hidden'>Email</span>
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
            <span className='hidden'>Password</span>
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
          <input type='submit' value='Sign Up' />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
