export const timerDisplay = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minus = Math.floor((seconds % 3600) / 60);
  const second = Math.floor(seconds % 60);
  const result = (hour > 0 ? hour + 'h ' : '') + (minus > 0 ? minus + 'm ' : '') + second + 's';
  return result;
};
