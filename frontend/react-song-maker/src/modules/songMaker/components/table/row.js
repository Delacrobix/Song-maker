import React, { useState, useEffect } from 'react';
import usePrintableDate from '../../../../hooks/usePrintableDate';

const Row = (props) => {
  const { clickFunction, userNames } = props;
  const { owner, rhythmType, chords, songName, date } = props.song;

  const printableDate = usePrintableDate(new Date(date));

  //States
  const [isUser, setIsUser] = useState(false);
  const [chordsToPrint, setChordsToPrint] = useState('');

  useEffect(() => {
    let result = chords.split('|');
    result = result.join('-');

    setChordsToPrint(result);
  }, [chords]);

  useEffect(() => {
    userNames.forEach((userName) => {
      if (userName.toLowerCase() === owner) {
        setIsUser(true);
      }
    });
  }, [userNames, owner]);

  return (
    <tr onClick={clickFunction}>
      <td>
        {owner} {isUser && <span>&#x2713;</span>}
      </td>
      <td>{songName}</td>
      <td>{chordsToPrint}</td>
      <td>{rhythmType.rhythmName}</td>
      <td>{printableDate}</td>
    </tr>
  );
};

export default Row;
