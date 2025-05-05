/**
 * Test function for fixed expenses
 * This file contains functions to test adding and retrieving fixed expenses
 */

import db from '../db/db.js';

// Function to add a test fixed expense
export async function addTestFixedExpense() {
  try {
    // Create a test fixed expense
    const testExpense = {
      name: 'Test Rent',
      amount: 1000,
      category: 'Housing',
      dueDate: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    console.log('Adding test fixed expense:', testExpense);
    
    // Add to database
    const id = await db.fixedExpenses.add(testExpense);
    
    console.log('Test fixed expense added with ID:', id);
    
    return id;
  } catch (error) {
    console.error('Error adding test fixed expense:', error);
    console.error('Error details:', error.stack);
    return null;
  }
}

// Function to get all fixed expenses
export async function getAllFixedExpenses() {
  try {
    const expenses = await db.fixedExpenses.toArray();
    console.log('All fixed expenses:', expenses);
    return expenses;
  } catch (error) {
    console.error('Error getting fixed expenses:', error);
    console.error('Error details:', error.stack);
    return [];
  }
}

// Function to clear all fixed expenses
export async function clearFixedExpenses() {
  try {
    await db.fixedExpenses.clear();
    console.log('Fixed expenses cleared');
    return true;
  } catch (error) {
    console.error('Error clearing fixed expenses:', error);
    console.error('Error details:', error.stack);
    return false;
  }
}
