/**
 * Database schema for Hour Halo
 * Defines the structure of the IndexedDB tables
 */

export const dbSchema = {
  weeks: '++id, totalHours, totalEarnings, totalTips',
  expenses: '++id, weekId, monthId, amount, category, date, name, notes, paymentMethod, isRecurring, createdAt',
  settings: 'id',
  creditCards: '++id, name, lastFourDigits, limit, currentBalance, dueDate, minimumPayment, apr, color, isActive, reminderEnabled, reminderDays, lastReminderSent',
  fixedExpenses: '++id, name, amount, category, dueDate, recurrenceFrequency, isPaid, isActive, paymentMethod, createdAt',
  creditCardPayments: '++id, cardId, amount, date, type, notes, createdAt',
  hours: '++id, date, hours, rate, notes, createdAt',
  payments: '++id, date, amount, description, method, notes, createdAt'
};

// Default settings
export const defaultSettings = {
  id: 1,
  hourlyRate: 10,
  currency: 'USD',
  showTips: true,
  weeklyBudget: 200,
  monthlyBudget: 800, // Added monthly budget
  reminderTime: '19:00',
  theme: 'system', // light, dark, system
  defaultView: 'week', // week, summary, spend, history, settings
  enableDailyReminder: true,
  weeklySummaryDay: 'sunday',
  enableWeeklySummary: false
};

// Default expense categories
export const expenseCategories = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Other'
];

// Fixed expense categories
export const fixedExpenseCategories = [
  'Housing',
  'Utilities',
  'Subscriptions',
  'Insurance',
  'Loans',
  'Memberships',
  'Other'
];

// Recurrence frequencies
export const recurrenceFrequencies = [
  'Monthly',
  'Quarterly',
  'Yearly'
];

// Default credit card colors
export const creditCardColors = [
  '#007aff', // Blue
  '#34c759', // Green
  '#ff9500', // Orange
  '#ff3b30', // Red
  '#5856d6', // Purple
  '#ff2d55', // Pink
  '#a2845e'  // Brown
];

// Credit card payment types
export const creditCardPaymentTypes = [
  'Minimum',
  'Custom',
  'Full'
];
