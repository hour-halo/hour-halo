/**
 * Database migrations for Hour Halo
 * Handles schema changes between versions
 */

export const migrations = {
  // Initial schema (version 1)
  1: () => {
    // No migrations needed for initial version
  },

  // Migration for version 4 - Add reminder fields to credit cards
  4: async (db) => {
    // Update existing credit cards with default reminder settings
    const creditCards = await db.creditCards.toArray();

    for (const card of creditCards) {
      await db.creditCards.update(card.id, {
        reminderEnabled: false,
        reminderDays: 3,
        lastReminderSent: null
      });
    }

    console.log('Migration to version 4 completed');
  },

  // Migration for version 5 - Add sample data for hours, payments, and expenses
  5: async (db) => {
    // Add sample hours
    const sampleHours = [
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
        hours: 8,
        rate: 10,
        notes: 'Regular shift',
        createdAt: new Date()
      },
      {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
        hours: 6,
        rate: 10,
        notes: 'Short shift',
        createdAt: new Date()
      },
      {
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
        hours: 9,
        rate: 10,
        notes: 'Overtime shift',
        createdAt: new Date()
      }
    ];

    // Add sample payments
    const samplePayments = [
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        amount: 80,
        description: 'Payment for Monday shift',
        method: 'cash',
        notes: 'Weekly payment',
        createdAt: new Date()
      },
      {
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 9 days ago
        amount: 150,
        description: 'Payment for last week',
        method: 'bank',
        notes: 'Direct deposit',
        createdAt: new Date()
      }
    ];

    // Add sample expenses
    const sampleExpenses = [
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
        amount: 12.50,
        category: 'Food',
        name: 'Lunch',
        notes: 'Sandwich and coffee',
        paymentMethod: 'cash',
        isRecurring: false,
        createdAt: new Date()
      },
      {
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days ago
        amount: 35.00,
        category: 'Transport',
        name: 'Gas',
        notes: 'Filled up the car',
        paymentMethod: 'card-1',
        isRecurring: false,
        createdAt: new Date()
      },
      {
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days ago
        amount: 15.99,
        category: 'Entertainment',
        name: 'Movie ticket',
        notes: 'Weekend movie',
        paymentMethod: 'cash',
        isRecurring: false,
        createdAt: new Date()
      }
    ];

    // Add sample fixed expenses (bills)
    const sampleFixedExpenses = [
      {
        name: 'Rent',
        amount: 800,
        category: 'Housing',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        recurrenceFrequency: 'Monthly',
        isPaid: false,
        isActive: true,
        paymentMethod: 'bank',
        createdAt: new Date()
      },
      {
        name: 'Netflix',
        amount: 14.99,
        category: 'Subscriptions',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        recurrenceFrequency: 'Monthly',
        isPaid: true,
        isActive: true,
        paymentMethod: 'card-1',
        createdAt: new Date()
      }
    ];

    // Add sample credit card
    const sampleCreditCard = {
      name: 'Main Credit Card',
      lastFourDigits: '1234',
      limit: 2000,
      currentBalance: 450,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      minimumPayment: 25,
      apr: 18.99,
      color: '#007aff',
      isActive: true,
      reminderEnabled: true,
      reminderDays: 3,
      lastReminderSent: null
    };

    // Add sample credit card payment
    const sampleCardPayment = {
      cardId: 1, // Will be updated after card is added
      amount: 50,
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days ago
      type: 'Custom',
      notes: 'Monthly payment',
      createdAt: new Date()
    };

    // Add all sample data to database
    try {
      // Add hours
      for (const hour of sampleHours) {
        await db.hours.add(hour);
      }

      // Add payments
      for (const payment of samplePayments) {
        await db.payments.add(payment);
      }

      // Add expenses
      for (const expense of sampleExpenses) {
        await db.expenses.add(expense);
      }

      // Add fixed expenses
      for (const fixedExpense of sampleFixedExpenses) {
        await db.fixedExpenses.add(fixedExpense);
      }

      // Add credit card
      const cardId = await db.creditCards.add(sampleCreditCard);

      // Update card payment with correct card ID
      sampleCardPayment.cardId = cardId;
      await db.creditCardPayments.add(sampleCardPayment);

      console.log('Migration to version 5 completed - Sample data added');
    } catch (error) {
      console.error('Error adding sample data:', error);
    }
  }
};
