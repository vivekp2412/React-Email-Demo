
/**
 * Get data from localStorage and parse it as an array of type T.
 * @param {string} key - The key used to retrieve data from localStorage.
 * @returns {T[] | null} - The parsed data as an array or null if the data is not found.
 */
export const getLocalStorage = <T>(key: string): T[] | null => {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    const data = JSON.parse(stringData);
    return data as T[];
  } else {
    return null;
  }
};

/**
 * Set data in localStorage by either creating a new array with the value or updating an existing array.
 * @param {string} key - The key to store the data in localStorage.
 * @param {T} value - The value to add or update in the localStorage array.
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    const data = JSON.parse(stringData) as T[];
    if (Array.isArray(data)) {
      data?.push(value);
      localStorage.setItem(key, JSON.stringify(data));
    }
  } else {
    localStorage.setItem(key, JSON.stringify([value]));
  }
};
export const findAndReplaceVariable=(
  inputString: string,
  variableName: string,
  replacement: string
)=> {
  const regex = new RegExp(`\\{\\{${variableName}\\}\\}`, "g");
  return inputString.replace(regex, replacement);
}
export const  extractVariables=(inputString:string)=> {
  const regex = /\{\{([^{}]+)\}\}/g;
  const matches = inputString.match(regex);
  
  if (matches) {
    return matches.map(match => match.replace(/\{\{|\}\}/g, ''));
  }

  return [];
}

