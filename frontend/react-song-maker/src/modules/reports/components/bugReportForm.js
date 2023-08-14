import React, { useState } from 'react';
import { sendBugReport } from '../../../utils/httpRequests';
import { transformToHTMLBugReport } from '../../../utils/htmlTransforms';
import FeedbackCompo from '../../../components/successComponent';
import Loading from '../../songMaker/components/feedback/loading';

const BugReportForm = () => {
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

  async function submitBugReport(event) {
    event.preventDefault();

    setIsSubmitting(true);

    setFeedback({
      isError: false,
      isSuccessfully: false,
    });

    const dataFormat = {
      Subject: 'SONG MAKER - Bug Report',
      Body: transformToHTMLBugReport(form),
    };

    const response = await sendBugReport(dataFormat);

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
        message: 'Bug report sent.',
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
    <section className='bug-report-form'>
      <div className='description'>
        <h2>BUG REPORT</h2>
        <p>
          Use this form to report any bugs you may find. Here is what each of
          the "bug severity" options mean:
        </p>
        <ol>
          <li>
            <div className='minor'>Minor:</div> These are bugs that don't really
            affect the application usability. Things like error in the interface
            would fit into this category.
          </li>
          <li>
            <div className='moderate'>Moderate:</div> The moderate category
            would include bugs that affect the functionality of some of the
            application less important features. For example, a problem with an
            button or something menu item invisible.
          </li>
          <li>
            <div className='major'>Major:</div> A major bug affects the
            usability of the application's more important feature. Something
            that stops the application execution could be example of a major
            bug.
          </li>
        </ol>
      </div>
      <div className='submit_form'>
        <form onSubmit={submitBugReport}>
          <p>Email (optional):</p>
          <input
            type='email'
            className='email_input'
            name='email'
            placeholder='email@example.com'
            onChange={handleChange}
          />
          <p>Bug Severity (optional):</p>
          <select
            name='bugSeverity'
            className='bug_severity'
            onChange={handleChange}
          >
            <option value='--Please Select--'>--Please Select--</option>
            <option value='Minor'>Minor</option>
            <option value='Moderate'>Moderate</option>
            <option value='Major'>Major</option>
          </select>
          <hr />
          <p>How often does it occur?</p>
          <select name='occurrence' onChange={handleChange}>
            <option value='--Please Select--'>--Please Select--</option>
            <option
              type='radio'
              className='rarely'
              name='rarely'
              value='Rarely'
            >
              Rarely
            </option>
            <option
              type='radio'
              className='somewhat_rare radius_input'
              name='somewhat_rare'
              value='Somewhat Rarely'
            >
              Somewhat Rarely
            </option>
            <option
              type='radio'
              className='somewhat_often radius_input'
              name='somewhat_often'
              value='Somewhat Often'
            >
              Somewhat Often
            </option>
            <option
              type='radio'
              className='common radius_input'
              name='common'
              value='Commonly'
            >
              Commonly
            </option>
            <option
              type='radio'
              className='very_often radius_input'
              name='very_often'
              value='Very Often'
            >
              Very Commonly
            </option>
          </select>
          <hr />
          <p className='over-message'>
            Please input any debug information here:
          </p>
          <input
            type='text'
            name='debugInfo'
            className='debug_info'
            onChange={handleChange}
            placeholder='Ex. Exception at 0x0000000 - memory map'
          />
          <p className='over-message'>
            Any further questions, comments or issues:
          </p>
          <input
            type='text'
            name='details'
            className='details'
            onChange={handleChange}
            placeholder='Ex. I noticed strange game performance in some areas.'
            required
          />
          <p>
            Once you have confirmed everything in your bug report, hit 'submit'.
            You won't be able to change your bug report later.
          </p>
          {isSubmitting ? (
            <Loading />
          ) : (
            <button type='submit' className='submit'>
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

export default BugReportForm;
