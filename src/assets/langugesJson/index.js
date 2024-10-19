import originalLanguages from './languages.json';
// Chuyển đổi sang mảng các đối tượng với key và title
export const languages = Object.entries(originalLanguages).map(([key, title]) => ({
  key,
  title,
}));
