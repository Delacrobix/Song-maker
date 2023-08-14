import React, { useState } from 'react';
import { sendSuggestions } from '../../../utils/httpRequests';
import { transformToHTMLSuggestion } from '../../../utils/htmlTransforms';
import Loading from '../../songMaker/components/feedback/loading';
import FeedbackCompo from '../../../components/successComponent';

const SuggestionsForm = () => {
  //States
  const [form, setForm] = useState({
    email: '',
    bugSeverity: '',
    occurrence: '',
    debugInfo: '',
    details: '',
  });
  const [feedback, setFeedback] = useState({
    isError: false,
    isSuccessfully: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitSuggestion(event) {
    event.preventDefault();

    setIsSubmitting(true);

    setFeedback({
      isError: false,
      isSuccessfully: false,
    });

    const dataFormat = {
      Subject: 'SONG MAKER - Suggestions',
      Body: transformToHTMLSuggestion(form),
    };

    const response = await sendSuggestions(dataFormat);

    setIsSubmitting(false);

    if (response.statusCode === 500) {
      setFeedback({
        isError: true,
        isSuccessfully: false,
        message: response.data.message,
      });
    } else {
      setFeedback({
        isError: false,
        isSuccessfully: true,
        message: 'Suggestion sent. Thank you so much.',
      });
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <section className='suggestions-form'>
      <div className='submit_form'>
        <h2>SUGGESTIONS</h2>
        <form onSubmit={submitSuggestion}>
          <p className='over-message'>Email (optional).</p>
          <input
            onChange={handleChange}
            type='email'
            className='email_input'
            name='email'
            placeholder='email@example.com'
          />
          <p className='over-message'>Write your suggestion:</p>
          <input
            onChange={handleChange}
            type='text'
            name='details'
            className='details'
            placeholder='Ex. I noticed strange game performance in some areas.'
          />
          {isSubmitting ? (
            <Loading />
          ) : (
            <button type='submit' className='submit' name='submit'>
              Submit
            </button>
          )}
        </form>
        {feedback.isError && (
          <FeedbackCompo message={feedback.message} color={'red'} />
        )}
        {feedback.isSuccessfully && (
          <FeedbackCompo message={feedback.message} color={'green'} />
        )}
      </div>
    </section>
  );
};

export default SuggestionsForm;
