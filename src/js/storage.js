/**
 * Local storage utilities for Hour Halo
 * Used for app preferences and state that doesn't need IndexedDB
 */

const STORAGE_PREFIX = 'hour-halo-';

// Save data to localStorage
export function saveToStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

// Load data from localStorage
export function loadFromStorage(key, defaultValue = null) {
  try {
    const serializedData = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

// Remove data from localStorage
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

// Clear all app data from localStorage
export function clearStorage() {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

// Check if this is the first launch
export function isFirstLaunch() {
  return loadFromStorage('has-launched', false) === false;
}

// Mark app as launched
export function markAsLaunched() {
  saveToStorage('has-launched', true);
}
