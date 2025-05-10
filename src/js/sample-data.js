/**
 * Sample data for testing the expense pie chart
 */

import db from '../db/db.js';

/**
 * Clears all expense data from the database
 */
export async function clearAllExpenseData() {
  console.log("Clearing all expense data...");

  try {
    // Clear existing data
    await db.fixedExpenses.clear();
    await db.expenses.clear();
    await db.creditCardPayments.clear();

    console.log("All expense data cleared successfully!");
    return true;
  } catch (error) {
    console.error("Error clearing expense data:", error);
    return false;
  }
}

export async function addSampleExpenseData() {
  console.log("Adding sample expense data...");

  try {
    // Clear existing data
    await db.fixedExpenses.clear();
    await db.expenses.clear();
    await db.creditCardPayments.clear();

    // Add sample fixed expenses (Monthly Bills)
    const fixedExpenses = [
      {
        name: "Rent",
        amount: 1200,
        category: "Housing",
        dueDate: "2023-05-01",
        recurrenceFrequency: "monthly",
        isPaid: true,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: "Internet",
        amount: 80,
        category: "Utilities",
        dueDate: "2023-05-15",
        recurrenceFrequency: "monthly",
        isPaid: true,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: "Phone",
        amount: 60,
        category: "Utilities",
        dueDate: "2023-05-20",
        recurrenceFrequency: "monthly",
        isPaid: true,
        isActive: true,
        createdAt: new Date()
      }
    ];

    // Add sample variable expenses (Everyday Spending)
    const today = new Date();
    const thisWeek = new Date(today);
    thisWeek.setDate(today.getDate() - today.getDay() + 1); // Monday of this week

    const variableExpenses = [
      {
        amount: 45.50,
        category: "Groceries",
        date: new Date(thisWeek).toISOString().split('T')[0],
        name: "Grocery shopping",
        notes: "Weekly groceries",
        paymentMethod: "card",
        isRecurring: false,
        createdAt: new Date()
      },
      {
        amount: 25.75,
        category: "Dining",
        date: new Date(thisWeek.setDate(thisWeek.getDate() + 2)).toISOString().split('T')[0], // Wednesday
        name: "Lunch",
        notes: "Lunch with colleagues",
        paymentMethod: "card",
        isRecurring: false,
        createdAt: new Date()
      },
      {
        amount: 35.00,
        category: "Transportation",
        date: new Date(thisWeek.setDate(thisWeek.getDate() + 2)).toISOString().split('T')[0], // Friday
        name: "Gas",
        notes: "Filled up the car",
        paymentMethod: "card",
        isRecurring: false,
        createdAt: new Date()
      }
    ];

    // Add sample credit card payments
    const creditCardPayments = [
      {
        cardId: 1,
        amount: 150,
        date: new Date(thisWeek).toISOString().split('T')[0],
        type: "payment",
        notes: "Monthly payment",
        createdAt: new Date()
      }
    ];

    // Add the sample data to the database
    await db.fixedExpenses.bulkAdd(fixedExpenses);
    await db.expenses.bulkAdd(variableExpenses);
    await db.creditCardPayments.bulkAdd(creditCardPayments);

    console.log("Sample expense data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding sample expense data:", error);
    return false;
  }
}
