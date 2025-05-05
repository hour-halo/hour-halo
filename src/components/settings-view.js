/**
 * Settings View Component
 * Displays and manages app settings
 */

import { LitElement, html, css } from 'lit';
import db from '../db/db.js';
import { formatCurrency, applyTheme } from '../js/helpers.js';
import { showToast } from '../js/notifications.js';

export class SettingsView extends LitElement {
  static properties = {
    settings: { type: Object },
    isLoading: { type: Boolean },
    activeModal: { type: String },
    modalData: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }

    .settings-container {
      padding-bottom: 100px;
    }

    .settings-section {
      margin-bottom: 32px;
    }

    .section-header {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      margin: 0 16px 8px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .settings-group {
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .settings-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .settings-item:last-child {
      border-bottom: none;
    }

    .item-label {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }

    .item-value {
      font-size: 16px;
      font-weight: 400;
      color: #8e8e93;
      display: flex;
      align-items: center;
    }

    .chevron {
      margin-left: 8px;
      width: 7px;
      height: 12px;
      color: #c7c7cc;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 51px;
      height: 31px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e9e9eb;
      transition: .4s;
      border-radius: 34px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 27px;
      width: 27px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    input:checked + .toggle-slider {
      background-color: #34c759;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }

    .danger-text {
      color: #ff3b30;
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 340px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .modal-body {
      max-height: 60vh;
      overflow-y: auto;
    }

    .modal-option {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      font-size: 16px;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .modal-option.selected {
      color: #007aff;
    }

    .modal-option:last-child {
      border-bottom: none;
    }

    .modal-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
    }

    .modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .cancel-button {
      color: #8e8e93;
    }

    .confirm-button {
      color: #007aff;
    }

    .danger-button {
      color: #ff3b30;
    }

    .input-field {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-bottom: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .ios-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(0, 122, 255, 0.2);
      border-top-color: rgba(0, 122, 255, 1);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  constructor() {
    super();
    this.settings = null;
    this.isLoading = true;
    this.activeModal = null; // 'theme', 'currency', 'defaultView', 'reminderTime', 'clearData', etc.
    this.modalData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const settings = await db.settings.get(1);
      if (settings) {
        this.settings = settings;
      }
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading settings:', error);
      this.isLoading = false;
    }
  }

  async saveSettings(updatedSettings) {
    try {
      await db.settings.update(1, updatedSettings);
      this.settings = updatedSettings;
      showToast('Settings saved', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showToast('Failed to save settings', 'error');
    }
  }

  // Toggle switch handler
  handleToggle(setting) {
    const updatedSettings = { ...this.settings };
    updatedSettings[setting] = !updatedSettings[setting];
    this.saveSettings(updatedSettings);
  }

  // Open modal for selection settings
  openModal(modalType, data = {}) {
    this.activeModal = modalType;
    this.modalData = data;
  }

  // Close any open modal
  closeModal() {
    this.activeModal = null;
    this.modalData = {};
  }

  // Handle selection in modal
  handleSelection(value) {
    if (!this.activeModal) return;

    const updatedSettings = { ...this.settings };

    switch (this.activeModal) {
      case 'theme':
        updatedSettings.theme = value;
        // Apply theme change immediately
        applyTheme(value);
        break;
      case 'currency':
        updatedSettings.currency = value;
        break;
      case 'defaultView':
        updatedSettings.defaultView = value;
        break;
      case 'reminderTime':
        updatedSettings.reminderTime = value;
        break;
    }

    this.saveSettings(updatedSettings);
    this.closeModal();
  }

  // Handle hourly rate change
  async handleHourlyRateChange() {
    const currentRate = this.settings.hourlyRate;

    // Open modal with input for hourly rate
    this.openModal('hourlyRate', { currentValue: currentRate });
  }

  // Save hourly rate from modal
  saveHourlyRate(newRate) {
    const rate = parseFloat(newRate);
    if (isNaN(rate) || rate < 0) {
      showToast('Please enter a valid hourly rate', 'error');
      return;
    }

    const updatedSettings = { ...this.settings };
    updatedSettings.hourlyRate = rate;
    this.saveSettings(updatedSettings);
    this.closeModal();
  }

  // Handle weekly budget change
  async handleWeeklyBudgetChange() {
    const currentBudget = this.settings.weeklyBudget;

    // Open modal with input for weekly budget
    this.openModal('weeklyBudget', { currentValue: currentBudget });
  }

  // Save weekly budget from modal
  saveWeeklyBudget(newBudget) {
    const budget = parseFloat(newBudget);
    if (isNaN(budget) || budget < 0) {
      showToast('Please enter a valid budget amount', 'error');
      return;
    }

    const updatedSettings = { ...this.settings };
    updatedSettings.weeklyBudget = budget;
    this.saveSettings(updatedSettings);
    this.closeModal();
  }

  // Handle monthly budget change
  async handleMonthlyBudgetChange() {
    const currentBudget = this.settings.monthlyBudget || 800;

    // Open modal with input for monthly budget
    this.openModal('monthlyBudget', { currentValue: currentBudget });
  }

  // Save monthly budget from modal
  saveMonthlyBudget(newBudget) {
    const budget = parseFloat(newBudget);
    if (isNaN(budget) || budget < 0) {
      showToast('Please enter a valid budget amount', 'error');
      return;
    }

    const updatedSettings = { ...this.settings };
    updatedSettings.monthlyBudget = budget;
    this.saveSettings(updatedSettings);
    this.closeModal();
  }

  // Handle clear data action
  handleClearData() {
    this.openModal('clearData');
  }

  // Confirm and execute clear data
  async confirmClearData() {
    try {
      // Clear weeks data
      await db.weeks.clear();

      // Clear expenses data
      await db.expenses.clear();

      showToast('All data has been cleared', 'success');
      this.closeModal();

      // Reload the page to reset the app state
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error clearing data:', error);
      showToast('Failed to clear data', 'error');
      this.closeModal();
    }
  }

  // Handle export data action
  async handleExportData() {
    try {
      // Fetch all data
      const weeks = await db.weeks.toArray();
      const expenses = await db.expenses.toArray();

      // Create CSV content for weeks
      let weeksCSV = 'Week ID,Total Hours,Total Tips,Total Earnings\n';
      weeks.forEach(week => {
        weeksCSV += `${week.id},${week.totalHours},${week.totalTips},${week.totalEarnings}\n`;
      });

      // Create CSV content for expenses
      let expensesCSV = 'ID,Week ID,Amount,Category,Date,Created At\n';
      expenses.forEach(expense => {
        expensesCSV += `${expense.id},${expense.weekId},${expense.amount},${expense.category},${expense.date},${expense.createdAt}\n`;
      });

      // Create a blob with the CSV data
      const weeksBlob = new Blob([weeksCSV], { type: 'text/csv' });
      const expensesBlob = new Blob([expensesCSV], { type: 'text/csv' });

      // Create download links
      const weeksURL = URL.createObjectURL(weeksBlob);
      const expensesURL = URL.createObjectURL(expensesBlob);

      // Create and trigger download for weeks
      const weeksLink = document.createElement('a');
      weeksLink.href = weeksURL;
      weeksLink.download = 'hour-halo-weeks.csv';
      document.body.appendChild(weeksLink);
      weeksLink.click();
      document.body.removeChild(weeksLink);

      // Create and trigger download for expenses
      const expensesLink = document.createElement('a');
      expensesLink.href = expensesURL;
      expensesLink.download = 'hour-halo-expenses.csv';
      document.body.appendChild(expensesLink);
      expensesLink.click();
      document.body.removeChild(expensesLink);

      showToast('Data exported successfully', 'success');
    } catch (error) {
      console.error('Error exporting data:', error);
      showToast('Failed to export data', 'error');
    }
  }

  renderModal() {
    if (!this.activeModal) return null;

    switch (this.activeModal) {
      case 'theme':
        return this.renderSelectionModal('Theme', [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System (Auto)' }
        ], this.settings.theme);

      case 'currency':
        return this.renderSelectionModal('Currency', [
          { value: 'USD', label: 'US Dollar ($)' },
          { value: 'EUR', label: 'Euro (€)' },
          { value: 'GBP', label: 'British Pound (£)' },
          { value: 'CAD', label: 'Canadian Dollar (C$)' },
          { value: 'AUD', label: 'Australian Dollar (A$)' },
          { value: 'JPY', label: 'Japanese Yen (¥)' }
        ], this.settings.currency);

      case 'defaultView':
        return this.renderSelectionModal('Default Tab', [
          { value: 'week', label: 'Week' },
          { value: 'summary', label: 'Summary' },
          { value: 'spend', label: 'Spend' },
          { value: 'history', label: 'History' }
        ], this.settings.defaultView || 'week');

      case 'reminderTime':
        return this.renderTimeSelectionModal();

      case 'hourlyRate':
        return this.renderInputModal(
          'Hourly Rate',
          'number',
          this.modalData.currentValue,
          'Enter your hourly rate',
          (value) => this.saveHourlyRate(value)
        );

      case 'weeklyBudget':
        return this.renderInputModal(
          'Weekly Budget',
          'number',
          this.modalData.currentValue,
          'Enter your weekly budget',
          (value) => this.saveWeeklyBudget(value)
        );

      case 'monthlyBudget':
        return this.renderInputModal(
          'Monthly Budget',
          'number',
          this.modalData.currentValue,
          'Enter your monthly budget',
          (value) => this.saveMonthlyBudget(value)
        );

      case 'clearData':
        return this.renderConfirmationModal(
          'Clear All Data',
          'This will permanently delete all your hours, earnings, and expenses data. This action cannot be undone.',
          'Clear Data',
          () => this.confirmClearData()
        );

      default:
        return null;
    }
  }

  renderSelectionModal(title, options, currentValue) {
    return html`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
          </div>
          <div class="modal-body">
            ${options.map(option => html`
              <div
                class="modal-option ${option.value === currentValue ? 'selected' : ''}"
                @click=${() => this.handleSelection(option.value)}
              >
                ${option.label}
                ${option.value === currentValue ? html`
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ` : ''}
              </div>
            `)}
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  renderTimeSelectionModal() {
    // Generate time options in 30-minute increments
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        const value = `${h}:${m}`;

        // Format for display (12-hour format)
        const displayHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const label = `${displayHour}:${m === '00' ? '00' : m} ${period}`;

        timeOptions.push({ value, label });
      }
    }

    return this.renderSelectionModal('Reminder Time', timeOptions, this.settings.reminderTime);
  }

  renderInputModal(title, type, currentValue, placeholder, onSave) {
    return html`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
          </div>
          <div class="modal-body" style="padding: 16px;">
            <input
              type="${type}"
              class="input-field"
              placeholder="${placeholder}"
              .value=${currentValue}
              id="modalInput"
              step="${type === 'number' ? '0.01' : '1'}"
              min="0"
            />
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
            <button
              class="modal-button confirm-button"
              @click=${() => {
                const input = this.shadowRoot.querySelector('#modalInput');
                onSave(input.value);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderConfirmationModal(title, message, confirmText, onConfirm) {
    return html`
      <div class="modal-backdrop" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
          </div>
          <div class="modal-body" style="padding: 16px;">
            <p>${message}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.closeModal}>Cancel</button>
            <button class="modal-button danger-button" @click=${onConfirm}>${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading settings...</span>
        </div>
      `;
    }

    return html`
      <div class="settings-container">
        <!-- Earnings Settings -->
        <div class="settings-section">
          <div class="section-header">Earnings</div>
          <div class="settings-group">
            <div class="settings-item" @click=${this.handleHourlyRateChange}>
              <div class="item-label">Hourly Rate</div>
              <div class="item-value">
                ${formatCurrency(this.settings.hourlyRate, this.settings.currency)}/hr
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${() => this.openModal('currency')}>
              <div class="item-label">Currency</div>
              <div class="item-value">
                ${this.settings.currency}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item">
              <div class="item-label">Show Tips</div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  ?checked=${this.settings.showTips}
                  @change=${() => this.handleToggle('showTips')}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item" @click=${this.handleWeeklyBudgetChange}>
              <div class="item-label">Weekly Budget</div>
              <div class="item-value">
                ${formatCurrency(this.settings.weeklyBudget, this.settings.currency)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${this.handleMonthlyBudgetChange}>
              <div class="item-label">Monthly Budget</div>
              <div class="item-value">
                ${formatCurrency(this.settings.monthlyBudget || 800, this.settings.currency)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div class="settings-section">
          <div class="section-header">Appearance</div>
          <div class="settings-group">
            <div class="settings-item" @click=${() => this.openModal('theme')}>
              <div class="item-label">Theme</div>
              <div class="item-value">
                ${this.settings.theme === 'light' ? 'Light' :
                  this.settings.theme === 'dark' ? 'Dark' : 'System'}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${() => this.openModal('defaultView')}>
              <div class="item-label">Default Tab</div>
              <div class="item-value">
                ${this.settings.defaultView ?
                  this.settings.defaultView.charAt(0).toUpperCase() + this.settings.defaultView.slice(1) :
                  'Week'}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div class="settings-section">
          <div class="section-header">Notifications</div>
          <div class="settings-group">
            <div class="settings-item">
              <div class="item-label">Daily Reminder</div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  ?checked=${this.settings.enableDailyReminder}
                  @change=${() => this.handleToggle('enableDailyReminder')}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-item" @click=${() => this.openModal('reminderTime')}>
              <div class="item-label">Reminder Time</div>
              <div class="item-value">
                ${this.formatTime(this.settings.reminderTime)}
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Management -->
        <div class="settings-section">
          <div class="section-header">Data</div>
          <div class="settings-group">
            <div class="settings-item" @click=${this.handleExportData}>
              <div class="item-label">Export Data</div>
              <div class="item-value">
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="settings-item" @click=${this.handleClearData}>
              <div class="item-label danger-text">Clear All Data</div>
              <div class="item-value">
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="settings-section">
          <div class="section-header">About</div>
          <div class="settings-group">
            <div class="settings-item">
              <div class="item-label">Version</div>
              <div class="item-value">1.0.0</div>
            </div>
            <div class="settings-item">
              <div class="item-label">Made with ❤️ by Hour Halo Team</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      ${this.renderModal()}
    `;
  }

  // Helper to format time for display
  formatTime(timeString) {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const m = minutes;
    const period = h < 12 ? 'AM' : 'PM';
    const displayHour = h % 12 || 12;

    return `${displayHour}:${m} ${period}`;
  }
}

customElements.define('settings-view', SettingsView);
