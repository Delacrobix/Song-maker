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
  // console.log('newChords: ', newChords);

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
