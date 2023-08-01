import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const usePlayableSong = (props) => {
  const { chordsReceived } = props;

  const [rhythmType, setRhythmType] = useState(null);

  const reduxRhythm = useSelector((state) => state.rhythm.value);

  useEffect(() => {
    if (!chordsReceived) return;

    const aiChordsArr = chordsReceived.split('|');
    const rhythmScoreCopy = [...reduxRhythm.score];
    let databaseScore = [];

    rhythmScoreCopy.forEach((element) => {
      databaseScore.push(element.chordName);
    });

    const newChordArr = buildNewChordArr(databaseScore, aiChordsArr);
    const newScore = buildNewScore(rhythmScoreCopy, newChordArr);

    setRhythmType({
      rhythmName: reduxRhythm.rhythmName,
      tempo: reduxRhythm.tempo,
      score: newScore,
    });

    function buildNewChordArr(oldChordArr, newChords) {
      let newChordsArr = [];
      let i = 0;

      oldChordArr.forEach((element, index) => {
        if (element === 'rst') {
          newChordsArr.push('rst');
        } else if (element === oldChordArr[index - 1]) {
          newChordsArr.push(newChords[i - 1]);
        } else {
          newChordsArr.push(newChords[i]);
          i++;
        }
      });

      return newChordsArr;
    }

    function buildNewScore(rhythmObject, chordArr) {
      const chordArrCopy = [...chordArr];

      const newScore = rhythmObject.map((element, index) => {
        let chordName;
        let seventh;

        if (chordArrCopy[index] === 'rst') {
          chordName = chordArrCopy[index];
        } else {
          chordName = getChordName(chordArrCopy[index]);
          seventh = getSeventh(chordArrCopy[index], chordName);
        }

        //Adding generated chords to the score
        const updatedElement = {
          ...element,
          chordName: chordName,
          seventh: seventh,
        };

        //Deleting __typename property of score
        const { __typename, ...rest } = updatedElement;

        return rest;
      });

      return newScore;
    }

    function getChordName(chord) {
      if (chord[1] === 'm' && chord[2] !== 'a') {
        return chord.slice(0, 2);
      } else if (chord[1] === '#' || chord[1] === 'b') {
        if (chord[2] === 'm' && chord[3] !== 'a') {
          return chord.slice(0, 3);
        } else {
          return chord.slice(0, 2);
        }
      } else {
        return chord.slice(0, 1);
      }
    }

    function getSeventh(chord, chordName) {
      const seventhString = chord.replace(chordName, '');

      if (seventhString === 'maj7') {
        return '7maj';
      } else if (seventhString === '7') {
        return '7min';
      } else if (seventhString === 'dim') {
        return '7dim';
      } else {
        return ''.toString();
      }
    }
  }, [chordsReceived, reduxRhythm]);

  return rhythmType;
};

export default usePlayableSong;
