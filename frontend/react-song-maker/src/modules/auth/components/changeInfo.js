import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { updatePassword, updateEmail } from '../../../utils/httpRequests';
import FeedbackCompo from '../../../components/successComponent';
import { useTranslation } from 'react-i18next';

const ChangeInfo = (props) => {
  const { isPass, id } = props;
  const { t } = useTranslation();

  //Refs
  const passRef = useRef(null);
  const passDupRef = useRef(null);
  const emailRef = useRef(null);

  //States
  const [formInfo, setFormInfo] = useState(null);
  const [feedback, setFeedback] = useState({
    isError: false,
    isSuccessfully: false,
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
    e.preventDefault();

    setFeedback({
      isError: false,
      isSuccessfully: false,
    });

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
        setFeedback({
          isError: true,
          isSuccessfully: false,
          message: response.data.message,
        });
      } else {
        passRef.current.value = '';
        passDupRef.current.value = '';

        setFeedback({
          isError: false,
          isSuccessfully: true,
          message: 'Password changed successfully.',
        });
      }
    } else {
      //Change email code
      userAccount = {
        id: id,
        email: formInfo.email,
      };

      const response = await updateEmail(userAccount);

      if (response.statusCode === 400 || response.statusCode === 500) {
        setFeedback({
          isError: true,
          isSuccessfully: false,
          message: response.data.message,
        });
      } else {
        emailRef.current.value = '';
        Cookies.set('sesionToken', response.data.token);

        setFeedback({
          isError: false,
          isSuccessfully: true,
          message: 'Email changed successfully.',
        });
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
            {t('Auth.profile.btns.submit')}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className='change-info__form'>
          <input
            ref={emailRef}
            className='change-info__form-input'
            type='email'
            name='email'
            placeholder='New email'
            onChange={handleChange}
            required
          />
          <button type='submit' className='change-info__form-submit'>
            {t('Auth.profile.btns.submit')}
          </button>
        </form>
      )}
      {feedback.isError && (
        <FeedbackCompo message={feedback.message} color={'red'} />
      )}
      {feedback.isSuccessfully && (
        <FeedbackCompo message={feedback.message} color={'green'} />
      )}
    </div>
  );
};

export default ChangeInfo;
