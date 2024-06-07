export const isLocalStorageAvailable = () => {
  try {
    const testKey = "__localStorageTest__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
