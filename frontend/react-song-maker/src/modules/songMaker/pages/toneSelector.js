import React from 'react';
import { useTranslation } from 'react-i18next';
import CircleOfFifths from '../components/circleOfFifths';
import BreadCrumb from '../components/breadCrumb';

const ToneSelector = () => {
  const { t } = useTranslation();

  return (
    <div className='tone-selector-page-container'>
      <h1 className='title-page'>{t('SongMaker.toneSelector.title')}</h1>
      <BreadCrumb />
      <div className='circle-container'>
        <CircleOfFifths />
      </div>
    </div>
  );
};

export default ToneSelector;
