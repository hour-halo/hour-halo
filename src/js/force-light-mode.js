// Force light mode script
import db from '../db/db.js';

export async function forceLightMode() {
  try {
    // Get current settings
    const settings = await db.settings.get(1);
    console.log('Current theme setting:', settings.theme);
    
    // Update to light mode
    await db.settings.update(1, { theme: 'light' });
    console.log('Theme set to light mode');
    
    // Apply light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    
    return true;
  } catch (error) {
    console.error('Error forcing light mode:', error);
    return false;
  }
}
