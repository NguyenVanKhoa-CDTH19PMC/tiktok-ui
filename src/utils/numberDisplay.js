export const numberDisplay = (num) => {
  if (num > 1e9) {
    num = (num / 1e9).toFixed(1) + 'B';
  } else if (num > 1e6) {
    num = (num / 1e6).toFixed(1) + 'M';
  } else if (num > 1e3) {
    num = (num / 1e3).toFixed(1) + 'K';
  }
  return num;
};
