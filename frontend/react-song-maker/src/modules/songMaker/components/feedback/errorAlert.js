import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ErrorAlert = () => {
  function handleClickReload() {
    window.location.reload();
  }

  return (
    <section onClick={handleClickReload}>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-12'>
            <div
              className='alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show'
              role='alert'
              data-brk-library='component__alert'
            >
              <FontAwesomeIcon className='fa-times' icon={faTimes} />
              <i className='start-icon far fa-times-circle faa-pulse animated'></i>
              <strong className='font__weight-semibold'>Oh sorry!</strong>{' '}
              Something are not working. Please, try again
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorAlert;
