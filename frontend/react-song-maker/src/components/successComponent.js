import React from 'react';

const FeedbackCompo = (props) => {
  const { message, color } = props;

  return (
    <div className='feedback'>
      <p className={`feedback-message feedback-${color}`}>{message}</p>
    </div>
  );
};

export default FeedbackCompo;
