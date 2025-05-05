/**
 * Spend View Component
 * Displays and manages expense tracking and budget visualization
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../js/helpers.js';
import db from '../db/db.js';
import './shared/expense-form.js';

export class SpendView extends LitElement {
  static properties = {
    activeView: { type: String }, // 'weekly', 'monthly', 'credit'
    weekId: { type: String },
    monthId: { type: String },
    weekData: { type: Object },
    monthData: { type: Object },
    settings: { type: Object },
    isLoading: { type: Boolean },
    expenses: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
    }

    .view-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      padding: 2px;
    }

    .view-option {
      flex: 1;
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: #8e8e93;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .view-option.active {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .date-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .date-range {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    .nav-arrow {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(142, 142, 147, 0.12);
      cursor: pointer;
    }

    .nav-arrow svg {
      width: 16px;
      height: 16px;
      stroke: #8e8e93;
    }

    .budget-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .card-title {
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .budget-amount {
      font-size: 28px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 8px;
    }

    .progress-bar {
      height: 8px;
      background-color: rgba(142, 142, 147, 0.2);
      border-radius: 4px;
      margin-bottom: 8px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: #34c759;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-fill.warning {
      background-color: #ff9500;
    }

    .progress-fill.danger {
      background-color: #ff3b30;
    }

    .budget-details {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #8e8e93;
    }

    .expense-list {
      margin-bottom: 80px;
    }

    .expense-date-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .expense-item {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .expense-info {
      display: flex;
      flex-direction: column;
    }

    .expense-name {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 4px;
    }

    .expense-category {
      font-size: 13px;
      color: #8e8e93;
    }

    .expense-amount {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    .add-expense-button {
      position: fixed;
      bottom: 80px;
      right: 16px;
      width: 56px;
      height: 56px;
      border-radius: 28px;
      background-color: #007aff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
      cursor: pointer;
      z-index: 10;
    }

    .add-expense-button svg {
      width: 24px;
      height: 24px;
      stroke: #ffffff;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
      text-align: center;
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #8e8e93;
    }

    .empty-state-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 8px;
    }

    .empty-state-message {
      font-size: 15px;
      color: #8e8e93;
      margin-bottom: 16px;
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
    this.activeView = 'weekly';
    this.weekId = this.getCurrentWeekId();
    this.monthId = this.getCurrentMonthId();
    this.weekData = null;
    this.monthData = null;
    this.settings = {
      weeklyBudget: 200,
      currency: 'USD'
    };
    this.isLoading = true;
    this.expenses = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadSettings();
    this.loadData();
  }

  async loadSettings() {
    try {
      const settings = await db.settings.get(1);
      if (settings) {
        this.settings = settings;
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async loadData() {
    this.isLoading = true;

    try {
      if (this.activeView === 'weekly') {
        await this.loadWeekData();
      } else if (this.activeView === 'monthly') {
        await this.loadMonthData();
      }

      // Initialize groupedExpenses if it's still undefined
      if (!this.groupedExpenses) {
        this.groupedExpenses = [];
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Initialize empty data on error
      this.expenses = [];
      this.groupedExpenses = [];
    } finally {
      this.isLoading = false;
    }
  }

  async loadWeekData() {
    // Get the week data
    const week = await db.weeks.get(this.weekId);
    this.weekData = week || this.createEmptyWeek();

    // Load expenses for this week
    this.expenses = await db.expenses.where('weekId').equals(this.weekId).toArray();

    // Group expenses by date
    this.groupExpensesByDate();
  }

  async loadMonthData() {
    // For now, just load all expenses for the month
    this.expenses = await db.expenses.where('monthId').equals(this.monthId).toArray();

    // Group expenses by date
    this.groupExpensesByDate();
  }

  groupExpensesByDate() {
    // Group expenses by date for display
    const groupedExpenses = {};

    if (!this.expenses || this.expenses.length === 0) {
      this.groupedExpenses = [];
      return;
    }

    this.expenses.forEach(expense => {
      const date = expense.date;
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });

    // Sort dates in descending order
    this.groupedExpenses = Object.entries(groupedExpenses)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .map(([date, expenses]) => ({
        date,
        expenses
      }));
  }

  createEmptyWeek() {
    return {
      id: this.weekId,
      totalHours: 0,
      totalTips: 0,
      totalExpenses: 0,
      days: {
        mon: { hours: 0, tips: 0 },
        tue: { hours: 0, tips: 0 },
        wed: { hours: 0, tips: 0 },
        thu: { hours: 0, tips: 0 },
        fri: { hours: 0, tips: 0 },
        sat: { hours: 0, tips: 0 },
        sun: { hours: 0, tips: 0 }
      }
    };
  }

  getCurrentWeekId() {
    // Get Monday of current week
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    const monday = new Date(now);
    monday.setDate(diff);

    // Format as YYYY-MM-DD
    return monday.toISOString().split('T')[0];
  }

  getCurrentMonthId() {
    // Get current month in YYYY-MM format
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  handleViewChange(view) {
    if (this.activeView !== view) {
      this.activeView = view;
      this.loadData();
    }
  }

  navigatePrevious() {
    if (this.activeView === 'weekly') {
      // Navigate to previous week
      const [year, month, day] = this.weekId.split('-').map(Number);
      const currentMonday = new Date(year, month - 1, day);
      currentMonday.setDate(currentMonday.getDate() - 7);

      this.weekId = currentMonday.toISOString().split('T')[0];
      this.loadWeekData();
    } else if (this.activeView === 'monthly') {
      // Navigate to previous month
      const [year, month] = this.monthId.split('-').map(Number);
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;

      this.monthId = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
      this.loadMonthData();
    }
  }

  navigateNext() {
    const now = new Date();

    if (this.activeView === 'weekly') {
      // Navigate to next week (but not beyond current week)
      const [year, month, day] = this.weekId.split('-').map(Number);
      const currentMonday = new Date(year, month - 1, day);
      const nextMonday = new Date(currentMonday);
      nextMonday.setDate(nextMonday.getDate() + 7);

      // Don't go beyond current week
      if (nextMonday <= now) {
        this.weekId = nextMonday.toISOString().split('T')[0];
        this.loadWeekData();
      }
    } else if (this.activeView === 'monthly') {
      // Navigate to next month (but not beyond current month)
      const [year, month] = this.monthId.split('-').map(Number);
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      const nextMonthDate = new Date(nextYear, nextMonth - 1, 1);

      // Don't go beyond current month
      if (nextMonthDate <= now) {
        this.monthId = `${nextYear}-${String(nextMonth).padStart(2, '0')}`;
        this.loadMonthData();
      }
    }
  }

  getDateRangeText() {
    if (this.activeView === 'weekly') {
      // Format as "Apr 1 - Apr 7"
      const [year, month, day] = this.weekId.split('-').map(Number);
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
      const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();

      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}`;
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
      }
    } else if (this.activeView === 'monthly') {
      // Format as "April 2023"
      const [year, month] = this.monthId.split('-').map(Number);
      const date = new Date(year, month - 1, 1);
      return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }

    return '';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if it's today or yesterday
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      // Format as "Mon, Apr 5"
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  }

  calculateTotalSpent() {
    if (!this.expenses || this.expenses.length === 0) {
      return 0;
    }

    return this.expenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return total + amount;
    }, 0);
  }

  calculateBudgetProgress() {
    const totalSpent = this.calculateTotalSpent();
    const budget = this.settings?.weeklyBudget || 1; // Avoid division by zero

    if (budget <= 0) {
      return 0;
    }

    return Math.min(100, (totalSpent / budget) * 100);
  }

  getBudgetProgressClass() {
    const progress = this.calculateBudgetProgress();

    if (progress >= 90) {
      return 'danger';
    } else if (progress >= 75) {
      return 'warning';
    } else {
      return '';
    }
  }

  handleAddExpense() {
    const expenseForm = this.shadowRoot.querySelector('expense-form');
    if (expenseForm) {
      expenseForm.open(null, this.weekId, this.monthId);
    }
  }

  async handleSaveExpense(e) {
    const { expense, isEditing } = e.detail;

    try {
      if (isEditing) {
        // Update existing expense
        await db.expenses.update(expense.id, expense);
      } else {
        // Add new expense
        await db.expenses.add(expense);
      }

      // Reload data
      this.loadData();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  }

  async handleDeleteExpense(e) {
    const { expense } = e.detail;

    try {
      // Delete expense
      await db.expenses.delete(expense.id);

      // Reload data
      this.loadData();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  }

  render() {
    // Initialize groupedExpenses if it doesn't exist
    if (!this.groupedExpenses) {
      this.groupedExpenses = [];
    }

    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading expenses...</span>
        </div>
      `;
    }

    const totalSpent = this.calculateTotalSpent();
    const budget = this.settings?.weeklyBudget || 0;
    const remaining = Math.max(0, budget - totalSpent);
    const budgetProgress = this.calculateBudgetProgress();

    return html`
      <!-- View selector -->
      <div class="view-selector">
        <div
          class="view-option ${this.activeView === 'weekly' ? 'active' : ''}"
          @click=${() => this.handleViewChange('weekly')}
        >
          Weekly
        </div>
        <div
          class="view-option ${this.activeView === 'monthly' ? 'active' : ''}"
          @click=${() => this.handleViewChange('monthly')}
        >
          Monthly
        </div>
      </div>

      <!-- Date navigation -->
      <div class="date-navigation">
        <div class="nav-arrow" @click=${this.navigatePrevious}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div class="date-range">
          ${this.getDateRangeText()}
        </div>
        <div class="nav-arrow" @click=${this.navigateNext}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Budget overview -->
      <div class="budget-card">
        <div class="card-title">
          ${this.activeView === 'weekly' ? 'Weekly Budget' : 'Monthly Budget'}
        </div>
        <div class="budget-amount">
          ${formatCurrency(budget, this.settings.currency)}
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill ${this.getBudgetProgressClass()}"
            style="width: ${budgetProgress}%"
          ></div>
        </div>
        <div class="budget-details">
          <div>${formatCurrency(totalSpent, this.settings.currency)} spent</div>
          <div>${formatCurrency(remaining, this.settings.currency)} left</div>
        </div>
      </div>

      <!-- Expense list -->
      <div class="expense-list">
        ${!this.expenses || this.expenses.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-state-icon">💰</div>
            <div class="empty-state-title">No expenses yet</div>
            <div class="empty-state-message">
              Tap the + button to add your first expense
            </div>
          </div>
        ` : html`
          ${this.groupedExpenses && this.groupedExpenses.map(group => html`
            <div class="expense-date-header">
              ${this.formatDate(group.date)}
            </div>
            ${group.expenses && group.expenses.map(expense => html`
              <div class="expense-item">
                <div class="expense-info">
                  <div class="expense-name">${expense.name || 'Expense'}</div>
                  <div class="expense-category">${expense.category || 'Uncategorized'}</div>
                </div>
                <div class="expense-amount">
                  ${formatCurrency(expense.amount || 0, this.settings?.currency || 'USD')}
                </div>
              </div>
            `)}
          `)}
        `}
      </div>

      <!-- Add expense button -->
      <div class="add-expense-button" @click=${this.handleAddExpense}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>

      <!-- Expense form modal -->
      <expense-form
        .settings=${this.settings}
        @save-expense=${this.handleSaveExpense}
        @delete-expense=${this.handleDeleteExpense}
      ></expense-form>
    `;
  }
}

customElements.define('spend-view', SpendView);
