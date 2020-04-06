// Store data
export const setItem = (key, item) => {
  localStorage.setItem(key, item);
};

// Get data
export const getItem = key => {
  localStorage.getItem(key);
};

// Remove data
export const removeItem = key => {
  localStorage.removeItem(key);
};
