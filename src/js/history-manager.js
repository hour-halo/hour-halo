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
    // Default options with local timezone handling
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date();

    // Format dates using local timezone
    const startYear = thirtyDaysAgo.getFullYear();
    const startMonth = String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0');
    const startDay = String(thirtyDaysAgo.getDate()).padStart(2, '0');
    const startDateFormatted = `${startYear}-${startMonth}-${startDay}`;

    const endYear = today.getFullYear();
    const endMonth = String(today.getMonth() + 1).padStart(2, '0');
    const endDay = String(today.getDate()).padStart(2, '0');
    const endDateFormatted = `${endYear}-${endMonth}-${endDay}`;

    console.log(`Using local date range: ${startDateFormatted} to ${endDateFormatted}`);

    // Default options
    const defaultOptions = {
      startDate: startDateFormatted, // 30 days ago in local timezone
      endDate: endDateFormatted, // Today in local timezone
      types: ['hour', 'tips', 'payment', 'expense', 'bill', 'card-payment'],
      limit: 100,
      offset: 0
    };

    console.log(`Default date range: ${startDateFormatted} to ${endDateFormatted}`);

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

      try {
        // Get all weeks
        const weeks = await db.weeks.toArray();
        console.log('HISTORY MANAGER: Found weeks:', weeks.length);

        // Arrays to hold transactions
        let hoursTransactions = [];
        let tipsTransactions = [];

        // Process each week
        for (const week of weeks) {
          if (!week || !week.days) {
            console.log(`Skipping week ${week?.id || 'unknown'}: No days data`);
            continue;
          }

          console.log(`Processing week: ${week.id}`);

          try {
            // Parse the week ID to get the Monday date
            const [year, month, day] = week.id.split('-').map(num => parseInt(num, 10));

            // Create a date object for Monday (first day of the week)
            // Month is 0-indexed in JavaScript Date
            const mondayDate = new Date(year, month - 1, day);
            console.log(`Week starts on Monday: ${mondayDate.toDateString()}`);

            // Map day keys to their full names and indices
            const dayMap = [
              { key: 'mon', name: 'Monday', index: 0 },
              { key: 'tue', name: 'Tuesday', index: 1 },
              { key: 'wed', name: 'Wednesday', index: 2 },
              { key: 'thu', name: 'Thursday', index: 3 },
              { key: 'fri', name: 'Friday', index: 4 },
              { key: 'sat', name: 'Saturday', index: 5 },
              { key: 'sun', name: 'Sunday', index: 6 }
            ];

            // Process each day in the week
            for (const { key, name, index } of dayMap) {
              // Get the day data
              const dayData = week.days[key];

              if (!dayData) {
                console.log(`No data for ${name}, skipping`);
                continue;
              }

              // Get hours and tips
              const hours = parseFloat(dayData.hours) || 0;
              const tips = parseFloat(dayData.tips) || 0;

              // Skip days with no hours
              if (hours <= 0) {
                console.log(`Skipping ${name}: No hours recorded`);
                continue;
              }

              // Calculate the date for this day
              const dayDate = new Date(mondayDate);
              dayDate.setDate(mondayDate.getDate() + index);

              // Format as YYYY-MM-DD using UTC
              let dateStr = dayDate.toISOString().split('T')[0];

              // Add one day to match the date shown in the Week tab
              // This is necessary because we need to be consistent with how we handle dates
              try {
                // Parse the date
                const dateParts = dateStr.split('-');
                const year = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
                const day = parseInt(dateParts[2]);

                // Create a date object and add one day
                const dateObj = new Date(Date.UTC(year, month, day));
                dateObj.setUTCDate(dateObj.getUTCDate() + 1);

                // Format back to YYYY-MM-DD
                dateStr = dateObj.toISOString().split('T')[0];
                console.log(`  Adjusted income date by adding one day: ${dateStr}`);
              } catch (error) {
                console.error(`  Error adjusting income date: ${error}`);
              }

              console.log(`${name} (${dateStr}): Hours=${hours}, Tips=${tips}`);

              // Check if this date falls within our range
              if (dateStr >= mergedOptions.startDate && dateStr <= mergedOptions.endDate) {
                // Create a unique ID for this transaction
                const transactionId = `${week.id}-${key}`;

                // Add hours transaction
                hoursTransactions.push({
                  id: `hour-${transactionId}`,
                  type: 'hour',
                  date: dateStr,
                  amount: hours * hourlyRate,
                  description: `Worked ${hours} hours on ${name}`,
                  category: 'Income',
                  details: {
                    hours: hours,
                    rate: hourlyRate,
                    notes: `Hours worked on ${name}`
                  },
                  isIncome: true,
                  source: 'week-tab'
                });

                console.log(`✅ Added hours entry for ${dateStr}: ${hours} hours`);

                // Add tips transaction if applicable
                if (tips > 0) {
                  tipsTransactions.push({
                    id: `tips-${transactionId}`,
                    type: 'tips',
                    date: dateStr,
                    amount: tips,
                    description: `Tips earned on ${name}`,
                    category: 'Tips',
                    details: {
                      hours: hours,
                      tips: tips,
                      notes: `Tips earned on ${name}`
                    },
                    isIncome: true,
                    source: 'week-tab'
                  });

                  console.log(`✅ Added tips entry for ${dateStr}: $${tips}`);
                }
              } else {
                console.log(`⏭️ Skipped ${dateStr}: Outside date range ${mergedOptions.startDate} to ${mergedOptions.endDate}`);
              }
            }
          } catch (weekError) {
            console.error(`Error processing week ${week.id}:`, weekError);
          }
        }

        console.log('HISTORY MANAGER: Hours transactions:', hoursTransactions.length);
        console.log('HISTORY MANAGER: Tips transactions:', tipsTransactions.length);

        // Add both hours and tips transactions
        allTransactions = [...allTransactions, ...hoursTransactions, ...tipsTransactions];
      } catch (error) {
        console.error('HISTORY MANAGER: Error processing hours:', error);
      }
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
      const expenseTransactions = filteredExpenses.map(expense => {
        // Ensure the date is properly formatted as YYYY-MM-DD
        let expenseDate = expense.date;

        // Log the original date for debugging
        console.log(`Processing expense: ${expense.name}, Original date: ${expenseDate}`);

        // If the date is a Date object, convert it to YYYY-MM-DD string using UTC (same as Work Hours)
        if (expenseDate instanceof Date) {
          // Use UTC timezone to match how Work Hours dates are processed
          expenseDate = expenseDate.toISOString().split('T')[0];
          console.log(`  Converted date object to UTC string: ${expenseDate}`);
        }

        // If the date includes a time component, strip it out
        if (expenseDate && expenseDate.includes('T')) {
          expenseDate = expenseDate.split('T')[0];
          console.log(`  Stripped time component: ${expenseDate}`);
        }

        // Ensure the date is valid
        if (!expenseDate || !expenseDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
          console.warn(`  Invalid date format for expense ${expense.id}: ${expenseDate}`);
          // Default to today if date is invalid using UTC (same as Work Hours)
          expenseDate = new Date().toISOString().split('T')[0];
          console.log(`  Using default UTC date: ${expenseDate}`);
        }

        // Add one day to match the date shown in the Spend tab
        // This is necessary because the Spend tab uses local timezone but History uses UTC
        try {
          // Parse the date
          const dateParts = expenseDate.split('-');
          const year = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
          const day = parseInt(dateParts[2]);

          // Create a date object and add one day
          const dateObj = new Date(Date.UTC(year, month, day));
          dateObj.setUTCDate(dateObj.getUTCDate() + 1);

          // Format back to YYYY-MM-DD
          expenseDate = dateObj.toISOString().split('T')[0];
          console.log(`  Adjusted date by adding one day: ${expenseDate}`);
        } catch (error) {
          console.error(`  Error adjusting date: ${error}`);
        }

        return {
          id: `expense-${expense.id}`,
          type: 'expense',
          date: expenseDate,
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
        };
      });

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
      const fixedExpenseTransactions = filteredFixedExpenses.map(expense => {
        // Ensure the date is properly formatted as YYYY-MM-DD
        let expenseDate = expense.dueDate;

        // Log the original date for debugging
        console.log(`Processing fixed expense: ${expense.name}, Original date: ${expenseDate}`);

        // If the date is a Date object, convert it to YYYY-MM-DD string using UTC (same as Work Hours)
        if (expenseDate instanceof Date) {
          // Use UTC timezone to match how Work Hours dates are processed
          expenseDate = expenseDate.toISOString().split('T')[0];
          console.log(`  Converted date object to UTC string: ${expenseDate}`);
        }

        // If the date includes a time component, strip it out
        if (expenseDate && expenseDate.includes('T')) {
          expenseDate = expenseDate.split('T')[0];
          console.log(`  Stripped time component: ${expenseDate}`);
        }

        // Ensure the date is valid
        if (!expenseDate || !expenseDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
          console.warn(`  Invalid date format for fixed expense ${expense.id}: ${expenseDate}`);
          // Default to today if date is invalid using UTC (same as Work Hours)
          expenseDate = new Date().toISOString().split('T')[0];
          console.log(`  Using default UTC date: ${expenseDate}`);
        }

        // Add one day to match the date shown in the Spend tab
        // This is necessary because the Spend tab uses local timezone but History uses UTC
        try {
          // Parse the date
          const dateParts = expenseDate.split('-');
          const year = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
          const day = parseInt(dateParts[2]);

          // Create a date object and add one day
          const dateObj = new Date(Date.UTC(year, month, day));
          dateObj.setUTCDate(dateObj.getUTCDate() + 1);

          // Format back to YYYY-MM-DD
          expenseDate = dateObj.toISOString().split('T')[0];
          console.log(`  Adjusted date by adding one day: ${expenseDate}`);
        } catch (error) {
          console.error(`  Error adjusting date: ${error}`);
        }

        return {
          id: `bill-${expense.id}`,
          type: 'bill',
          date: expenseDate,
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
        };
      });

      console.log('HISTORY MANAGER: Bill transactions:', fixedExpenseTransactions.length);
      allTransactions = [...allTransactions, ...fixedExpenseTransactions];
    }

    // PAYMENTS: Get from payments table
    if (mergedOptions.types.includes('payment')) {
      console.log('HISTORY MANAGER: Fetching payments...');

      try {
        // Get all payments
        const payments = await db.payments.toArray();
        console.log('HISTORY MANAGER: Found payments:', payments.length);

        // Filter payments by date
        const filteredPayments = payments.filter(payment =>
          payment.date >= mergedOptions.startDate &&
          payment.date <= mergedOptions.endDate
        );

        console.log('HISTORY MANAGER: Filtered payments:', filteredPayments.length);

        // Transform payments to transaction format
        const paymentTransactions = filteredPayments.map(payment => {
          // Ensure the date is properly formatted as YYYY-MM-DD
          let paymentDate = payment.date;

          // Log the original date for debugging
          console.log(`Processing payment: ${payment.description}, Original date: ${paymentDate}`);

          // If the date is a Date object, convert it to YYYY-MM-DD string using UTC
          if (paymentDate instanceof Date) {
            paymentDate = paymentDate.toISOString().split('T')[0];
            console.log(`  Converted date object to UTC string: ${paymentDate}`);
          }

          // If the date includes a time component, strip it out
          if (paymentDate && paymentDate.includes('T')) {
            paymentDate = paymentDate.split('T')[0];
            console.log(`  Stripped time component: ${paymentDate}`);
          }

          // Ensure the date is valid
          if (!paymentDate || !paymentDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            console.warn(`  Invalid date format for payment ${payment.id}: ${paymentDate}`);
            paymentDate = new Date().toISOString().split('T')[0];
            console.log(`  Using default UTC date: ${paymentDate}`);
          }

          // Add one day to match the date shown in other tabs
          try {
            // Parse the date
            const dateParts = paymentDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
            const day = parseInt(dateParts[2]);

            // Create a date object and add one day
            const dateObj = new Date(Date.UTC(year, month, day));
            dateObj.setUTCDate(dateObj.getUTCDate() + 1);

            // Format back to YYYY-MM-DD
            paymentDate = dateObj.toISOString().split('T')[0];
            console.log(`  Adjusted date by adding one day: ${paymentDate}`);
          } catch (error) {
            console.error(`  Error adjusting date: ${error}`);
          }

          return {
            id: `payment-${payment.id}`,
            type: 'payment',
            date: paymentDate,
            amount: parseFloat(payment.amount) || 0,
            description: payment.description || 'Payment',
            category: 'Income',
            details: {
              method: payment.method || 'cash',
              notes: payment.notes
            },
            isIncome: true,
            source: 'payment'
          };
        });

        console.log('HISTORY MANAGER: Payment transactions:', paymentTransactions.length);
        allTransactions = [...allTransactions, ...paymentTransactions];
      } catch (error) {
        console.error('HISTORY MANAGER: Error processing payments:', error);
      }
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
          const cardPayments = filteredPayments.map(payment => {
            // Ensure the date is properly formatted as YYYY-MM-DD
            let paymentDate = payment.date;

            // Log the original date for debugging
            console.log(`Processing card payment for ${card.name}, Original date: ${paymentDate}`);

            // If the date is a Date object, convert it to YYYY-MM-DD string using UTC (same as Work Hours)
            if (paymentDate instanceof Date) {
              // Use UTC timezone to match how Work Hours dates are processed
              paymentDate = paymentDate.toISOString().split('T')[0];
              console.log(`  Converted date object to UTC string: ${paymentDate}`);
            }

            // If the date includes a time component, strip it out
            if (paymentDate && paymentDate.includes('T')) {
              paymentDate = paymentDate.split('T')[0];
              console.log(`  Stripped time component: ${paymentDate}`);
            }

            // Ensure the date is valid
            if (!paymentDate || !paymentDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
              console.warn(`  Invalid date format for card payment ${payment.id}: ${paymentDate}`);
              // Default to today if date is invalid using UTC (same as Work Hours)
              paymentDate = new Date().toISOString().split('T')[0];
              console.log(`  Using default UTC date: ${paymentDate}`);
            }

            // For card payments, we need to ensure the date is interpreted correctly
            try {
              // The date string is already in YYYY-MM-DD format
              console.log(`  Original payment date: ${paymentDate}`);

              // Validate the date format
              if (!paymentDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                console.warn(`  Invalid date format: ${paymentDate}, using default`);
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                paymentDate = `${year}-${month}-${day}`;
              }

              // Add one day to match the date shown in other tabs
              // This is the key fix - we're adding one day to the date to match the behavior in other parts of the app
              const dateParts = paymentDate.split('-');
              const year = parseInt(dateParts[0]);
              const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
              const day = parseInt(dateParts[2]);

              // Create a date object and add one day
              const dateObj = new Date(Date.UTC(year, month, day));
              dateObj.setUTCDate(dateObj.getUTCDate() + 1);

              // Format back to YYYY-MM-DD
              paymentDate = dateObj.toISOString().split('T')[0];
              console.log(`  Adjusted date by adding one day: ${paymentDate}`);
            } catch (error) {
              console.error(`  Error processing card payment date: ${error}`);
            }

            return {
              id: `card-payment-${payment.id}`,
              type: 'card-payment',
              date: paymentDate,
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
            };
          });

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

    // Log transaction summary by type
    const transactionSummary = allTransactions.reduce((acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + 1;
      return acc;
    }, {});
    console.log('HISTORY MANAGER: Transaction summary by type:', transactionSummary);

    // Log income transactions for debugging
    const incomeTransactions = allTransactions.filter(t => t.isIncome);
    console.log(`HISTORY MANAGER: Income transactions (${incomeTransactions.length}):`);
    incomeTransactions.forEach(t => {
      console.log(`  - ${t.date}: ${t.description} - ${t.amount}`);
    });

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
