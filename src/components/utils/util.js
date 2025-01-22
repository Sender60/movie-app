export const API_KEY = '741d60afa26fe3f96424829593b87c57';
export const BASE_URL = 'https://api.themoviedb.org/3/';

export default function maxDescriptionLength(text) {
  if (text.length < 100) {
    return text;
  }
  let truncatedText = '';
  let currentLength = 0;
  const words = text.split(' ');
  words.forEach((word) => {
    if (currentLength + word.length + 1 < 100) {
      truncatedText += `${word} `;
      currentLength += word.length + 1;
    }
  });
  return `${truncatedText.trim()}...`;
}
