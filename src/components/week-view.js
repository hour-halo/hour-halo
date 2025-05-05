/**
 * Week View Component
 * Displays and manages the current week's hours
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency, getDayName, getWeekRangeString, getDayKey, getDayKeyFromDate } from '../js/helpers.js';
import db, { getCurrentWeekId, createWeek } from '../db/db.js';
import { showToast } from '../js/notifications.js';
import './shared/ios-alert.js';

// Import shared components
import './shared/hour-pill.js';
import './shared/modal.js';
import './shared/modal-buttons.js';

export class WeekView extends LitElement {
  static properties = {
    weekId: { type: String },
    week: { type: Object },
    settings: { type: Object },
    editingDay: { type: String },
    editingDate: { type: String },
    editingDayKey: { type: String },
    editingHours: { type: Number },
    editingTips: { type: Number },
    isSaving: { type: Boolean },
    isModalOpen: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .week-header {
      margin-bottom: 0.75rem;
      padding: 0.5rem;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .dark .week-header {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .ios-card {
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .dark .ios-card {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .ios-list-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(60, 60, 67, 0.1); /* iOS standard separator */
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
      background-color: white;
    }

    .ios-list-item:last-child {
      border-bottom: none;
    }

    .dark .ios-list-item {
      border-bottom-color: rgba(60, 60, 67, 0.3); /* iOS dark mode separator */
      background-color: #1c1c1e;
    }

    .ios-list-item:active {
      background-color: rgba(0, 0, 0, 0.05); /* iOS standard tap state */
    }

    .dark .ios-list-item:active {
      background-color: rgba(255, 255, 255, 0.05); /* iOS dark mode tap state */
    }

    .day-circle {
      width: 2rem;
      height: 2rem; /* Slightly smaller for iOS standard */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.875rem;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .day-active {
      background-color: #007aff; /* iOS blue */
      color: white; /* White text for better contrast */
    }

    .day-inactive {
      background-color: rgba(60, 60, 67, 0.1); /* iOS standard inactive state */
      color: #8e8e93;
    }

    .dark .day-active {
      background-color: #0a84ff; /* iOS dark mode blue */
      color: white;
    }

    .dark .day-inactive {
      background-color: rgba(60, 60, 67, 0.3); /* iOS dark mode inactive state */
      color: #8e8e93;
    }

    .earnings-display {
      text-align: center;
      padding: 1.25rem 1rem;
      border-radius: 12px;
      margin-bottom: 1rem;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .dark .earnings-display {
      background-color: #1c1c1e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .earnings-amount {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--ios-green, #34c759);
      margin: 0.5rem 0;
    }

    .dark .earnings-amount {
      color: var(--ios-dark-green, #30d158);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      padding: 0 1rem;
      margin-top: 0.75rem;
    }

    .section-title {
      font-size: 1.25rem; /* iOS standard section header size */
      font-weight: 700; /* iOS standard section header weight */
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .dark .section-title {
      color: #ffffff;
    }

    .section-badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      background-color: rgba(60, 60, 67, 0.1); /* iOS standard badge background */
      color: #8e8e93;
      font-weight: 500;
    }

    .dark .section-badge {
      background-color: rgba(60, 60, 67, 0.3); /* iOS dark mode badge background */
    }

    .edit-hint {
      font-size: 0.875rem;
      color: #007aff; /* iOS blue for actionable text */
      font-weight: 500;
    }

    .dark .edit-hint {
      color: #0a84ff; /* iOS dark mode blue */
    }

    .ios-spinner {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: var(--ios-blue, #007aff);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  constructor() {
    super();
    this.weekId = getCurrentWeekId();
    this.week = null;
    this.settings = null;
    this.editingDay = '';
    this.editingDate = '';
    this.editingDayKey = '';
    this.editingHours = 0;
    this.editingTips = 0;
    this.isSaving = false;
    this.isModalOpen = false;
    this.initialLoad = true;

    // Check if there's a week parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const weekParam = urlParams.get('week');
    if (weekParam) {
      // Validate the date format (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(weekParam)) {
        this.weekId = weekParam;
      }
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    // Load settings
    this.settings = await db.settings.get(1);

    // Load or create current week
    await this.loadWeek();

    // Subscribe to database changes
    this.unsubscribe = db.weeks.hook('updating', (modifications, primaryKey, obj) => {
      if (primaryKey === this.weekId) {
        console.log('Week data updated in database:', obj);
        this.week = { ...obj };
        this.requestUpdate(); // Force a re-render
      }
    });

    // Also subscribe to 'updated' event to catch changes after they're committed
    this.unsubscribeUpdated = db.weeks.hook('updated', (primaryKey, obj) => {
      if (primaryKey === this.weekId) {
        console.log('Week data committed to database:', obj);
        this.week = { ...obj };
        this.requestUpdate(); // Force a re-render
      }
    });

    // Listen for modal close events
    this.addEventListener('modal-close', () => {
      this.isModalOpen = false;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Unsubscribe from database changes
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    // Unsubscribe from updated hook
    if (this.unsubscribeUpdated) {
      this.unsubscribeUpdated();
    }
  }

  async loadWeek() {
    // Try to load the week from the database
    let week = await db.weeks.get(this.weekId);

    // If week doesn't exist, create it
    if (!week) {
      week = await createWeek(this.weekId);
    }

    // Ensure the week has a valid days structure
    if (!week.days) {
      week.days = {
        mon: { hours: 0, tips: 0 },
        tue: { hours: 0, tips: 0 },
        wed: { hours: 0, tips: 0 },
        thu: { hours: 0, tips: 0 },
        fri: { hours: 0, tips: 0 },
        sat: { hours: 0, tips: 0 },
        sun: { hours: 0, tips: 0 }
      };

      // Save the updated week
      await db.weeks.update(this.weekId, week);
    }

    this.week = week;

    // Update the URL to reflect the current week
    const url = new URL(window.location);
    url.searchParams.set('week', this.weekId);
    window.history.pushState({}, '', url);

    // Show a toast notification when changing weeks
    if (this.initialLoad) {
      this.initialLoad = false;
    } else {
      showToast(`Viewing week of ${getWeekRangeString(this.weekId)}`, 'info');
    }

    console.log('Loaded week:', JSON.stringify(week));
  }

  // Get the total earnings for the week
  get totalEarnings() {
    if (!this.week) return 0;

    const baseEarnings = this.week.totalHours * this.settings.hourlyRate;
    return baseEarnings + (this.settings.showTips ? this.week.totalTips : 0);
  }

  // Handle edit hours button click
  handleEditHours(e) {
    const { day, date, dayKey, hours, tips } = e.detail;

    console.log('Editing day:', day, 'date:', date, 'dayKey:', dayKey, 'hours:', hours, 'tips:', tips);

    this.editingDay = day;
    this.editingDate = date;
    this.editingDayKey = dayKey;
    this.editingHours = hours;
    this.editingTips = tips;
    this.isModalOpen = true;

    // Show the edit modal
    const modal = this.shadowRoot.querySelector('modal-dialog');
    modal.show();
  }

  // Handle save hours button click
  async handleSaveHours() {
    if (!this.week) return;

    this.isSaving = true;

    try {
      // Use the day key directly from the editing data
      const dayKey = this.editingDayKey;

      console.log('Saving day:', this.editingDay, 'date:', this.editingDate, 'dayKey:', dayKey, 'hours:', this.editingHours, 'tips:', this.editingTips);
      console.log('Current week data:', JSON.stringify(this.week));

      if (!dayKey) {
        console.error('Invalid day key:', dayKey);
        throw new Error('Invalid day key');
      }

      // Update hours and tips for the selected day
      const updatedWeek = { ...this.week };

      // Ensure the days object exists
      if (!updatedWeek.days) {
        updatedWeek.days = {
          mon: { hours: 0, tips: 0 },
          tue: { hours: 0, tips: 0 },
          wed: { hours: 0, tips: 0 },
          thu: { hours: 0, tips: 0 },
          fri: { hours: 0, tips: 0 },
          sat: { hours: 0, tips: 0 },
          sun: { hours: 0, tips: 0 }
        };
      }

      updatedWeek.days[dayKey] = {
        hours: this.editingHours,
        tips: this.settings.showTips ? this.editingTips : 0
      };

      console.log('Updated week data:', JSON.stringify(updatedWeek));

      // Recalculate totals
      let totalHours = 0;
      let totalTips = 0;

      Object.values(updatedWeek.days).forEach(day => {
        totalHours += day.hours;
        totalTips += day.tips;
      });

      updatedWeek.totalHours = totalHours;
      updatedWeek.totalTips = totalTips;
      updatedWeek.totalEarnings = totalHours * this.settings.hourlyRate + totalTips;

      // Update the database
      await db.weeks.update(this.weekId, updatedWeek);

      // Update the local week data immediately to ensure UI updates
      this.week = updatedWeek;
      this.requestUpdate();

      // Notify other components that data has changed
      window.dispatchEvent(new CustomEvent('hour-halo-data-changed', {
        detail: {
          type: 'hours-updated',
          weekId: this.weekId,
          day: this.editingDay,
          dayKey: dayKey,
          hours: this.editingHours,
          tips: this.editingTips
        }
      }));

      // Show success feedback with toast notification
      showToast(`Hours saved for ${this.editingDay}`, 'success');

      // Close the modal
      this.isModalOpen = false;
      const modal = this.shadowRoot.querySelector('modal-dialog');
      modal.hide();
    } catch (error) {
      console.error('Error saving hours:', error);
      // Show error message
      showToast('Failed to save hours. Please try again.', 'error')
    } finally {
      this.isSaving = false;
    }
  }

  // Handle hours input change
  handleHoursChange(e) {
    this.editingHours = parseFloat(e.target.value) || 0;
  }

  // Handle tips input change
  handleTipsChange(e) {
    this.editingTips = parseFloat(e.target.value) || 0;
  }

  // Handle clear week button click
  handleClearWeek() {
    // Show iOS-style confirmation dialog
    const alert = document.createElement('ios-alert');
    alert.title = 'Clear Week';
    alert.message = 'Are you sure you want to clear all hours for this week?';
    alert.cancelText = 'Cancel';
    alert.confirmText = 'Clear';
    alert.destructive = true;

    // Add event listeners
    alert.addEventListener('alert-cancel', () => {
      document.body.removeChild(alert);
    });

    alert.addEventListener('alert-confirm', async () => {
      document.body.removeChild(alert);
      await this.clearWeekData();
    });

    // Add to DOM and show
    document.body.appendChild(alert);
    alert.show();
  }

  // Clear week data
  async clearWeekData() {
    const updatedWeek = { ...this.week };

    // Reset all days
    Object.keys(updatedWeek.days).forEach(day => {
      updatedWeek.days[day] = { hours: 0, tips: 0 };
    });

    // Reset totals
    updatedWeek.totalHours = 0;
    updatedWeek.totalTips = 0;
    updatedWeek.totalEarnings = 0;

    // Update the database
    await db.weeks.update(this.weekId, updatedWeek);

    // Update the local week data immediately to ensure UI updates
    this.week = updatedWeek;
    this.requestUpdate();

    // Show success feedback
    showToast('Week cleared successfully', 'success');
  }

  // Navigate to previous week
  async handlePreviousWeek() {
    // Parse the current week ID
    const parts = this.weekId.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const day = parseInt(parts[2], 10);

    // Create a date object for the current Monday
    const currentMonday = new Date(year, month, day);

    // Subtract 7 days to get the previous Monday
    currentMonday.setDate(currentMonday.getDate() - 7);

    // Format as YYYY-MM-DD
    const prevYear = currentMonday.getFullYear();
    const prevMonth = String(currentMonday.getMonth() + 1).padStart(2, '0');
    const prevDay = String(currentMonday.getDate()).padStart(2, '0');
    const previousWeekId = `${prevYear}-${prevMonth}-${prevDay}`;

    console.log(`Navigating from ${this.weekId} to previous week: ${previousWeekId}`);

    // Update the week ID and load the new week
    this.weekId = previousWeekId;
    await this.loadWeek();
  }

  // Navigate to next week
  async handleNextWeek() {
    // Parse the current week ID
    const parts = this.weekId.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const day = parseInt(parts[2], 10);

    // Create a date object for the current Monday
    const currentMonday = new Date(year, month, day);

    // Add 7 days to get the next Monday
    currentMonday.setDate(currentMonday.getDate() + 7);

    // Format as YYYY-MM-DD
    const nextYear = currentMonday.getFullYear();
    const nextMonth = String(currentMonday.getMonth() + 1).padStart(2, '0');
    const nextDay = String(currentMonday.getDate()).padStart(2, '0');
    const nextWeekId = `${nextYear}-${nextMonth}-${nextDay}`;

    console.log(`Navigating from ${this.weekId} to next week: ${nextWeekId}`);

    // Update the week ID and load the new week
    this.weekId = nextWeekId;
    await this.loadWeek();
  }

  // Handle copy previous week button click
  async handleCopyPreviousWeek() {
    // Parse the current week ID
    const parts = this.weekId.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const day = parseInt(parts[2], 10);

    // Create a date object for the current Monday
    const currentMonday = new Date(year, month, day);

    // Subtract 7 days to get the previous Monday
    currentMonday.setDate(currentMonday.getDate() - 7);

    // Format as YYYY-MM-DD
    const prevYear = currentMonday.getFullYear();
    const prevMonth = String(currentMonday.getMonth() + 1).padStart(2, '0');
    const prevDay = String(currentMonday.getDate()).padStart(2, '0');
    const previousWeekId = `${prevYear}-${prevMonth}-${prevDay}`;

    console.log(`Copying data from previous week: ${previousWeekId}`);

    // Try to load the previous week
    const previousWeek = await db.weeks.get(previousWeekId);

    if (!previousWeek) {
      // Show iOS-style alert for no data
      const alert = document.createElement('ios-alert');
      alert.title = 'No Data Found';
      alert.message = 'No data found for the previous week.';
      alert.cancelText = '';
      alert.confirmText = 'OK';

      // Add event listeners
      alert.addEventListener('alert-confirm', () => {
        document.body.removeChild(alert);
      });

      // Add to DOM and show
      document.body.appendChild(alert);
      alert.show();
      return;
    }

    // Show iOS-style confirmation dialog
    const alert = document.createElement('ios-alert');
    alert.title = 'Copy Previous Week';
    alert.message = 'This will copy all hours from the previous week. Continue?';
    alert.cancelText = 'Cancel';
    alert.confirmText = 'Copy';

    // Add event listeners
    alert.addEventListener('alert-cancel', () => {
      document.body.removeChild(alert);
    });

    alert.addEventListener('alert-confirm', async () => {
      document.body.removeChild(alert);
      await this.copyPreviousWeekData(previousWeek);
    });

    // Add to DOM and show
    document.body.appendChild(alert);
    alert.show();
  }

  // Copy data from previous week
  async copyPreviousWeekData(previousWeek) {
    // Copy hours and tips from previous week
    const updatedWeek = { ...this.week };
    updatedWeek.days = { ...previousWeek.days };
    updatedWeek.totalHours = previousWeek.totalHours;
    updatedWeek.totalTips = previousWeek.totalTips;
    updatedWeek.totalEarnings = previousWeek.totalHours * this.settings.hourlyRate + previousWeek.totalTips;

    // Update the database
    await db.weeks.update(this.weekId, updatedWeek);

    // Update the local week data immediately to ensure UI updates
    this.week = updatedWeek;
    this.requestUpdate();

    // Show success feedback
    showToast('Data copied from previous week', 'success');
  }

  render() {
    if (!this.week || !this.settings) {
      return html`
        <div class="flex justify-center items-center h-full">
          <div class="ios-spinner"></div>
        </div>
      `;
    }

    // Get week range string (e.g., "Apr 1 - Apr 7")
    const weekRange = getWeekRangeString(this.weekId);

    return html`
      <div class="ios-animate-slide-up" style="padding-bottom: 0; min-height: calc(100vh - 60px); display: flex; flex-direction: column;">
        <!-- Week header with date range -->
        <div class="week-header">
          <!-- iOS-style date navigation -->
          <div class="date-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div class="nav-arrow" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: rgba(142, 142, 147, 0.12); cursor: pointer;" @click=${this.handlePreviousWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; stroke: #8e8e93;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div class="date-range" style="font-size: 15px; font-weight: 600; color: #000000;">
              ${weekRange}
            </div>
            <div class="nav-arrow" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: rgba(142, 142, 147, 0.12); cursor: pointer;" @click=${this.handleNextWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; stroke: #8e8e93;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <!-- Week actions with iOS-style icon buttons -->
          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; padding: 0 4px;">
            <!-- iOS-style Copy button with icon -->
            <button
              style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; font-size: 15px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: none; cursor: pointer; background-color: #e5f1ff; color: #007aff;"
              @click=${this.handleCopyPreviousWeek}
              title="Copy from previous week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <!-- iOS-style Clear button with icon (destructive action) -->
            <button
              style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; font-size: 15px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: none; cursor: pointer; background-color: #ffebeb; color: #ff3b30;"
              @click=${this.handleClearWeek}
              title="Clear week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Earnings summary -->
        <div class="earnings-display">
          <p class="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Total Earnings
          </p>
          <p class="earnings-amount">
            ${formatCurrency(this.totalEarnings, this.settings.currency)}
          </p>
          ${this.settings.showTips && this.week.totalTips > 0 ? html`
            <div class="inline-block mt-1 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <span class="text-xs font-medium" style="color: var(--ios-green);">
                Including ${formatCurrency(this.week.totalTips, this.settings.currency)} tips
              </span>
            </div>
          ` : ''}
          <div class="flex items-center justify-center mt-3 text-xs text-gray-500">
            <span class="font-medium">${this.week.totalHours}h</span>
            <span class="mx-1">•</span>
            <span>${formatCurrency(this.settings.hourlyRate, this.settings.currency)}/hr</span>
          </div>
        </div>

        <!-- Days section header - iOS style -->
        <div class="section-header">
          <div class="flex items-center">
            <h3 class="section-title">Daily Hours</h3>
            <div class="ml-2 section-badge">
              ${this.week.totalHours}h total
            </div>
          </div>
          <div class="edit-hint">
            Tap to edit
          </div>
        </div>

        <!-- Days of the week - iOS style unified list -->
        <div style="margin-bottom: 0; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); flex-grow: 1;" class="dark:bg-[#1c1c1e] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          ${(() => {
            // Create an array to hold the 7 days of the week
            const weekDays = [];

            // Get the Monday date from the weekId (which is now Monday-based)
            // Create a new date object to avoid timezone issues
            const parts = this.weekId.split('-');
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
            const day = parseInt(parts[2], 10);

            // Log the starting date for debugging
            console.log(`Starting with Monday date: ${year}-${month+1}-${day}`);

            // Calculate the days of the week correctly
            const daysData = [];

            // Create each day of the week (Monday to Sunday)
            for (let i = 0; i < 7; i++) {
              // Create a new date object for this day (starting from Monday)
              const currentDate = new Date(year, month, day + i);

              // Format the date as YYYY-MM-DD
              const dateYear = currentDate.getFullYear();
              const dateMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
              const dateDay = String(currentDate.getDate()).padStart(2, '0');
              const dateStr = `${dateYear}-${dateMonth}-${dateDay}`;

              // Get the actual day of week from the date object
              const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ...

              // Map day of week to day key
              const dayKeyMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
              const dayKey = dayKeyMap[dayOfWeek];

              // Double-check that the day of week is correct
              console.log(`Date: ${dateStr}, Day: ${dayOfWeek}, DayName: ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}`);

              // Get the day names
              const fullDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
              const dayLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayOfWeek];

              // Add to our days data
              daysData.push({
                dayKey,
                dateStr,
                fullDayName,
                dayLetter
              });
            }

            // Process each day
            for (const dayInfo of daysData) {
              // Ensure week.days exists
              if (!this.week.days) {
                this.week.days = {
                  mon: { hours: 0, tips: 0 },
                  tue: { hours: 0, tips: 0 },
                  wed: { hours: 0, tips: 0 },
                  thu: { hours: 0, tips: 0 },
                  fri: { hours: 0, tips: 0 },
                  sat: { hours: 0, tips: 0 },
                  sun: { hours: 0, tips: 0 }
                };
              }

              // Get hours data for this day
              const data = this.week.days[dayInfo.dayKey] || { hours: 0, tips: 0 };

              // Make sure the data is in the week object
              this.week.days[dayInfo.dayKey] = data;

              // Check if this day has hours logged
              const hasHours = data.hours > 0;
              const hasTips = this.settings.showTips && data.tips > 0;

              // Add this day to our array with all the data
              weekDays.push({
                ...dayInfo,
                data,
                hasHours,
                hasTips
              });
            }

            // Return the HTML for all days
            return weekDays.map(day => html`
              <div
                class="ios-list-item"
                @click=${() => this.handleEditHours({
                  detail: {
                    day: day.fullDayName,
                    date: day.dateStr,
                    dayKey: day.dayKey,
                    hours: day.data.hours,
                    tips: day.data.tips
                  }
                })}
              >
                <div class="flex items-center">
                  <div class="day-circle ${day.hasHours ? 'day-active' : 'day-inactive'}">
                    <span class="text-sm">${day.dayLetter}</span>
                  </div>
                  <div>
                    <div style="font-size: 17px; font-weight: 500; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-white">
                      ${day.fullDayName}
                    </div>
                    <div style="font-size: 13px; color: #8e8e93; margin-top: 2px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      ${day.dateStr}
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-right mr-3">
                    ${day.hasHours ? html`
                      <div style="font-size: 17px; font-weight: 500; color: #007aff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-[#0a84ff]">
                        ${day.data.hours}h
                      </div>
                      ${day.hasTips ? html`
                        <div style="font-size: 13px; font-weight: 500; color: #34c759; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;" class="dark:text-[#30d158]">
                          +${formatCurrency(day.data.tips, this.settings.currency)}
                        </div>
                      ` : ''}
                    ` : html`
                      <div style="font-size: 15px; color: #8e8e93; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        Tap to add
                      </div>
                    `}
                  </div>
                  <!-- iOS-style chevron -->
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#C7C7CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            `);
          })()}
        </div>

        <!-- iOS-style modal for editing hours -->
        <modal-dialog title="Edit Hours">
          <div style="padding-bottom: 70px;">
            <!-- Day header with iOS styling -->
            <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
              <div class="flex items-center">
                <div class="day-circle day-active w-8 h-8 mr-3" style="box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">
                  <span class="font-bold text-sm">
                    ${this.editingDay ? this.editingDay.substring(0, 1) : ''}
                  </span>
                </div>
                <div>
                  <div style="font-size: 17px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${this.editingDay}</div>
                  <div style="font-size: 13px; color: #8e8e93; margin-top: 2px;">${this.editingDate}</div>
                </div>
              </div>
            </div>

            <!-- Form sections with iOS styling -->
            <div>
              <!-- Hours section -->
              <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
                <div style="margin-bottom: 12px; display: flex; align-items: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #007aff; margin-right: 6px; min-width: 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style="font-size: 15px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Hours worked</span>
                </div>

                <div style="margin-bottom: 12px; position: relative;">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    style="width: 100%; padding: 12px 16px; font-size: 17px; font-weight: 500; border-radius: 10px; border: 1px solid rgba(60, 60, 67, 0.3); background-color: #ffffff; color: #000000; -webkit-appearance: none; -moz-appearance: textfield;"
                    .value=${this.editingHours}
                    @input=${this.handleHoursChange}
                  />
                  <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8e8e93; font-size: 15px; font-weight: 500; z-index: 1;">
                    hours
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; gap: 8px;">
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${() => this.editingHours = 0}
                  >
                    0h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${() => this.editingHours = 4}
                  >
                    4h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${() => this.editingHours = 8}
                  >
                    8h
                  </button>
                  <button
                    style="flex: 1; padding: 10px 0; border-radius: 10px; border: 1px solid #007aff; background-color: rgba(0, 122, 255, 0.1); color: #007aff; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
                    @click=${() => this.editingHours = 12}
                  >
                    12h
                  </button>
                </div>
              </div>

              <!-- Tips section -->
              ${this.settings.showTips ? html`
                <div style="padding: 16px; border-bottom: 1px solid rgba(60, 60, 67, 0.1);">
                  <div style="margin-bottom: 12px; display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #34c759; margin-right: 6px; min-width: 16px;">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style="font-size: 15px; font-weight: 600; color: var(--text-primary, #000000); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Tips received</span>
                  </div>

                  <div style="position: relative;">
                    <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8e8e93; font-size: 15px; font-weight: 500; z-index: 1;">
                      ${this.settings.currency === 'USD' ? '$' : this.settings.currency}
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      style="width: 100%; padding: 12px 16px 12px 28px; font-size: 17px; font-weight: 500; border-radius: 10px; border: 1px solid rgba(60, 60, 67, 0.3); background-color: #ffffff; color: #000000; -webkit-appearance: none; -moz-appearance: textfield;"
                      .value=${this.editingTips}
                      @input=${this.handleTipsChange}
                    />
                  </div>
                </div>
              ` : ''}

              <!-- Earnings summary -->
              <div style="padding: 16px;">
                <div style="background-color: rgba(52, 199, 89, 0.1); border-radius: 12px; padding: 16px; text-align: center;">
                  <div style="font-size: 13px; color: #8e8e93; margin-bottom: 4px; font-weight: 500;">Earnings for this day</div>
                  <div style="font-size: 24px; font-weight: 700; color: #34c759; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    ${formatCurrency((this.editingHours * this.settings.hourlyRate) + (this.settings.showTips ? this.editingTips : 0), this.settings.currency)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </modal-dialog>

        <!-- Modal buttons component -->
        <modal-buttons
          ?open=${this.isModalOpen}
          ?isSaving=${this.isSaving}
          @modal-cancel=${() => {
            this.isModalOpen = false;
            this.shadowRoot.querySelector('modal-dialog').hide();
          }}
          @modal-save=${this.handleSaveHours}
        ></modal-buttons>
      </div>
    `;
  }
}

customElements.define('week-view', WeekView);
