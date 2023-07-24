import React, { useState, useEffect } from 'react';

const Row = (props) => {
  const { clickFunction } = props;
  const { owner, rhythm, chords, songName, id, date } = props.song;

  const [printableDate, setPrintableDate] = useState('');

  useEffect(() => {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    setPrintableDate(`${year}/${month}/${day}`);
  }, [date]);

  return (
    <tr onClick={clickFunction}>
      <td>{owner}</td>
      <td>{songName}</td>
      <td>{rhythm}</td>
      <td>{chords}</td>
      <td>{printableDate}</td>
      <td>{id}</td>
    </tr>
  );
};

export default Row;
