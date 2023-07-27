export function binarySearch(array, data) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (array[middle]._id === data) {
      return middle;
    } else if (array[middle]._id < data) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}
