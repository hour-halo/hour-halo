/**
 * Helper functions for Hour Halo
 */

// Format currency based on settings
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Format date to display format
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Format time (for settings)
export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date().setHours(hours, minutes));
}

// Get day name from date
export function getDayName(dateString, short = false) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: short ? 'short' : 'long'
  }).format(date);
}

// Get week range string (e.g., "Apr 1 - Apr 7")
export function getWeekRangeString(weekId) {
  // Parse the weekId (which is now the Monday date)
  const parts = weekId.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
  const day = parseInt(parts[2], 10);

  // Create date objects for Monday (start) and Sunday (end)
  const startDate = new Date(year, month, day);
  const endDate = new Date(year, month, day + 6);

  // Format the month names
  const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

  // Get the day numbers
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  // Log for debugging
  console.log(`Week range: ${startMonth} ${startDay} - ${endMonth} ${endDay} (${startDate.toDateString()} to ${endDate.toDateString()})`);

  // Return formatted string
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
}

// Calculate total earnings based on hours and rate
export function calculateEarnings(hours, rate) {
  return hours * rate;
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Debounce function to limit how often a function can be called
export function debounce(func, wait = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Check if device is in dark mode
export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Apply theme based on settings
export function applyTheme(theme) {
  const isDark = theme === 'dark' || (theme === 'system' && isDarkMode());

  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }

  // Log theme change for debugging
  console.log(`Applied theme: ${theme} (isDark: ${isDark})`);
}

// Convert day name to day key (mon, tue, etc.)
export function getDayKey(dayName) {
  const dayMap = {
    'monday': 'mon',
    'tuesday': 'tue',
    'wednesday': 'wed',
    'thursday': 'thu',
    'friday': 'fri',
    'saturday': 'sat',
    'sunday': 'sun'
  };

  const key = dayMap[dayName.toLowerCase()];
  console.log(`Converting day name "${dayName}" to key "${key}"`);
  return key;
}

// Get day key from date (mon, tue, etc.)
export function getDayKeyFromDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  console.log(`Date: ${dateStr}, Day: ${day}, DayKey: ${dayKeys[day]}, DayName: ${getDayName(dateStr)}`);
  return dayKeys[day];
}

// Get month range string (e.g., "April 2023" or "April 1 - 30, 2023")
export function getMonthRangeString(dateStr, includeRange = false) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get month name
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  if (!includeRange) {
    return `${monthName} ${year}`;
  }

  // Get first and last day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return `${monthName} ${firstDay.getDate()} - ${lastDay.getDate()}, ${year}`;
}
