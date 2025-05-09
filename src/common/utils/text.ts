const guidRegex = /^[a-f0-9]{32}$/i; // Case-insensitive check

export const isGUID = (key: string): boolean => {
  return guidRegex.test(key);
};
