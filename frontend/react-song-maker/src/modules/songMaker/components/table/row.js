import React from 'react';

const Row = (props) => {
  const { clickFunction } = props;
  const { owner, rhythm, chords, songName, id, date } = props.song;

  const parsedDate = new Date(parseInt(date));

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return (
    <tr onClick={clickFunction}>
      <td>{owner}</td>
      <td>{songName}</td>
      <td>{rhythm}</td>
      <td>{chords}</td>
      <td>{`${year}/${month}/${day}`}</td>
      <td>{id}</td>
    </tr>
  );
};

export default Row;
