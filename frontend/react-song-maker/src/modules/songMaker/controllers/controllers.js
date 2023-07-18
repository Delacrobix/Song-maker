export function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}

export function binarySearch(array, data) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (array[middle].id === data) {
      return middle;
    } else if (array[middle].id < data) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

export function buildNewChordArr(oldChordArr, newChords) {
  // console.log('oldChordArr: ', oldChordArr);
  console.log('newChords: ', newChords);

  let newChordsArr = [];
  let i = 0;

  oldChordArr.forEach((element, index) => {
    // console.log('index: ', index, ' | i: ', i);

    if (element === 'rst') {
      newChordsArr.push('rst');
    } else if (element === oldChordArr[index - 1]) {
      newChordsArr.push(newChords[i - 1]);
    } else {
      newChordsArr.push(newChords[i]);
      i++;
    }
    // console.log('newChordsArr: ', newChordsArr);
  });

  // console.log('newChordsArr: ', newChordsArr);
  return newChordsArr;
}

export function buildNewScore(rhythmObject, chordArr) {
  const chordArrCopy = [...chordArr];

  const newScore = rhythmObject.map((element, index) => {
    let chordName;
    let seventh;

    if (chordArrCopy[index] === 'rst') {
      chordName = chordArrCopy[index];
    } else {
      chordName = getChordName(chordArrCopy[index]);
      console.log('chordName: ', chordName);
      seventh = getSeventh(chordArrCopy[index], chordName);
      console.log('seventh: ', seventh);
    }

    // console.log('Element: ', element);

    //Adding generated chords to the score
    element.chordName = chordName;
    element.seventh = seventh;

    //Deleting __typename property of score
    const { __typename, ...rest } = element;

    return rest;
  });

  return newScore;
}

function getChordName(chord) {
  // console.log(chord.slice(0, 2));
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
