/**
 * Clear Sample Data
 * Utility to remove sample data from the database
 */

import db from '../db/db.js';

/**
 * Clear sample payments from the database
 * @returns {Promise<boolean>} Success status
 */
export async function clearSamplePayments() {
  try {
    console.log("Clearing sample payments...");
    
    // Get all payments
    const payments = await db.payments.toArray();
    
    // Find sample payments by their descriptions
    const samplePaymentIds = payments
      .filter(payment => 
        payment.description === 'Payment for Monday shift' || 
        payment.description === 'Payment for last week')
      .map(payment => payment.id);
    
    console.log(`Found ${samplePaymentIds.length} sample payments to delete:`, samplePaymentIds);
    
    // Delete the sample payments
    if (samplePaymentIds.length > 0) {
      await db.payments.bulkDelete(samplePaymentIds);
      console.log("Sample payments deleted successfully!");
    } else {
      console.log("No sample payments found.");
    }
    
    // Dispatch event to notify of data change
    window.dispatchEvent(new CustomEvent('hour-halo-data-changed', {
      detail: { type: 'payments', action: 'delete' }
    }));
    
    return true;
  } catch (error) {
    console.error("Error clearing sample payments:", error);
    return false;
  }
}

/**
 * Clear all sample data from the database
 * @returns {Promise<boolean>} Success status
 */
export async function clearAllSampleData() {
  try {
    console.log("Clearing all sample data...");
    
    // Clear sample payments
    await clearSamplePayments();
    
    // Clear sample hours, expenses, etc. if needed
    // Add more clearing functions here as needed
    
    console.log("All sample data cleared successfully!");
    return true;
  } catch (error) {
    console.error("Error clearing all sample data:", error);
    return false;
  }
}
