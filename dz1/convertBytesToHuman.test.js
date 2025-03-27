/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import { convertBytesToHuman } from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false); //проверка на отрицательное
  expect(convertBytesToHuman(null)).toBe(false); //проверка на null
  expect(convertBytesToHuman('string')).toBe(false); //провера на строку
  expect(convertBytesToHuman(undefined)).toBe(false); //проверка на undefined
  expect(convertBytesToHuman([])).toBe(false); //проверка на массив
  expect(convertBytesToHuman(Infinity)).toBe(false); //проверка на бесконечность
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(1)).toBe('1 B');
  expect(convertBytesToHuman(512)).toBe('512 B');
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1073741824)).toBe('1 GB');
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB');
  expect(convertBytesToHuman(1536)).toBe('1.5 KB');
});

test('Пограничные значения', () => {
  expect(convertBytesToHuman(1023)).toBe('1023 B');
  expect(convertBytesToHuman(1025)).toBe('1 KB');
  expect(convertBytesToHuman(1073741825)).toBe('1 GB');
  expect(convertBytesToHuman(1073741823)).toBe('1 GB');
  expect(convertBytesToHuman(1099511627775)).toBe('1 TB');
  expect(convertBytesToHuman(1099511627777)).toBe('1 TB');
  expect(convertBytesToHuman(1537)).toBe('1.5 KB');
  expect(convertBytesToHuman(1535)).toBe('1.5 KB');
});
