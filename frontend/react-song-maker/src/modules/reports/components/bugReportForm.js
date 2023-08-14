import React, { useState } from 'react';
import { sendBugReport } from '../../../utils/httpRequests';
import { transformToHTMLBugReport } from '../../../utils/htmlTransforms';
import FeedbackCompo from '../../../components/successComponent';
import Loading from '../../songMaker/components/feedback/loading';
import { useTranslation } from 'react-i18next';

const BugReportForm = () => {
  const { t } = useTranslation();

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
        <h2>{t('Reports.bugForm.title')}</h2>
        <p>{t('Reports.bugForm.description')}</p>
        <ol>
          <li>
            <div className='minor'>{t('Reports.bugForm.minor')}</div>{' '}
            {t('Reports.bugForm.minor-description')}
          </li>
          <li>
            <div className='moderate'>{t('Reports.bugForm.moderate')}</div>{' '}
            {t('Reports.bugForm.moderate-description')}
          </li>
          <li>
            <div className='major'>{t('Reports.bugForm.major')}</div>{' '}
            {t('Reports.bugForm.major-description')}
          </li>
        </ol>
      </div>
      <div className='submit_form'>
        <form onSubmit={submitBugReport}>
          <p>{t('Reports.bugForm.input-title-1')}</p>
          <input
            type='email'
            className='email_input'
            name='email'
            placeholder='email@example.com'
            onChange={handleChange}
          />
          <p>{t('Reports.bugForm.bugSeverity.title')}</p>
          <select
            name='bugSeverity'
            className='bug_severity'
            onChange={handleChange}
          >
            <option value='--Please Select--'>
              {t('Reports.bugForm.bugSeverity.op1')}
            </option>
            <option value='Minor'>
              {t('Reports.bugForm.bugSeverity.op2')}
            </option>
            <option value='Moderate'>
              {t('Reports.bugForm.bugSeverity.op3')}
            </option>
            <option value='Major'>
              {t('Reports.bugForm.bugSeverity.op4')}
            </option>
          </select>
          <hr />
          <p>{t('Reports.bugForm.occurrence.title')}</p>
          <select
            name='occurrence'
            onChange={handleChange}
            className='occurrence'
          >
            <option value='--Please Select--'>
              {t('Reports.bugForm.occurrence.op1')}
            </option>
            <option value='Rarely'>
              {t('Reports.bugForm.occurrence.op2')}
            </option>
            <option value='Somewhat Rarely'>
              {t('Reports.bugForm.occurrence.op3')}
            </option>
            <option value='Somewhat Often'>
              {t('Reports.bugForm.occurrence.op4')}
            </option>
            <option value='Commonly'>
              {t('Reports.bugForm.occurrence.op5')}
            </option>
            <option value='Very Often'>
              {t('Reports.bugForm.occurrence.op6')}
            </option>
          </select>
          <hr />
          <p className='over-message'>{t('Reports.bugForm.input-title-2')}</p>
          <input
            type='text'
            name='debugInfo'
            className='debug_info'
            onChange={handleChange}
            placeholder='Ex. Exception at 0x0000000 - memory map'
          />
          <p className='over-message'>{t('Reports.bugForm.input-title-3')}</p>
          <input
            type='text'
            name='details'
            className='details'
            onChange={handleChange}
            placeholder='Ex. I noticed strange game performance in some areas.'
            required
          />
          <p>{t('Reports.bugForm.footer-text')}</p>
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
