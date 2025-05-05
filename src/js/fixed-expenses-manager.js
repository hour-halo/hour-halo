/**
 * Fixed Expenses Manager
 * A standalone module to manage fixed expenses using localStorage
 */

// Key for storing fixed expenses in localStorage
const STORAGE_KEY = 'hour-halo-fixed-expenses';

// Get all fixed expenses
export function getFixedExpenses() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      console.log('No fixed expenses found in localStorage');
      return [];
    }
    const expenses = JSON.parse(storedData);
    console.log('Fixed expenses from localStorage:', expenses);
    return expenses;
  } catch (error) {
    console.error('Error getting fixed expenses:', error);
    return [];
  }
}

// Add a new fixed expense
export function addFixedExpense(expense) {
  try {
    // Get existing expenses
    const expenses = getFixedExpenses();

    // Generate a unique ID
    const id = Date.now();

    // Add the new expense with ID
    const newExpense = {
      ...expense,
      id,
      createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));

    return id;
  } catch (error) {
    console.error('Error adding fixed expense:', error);
    return null;
  }
}

// Update an existing fixed expense
export function updateFixedExpense(id, updatedExpense) {
  try {
    // Get existing expenses
    const expenses = getFixedExpenses();

    // Find the expense to update
    const index = expenses.findIndex(expense => expense.id === id);

    if (index === -1) {
      return false;
    }

    // Update the expense
    expenses[index] = {
      ...expenses[index],
      ...updatedExpense
    };

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));

    return true;
  } catch (error) {
    console.error('Error updating fixed expense:', error);
    return false;
  }
}

// Delete a fixed expense
export function deleteFixedExpense(id) {
  try {
    // Get existing expenses
    const expenses = getFixedExpenses();

    // Filter out the expense to delete
    const updatedExpenses = expenses.filter(expense => expense.id !== id);

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));

    return true;
  } catch (error) {
    console.error('Error deleting fixed expense:', error);
    return false;
  }
}

// Clear all fixed expenses
export function clearFixedExpenses() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing fixed expenses:', error);
    return false;
  }
}

// Toggle the paid status of a fixed expense
export function toggleFixedExpensePaid(id) {
  try {
    // Get existing expenses
    const expenses = getFixedExpenses();

    // Find the expense to update
    const index = expenses.findIndex(expense => expense.id === id);

    if (index === -1) {
      return false;
    }

    // Toggle the paid status
    expenses[index].isPaid = !expenses[index].isPaid;

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));

    return true;
  } catch (error) {
    console.error('Error toggling fixed expense paid status:', error);
    return false;
  }
}

// Calculate total fixed expenses
export function calculateTotalFixedExpenses() {
  try {
    const expenses = getFixedExpenses();

    return expenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return total + amount;
    }, 0);
  } catch (error) {
    console.error('Error calculating total fixed expenses:', error);
    return 0;
  }
}
