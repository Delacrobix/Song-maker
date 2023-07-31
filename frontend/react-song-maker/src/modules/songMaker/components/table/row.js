import React, { useState, useEffect } from 'react';
import usePrintableDate from '../../../../hooks/usePrintableDate';

const Row = (props) => {
  const { clickFunction } = props;
  const { owner, rhythmType, chords, songName, date } = props.song;

  const printableDate = usePrintableDate(new Date(parseInt(date)));

  const [chordsToPrint, setChordsToPrint] = useState('');

  useEffect(() => {
    console.log('rhythmType: ', props.song);
    let result = chords.split('|');
    result = result.join('-');

    setChordsToPrint(result);
  }, [chords]);

  return (
    <tr onClick={clickFunction}>
      <td>{owner}</td>
      <td>{songName}</td>
      {/* <td>{rhythmType.rhythmName}</td> */}
      <td>{chordsToPrint}</td>
      <td>{printableDate}</td>
    </tr>
  );
};

export default Row;
