/**
 * One-time script to update the hourly rate to $10.00
 */
import db from '../db/db.js';

export async function updateHourlyRate() {
  try {
    // Get the current settings
    const settings = await db.settings.get(1);
    
    if (settings) {
      // Update the hourly rate to $10.00
      settings.hourlyRate = 10;
      
      // Save the updated settings
      await db.settings.update(1, settings);
      
      console.log('Hourly rate updated to $10.00/hr');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating hourly rate:', error);
    return false;
  }
}
