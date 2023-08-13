import React from 'react';

const SuggestionsForm = () => {
  return (
    <section className='suggestions-form'>
      <div className='submit_form'>
        <h2>SUGGESTIONS</h2>
        <form action='' method='post'>
          <p className='over-message'>Email (optional).</p>
          <input
            type='email'
            className='email_input'
            name='email_input'
            placeholder='firstname.lastname@example.com'
          />
          <p className='over-message'>Write your suggestion:</p>
          <input
            type='text'
            name='details'
            className='details'
            placeholder='Ex. I noticed strange game performance in some areas.'
          />
          <input
            type='submit'
            className='submit'
            name='submit'
            value='Submit'
          />
        </form>
      </div>
    </section>
  );
};

export default SuggestionsForm;
