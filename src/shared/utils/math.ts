/**
 * Random int between `min` (inclusive) and `max` (inclusive)
 * @param min
 * @param max
 * @returns
 */
export const randomIntRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Random int between 0 (inclusive) and `max` (exclusive)
 * @param max
 * @returns
 */
export const randomInt = (max: number) => randomIntRange(0, max - 1);
