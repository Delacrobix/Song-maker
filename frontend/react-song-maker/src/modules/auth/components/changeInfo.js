import React, { useState } from 'react';
import { updatePassword, updateEmail } from '../../../utils/httpRequests';

const ChangeInfo = (props) => {
  const { isPass, id } = props;
  const [formInfo, setFormInfo] = useState(null);

  function handleChange(e) {
    e.preventDefault();

    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let userAccount = {};

    if (isPass) {
      userAccount = {
        id: id,
        pass: formInfo.pass,
        dupPass: formInfo.dupPass,
      };

      await updatePassword(userAccount);
    } else {
      userAccount = {
        id: id,
        email: formInfo.email,
      };

      await updateEmail(userAccount);
    }
  }

  return (
    <div className='change-info-container'>
      {isPass ? (
        <form onSubmit={handleSubmit}>
          <input
            type='password'
            name='pass'
            placeholder='New password'
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='dupPass'
            placeholder='Repeat password'
            onChange={handleChange}
            required
          />
          <button type='submit'>Send</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='New email'
            onChange={handleChange}
            required
          />
          <button type='submit'>Send</button>
        </form>
      )}
    </div>
  );
};

export default ChangeInfo;
