import React from 'react';

const ErrorInfo = (props) => {
  const { error } = props;

  return (
    <div className='auth-error-container'>
      <p>{error}</p>
    </div>
  );
};

export default ErrorInfo;
