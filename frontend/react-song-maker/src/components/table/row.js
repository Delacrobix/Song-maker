import React from 'react';

const Row = (props) => {
  const { clickFunction } = props;
  const { owner, rhythm, chords, songName, id, date } = props.song;

  return (
    <tr onClick={clickFunction}>
      <td>{owner}</td>
      <td>{rhythm}</td>
      <td>{chords}</td>
      <td>{songName}</td>
      <td>{id}</td>
      <td>
        <button>PLAY</button>
      </td>
      <td>{date}</td>
    </tr>
  );
};

export default Row;
