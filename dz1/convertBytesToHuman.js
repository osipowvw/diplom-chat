/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export function convertBytesToHuman(bytes) {
  if (bytes < 0 || !Number.isFinite(bytes)) {
    return false;
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let ind = 0;

  while (bytes >= 1024 && ind < units.length - 1) {
    bytes /= 1024;
    ind++;
  }
  if (Math.round(bytes) === 1024 && ind < units.length - 1) {
    bytes = 1;
    ind++;
  }

  let format = bytes.toFixed(2).toString();

  if (format.endsWith('.00')) {
    format = bytes.toFixed(0).toString();
  } else if (Number.isInteger(format*10)) {
    format = bytes.toFixed(1).toString();
  }
  return `${format} ${units[ind]}`;
}
