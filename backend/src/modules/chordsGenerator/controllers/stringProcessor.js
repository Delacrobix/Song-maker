export function conditions(chords) {
  let chordArr;
  let isValid;

  //If the chords are not separated by a pipe, return an empty array
  try {
    chordArr = chords.split('|');
  } catch (e) {
    console.log('Error separating chords');

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
  let minorCases;
  let majorCases;
  let dimCases;
  let susCases;
  let sharpCases;
  let flatCases;
  const validCases = [
    'major',
    'maj',
    'M',
    'minor',
    'min',
    'm',
    '°',
    'dim',
    'sus',
    'sus4',
    '7',
    'm7',
    'min7',
    'maj7',
    '∆7',
    'dim7',
    '#',
    '#min',
    '#m7',
    '#min7',
    '#minor7',
    '#major7',
    '#maj7',
    '#M7',
    '#7',
    '#dim7',
    '#dim',
    '#°',
    'b',
    '♭',
  ];
  let allCasesValid = true;
  console.log('chordArr: ', chordArr);

  chordArr.forEach((chord) => {
    let aux = false;

    if (chord.length > 1) {
      validCases.forEach((validCase) => {
        const chordSliced = chord.slice(1, chord.length);

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
    chordSliced === 'b' ||
    chordSliced === '♭'
  ) {
    return chord;
  }

  const switchOptions = {
    M: '',
    maj: '',
    major: '',
    minor: 'm',
    min: 'm',
    min7: 'm7',
    '∆7': 'maj7',
    '°': 'dim',
    '♭': 'b',
  };

  return chord.replace(chordSliced, switchOptions[chordSliced]);
}
