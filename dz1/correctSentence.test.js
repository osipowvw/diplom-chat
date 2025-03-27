import { correctSentence } from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
  expect(correctSentence("vK has the best educational program")).toBe("VK has the best educational program.");
})

test('returns false', () => {
  expect(correctSentence(1234)).toBe(false);
  expect(correctSentence([])).toBe(false);
  expect(correctSentence(Infinity)).toBe(false);
  expect(correctSentence(undefined)).toBe(false);
  expect(correctSentence(null)).toBe(false);
})
