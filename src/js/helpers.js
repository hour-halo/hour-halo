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

// Parse a YYYY-MM-DD string as a local midnight date (not UTC midnight).
// Using new Date("YYYY-MM-DD") parses as UTC and shifts the date in non-UTC zones.
export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Format a Date object as YYYY-MM-DD using local time components (not UTC).
export function toLocalISODateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date to display format
export function formatDate(dateString) {
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: short ? 'short' : 'long'
  }).format(date);
}

// Get week range string (e.g., "Apr 1 - Apr 7")
export function getWeekRangeString(weekId) {
  // Parse the weekId (which is the Monday date) as a local date
  const parts = weekId.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
  const day = parseInt(parts[2], 10);

  // Create date objects for Monday (start) and Sunday (end) in local time
  const startDate = new Date(year, month, day);
  const endDate = new Date(year, month, day + 6);

  // Format the month names
  const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

  // Get the day numbers
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

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
  return dayMap[dayName.toLowerCase()];
}

// Get day key from date (mon, tue, etc.)
export function getDayKeyFromDate(dateStr) {
  const date = parseLocalDate(dateStr);
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return dayKeys[date.getDay()];
}

// Get month range string (e.g., "April 2023" or "April 1 - 30, 2023")
export function getMonthRangeString(dateStr, includeRange = false) {
  // Accept both Date objects and YYYY-MM-DD strings
  const date = (dateStr instanceof Date) ? dateStr : parseLocalDate(dateStr);
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
