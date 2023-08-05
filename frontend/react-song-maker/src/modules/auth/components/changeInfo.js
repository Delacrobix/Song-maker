import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { updatePassword, updateEmail } from '../../../utils/httpRequests';
import ErrorInfo from './errorInfo';

const ChangeInfo = (props) => {
  const passRef = useRef(null);
  const passDupRef = useRef(null);
  const { isPass, id } = props;
  const [formInfo, setFormInfo] = useState(null);
  const [error, setError] = useState({
    exist: false,
    message: '',
  });

  function handleChange(e) {
    e.preventDefault();

    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    const passElement = passRef.current;
    const passDupElement = passDupRef.current;
    e.preventDefault();

    let userAccount = {};

    if (isPass) {
      //Change password code
      userAccount = {
        id: id,
        pass: formInfo.pass,
        dupPass: formInfo.dupPass,
      };

      const response = await updatePassword(userAccount);

      if (response.statusCode === 400 || response.statusCode === 500) {
        setError({
          exist: true,
          message: response.data.message,
        });
      } else {
        passDupElement.value = '';
        passElement.value = '';

        alert('Password changed successfully.');
      }
    } else {
      //Change email code
      userAccount = {
        id: id,
        email: formInfo.email,
      };

      const response = await updateEmail(userAccount);

      if (response.statusCode === 400 || response.statusCode === 500) {
        setError({
          exist: true,
          message: response.data.message,
        });
      } else {
        Cookies.set('sesionToken', response.data.token);

        alert('Email changed successfully.');

        window.location.reload();
      }
    }
  }

  return (
    <div className='change-info'>
      {isPass ? (
        <form onSubmit={handleSubmit} className='change-info__form'>
          <input
            className='change-info__form-input'
            ref={passRef}
            type='password'
            name='pass'
            placeholder='New password'
            onChange={handleChange}
            required
          />
          <input
            className='change-info__form-input'
            ref={passDupRef}
            type='password'
            name='dupPass'
            placeholder='Repeat password'
            onChange={handleChange}
            required
          />
          <button type='submit' className='change-info__form-submit'>
            Send
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className='change-info__form'>
          <input
            className='change-info__form-input'
            type='email'
            name='email'
            placeholder='New email'
            onChange={handleChange}
            required
          />
          <button type='submit' className='change-info__form-submit'>
            Send
          </button>
        </form>
      )}
      {error.exist ? <ErrorInfo error={error.message} /> : null}
    </div>
  );
};

export default ChangeInfo;
