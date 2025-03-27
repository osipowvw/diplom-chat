/*
You are given a non-empty list of integers (X).

For this task, you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */

export function nonUniqueElements(data) {
  if (!Array.isArray(data)) {
    return false;
  }

  if (!data.every(item => typeof item === 'number')) {
    return false;
  }

  for (let i = 0; i < data.length; i++) {
    let k = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[i] === data[j] && i !== j) {
        k++;
      }
    }
    if (k === 0) {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}
