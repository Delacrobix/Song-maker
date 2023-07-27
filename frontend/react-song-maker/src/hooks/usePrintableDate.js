import { useEffect } from 'react';
import { useState } from 'react';

const usePrintableDate = (date) => {
  const [printableDate, setPrintableDate] = useState('');

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    setPrintableDate(`${day}/${month}/${year}`);
  }, [date]);

  return printableDate;
};

export default usePrintableDate;
