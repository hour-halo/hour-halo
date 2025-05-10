/**
 * Credit Card Manager
 * Utility functions for managing credit cards and payments
 */

import db from '../db/db.js';

/**
 * Get all credit cards
 * @returns {Promise<Array>} Array of credit cards
 */
export async function getCreditCards() {
  try {
    const cards = await db.creditCards.toArray();
    console.log('Credit cards from database:', cards);
    return cards;
  } catch (error) {
    console.error('Error getting credit cards:', error);
    return [];
  }
}

/**
 * Get a credit card by ID
 * @param {number} id - Credit card ID
 * @returns {Promise<Object|null>} Credit card object or null if not found
 */
export async function getCreditCardById(id) {
  try {
    return await db.creditCards.get(id);
  } catch (error) {
    console.error(`Error getting credit card with ID ${id}:`, error);
    return null;
  }
}

/**
 * Add a new credit card
 * @param {Object} card - Credit card object
 * @returns {Promise<number>} ID of the new credit card
 */
export async function addCreditCard(card) {
  try {
    // Ensure numeric values
    const cardToAdd = {
      ...card,
      limit: parseFloat(card.limit) || 0,
      currentBalance: parseFloat(card.currentBalance) || 0,
      minimumPayment: parseFloat(card.minimumPayment) || 0,
      apr: parseFloat(card.apr) || 0,
      reminderEnabled: card.reminderEnabled || false,
      reminderDays: card.reminderDays || 3,
      lastReminderSent: card.lastReminderSent || null,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    return await db.creditCards.add(cardToAdd);
  } catch (error) {
    console.error('Error adding credit card:', error);
    throw error;
  }
}

/**
 * Update an existing credit card
 * @param {number} id - Credit card ID
 * @param {Object} updates - Object with fields to update
 * @returns {Promise<number>} Updated credit card ID
 */
export async function updateCreditCard(id, updates) {
  try {
    // Ensure numeric values if they exist in updates
    const updatesToApply = { ...updates };

    if ('limit' in updatesToApply) {
      updatesToApply.limit = parseFloat(updatesToApply.limit) || 0;
    }

    if ('currentBalance' in updatesToApply) {
      updatesToApply.currentBalance = parseFloat(updatesToApply.currentBalance) || 0;
    }

    if ('minimumPayment' in updatesToApply) {
      updatesToApply.minimumPayment = parseFloat(updatesToApply.minimumPayment) || 0;
    }

    if ('apr' in updatesToApply) {
      updatesToApply.apr = parseFloat(updatesToApply.apr) || 0;
    }

    await db.creditCards.update(id, updatesToApply);
    return id;
  } catch (error) {
    console.error(`Error updating credit card with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a credit card
 * @param {number} id - Credit card ID
 * @returns {Promise<void>}
 */
export async function deleteCreditCard(id) {
  try {
    // First delete all payments associated with this card
    await db.creditCardPayments.where('cardId').equals(id).delete();

    // Then delete the card itself
    await db.creditCards.delete(id);
  } catch (error) {
    console.error(`Error deleting credit card with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Record a payment for a credit card
 * @param {Object} payment - Payment object
 * @returns {Promise<number>} ID of the new payment
 */
export async function recordCreditCardPayment(payment) {
  try {
    // Debug logging
    console.log('CREDIT CARD MANAGER: Recording payment:', payment);
    console.log('CREDIT CARD MANAGER: Payment date:', payment.date);
    console.log('CREDIT CARD MANAGER: Payment date type:', typeof payment.date);

    // Ensure required fields
    if (!payment.cardId || !payment.amount || !payment.date || !payment.type) {
      throw new Error('Missing required payment fields');
    }

    // Create payment object
    const paymentToAdd = {
      ...payment,
      amount: parseFloat(payment.amount) || 0,
      createdAt: new Date().toISOString()
    };

    console.log('CREDIT CARD MANAGER: Payment object to add to database:', paymentToAdd);

    // Add payment to database
    const paymentId = await db.creditCardPayments.add(paymentToAdd);

    // Update card balance
    const card = await getCreditCardById(payment.cardId);
    if (card) {
      const newBalance = Math.max(0, card.currentBalance - payment.amount);
      await updateCreditCard(card.id, { currentBalance: newBalance });
    }

    return paymentId;
  } catch (error) {
    console.error('Error recording credit card payment:', error);
    throw error;
  }
}

/**
 * Get payment history for a credit card
 * @param {number} cardId - Credit card ID
 * @returns {Promise<Array>} Array of payments
 */
export async function getCreditCardPayments(cardId) {
  try {
    console.log(`CREDIT CARD MANAGER: Getting payments for card ID ${cardId}`);

    const payments = await db.creditCardPayments
      .where('cardId')
      .equals(cardId)
      .reverse() // Most recent first
      .toArray();

    console.log(`CREDIT CARD MANAGER: Found ${payments.length} payments for card ID ${cardId}`);

    // Log each payment's date
    payments.forEach((payment, index) => {
      console.log(`CREDIT CARD MANAGER: Payment ${index + 1} date:`, payment.date);
      console.log(`CREDIT CARD MANAGER: Payment ${index + 1} date type:`, typeof payment.date);

      // Create a Date object from the date string to see how it's interpreted
      if (payment.date) {
        const dateObj = new Date(payment.date);
        console.log(`CREDIT CARD MANAGER: Date object created from payment ${index + 1} date:`, dateObj);
        console.log(`CREDIT CARD MANAGER: Date object toISOString:`, dateObj.toISOString());
        console.log(`CREDIT CARD MANAGER: Date object toLocaleDateString:`, dateObj.toLocaleDateString());
      }
    });

    return payments;
  } catch (error) {
    console.error(`Error getting payments for card ID ${cardId}:`, error);
    return [];
  }
}

/**
 * Delete a credit card payment
 * @param {number} paymentId - Payment ID
 * @returns {Promise<void>}
 */
export async function deleteCreditCardPayment(paymentId) {
  try {
    // Get the payment to find the card and amount
    const payment = await db.creditCardPayments.get(paymentId);

    if (payment) {
      // Get the card
      const card = await getCreditCardById(payment.cardId);

      if (card) {
        // Add the payment amount back to the balance
        const newBalance = card.currentBalance + payment.amount;
        await updateCreditCard(card.id, { currentBalance: newBalance });
      }

      // Delete the payment
      await db.creditCardPayments.delete(paymentId);
    }
  } catch (error) {
    console.error(`Error deleting payment with ID ${paymentId}:`, error);
    throw error;
  }
}

/**
 * Calculate monthly interest for a credit card
 * @param {Object} card - Credit card object
 * @returns {number} Monthly interest amount
 */
export function calculateMonthlyInterest(card) {
  if (!card || !card.currentBalance || !card.apr) {
    return 0;
  }

  // Monthly interest = (APR / 12) * current balance
  return (card.currentBalance * (card.apr / 100)) / 12;
}

/**
 * Calculate credit card utilization percentage
 * @param {Object} card - Credit card object
 * @returns {number} Utilization percentage (0-100)
 */
export function calculateUtilization(card) {
  if (!card || !card.limit || card.limit <= 0) {
    return 0;
  }

  return Math.min(100, (card.currentBalance / card.limit) * 100);
}

/**
 * Format due date with status indicator
 * @param {string} dueDate - Due date string (YYYY-MM-DD)
 * @returns {Object} Object with formatted date and status
 */
export function formatDueDate(dueDate) {
  if (!dueDate) {
    return { text: 'No due date', status: 'none' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDateObj = new Date(dueDate);
  dueDateObj.setHours(0, 0, 0, 0);

  const diffTime = dueDateObj - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Format the date
  const options = { month: 'short', day: 'numeric' };
  const formattedDate = dueDateObj.toLocaleDateString('en-US', options);

  // Determine status
  let status = 'normal';
  let text = `Due ${formattedDate}`;

  if (diffDays < 0) {
    status = 'overdue';
    text = `Overdue (${formattedDate})`;
  } else if (diffDays === 0) {
    status = 'due-today';
    text = 'Due Today';
  } else if (diffDays <= 3) {
    status = 'due-soon';
    text = `Due ${formattedDate} (${diffDays} days)`;
  }

  return { text, status };
}

/**
 * Estimate payoff time based on payment amount
 * @param {Object} card - Credit card object
 * @param {number} paymentAmount - Monthly payment amount
 * @returns {Object} Payoff information
 */
export function estimatePayoffTime(card, paymentAmount) {
  if (!card || !card.currentBalance || !card.apr || !paymentAmount) {
    return { months: 0, totalInterest: 0 };
  }

  // If payment is less than monthly interest, debt will never be paid off
  const monthlyInterestRate = card.apr / 100 / 12;
  const monthlyInterest = card.currentBalance * monthlyInterestRate;

  if (paymentAmount <= monthlyInterest) {
    return { months: Infinity, totalInterest: Infinity };
  }

  // Calculate months to pay off
  let balance = card.currentBalance;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < 1000) { // Cap at 1000 months to prevent infinite loops
    const interest = balance * monthlyInterestRate;
    totalInterest += interest;

    balance = balance + interest - paymentAmount;
    months++;

    // If final payment
    if (balance < 0) {
      balance = 0;
    }
  }

  return { months, totalInterest };
}
