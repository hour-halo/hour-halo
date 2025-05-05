/**
 * Database configuration for Hour Halo
 * Uses Dexie.js as a wrapper for IndexedDB
 */

import Dexie from 'dexie';
import { defaultSettings } from './schema.js';
import { migrations } from './migrations.js';

// Create Dexie database instance
const db = new Dexie('HourHaloDB');

// Define database schema for version 1
db.version(1).stores({
  weeks: '++id, totalHours, totalEarnings, totalTips',
  expenses: '++id, weekId, amount, category, date, createdAt',
  settings: 'id'
});

// Update to version 2 to add more fields to expenses
db.version(2).stores({
  expenses: '++id, weekId, monthId, amount, category, date, name, notes, paymentMethod, isRecurring, createdAt'
});

// Update to version 3 to add credit cards and fixed expenses
db.version(3).stores({
  creditCards: '++id, name, lastFourDigits, limit, currentBalance, dueDate, minimumPayment, apr, color, isActive',
  fixedExpenses: '++id, name, amount, category, dueDate, recurrenceFrequency, isPaid, isActive, createdAt'
});

// Update to version 4 to add credit card payments and reminder fields
db.version(4).stores({
  creditCards: '++id, name, lastFourDigits, limit, currentBalance, dueDate, minimumPayment, apr, color, isActive, reminderEnabled, reminderDays, lastReminderSent',
  creditCardPayments: '++id, cardId, amount, date, type, notes, createdAt'
});

// Update to version 5 to add hours and payments tables
db.version(5).stores({
  hours: '++id, date, hours, rate, notes, createdAt',
  payments: '++id, date, amount, description, method, notes, createdAt'
});

// Apply migrations
Object.entries(migrations).forEach(([version, migrationFn]) => {
  db.version(parseInt(version)).upgrade(migrationFn);
});

// Initialize database with default settings if empty
export async function initializeDatabase() {
  const settingsCount = await db.settings.count();

  if (settingsCount === 0) {
    await db.settings.add(defaultSettings);
    console.log('Database initialized with default settings');
  }
}

// Helper function to get the current week's ID (Monday-based)
export function getCurrentWeekId() {
  // Create a new date object for today
  const now = new Date();

  // Get the current day of the week (0 = Sunday, 1 = Monday, ...)
  const currentDay = now.getDay();

  // Calculate how many days to subtract to get to the most recent Monday
  // If today is Sunday (0), we need to go back 6 days to get to Monday
  // Otherwise, we subtract currentDay - 1 (e.g., for Tuesday (2), we subtract 1 to get to Monday)
  const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;

  // Create a new date object for the Monday of the current week
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToSubtract);

  // Format as YYYY-MM-DD, ensuring we handle timezone issues
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(monday.getDate()).padStart(2, '0');

  // Log for debugging
  console.log(`Current date: ${now.toISOString().split('T')[0]}, Current day: ${currentDay}, Monday date: ${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
}

// Helper function to create a new week
export async function createWeek(weekId = getCurrentWeekId()) {
  const existingWeek = await db.weeks.get(weekId);

  if (!existingWeek) {
    const newWeek = {
      id: weekId,
      days: {
        mon: { hours: 0, tips: 0 },
        tue: { hours: 0, tips: 0 },
        wed: { hours: 0, tips: 0 },
        thu: { hours: 0, tips: 0 },
        fri: { hours: 0, tips: 0 },
        sat: { hours: 0, tips: 0 },
        sun: { hours: 0, tips: 0 }
      },
      notes: '',
      totalHours: 0,
      totalTips: 0,
      totalEarnings: 0,
      createdAt: new Date()
    };

    await db.weeks.add(newWeek);
    return newWeek;
  }

  return existingWeek;
}

// Export database instance
export default db;
