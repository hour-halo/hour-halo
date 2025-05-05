/**
 * History Manager
 * Handles data retrieval and manipulation for the History tab
 */

import db from '../db/db.js';
import { getFixedExpenses } from './fixed-expenses-manager.js';
import { getCreditCards, getCreditCardPayments } from './credit-card-manager.js';

/**
 * Get all transactions (hours, payments, expenses, bills, credit card payments)
 * @param {Object} options - Filter options
 * @returns {Promise<Array>} - Combined and sorted transactions
 */
export async function getTransactionHistory(options = {}) {
  try {
    // Default options
    const defaultOptions = {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      endDate: new Date().toISOString().split('T')[0], // Today
      types: ['hour', 'tips', 'payment', 'expense', 'bill', 'card-payment'],
      limit: 100,
      offset: 0
    };

    // Merge options
    const mergedOptions = { ...defaultOptions, ...options };

    console.log('HISTORY MANAGER: Getting transaction history with options:', mergedOptions);

    // Initialize array to hold all transactions
    let allTransactions = [];

    // Get settings for hourly rate
    const settings = await db.settings.get(1);
    const hourlyRate = settings?.hourlyRate || 10;

    // HOURS: Get data from Week tab
    if (mergedOptions.types.includes('hour')) {
      console.log('HISTORY MANAGER: Fetching hours from Week tab...');

      // Get all weeks
      const weeks = await db.weeks.toArray();
      console.log('HISTORY MANAGER: Found weeks:', weeks.length);

      let hoursFromWeeks = [];

      // Process each week to extract daily hours
      for (const week of weeks) {
        if (week.days) {
          // Convert week ID to date
          const weekStartDate = new Date(week.id);

          // Process each day in the week
          const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
          dayKeys.forEach((dayKey, index) => {
            if (week.days[dayKey] && week.days[dayKey].hours > 0) {
              // Calculate the actual date for this day
              const dayDate = new Date(weekStartDate);
              dayDate.setDate(weekStartDate.getDate() + index);
              const dateStr = dayDate.toISOString().split('T')[0];

              // Check if this date falls within our range
              if (dateStr >= mergedOptions.startDate && dateStr <= mergedOptions.endDate) {
                hoursFromWeeks.push({
                  id: `week-${week.id}-${dayKey}`,
                  date: dateStr,
                  hours: week.days[dayKey].hours,
                  tips: week.days[dayKey].tips || 0,
                  rate: hourlyRate,
                  notes: `Hours worked on ${dayKey}`
                });
              }
            }
          });
        }
      }

      console.log('HISTORY MANAGER: Hours from weeks:', hoursFromWeeks.length, hoursFromWeeks);

      // Transform hours to transaction format
      const hoursTransactions = hoursFromWeeks.map(hour => ({
        id: `hour-${hour.id}`,
        type: 'hour',
        date: hour.date,
        amount: hour.hours * (hour.rate || hourlyRate),
        description: `Worked ${hour.hours} hours`,
        category: 'Income',
        details: {
          hours: hour.hours,
          rate: hour.rate || hourlyRate,
          notes: hour.notes
        },
        isIncome: true,
        source: 'week-tab'
      }));

      // Create separate transactions for tips
      const tipsTransactions = hoursFromWeeks
        .filter(hour => hour.tips && hour.tips > 0) // Only include days with tips
        .map(hour => ({
          id: `tips-${hour.id}`,
          type: 'tips',
          date: hour.date,
          amount: hour.tips,
          description: `Tips earned`,
          category: 'Tips',
          details: {
            hours: hour.hours,
            tips: hour.tips,
            notes: `Tips earned on ${hour.date}`
          },
          isIncome: true,
          source: 'week-tab'
        }));

      console.log('HISTORY MANAGER: Hours transactions:', hoursTransactions.length);
      console.log('HISTORY MANAGER: Tips transactions:', tipsTransactions.length);

      // Add both hours and tips transactions
      allTransactions = [...allTransactions, ...hoursTransactions, ...tipsTransactions];
    }

    // EXPENSES: Get data from Spend tab
    if (mergedOptions.types.includes('expense')) {
      console.log('HISTORY MANAGER: Fetching expenses from Spend tab...');

      // Get all expenses
      const expenses = await db.expenses.toArray();
      console.log('HISTORY MANAGER: Found expenses:', expenses.length);

      // Filter expenses by date
      const filteredExpenses = expenses.filter(expense =>
        expense.date >= mergedOptions.startDate &&
        expense.date <= mergedOptions.endDate
      );

      console.log('HISTORY MANAGER: Filtered expenses:', filteredExpenses.length);

      // Transform expenses to transaction format
      const expenseTransactions = filteredExpenses.map(expense => ({
        id: `expense-${expense.id}`,
        type: 'expense',
        date: expense.date,
        amount: parseFloat(expense.amount) || 0,
        description: expense.name || 'Expense',
        category: expense.category || 'Uncategorized',
        details: {
          paymentMethod: expense.paymentMethod || 'cash',
          notes: expense.notes,
          weekId: expense.weekId,
          monthId: expense.monthId,
          isRecurring: expense.isRecurring || false
        },
        isIncome: false,
        source: 'spend-tab'
      }));

      console.log('HISTORY MANAGER: Expense transactions:', expenseTransactions.length);
      allTransactions = [...allTransactions, ...expenseTransactions];
    }

    // BILLS: Get fixed expenses from Spend tab
    if (mergedOptions.types.includes('bill')) {
      console.log('HISTORY MANAGER: Fetching bills from Spend tab...');

      // Get fixed expenses from localStorage
      const fixedExpenses = getFixedExpenses();
      console.log('HISTORY MANAGER: Found fixed expenses:', fixedExpenses.length);

      // Filter fixed expenses by date
      const filteredFixedExpenses = fixedExpenses.filter(expense =>
        expense.dueDate >= mergedOptions.startDate &&
        expense.dueDate <= mergedOptions.endDate &&
        expense.isActive !== false
      );

      console.log('HISTORY MANAGER: Filtered fixed expenses:', filteredFixedExpenses.length);

      // Transform fixed expenses to transaction format
      const fixedExpenseTransactions = filteredFixedExpenses.map(expense => ({
        id: `bill-${expense.id}`,
        type: 'bill',
        date: expense.dueDate,
        amount: parseFloat(expense.amount) || 0,
        description: expense.name || 'Monthly Bill',
        category: expense.category || 'Bills',
        details: {
          paymentMethod: expense.paymentMethod || 'cash',
          isPaid: expense.isPaid || false,
          recurrenceFrequency: expense.recurrenceFrequency || 'Monthly',
          isActive: expense.isActive !== false
        },
        isIncome: false,
        source: 'spend-tab'
      }));

      console.log('HISTORY MANAGER: Bill transactions:', fixedExpenseTransactions.length);
      allTransactions = [...allTransactions, ...fixedExpenseTransactions];
    }

    // CREDIT CARD PAYMENTS: Get from Spend tab
    if (mergedOptions.types.includes('card-payment')) {
      console.log('HISTORY MANAGER: Fetching credit card payments from Spend tab...');

      // Get all credit cards
      const cards = await getCreditCards();
      console.log('HISTORY MANAGER: Found credit cards:', cards.length);

      let cardPaymentTransactions = [];

      // Get payments for each card
      for (const card of cards) {
        if (card.isActive !== false) {
          const payments = await getCreditCardPayments(card.id);
          console.log(`HISTORY MANAGER: Found payments for card ${card.name}:`, payments.length);

          // Filter payments by date
          const filteredPayments = payments.filter(payment =>
            payment.date >= mergedOptions.startDate &&
            payment.date <= mergedOptions.endDate
          );

          console.log(`HISTORY MANAGER: Filtered payments for card ${card.name}:`, filteredPayments.length);

          // Transform card payments to transaction format
          const cardPayments = filteredPayments.map(payment => ({
            id: `card-payment-${payment.id}`,
            type: 'card-payment',
            date: payment.date,
            amount: parseFloat(payment.amount) || 0,
            description: `${payment.type || 'Credit Card'} Payment - ${card.name}`,
            category: 'Credit Card Payment',
            details: {
              cardId: card.id,
              cardName: card.name,
              lastFourDigits: card.lastFourDigits,
              paymentType: payment.type,
              notes: payment.notes,
              color: card.color
            },
            isIncome: false,
            source: 'spend-tab'
          }));

          cardPaymentTransactions = [...cardPaymentTransactions, ...cardPayments];
        }
      }

      console.log('HISTORY MANAGER: Card payment transactions:', cardPaymentTransactions.length);
      allTransactions = [...allTransactions, ...cardPaymentTransactions];
    }

    // Sort all transactions by date (newest first)
    allTransactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Apply limit and offset
    if (mergedOptions.limit) {
      allTransactions = allTransactions.slice(
        mergedOptions.offset,
        mergedOptions.offset + mergedOptions.limit
      );
    }

    console.log('HISTORY MANAGER: Final transactions count:', allTransactions.length);
    return allTransactions;
  } catch (error) {
    console.error('HISTORY MANAGER: Error fetching transaction history:', error);
    return [];
  }
}

/**
 * Filter transactions based on criteria
 * @param {Array} transactions - Transactions to filter
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered transactions
 */
export function filterTransactions(transactions, filters = {}) {
  if (!transactions || !transactions.length) return [];

  console.log('Filtering transactions with filters:', filters);
  console.log('Transactions before filtering:', transactions);

  const filtered = transactions.filter(transaction => {
    // Filter by type
    if (filters.types && filters.types.length && !filters.types.includes(transaction.type)) {
      console.log(`Filtering out transaction ${transaction.id} because type ${transaction.type} is not in ${filters.types}`);
      return false;
    }

    // Filter by category
    if (filters.category && transaction.category !== filters.category) {
      console.log(`Filtering out transaction ${transaction.id} because category ${transaction.category} is not ${filters.category}`);
      return false;
    }

    // Filter by income/expense
    if (filters.isIncome !== undefined && transaction.isIncome !== filters.isIncome) {
      console.log(`Filtering out transaction ${transaction.id} because isIncome ${transaction.isIncome} is not ${filters.isIncome}`);
      return false;
    }

    // Filter by date range
    if (filters.startDate && transaction.date < filters.startDate) {
      console.log(`Filtering out transaction ${transaction.id} because date ${transaction.date} is before ${filters.startDate}`);
      return false;
    }
    if (filters.endDate && transaction.date > filters.endDate) {
      console.log(`Filtering out transaction ${transaction.id} because date ${transaction.date} is after ${filters.endDate}`);
      return false;
    }

    // Filter by payment method
    if (filters.paymentMethod &&
        transaction.details &&
        transaction.details.paymentMethod !== filters.paymentMethod) {
      console.log(`Filtering out transaction ${transaction.id} because paymentMethod ${transaction.details.paymentMethod} is not ${filters.paymentMethod}`);
      return false;
    }

    return true;
  });

  console.log('Transactions after filtering:', filtered);
  return filtered;
}

/**
 * Search transactions by text
 * @param {Array} transactions - Transactions to search
 * @param {string} query - Search query
 * @returns {Array} - Matching transactions
 */
export function searchTransactions(transactions, query) {
  if (!query || !query.trim() || !transactions || !transactions.length) {
    return transactions;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return transactions.filter(transaction => {
    // Search in description
    if (transaction.description &&
        transaction.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in category
    if (transaction.category &&
        transaction.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in notes
    if (transaction.details &&
        transaction.details.notes &&
        transaction.details.notes.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    return false;
  });
}

/**
 * Group transactions by date
 * @param {Array} transactions - Transactions to group
 * @returns {Array} - Grouped transactions
 */
export function groupTransactionsByDate(transactions) {
  if (!transactions || !transactions.length) return [];

  const grouped = {};

  // Group transactions by date
  transactions.forEach(transaction => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = [];
    }
    grouped[transaction.date].push(transaction);
  });

  // Convert to array format for rendering
  return Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a)) // Sort dates newest first
    .map(date => ({
      date,
      transactions: grouped[date]
    }));
}

/**
 * Calculate summary statistics for transactions
 * @param {Array} transactions - Transactions to analyze
 * @returns {Object} - Summary statistics
 */
export function calculateTransactionStats(transactions) {
  if (!transactions || !transactions.length) {
    return {
      totalIncome: 0,
      totalExpenses: 0,
      netBalance: 0,
      categories: {},
      paymentMethods: {}
    };
  }

  const stats = {
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    categories: {},
    paymentMethods: {}
  };

  transactions.forEach(transaction => {
    // Calculate income and expenses
    if (transaction.isIncome) {
      stats.totalIncome += parseFloat(transaction.amount) || 0;
    } else {
      stats.totalExpenses += parseFloat(transaction.amount) || 0;
    }

    // Track categories
    const category = transaction.category || 'Uncategorized';
    if (!stats.categories[category]) {
      stats.categories[category] = 0;
    }
    stats.categories[category] += parseFloat(transaction.amount) || 0;

    // Track payment methods
    if (transaction.details && transaction.details.paymentMethod) {
      const method = transaction.details.paymentMethod;
      if (!stats.paymentMethods[method]) {
        stats.paymentMethods[method] = 0;
      }
      stats.paymentMethods[method] += parseFloat(transaction.amount) || 0;
    }
  });

  // Calculate net balance
  stats.netBalance = stats.totalIncome - stats.totalExpenses;

  return stats;
}
