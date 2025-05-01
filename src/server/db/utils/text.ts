export const toPascalCase = (str: string): string => {
  return str
    .split(' ')
    .map((word) => {
      // Remove any punctuation at the end if desired:
      const cleanedWord = word.replace(/[^a-zA-Z0-9]/g, '');
      return cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1).toLowerCase();
    })
    .join('');
};
