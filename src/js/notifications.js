/**
 * Notification utilities for Hour Halo
 * Uses Capacitor LocalNotifications plugin when available
 * Also provides toast notifications for in-app feedback
 */

// Check if we're running in a Capacitor environment
export function isCapacitorAvailable() {
  return window.Capacitor && window.Capacitor.isNativePlatform();
}

// Request notification permissions
export async function requestNotificationPermission() {
  if (!isCapacitorAvailable()) {
    console.log('Capacitor not available, using browser notifications');

    // Use browser notifications API
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  try {
    // In a real app, you would import Capacitor plugins
    // For now, we'll just log a message since the package isn't installed
    console.log('Would request Capacitor notification permissions here');
    return false;

    // This is the code that would be used if Capacitor was installed:
    // const { LocalNotifications } = await import('@capacitor/local-notifications');
    // const { display } = await LocalNotifications.requestPermissions();
    // return display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

// Schedule a daily reminder
export async function scheduleDailyReminder(time, title, body) {
  if (!isCapacitorAvailable()) {
    console.log('Capacitor not available, cannot schedule native notifications');
    return false;
  }

  try {
    // In a real app, you would import Capacitor plugins
    // For now, we'll just log a message since the package isn't installed
    console.log(`Would schedule notification at ${time} with title "${title}" and body "${body}"`);
    return false;

    // This is the code that would be used if Capacitor was installed:
    /*
    const { LocalNotifications } = await import('@capacitor/local-notifications');

    // Parse time string (HH:MM)
    const [hours, minutes] = time.split(':').map(Number);

    // Create date for today at specified time
    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    // If time is in the past, schedule for tomorrow
    if (notificationTime < new Date()) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    // Schedule notification
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title,
          body,
          schedule: {
            at: notificationTime,
            repeats: true,
            every: 'day'
          }
        }
      ]
    });

    return true;
    */
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return false;
  }
}

// Cancel all scheduled notifications
export async function cancelAllNotifications() {
  if (!isCapacitorAvailable()) {
    return;
  }

  try {
    // In a real app, you would import Capacitor plugins
    // For now, we'll just log a message since the package isn't installed
    console.log('Would cancel all notifications here');

    // This is the code that would be used if Capacitor was installed:
    // const { LocalNotifications } = await import('@capacitor/local-notifications');
    // await LocalNotifications.cancelAll();
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
}

// Show a toast notification
export function showToast(message, type = 'success', duration = 3000) {
  // Create toast element if it doesn't exist
  let toastContainer = document.getElementById('toast-container');

  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '80px'; // Above the bottom nav
    toastContainer.style.left = '0';
    toastContainer.style.right = '0';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.alignItems = 'center';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.pointerEvents = 'none';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'ios-toast';
  toast.style.backgroundColor = type === 'success' ? 'rgba(52, 199, 89, 0.9)' :
                               type === 'error' ? 'rgba(255, 59, 48, 0.9)' :
                               'rgba(0, 122, 255, 0.9)';
  toast.style.color = 'white';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '8px';
  toast.style.margin = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  toast.style.backdropFilter = 'blur(10px)';
  toast.style.maxWidth = '90%';
  toast.style.textAlign = 'center';
  toast.style.fontWeight = '500';
  toast.style.fontSize = '14px';
  toast.style.transform = 'translateY(20px)';
  toast.style.opacity = '0';
  toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  toast.textContent = message;

  // Add to container
  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  // Remove after duration
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';

    // Remove from DOM after animation
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }

      // Remove container if empty
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
      }
    }, 300);
  }, duration);
}
