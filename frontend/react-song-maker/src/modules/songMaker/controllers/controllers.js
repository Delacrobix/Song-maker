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
