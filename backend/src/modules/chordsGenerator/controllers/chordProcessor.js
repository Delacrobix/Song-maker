import { getValidChordCases, getExecutableCasesObject } from './utils';

export function conditions(chords) {
  let chordArr;
  let isValid;

  //If the chords are not separated by a pipe, return an empty array
  try {
    chordArr = chords.split('|');
  } catch (e) {
    console.error('Error separating chords');

    return [];
  }

  isValid = verifyName(chordArr);

  //If the chord's name are not valid, return an empty array
  if (!isValid) {
    return [];
  }

  isValid = verifyCases(chordArr);

  if (!isValid) {
    return [];
  }

  const rhythmObject = buildRhythmObject(chordArr);

  return chordArr;
}

function verifyName(chordArr) {
  const validNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  chordArr.forEach((chord) => {
    validNames.forEach((validName) => {
      if (chord[0].toUpperCase() !== validName) {
        return false;
      }
    });
  });

  return chordArr;
}

function verifyCases(chordArr) {
  const validCases = getValidChordCases();
  let allCasesValid = true;
  console.log('chordArr: ', chordArr);

  chordArr.forEach((chord) => {
    let aux = false;

    if (chord.length > 1) {
      validCases.forEach((validCase) => {
        const chordSliced = chord.slice(1, chord.length).toLowerCase();

        if (chordSliced === validCase) {
          aux = true;

          chord = changeToExecutableCase(chord, chordSliced);
        }
      });

      if (!aux) {
        allCasesValid = false;

        return;
      }
    }
  });

  return allCasesValid;
}

function changeToExecutableCase(chord, chordSliced) {
  // console.log('chord: ', chord);

  if (
    chordSliced === 'm' ||
    chordSliced === '7' ||
    chordSliced === 'm7' ||
    chordSliced === 'maj7' ||
    chordSliced === '#' ||
    chordSliced === '#maj7' ||
    chordSliced === '#m7' ||
    chordSliced === '#dim7' ||
    chordSliced === '#dim' ||
    chordSliced === 'b'
  ) {
    return chord;
  }

  const switchOptions = getExecutableCasesObject();

  return chord.replace(chordSliced, switchOptions[chordSliced]);
}
