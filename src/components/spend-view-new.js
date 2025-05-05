/**
 * Spend View Component (New Implementation)
 * Displays and manages expense tracking and budget visualization
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../js/helpers.js';
import db from '../db/db.js';
import {
  expenseCategories,
  creditCardColors,
  fixedExpenseCategories,
  recurrenceFrequencies,
  creditCardPaymentTypes
} from '../db/schema.js';
import { Chart, registerables } from 'chart.js';
import {
  getFixedExpenses,
  addFixedExpense,
  updateFixedExpense,
  deleteFixedExpense,
  toggleFixedExpensePaid,
  calculateTotalFixedExpenses
} from '../js/fixed-expenses-manager.js';
import {
  getCreditCards,
  getCreditCardById,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
  recordCreditCardPayment,
  getCreditCardPayments,
  calculateMonthlyInterest,
  calculateUtilization,
  formatDueDate
} from '../js/credit-card-manager.js';

// Import custom components
import '../components/shared/credit-card-payment-modal.js';
import '../components/shared/credit-card-payment-history.js';
import '../components/shared/credit-card-edit-form.js';

// Import iOS native styles
import '../css/ios-native-buttons.css';

// Register all Chart.js components
Chart.register(...registerables);

export class SpendViewNew extends LitElement {
  static properties = {
    activeView: { type: String },
    weekId: { type: String },
    monthId: { type: String },
    expenses: { type: Array },
    fixedExpenses: { type: Array },
    creditCards: { type: Array },
    creditCardPayments: { type: Array },
    settings: { type: Object },
    isLoading: { type: Boolean },
    showAddExpenseForm: { type: Boolean },
    showAddCardForm: { type: Boolean },
    showAddFixedExpenseForm: { type: Boolean },
    showEditFixedExpenseForm: { type: Boolean },
    showEditExpenseForm: { type: Boolean },
    showEditCardForm: { type: Boolean },
    showPaymentModal: { type: Boolean },
    showDeleteConfirmation: { type: Boolean },
    pendingDeleteId: { type: Number },
    pendingDeleteType: { type: String },
    newExpense: { type: Object },
    newCreditCard: { type: Object },
    newFixedExpense: { type: Object },
    editingFixedExpense: { type: Object },
    editingFixedExpenseId: { type: Number },
    editingExpense: { type: Object },
    editingExpenseId: { type: Number },
    editingCard: { type: Object },
    selectedCardId: { type: Number },
    selectedCardTab: { type: String },
    categoryChart: { type: Object },
    dailyChart: { type: Object },
    spendingStats: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
      margin-bottom: 80px;
    }

    .view-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      padding: 2px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .view-option {
      flex: 1;
      text-align: center;
      padding: 7px 12px;
      font-size: 13px;
      font-weight: 600;
      color: #8e8e93;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-option.active {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .dark .view-option.active {
      background-color: #1c1c1e;
      color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
      margin-bottom: 16px;
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
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      touch-action: pan-x;
      user-select: none;
    }

    .expense-content {
      padding: 12px 16px;
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    .payment-method {
      display: inline-flex;
      align-items: center;
      background-color: #f2f2f7;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: 4px;
      font-size: 11px;
    }

    .fixed-expense-badge {
      display: inline-block;
      font-size: 10px;
      padding: 2px 6px;
      margin-left: 6px;
      background-color: #007aff;
      color: white;
      border-radius: 10px;
      font-weight: 500;
    }

    .expense-amount {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    .add-expense-button {
      position: fixed;
      bottom: calc(80px + env(safe-area-inset-bottom, 0px));
      right: max(16px, env(safe-area-inset-right, 16px));
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background-color: #007aff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
      cursor: pointer;
      z-index: 10;
      -webkit-tap-highlight-color: transparent;
      transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    }

    /* iOS-style hover effect (desktop only) */
    @media (hover: hover) {
      .add-expense-button:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 10px rgba(0, 122, 255, 0.4);
      }
    }

    .add-expense-button:active {
      transform: scale(0.95);
      background-color: #0062cc;
      box-shadow: 0 1px 4px rgba(0, 122, 255, 0.3);
    }

    .add-expense-button svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.5;
    }

    .dark .add-expense-button {
      background-color: #0a84ff;
      box-shadow: 0 2px 8px rgba(10, 132, 255, 0.3);
    }

    @media (hover: hover) {
      .dark .add-expense-button:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 10px rgba(10, 132, 255, 0.4);
      }
    }

    .dark .add-expense-button:active {
      background-color: #0974e0;
      box-shadow: 0 1px 4px rgba(10, 132, 255, 0.3);
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

    /* Form styles */
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
    }

    .modal-body {
      padding: 16px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 8px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .category-item.selected {
      background-color: rgba(0, 122, 255, 0.1);
      border-color: #007aff;
    }

    .category-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }

    .category-name {
      font-size: 12px;
      text-align: center;
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
    }

    .cancel-button {
      color: #8e8e93;
    }

    .save-button {
      color: #007aff;
    }

    /* Credit Card Styles */
    .credit-card {
      background-color: #007aff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .credit-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
      z-index: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      position: relative;
      z-index: 2;
    }

    .card-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-number {
      font-size: 14px;
      opacity: 0.8;
    }

    .card-body {
      position: relative;
      z-index: 2;
    }

    .balance-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .balance-label {
      font-size: 14px;
      opacity: 0.8;
    }

    .balance-amount {
      font-size: 14px;
      font-weight: 600;
    }

    .card-footer {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }

    .due-date {
      font-size: 14px;
    }

    .due-date-value {
      font-weight: 600;
    }

    .credit-utilization {
      height: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      margin: 8px 0;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .utilization-fill {
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
    }

    .add-card-button {
      background-color: rgba(142, 142, 147, 0.12);
      border: 1px dashed #8e8e93;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-align: center;
    }

    .add-card-icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .add-card-text {
      font-size: 15px;
      color: #007aff;
    }

    .card-detail-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .payment-button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 8px;
    }

    .color-option {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      margin: 4px;
      cursor: pointer;
      display: inline-block;
      border: 2px solid transparent;
    }

    .color-option.selected {
      border-color: #000000;
    }

    .color-options-container {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    /* Fixed Expense Styles */
    .fixed-expense-section {
      margin-bottom: 24px;
    }

    .fixed-expense-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .add-fixed-expense {
      font-size: 13px;
      color: #007aff;
      cursor: pointer;
    }

    .fixed-expense-item {
      background-color: #ffffff;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      touch-action: pan-x;
      user-select: none;
    }

    .fixed-expense-content {
      padding: 16px;
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .delete-action {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff3b30;
      color: white;
      font-weight: 600;
      z-index: 0;
    }

    .delete-button {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      gap: 4px;
    }

    .delete-button svg.trash-icon {
      margin-bottom: 4px;
      width: 22px;
      height: 22px;
      stroke: white;
      stroke-width: 2;
    }

    .delete-button span {
      font-size: 12px;
      font-weight: 500;
    }

    .fixed-expense-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .fixed-expense-name {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }

    .fixed-expense-amount {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }

    .fixed-expense-details {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #8e8e93;
    }

    .fixed-expense-category {
      display: flex;
      align-items: center;
    }

    .fixed-expense-category-icon {
      margin-right: 4px;
    }

    .fixed-expense-due {
      display: flex;
      align-items: center;
    }

    .due-soon {
      color: #ff9500;
    }

    .overdue {
      color: #ff3b30;
    }

    .paid {
      color: #34c759;
    }

    .payment-status {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .fixed-expense-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .action-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .edit-button {
      color: #007aff;
    }

    .delete-button {
      color: #ff3b30;
    }

    .payment-status-label {
      font-size: 13px;
      color: #8e8e93;
    }

    .payment-status-toggle {
      display: flex;
      align-items: center;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      margin-left: 8px;
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
      height: 16px;
      width: 16px;
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
      transform: translateX(16px);
    }

    /* Spending Analysis Styles */
    .spending-analysis {
      margin-bottom: 24px;
    }

    .analysis-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .chart-container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .chart-container canvas {
      max-width: 100%;
      max-height: 200px; /* Leave room for title and padding */
    }

    .chart-title {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 8px;
      text-align: center;
    }

    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 8px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      margin-right: 12px;
      margin-bottom: 4px;
      font-size: 12px;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      margin-right: 4px;
    }

    .no-data-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #8e8e93;
      font-size: 14px;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 16px;
    }

    .stat-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #8e8e93;
    }
  `;

  constructor() {
    super();
    this.activeView = 'weekly'; // Set default view to weekly
    this.weekId = this.getCurrentWeekId();
    this.monthId = this.getCurrentMonthId();
    this.expenses = [];
    this.groupedExpenses = [];
    this.fixedExpenses = [];
    this.creditCards = [];
    this.creditCardPayments = [];
    this.settings = {
      weeklyBudget: 200,
      monthlyBudget: 800,
      currency: 'USD'
    };
    this.isLoading = true;
    this.showAddExpenseForm = false;
    this.showAddCardForm = false;
    this.showAddFixedExpenseForm = false;
    this.showEditFixedExpenseForm = false;
    this.showEditExpenseForm = false;
    this.showEditCardForm = false;
    this.showPaymentModal = false;
    this.showDeleteConfirmation = false;
    this.pendingDeleteId = null;
    this.pendingDeleteType = null; // 'fixed', 'variable', 'card', or 'payment'
    this.selectedCardId = null;
    this.selectedCardTab = 'overview'; // 'overview', 'payments', 'interest'
    this.editingFixedExpense = null;
    this.editingFixedExpenseId = null;
    this.editingExpense = null;
    this.editingExpenseId = null;
    this.editingCard = null;
    this.categoryChart = null;
    this.dailyChart = null;
    this.spendingStats = {
      totalSpent: 0,
      avgPerDay: 0,
      topCategory: '',
      topCategoryAmount: 0,
      mostExpensiveDay: '',
      mostExpensiveAmount: 0
    };

    // Bind methods to this instance
    this.openAddFixedExpenseForm = this.openAddFixedExpenseForm.bind(this);
    this.closeAddFixedExpenseForm = this.closeAddFixedExpenseForm.bind(this);
    this.handleFixedExpenseInputChange = this.handleFixedExpenseInputChange.bind(this);
    this.selectFixedExpenseCategory = this.selectFixedExpenseCategory.bind(this);
    this.saveFixedExpense = this.saveFixedExpense.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteConfirmation = this.closeDeleteConfirmation.bind(this);
    this.openEditExpenseForm = this.openEditExpenseForm.bind(this);
    this.closeEditExpenseForm = this.closeEditExpenseForm.bind(this);
    this.handleEditExpenseInputChange = this.handleEditExpenseInputChange.bind(this);
    this.selectEditExpenseCategory = this.selectEditExpenseCategory.bind(this);
    this.saveEditExpense = this.saveEditExpense.bind(this);

    // Credit card method bindings
    this.openAddCardForm = this.openAddCardForm.bind(this);
    this.closeAddCardForm = this.closeAddCardForm.bind(this);
    this.openEditCardForm = this.openEditCardForm.bind(this);
    this.closeEditCardForm = this.closeEditCardForm.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.clearSelectedCard = this.clearSelectedCard.bind(this);
    this.selectCardTab = this.selectCardTab.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
    this.handlePaymentSaved = this.handlePaymentSaved.bind(this);
    this.newExpense = {
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    };
    this.newCreditCard = {
      name: '',
      lastFourDigits: '',
      limit: '',
      currentBalance: '',
      dueDate: '',
      minimumPayment: '',
      apr: '',
      color: creditCardColors[0],
      reminderEnabled: false,
      reminderDays: 3,
      isActive: true
    };
    this.newFixedExpense = {
      name: '',
      amount: '',
      category: '',
      dueDate: '',
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true,
      paymentMethod: 'cash'
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadSettings();
    this.loadData();

    // Setup swipe-to-delete after each render
    this.updateComplete.then(() => {
      this.setupSwipeToDelete();
    });
  }

  setupSwipeToDelete() {
    // We need to wait for the DOM to be updated
    setTimeout(() => {
      const swipeableItems = this.shadowRoot.querySelectorAll('.swipeable-item');

      swipeableItems.forEach(item => {
        // Get the expense ID and type from the item's ID attribute
        let expenseId = null;
        let expenseType = 'fixed';

        if (item.id) {
          if (item.id.startsWith('variable-expense-')) {
            expenseId = parseInt(item.id.replace('variable-expense-', ''));
            expenseType = 'variable';
          } else {
            expenseId = parseInt(item.id.replace('expense-', ''));
            expenseType = 'fixed';
          }
        }

        if (!expenseId) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        const contentEl = item.querySelector('.fixed-expense-content') || item.querySelector('.expense-content');
        const deleteEl = item.querySelector('.delete-action');
        const deleteWidth = 90; // Width of the delete button - slightly wider for better visibility

        // Make sure the delete button is clickable
        const deleteButton = item.querySelector('.delete-button');
        if (deleteButton) {
          // Remove existing event listeners to prevent duplicates
          const newDeleteButton = deleteButton.cloneNode(true);
          if (deleteButton.parentNode) {
            deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);
          }

          // Add click event to the delete button
          newDeleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening the edit form
            if (expenseType === 'fixed') {
              this.deleteFixedExpense(expenseId);
            } else {
              this.deleteVariableExpense(expenseId);
            }
          });
        }

        // Reset any existing transforms
        if (contentEl) {
          contentEl.style.transform = 'translateX(0)';
        }

        // Touch events
        const touchStart = (e) => {
          // Don't initiate swipe on the toggle switch
          if (e.target.closest('.toggle-switch') || e.target.closest('.payment-status')) {
            return;
          }

          startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
          isDragging = true;
          if (contentEl) {
            contentEl.style.transition = 'none';
          }
        };

        const touchMove = (e) => {
          if (!isDragging || !contentEl) return;

          currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
          const diffX = currentX - startX;

          // Only allow swiping left (negative diffX)
          if (diffX < 0) {
            // Limit the swipe to the delete button width
            const translateX = Math.max(diffX, -deleteWidth);
            contentEl.style.transform = `translateX(${translateX}px)`;
          }
        };

        const touchEnd = () => {
          if (!isDragging || !contentEl) return;

          isDragging = false;
          contentEl.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

          // If swiped more than half the delete width, snap to show delete button
          // otherwise snap back to original position
          const diffX = currentX - startX;

          if (diffX < -deleteWidth / 2) {
            contentEl.style.transform = `translateX(-${deleteWidth}px)`;

            // Add a tap outside listener to close the swipe
            const closeSwipe = (e) => {
              // If clicked outside this item
              if (!item.contains(e.target)) {
                contentEl.style.transform = 'translateX(0)';
                document.removeEventListener('click', closeSwipe);
                document.removeEventListener('touchstart', closeSwipe);
              }
            };

            // Add the listener with a slight delay to avoid immediate triggering
            setTimeout(() => {
              document.addEventListener('click', closeSwipe);
              document.addEventListener('touchstart', closeSwipe);
            }, 10);
          } else {
            contentEl.style.transform = 'translateX(0)';
          }
        };

        // Remove existing event listeners to prevent duplicates
        item.removeEventListener('touchstart', touchStart);
        item.removeEventListener('touchmove', touchMove);
        item.removeEventListener('touchend', touchEnd);
        item.removeEventListener('touchcancel', touchEnd);
        item.removeEventListener('mousedown', touchStart);
        item.removeEventListener('mousemove', touchMove);
        item.removeEventListener('mouseup', touchEnd);
        item.removeEventListener('mouseleave', touchEnd);

        // Add new event listeners
        item.addEventListener('touchstart', touchStart);
        item.addEventListener('touchmove', touchMove);
        item.addEventListener('touchend', touchEnd);
        item.addEventListener('touchcancel', touchEnd);

        // Mouse events for desktop testing
        item.addEventListener('mousedown', touchStart);
        item.addEventListener('mousemove', touchMove);
        item.addEventListener('mouseup', touchEnd);
        item.addEventListener('mouseleave', touchEnd);
      });
    }, 300); // Give time for the DOM to update
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
      } else if (this.activeView === 'credit') {
        await this.loadCreditCardData();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.expenses = [];
      this.groupedExpenses = [];
      this.creditCards = [];
    } finally {
      this.isLoading = false;
    }
  }

  async loadCreditCardData() {
    try {
      // Load all credit cards using the credit card manager
      this.creditCards = await getCreditCards();

      // If no cards exist, create an empty array
      if (!this.creditCards) {
        this.creditCards = [];
      }

      // Load fixed expenses
      this.fixedExpenses = getFixedExpenses();

      // If a card is selected, load its details and payment history
      if (this.selectedCardId) {
        // Load all variable expenses for the selected card
        const cardVariableExpenses = await db.expenses
          .where('paymentMethod')
          .equals(`card-${this.selectedCardId}`)
          .toArray();

        // Convert fixed expenses to transaction format
        const cardFixedExpenses = this.convertFixedExpensesToTransactions(this.fixedExpenses, this.selectedCardId);

        // Combine variable and fixed expenses
        this.expenses = [...cardVariableExpenses, ...cardFixedExpenses];

        // Group expenses by date
        this.groupExpensesByDate();

        // Load payment history for this card
        this.creditCardPayments = await getCreditCardPayments(this.selectedCardId);

        console.log(`Loaded ${cardVariableExpenses.length} variable transactions and ${cardFixedExpenses.length} fixed transactions for card ID ${this.selectedCardId}`);
      } else {
        // When no card is selected, we still need to load all expenses for the current view
        if (this.activeView === 'weekly') {
          await this.loadWeekData();
        } else if (this.activeView === 'monthly') {
          await this.loadMonthData();
        } else {
          this.expenses = [];
          this.groupedExpenses = [];
        }

        this.creditCardPayments = [];
      }
    } catch (error) {
      console.error('Error loading credit card data:', error);
      this.creditCards = [];
      this.expenses = [];
      this.groupedExpenses = [];
      this.creditCardPayments = [];
      this.fixedExpenses = [];
    }
  }

  async loadWeekData() {
    try {
      // Load expenses for this week
      this.expenses = await db.expenses.where('weekId').equals(this.weekId).toArray();

      // Group expenses by date
      this.groupExpensesByDate();
    } catch (error) {
      console.error('Error loading week data:', error);
      this.expenses = [];
      this.groupedExpenses = [];
    }
  }

  async loadMonthData() {
    try {
      console.log('Loading month data for:', this.monthId);

      // Load expenses for this month
      this.expenses = await db.expenses.where('monthId').equals(this.monthId).toArray();
      console.log('Loaded expenses:', this.expenses);

      // Load fixed expenses from localStorage
      this.fixedExpenses = getFixedExpenses();
      console.log('Loaded fixed expenses from localStorage:', this.fixedExpenses);

      // Group expenses by date
      this.groupExpensesByDate();
    } catch (error) {
      console.error('Error loading month data:', error);
      console.error('Error details:', error.stack);
      this.expenses = [];
      this.fixedExpenses = [];
      this.groupedExpenses = [];
    }
  }

  groupExpensesByDate() {
    // Group expenses by date for display
    const groupedExpenses = {};

    if (!this.expenses || this.expenses.length === 0) {
      this.groupedExpenses = [];
      return;
    }

    console.log('Grouping expenses by date:', this.expenses);

    this.expenses.forEach(expense => {
      // Make sure we have a valid date string
      const date = expense.date;
      console.log('Processing expense with date:', date, expense);

      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });

    console.log('Grouped expenses by date:', groupedExpenses);

    // Sort dates in descending order
    this.groupedExpenses = Object.entries(groupedExpenses)
      .sort(([dateA], [dateB]) => {
        // Parse dates correctly for comparison
        const dateObjA = new Date(dateA);
        const dateObjB = new Date(dateB);
        console.log(`Comparing dates: ${dateA} (${dateObjA}) vs ${dateB} (${dateObjB})`);
        return dateObjB - dateObjA;
      })
      .map(([date, expenses]) => ({
        date,
        expenses
      }));

    console.log('Final grouped expenses:', this.groupedExpenses);
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
    console.log('Formatting date:', dateString);

    if (!dateString) {
      console.error('Invalid date string:', dateString);
      return 'Unknown Date';
    }

    // Parse the date string correctly
    // For YYYY-MM-DD format, we need to ensure proper parsing
    let date;
    try {
      if (dateString.includes('-')) {
        // Split the date string and create a new date
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day);

        // Validate the date is valid
        if (isNaN(date.getTime())) {
          console.error('Invalid date after parsing:', date);
          // Try direct parsing as fallback
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }

      // Final validation
      if (isNaN(date.getTime())) {
        console.error('Invalid date after all parsing attempts:', date);
        return 'Invalid Date';
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Error';
    }

    console.log('Parsed date object:', date, 'Year:', date.getFullYear(), 'Month:', date.getMonth(), 'Day:', date.getDate());

    const today = new Date();

    // Reset time components to midnight for accurate date comparison
    const dateToCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayToCompare = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Create yesterday date
    const yesterdayToCompare = new Date(todayToCompare);
    yesterdayToCompare.setDate(yesterdayToCompare.getDate() - 1);

    // Check if it's today or yesterday
    if (dateToCompare.getTime() === todayToCompare.getTime()) {
      return 'Today';
    } else if (dateToCompare.getTime() === yesterdayToCompare.getTime()) {
      return 'Yesterday';
    } else {
      // Format as "Day, Month Date" (e.g., "Sun, Apr 27")
      const formattedDate = date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      console.log('Formatted date:', formattedDate);
      return formattedDate;
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
    let budget = 1; // Default to avoid division by zero

    if (this.activeView === 'weekly') {
      budget = this.settings?.weeklyBudget || 1;
    } else if (this.activeView === 'monthly') {
      budget = this.settings?.monthlyBudget || 1;
    }

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

  openAddExpenseForm(preSelectedPaymentMethod = null) {
    this.showAddExpenseForm = true;
    this.newExpense = {
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: preSelectedPaymentMethod || 'cash'
    };
  }

  closeAddExpenseForm() {
    this.showAddExpenseForm = false;
  }

  handleInputChange(e, field) {
    this.newExpense = {
      ...this.newExpense,
      [field]: e.target.value
    };
  }

  selectCategory(category) {
    this.newExpense = {
      ...this.newExpense,
      category
    };
  }

  getCategoryIcon(category) {
    const icons = {
      'Food': '🍔',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛒',
      'Bills': '📝',
      'Health': '💊',
      'Other': '📦'
    };

    return icons[category] || '📦';
  }

  async saveExpense() {
    // Validate form
    if (!this.newExpense.amount || !this.newExpense.category) {
      // Show error
      console.error('Please fill in all required fields');
      return;
    }

    try {
      const amount = parseFloat(this.newExpense.amount);

      // Create expense object
      const expense = {
        ...this.newExpense,
        amount: amount,
        weekId: this.weekId,
        monthId: this.monthId,
        createdAt: new Date().toISOString()
      };

      // Check if a credit card was selected
      if (expense.paymentMethod && expense.paymentMethod.startsWith('card-')) {
        const cardId = parseInt(expense.paymentMethod.replace('card-', ''));

        // Get the card
        const card = await getCreditCardById(cardId);

        if (card) {
          console.log(`Adding expense to card ${card.name} (ID: ${cardId})`);

          // Update the card's balance
          const updatedBalance = parseFloat(card.currentBalance) + amount;

          // Update the card in the database
          await updateCreditCard(cardId, {
            currentBalance: updatedBalance
          });

          console.log(`Updated card balance from ${card.currentBalance} to ${updatedBalance}`);
        } else {
          console.error(`Card with ID ${cardId} not found`);
        }
      }

      // Add expense to database
      await db.expenses.add(expense);

      // Close form and reload data
      this.closeAddExpenseForm();
      this.loadData();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  }

  async openEditExpenseForm(expense) {
    // Make sure credit cards are loaded before opening the form
    if (!this.creditCards || this.creditCards.length === 0) {
      this.creditCards = await getCreditCards() || [];
    }

    this.editingExpenseId = expense.id;
    this.editingExpense = { ...expense };

    // Ensure payment method is set (default to 'cash' if not present)
    if (!this.editingExpense.paymentMethod) {
      this.editingExpense.paymentMethod = 'cash';
    }

    console.log('Opening edit form with expense:', this.editingExpense);
    this.showEditExpenseForm = true;
  }

  closeEditExpenseForm() {
    this.showEditExpenseForm = false;
    this.editingExpense = null;
    this.editingExpenseId = null;
  }

  handleEditExpenseInputChange(e, field) {
    this.editingExpense = {
      ...this.editingExpense,
      [field]: e.target.value
    };
  }

  selectEditExpenseCategory(category) {
    this.editingExpense = {
      ...this.editingExpense,
      category
    };
  }

  async saveEditExpense() {
    console.log('saveEditExpense called', this.editingExpense);

    // Validate form
    if (!this.editingExpense.name || !this.editingExpense.amount || !this.editingExpense.category) {
      // Show error
      console.error('Please fill in all required fields');
      return;
    }

    try {
      // Get the original expense to compare changes
      const originalExpense = await db.expenses.get(this.editingExpenseId);

      // Ensure the date is in the correct format (YYYY-MM-DD)
      let dateToSave = this.editingExpense.date;

      // Log the date for debugging
      console.log('Original date from form:', dateToSave);

      const newAmount = parseFloat(this.editingExpense.amount) || 0;

      // Create expense object with parsed numeric values
      const expense = {
        ...this.editingExpense,
        amount: newAmount,
        date: dateToSave // Ensure the date is saved correctly
      };

      console.log('Updating expense with date:', expense.date);

      // Handle credit card balance updates

      // If the original expense was on a credit card, adjust that card's balance
      if (originalExpense.paymentMethod && originalExpense.paymentMethod.startsWith('card-')) {
        const originalCardId = parseInt(originalExpense.paymentMethod.replace('card-', ''));
        const originalCard = await getCreditCardById(originalCardId);

        if (originalCard) {
          // Subtract the original amount from the card's balance
          const adjustedBalance = parseFloat(originalCard.currentBalance) - parseFloat(originalExpense.amount);

          await updateCreditCard(originalCardId, {
            currentBalance: adjustedBalance
          });

          console.log(`Adjusted original card balance from ${originalCard.currentBalance} to ${adjustedBalance}`);
        }
      }

      // If the updated expense is on a credit card, add the new amount to that card's balance
      if (expense.paymentMethod && expense.paymentMethod.startsWith('card-')) {
        const newCardId = parseInt(expense.paymentMethod.replace('card-', ''));
        const newCard = await getCreditCardById(newCardId);

        if (newCard) {
          // Add the new amount to the card's balance
          const updatedBalance = parseFloat(newCard.currentBalance) + newAmount;

          await updateCreditCard(newCardId, {
            currentBalance: updatedBalance
          });

          console.log(`Updated new card balance from ${newCard.currentBalance} to ${updatedBalance}`);
        }
      }

      // Update expense in database
      await db.expenses.update(this.editingExpenseId, expense);
      console.log('Expense updated with ID:', this.editingExpenseId);

      // Close form and reload data
      this.closeEditExpenseForm();
      this.loadData();
    } catch (error) {
      console.error('Error updating expense:', error);
      console.error('Error details:', error.stack);
    }
  }

  // Credit Card Methods
  openAddCardForm() {
    // Make sure we're in the credit view
    if (this.activeView !== 'credit') {
      this.activeView = 'credit';
      this.loadData();
    }

    // Reset the form state
    this.showAddCardForm = false;

    // Use our custom component
    const cardEditForm = this.shadowRoot.querySelector('credit-card-edit-form');
    if (cardEditForm) {
      console.log('Opening credit card form via component');
      cardEditForm.show();
    } else {
      console.error('Credit card edit form component not found');

      // Fallback to old method if component not found
      this.newCreditCard = {
        name: '',
        lastFourDigits: '',
        limit: '',
        currentBalance: '',
        dueDate: '',
        minimumPayment: '',
        apr: '',
        color: creditCardColors[0],
        reminderEnabled: false,
        reminderDays: 3,
        isActive: true
      };
      this.showAddCardForm = true;

      // Force a re-render to ensure the form is displayed
      this.requestUpdate();
    }
  }

  closeAddCardForm() {
    this.showAddCardForm = false;
  }

  openEditCardForm(card) {
    this.editingCard = card;

    // Use our custom component
    const cardEditForm = this.shadowRoot.querySelector('credit-card-edit-form');
    if (cardEditForm) {
      cardEditForm.show(card);
    } else {
      console.error('Credit card edit form component not found');
    }
  }

  closeEditCardForm() {
    this.showEditCardForm = false;
    this.editingCard = null;
  }

  handleCardInputChange(e, field) {
    this.newCreditCard = {
      ...this.newCreditCard,
      [field]: e.target.value
    };
  }

  selectCardColor(color) {
    this.newCreditCard = {
      ...this.newCreditCard,
      color
    };
  }

  async saveCard() {
    // Validate form
    if (!this.newCreditCard.name || !this.newCreditCard.limit) {
      // Show error
      console.error('Please fill in all required fields');
      return;
    }

    try {
      // Create card object with parsed numeric values
      const card = {
        ...this.newCreditCard,
        limit: parseFloat(this.newCreditCard.limit) || 0,
        currentBalance: parseFloat(this.newCreditCard.currentBalance) || 0,
        minimumPayment: parseFloat(this.newCreditCard.minimumPayment) || 0,
        apr: parseFloat(this.newCreditCard.apr) || 0
      };

      // Add to database using our credit card manager
      await addCreditCard(card);

      // Close form and reload data
      this.closeAddCardForm();
      this.loadData();
    } catch (error) {
      console.error('Error saving credit card:', error);
    }
  }

  async handleCardSaved() {
    console.log('Card saved event received, reloading data');
    // Make sure we're in the credit view
    if (this.activeView !== 'credit') {
      this.activeView = 'credit';
    }

    // Close any open forms
    this.showAddCardForm = false;
    this.showEditCardForm = false;

    // Reload data after a card is saved
    await this.loadCreditCardData();

    // Force a re-render to ensure the UI is updated
    this.requestUpdate();
  }

  selectCard(cardId) {
    this.selectedCardId = cardId;
    this.selectedCardTab = 'overview'; // Default to overview tab
    this.loadCreditCardData();
  }

  clearSelectedCard() {
    this.selectedCardId = null;
    this.loadCreditCardData();
  }

  selectCardTab(tab) {
    this.selectedCardTab = tab;
  }

  openPaymentModal(card) {
    // Use our custom payment modal component
    const paymentModal = this.shadowRoot.querySelector('credit-card-payment-modal');
    if (paymentModal) {
      paymentModal.show(card, this.settings);
    } else {
      console.error('Payment modal component not found');
    }
  }

  async handlePaymentSaved() {
    // Reload data after a payment is saved
    await this.loadCreditCardData();
  }

  confirmDeleteCard(cardId) {
    // Show iOS-style confirmation dialog
    console.log('Showing delete confirmation for card ID:', cardId);
    this.pendingDeleteId = cardId;
    this.pendingDeleteType = 'card';
    this.showDeleteConfirmation = true;
    this.requestUpdate();
  }

  calculateUtilization(card) {
    // Use our credit card manager utility
    return calculateUtilization(card);
  }

  formatDueDate(dateString) {
    // Use our credit card manager utility
    const result = formatDueDate(dateString);
    return result.text;
  }

  getDueDateClass(dateString, isPaid) {
    if (isPaid) return 'paid';

    // Use our credit card manager utility
    const result = formatDueDate(dateString);
    return result.status;
  }

  getFixedExpenseIcon(category) {
    const icons = {
      'Housing': '🏠',
      'Utilities': '💡',
      'Subscriptions': '📺',
      'Insurance': '🔒',
      'Loans': '💰',
      'Memberships': '🎯',
      'Other': '📦'
    };

    return icons[category] || '📦';
  }

  getCardNameById(cardId) {
    if (!this.creditCards || !cardId) return 'Card';

    const card = this.creditCards.find(c => c.id === parseInt(cardId));
    return card ? card.name : 'Card';
  }

  openAddFixedExpenseForm(preSelectedPaymentMethod = null) {
    this.showAddFixedExpenseForm = true;
    this.newFixedExpense = {
      name: '',
      amount: '',
      category: '',
      dueDate: '',
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true,
      paymentMethod: preSelectedPaymentMethod || 'cash'
    };
  }

  closeAddFixedExpenseForm() {
    this.showAddFixedExpenseForm = false;
  }

  handleFixedExpenseInputChange(e, field) {
    this.newFixedExpense = {
      ...this.newFixedExpense,
      [field]: e.target.value
    };
  }

  selectFixedExpenseCategory(category) {
    this.newFixedExpense = {
      ...this.newFixedExpense,
      category
    };
  }

  async saveFixedExpense() {
    console.log('saveFixedExpense called', this.newFixedExpense);

    // Validate form
    if (!this.newFixedExpense.name || !this.newFixedExpense.amount || !this.newFixedExpense.category) {
      // Show error
      console.error('Please fill in all required fields');
      return;
    }

    try {
      // Parse the amount
      const amount = parseFloat(this.newFixedExpense.amount) || 0;

      // Create fixed expense object with parsed numeric values
      const fixedExpense = {
        ...this.newFixedExpense,
        amount: amount,
        createdAt: new Date().toISOString()
      };

      console.log('Saving fixed expense:', fixedExpense);

      // Check if a credit card was selected
      if (fixedExpense.paymentMethod && fixedExpense.paymentMethod.startsWith('card-')) {
        const cardId = parseInt(fixedExpense.paymentMethod.replace('card-', ''));

        // Get the card
        const card = await getCreditCardById(cardId);

        if (card) {
          console.log(`Adding fixed expense to card ${card.name} (ID: ${cardId})`);

          // Update the card's balance if the expense is marked as paid
          if (fixedExpense.isPaid) {
            const updatedBalance = parseFloat(card.currentBalance) + amount;

            // Update the card in the database
            await updateCreditCard(cardId, {
              currentBalance: updatedBalance
            });

            console.log(`Updated card balance from ${card.currentBalance} to ${updatedBalance}`);
          }
        } else {
          console.error(`Card with ID ${cardId} not found`);
        }
      }

      // Add to localStorage using our manager
      const id = addFixedExpense(fixedExpense);
      console.log('Fixed expense saved with ID:', id);

      // Close form and reload data
      this.closeAddFixedExpenseForm();
      this.loadData();
    } catch (error) {
      console.error('Error saving fixed expense:', error);
      // Show detailed error information
      console.error('Error details:', error.stack);
    }
  }

  async toggleFixedExpensePaid(id) {
    try {
      // Get the expense before toggling
      const expense = this.fixedExpenses.find(e => e.id === id);

      if (!expense) {
        console.error('Expense not found');
        return;
      }

      // Check if this expense is paid with a credit card
      if (expense.paymentMethod && expense.paymentMethod.startsWith('card-')) {
        const cardId = parseInt(expense.paymentMethod.replace('card-', ''));
        const card = await getCreditCardById(cardId);

        if (card) {
          const amount = parseFloat(expense.amount) || 0;

          // If currently not paid and being marked as paid, add to card balance
          if (!expense.isPaid) {
            const updatedBalance = parseFloat(card.currentBalance) + amount;

            await updateCreditCard(cardId, {
              currentBalance: updatedBalance
            });

            console.log(`Added expense to card balance: ${card.currentBalance} -> ${updatedBalance}`);
          }
          // If currently paid and being marked as unpaid, subtract from card balance
          else {
            const updatedBalance = Math.max(0, parseFloat(card.currentBalance) - amount);

            await updateCreditCard(cardId, {
              currentBalance: updatedBalance
            });

            console.log(`Removed expense from card balance: ${card.currentBalance} -> ${updatedBalance}`);
          }
        }
      }

      // Toggle the paid status
      toggleFixedExpensePaid(id);
      this.loadData();
    } catch (error) {
      console.error('Error updating fixed expense:', error);
    }
  }

  openEditFixedExpenseForm(expense) {
    this.editingFixedExpenseId = expense.id;
    this.editingFixedExpense = { ...expense };
    this.showEditFixedExpenseForm = true;
  }

  closeEditFixedExpenseForm() {
    this.showEditFixedExpenseForm = false;
    this.editingFixedExpense = null;
    this.editingFixedExpenseId = null;
  }

  handleEditFixedExpenseInputChange(e, field, isCheckbox = false) {
    this.editingFixedExpense = {
      ...this.editingFixedExpense,
      [field]: isCheckbox ? e.target.checked : e.target.value
    };
  }

  selectEditFixedExpenseCategory(category) {
    this.editingFixedExpense = {
      ...this.editingFixedExpense,
      category
    };
  }

  async saveEditFixedExpense() {
    console.log('saveEditFixedExpense called', this.editingFixedExpense);

    // Validate form
    if (!this.editingFixedExpense.name || !this.editingFixedExpense.amount || !this.editingFixedExpense.category) {
      // Show error
      console.error('Please fill in all required fields');
      return;
    }

    try {
      // Get the original expense before changes
      const originalExpense = this.fixedExpenses.find(expense => expense.id === this.editingFixedExpenseId);

      if (!originalExpense) {
        console.error('Original expense not found');
        return;
      }

      // Parse the amount
      const newAmount = parseFloat(this.editingFixedExpense.amount) || 0;
      const originalAmount = parseFloat(originalExpense.amount) || 0;

      // Create fixed expense object with parsed numeric values
      const fixedExpense = {
        ...this.editingFixedExpense,
        amount: newAmount
      };

      console.log('Updating fixed expense:', fixedExpense);

      // Handle credit card payment method changes
      const originalPaymentMethod = originalExpense.paymentMethod || 'cash';
      const newPaymentMethod = fixedExpense.paymentMethod || 'cash';

      // If the expense was previously paid and on a card, we need to adjust that card's balance
      if (originalExpense.isPaid && originalPaymentMethod.startsWith('card-')) {
        const originalCardId = parseInt(originalPaymentMethod.replace('card-', ''));
        const originalCard = await getCreditCardById(originalCardId);

        if (originalCard) {
          // If payment method changed or amount changed, adjust the original card's balance
          if (newPaymentMethod !== originalPaymentMethod || newAmount !== originalAmount) {
            // Subtract the original amount from the original card
            const updatedBalance = Math.max(0, parseFloat(originalCard.currentBalance) - originalAmount);

            await updateCreditCard(originalCardId, {
              currentBalance: updatedBalance
            });

            console.log(`Adjusted original card (${originalCard.name}) balance to ${updatedBalance}`);
          }
        }
      }

      // If the expense is paid and on a card now, we need to add to that card's balance
      if (fixedExpense.isPaid && newPaymentMethod.startsWith('card-')) {
        const newCardId = parseInt(newPaymentMethod.replace('card-', ''));
        const newCard = await getCreditCardById(newCardId);

        if (newCard) {
          // Only add to the card if it's a new card or the amount changed
          if (newPaymentMethod !== originalPaymentMethod ||
              newAmount !== originalAmount ||
              !originalExpense.isPaid) {

            const updatedBalance = parseFloat(newCard.currentBalance) + newAmount;

            await updateCreditCard(newCardId, {
              currentBalance: updatedBalance
            });

            console.log(`Updated new card (${newCard.name}) balance to ${updatedBalance}`);
          }
        }
      }

      // Update in localStorage using our manager
      const success = updateFixedExpense(this.editingFixedExpenseId, fixedExpense);
      console.log('Fixed expense updated:', success);

      // Close form and reload data
      this.closeEditFixedExpenseForm();
      this.loadData();
    } catch (error) {
      console.error('Error updating fixed expense:', error);
      console.error('Error details:', error.stack);
    }
  }

  deleteFixedExpense(id) {
    // Show iOS-style confirmation dialog
    console.log('Showing delete confirmation for fixed expense ID:', id);
    this.pendingDeleteId = id;
    this.pendingDeleteType = 'fixed';
    this.showDeleteConfirmation = true;
    this.requestUpdate();
  }

  deleteVariableExpense(id) {
    // Show iOS-style confirmation dialog
    console.log('Showing delete confirmation for variable expense ID:', id);
    this.pendingDeleteId = id;
    this.pendingDeleteType = 'variable';
    this.showDeleteConfirmation = true;
    this.requestUpdate();
  }

  async confirmDelete() {
    try {
      if (this.pendingDeleteType === 'fixed') {
        console.log('Deleting fixed expense with ID:', this.pendingDeleteId);

        // Get the fixed expense before deleting it
        const expense = this.fixedExpenses.find(e => e.id === this.pendingDeleteId);

        // If the expense was paid with a credit card and is marked as paid, update the card balance
        if (expense && expense.isPaid && expense.paymentMethod && expense.paymentMethod.startsWith('card-')) {
          const cardId = parseInt(expense.paymentMethod.replace('card-', ''));
          const card = await getCreditCardById(cardId);

          if (card) {
            // Subtract the expense amount from the card balance
            const updatedBalance = Math.max(0, parseFloat(card.currentBalance) - parseFloat(expense.amount));

            // Update the card in the database
            await updateCreditCard(cardId, {
              currentBalance: updatedBalance
            });

            console.log(`Updated card balance from ${card.currentBalance} to ${updatedBalance}`);
          }
        }

        // Delete the fixed expense
        deleteFixedExpense(this.pendingDeleteId);
      } else if (this.pendingDeleteType === 'variable') {
        console.log('Deleting variable expense with ID:', this.pendingDeleteId);

        // Get the expense before deleting it
        const expense = await db.expenses.get(this.pendingDeleteId);

        // If the expense was on a credit card, adjust the card's balance
        if (expense && expense.paymentMethod && expense.paymentMethod.startsWith('card-')) {
          const cardId = parseInt(expense.paymentMethod.replace('card-', ''));
          const card = await getCreditCardById(cardId);

          if (card) {
            // Subtract the expense amount from the card's balance
            const adjustedBalance = parseFloat(card.currentBalance) - parseFloat(expense.amount);

            await updateCreditCard(cardId, {
              currentBalance: adjustedBalance
            });

            console.log(`Adjusted card balance from ${card.currentBalance} to ${adjustedBalance} after deleting expense`);
          }
        }

        // Delete the expense
        await db.expenses.delete(this.pendingDeleteId);
      } else if (this.pendingDeleteType === 'card') {
        console.log('Deleting credit card with ID:', this.pendingDeleteId);
        await deleteCreditCard(this.pendingDeleteId);

        // If we deleted the currently selected card, clear the selection
        if (this.selectedCardId === this.pendingDeleteId) {
          this.selectedCardId = null;
        }
      } else if (this.pendingDeleteType === 'payment') {
        console.log('Deleting credit card payment with ID:', this.pendingDeleteId);
        await deleteCreditCardPayment(this.pendingDeleteId);
      }

      this.loadData();
      this.closeDeleteConfirmation();
    } catch (error) {
      console.error(`Error deleting ${this.pendingDeleteType}:`, error);
    }
  }

  closeDeleteConfirmation() {
    console.log('Closing delete confirmation');
    this.showDeleteConfirmation = false;
    this.pendingDeleteId = null;
    this.pendingDeleteType = null;
    this.requestUpdate();
  }

  calculateTotalFixedExpenses() {
    return calculateTotalFixedExpenses();
  }

  // Helper method to get card name by ID
  getCardNameById(cardId) {
    if (!this.creditCards) return '';

    const card = this.creditCards.find(card => card.id === parseInt(cardId));
    return card ? card.name : '';
  }

  // Helper method to group expenses by date for a specific card
  groupExpensesByDateForCard(cardExpenses) {
    if (!cardExpenses || cardExpenses.length === 0) {
      return [];
    }

    // Sort expenses by date (newest first)
    const sortedExpenses = [...cardExpenses].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Group by date
    const groupedByDate = {};
    sortedExpenses.forEach(expense => {
      const date = expense.date;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(expense);
    });

    // Convert to array format for rendering
    return Object.keys(groupedByDate).map(date => ({
      date,
      expenses: groupedByDate[date]
    }));
  }

  // Helper method to convert fixed expenses to transaction format
  convertFixedExpensesToTransactions(fixedExpenses, cardId) {
    if (!fixedExpenses || fixedExpenses.length === 0) {
      return [];
    }

    // Filter fixed expenses that are paid with this card and are marked as paid
    const cardFixedExpenses = fixedExpenses.filter(expense =>
      expense.paymentMethod === `card-${cardId}` &&
      expense.isPaid === true
    );

    // Convert to transaction format
    return cardFixedExpenses.map(expense => ({
      id: `fixed-${expense.id}`, // Prefix with 'fixed-' to distinguish from regular expenses
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.dueDate || new Date().toISOString().split('T')[0], // Use due date or today
      paymentMethod: expense.paymentMethod,
      isFixedExpense: true, // Flag to identify as a fixed expense
      fixedExpenseId: expense.id // Store the original ID for reference
    }));
  }

  // Chart methods
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('expenses') || changedProperties.has('activeView')) {
      // Only create charts if we have expenses and we're in the right view
      if (this.expenses && this.expenses.length > 0 &&
          (this.activeView === 'weekly' || this.activeView === 'monthly')) {
        this.createCharts();
        this.calculateSpendingStats();
      }
    }

    if (changedProperties.has('fixedExpenses') ||
        changedProperties.has('expenses') ||
        changedProperties.has('activeView') ||
        changedProperties.has('selectedCardTab')) {

      // Setup swipe-to-delete for expenses in weekly/monthly views
      if (this.activeView === 'monthly' || this.activeView === 'weekly') {
        this.updateComplete.then(() => {
          this.setupSwipeToDelete();
        });
      }

      // Setup swipe-to-delete for card transactions
      if (this.activeView === 'credit' && this.selectedCardId && this.selectedCardTab === 'transactions') {
        this.updateComplete.then(() => {
          this.setupSwipeToDelete();
        });
      }
    }
  }

  createCharts() {
    // Wait for the DOM to be updated
    setTimeout(() => {
      this.createCategoryChart();
      this.createDailyChart();
    }, 0);
  }

  createCategoryChart() {
    const categoryChartElement = this.shadowRoot.querySelector('#category-chart');
    if (!categoryChartElement) return;

    // Destroy existing chart if it exists
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }

    // Group expenses by category
    const categoryData = {};
    this.expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += parseFloat(expense.amount) || 0;
    });

    // Prepare data for chart
    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    // Define colors for each category
    const colors = [
      '#34c759', // Green
      '#007aff', // Blue
      '#ff9500', // Orange
      '#ff3b30', // Red
      '#5856d6', // Purple
      '#ff2d55', // Pink
      '#a2845e', // Brown
      '#8e8e93'  // Gray
    ];

    // Create chart
    this.categoryChart = new Chart(categoryChartElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: ${formatCurrency(value, this.settings?.currency || 'USD')} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '70%',
        layout: {
          padding: 10
        }
      }
    });
  }

  createDailyChart() {
    const dailyChartElement = this.shadowRoot.querySelector('#daily-chart');
    if (!dailyChartElement) return;

    // Destroy existing chart if it exists
    if (this.dailyChart) {
      this.dailyChart.destroy();
    }

    // Group expenses by date
    const dailyData = {};

    // Initialize all days of the week/month with zero
    if (this.activeView === 'weekly') {
      // Get the start date (Monday) from weekId
      const startDate = new Date(this.weekId);

      // Create entries for all 7 days of the week
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        dailyData[dateString] = 0;
      }
    } else if (this.activeView === 'monthly') {
      // Get the year and month from monthId
      const [year, month] = this.monthId.split('-').map(Number);

      // Get the number of days in the month
      const daysInMonth = new Date(year, month, 0).getDate();

      // Create entries for all days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i);
        const dateString = date.toISOString().split('T')[0];
        dailyData[dateString] = 0;
      }
    }

    // Add expense amounts to the corresponding dates
    this.expenses.forEach(expense => {
      const date = expense.date;
      if (dailyData[date] !== undefined) {
        dailyData[date] += parseFloat(expense.amount) || 0;
      }
    });

    // Prepare data for chart
    const labels = Object.keys(dailyData).map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    });
    const data = Object.values(dailyData);

    // Create chart
    this.dailyChart = new Chart(dailyChartElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Daily Spending',
          data: data,
          backgroundColor: '#007aff',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${formatCurrency(context.raw, this.settings?.currency || 'USD')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return formatCurrency(value, this.settings?.currency || 'USD');
              }
            }
          },
          x: {
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              font: {
                size: 10
              }
            }
          }
        },
        layout: {
          padding: 10
        }
      }
    });
  }

  calculateSpendingStats() {
    if (!this.expenses || this.expenses.length === 0) {
      this.spendingStats = {
        totalSpent: 0,
        avgPerDay: 0,
        topCategory: '',
        topCategoryAmount: 0,
        mostExpensiveDay: '',
        mostExpensiveAmount: 0
      };
      return;
    }

    // Calculate total spent
    const totalSpent = this.calculateTotalSpent();

    // Calculate average per day
    let numDays = 7; // Default for weekly view
    if (this.activeView === 'monthly') {
      const [year, month] = this.monthId.split('-').map(Number);
      numDays = new Date(year, month, 0).getDate();
    }
    const avgPerDay = totalSpent / numDays;

    // Find top category
    const categoryData = {};
    this.expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += parseFloat(expense.amount) || 0;
    });

    let topCategory = '';
    let topCategoryAmount = 0;

    Object.entries(categoryData).forEach(([category, amount]) => {
      if (amount > topCategoryAmount) {
        topCategory = category;
        topCategoryAmount = amount;
      }
    });

    // Find most expensive day
    const dailyData = {};
    this.expenses.forEach(expense => {
      const date = expense.date;
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += parseFloat(expense.amount) || 0;
    });

    let mostExpensiveDay = '';
    let mostExpensiveAmount = 0;

    Object.entries(dailyData).forEach(([date, amount]) => {
      if (amount > mostExpensiveAmount) {
        mostExpensiveDay = date;
        mostExpensiveAmount = amount;
      }
    });

    // Format the most expensive day
    let formattedMostExpensiveDay = '';
    if (mostExpensiveDay) {
      const date = new Date(mostExpensiveDay);
      formattedMostExpensiveDay = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }

    this.spendingStats = {
      totalSpent,
      avgPerDay,
      topCategory,
      topCategoryAmount,
      mostExpensiveDay: formattedMostExpensiveDay,
      mostExpensiveAmount
    };
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading expenses...</span>
        </div>
      `;
    }

    const totalSpent = this.calculateTotalSpent();
    let budget = 0;

    if (this.activeView === 'weekly') {
      budget = this.settings?.weeklyBudget || 0;
    } else if (this.activeView === 'monthly') {
      budget = this.settings?.monthlyBudget || 0;
    }

    const remaining = Math.max(0, budget - totalSpent);
    const budgetProgress = this.calculateBudgetProgress();

    return html`
      <!-- Delete Confirmation Dialog using existing modal pattern -->
      ${this.showDeleteConfirmation ? html`
        <div class="modal-backdrop" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.4); z-index: 9998;" @click=${this.closeDeleteConfirmation}>
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; width: 270px; border-radius: 14px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15); z-index: 9999; text-align: center;" @click=${(e) => e.stopPropagation()}>
            <div style="padding: 20px 16px 0;">
              <div style="font-size: 17px; font-weight: 500; margin-bottom: 8px; color: #000; line-height: 1.3;">Are you sure you want to delete the expense permanently?</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 20px; line-height: 1.4; font-weight: 400;">You cannot undo this action.</div>
            </div>
            <div style="display: flex; border-top: 0.5px solid rgba(0, 0, 0, 0.15); margin-top: 5px;">
              <button style="flex: 1; height: 44px; font-size: 17px; border: none; background: none; cursor: pointer; color: #007AFF; font-weight: 400; border-right: 0.5px solid rgba(0, 0, 0, 0.15); border-bottom-left-radius: 14px;" @click=${this.closeDeleteConfirmation}>
                Cancel
              </button>
              <button style="flex: 1; height: 44px; font-size: 17px; border: none; background: none; cursor: pointer; color: #FF3B30; font-weight: 500; border-bottom-right-radius: 14px;" @click=${this.confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ` : ''}
      <div class="container">
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
          <div
            class="view-option ${this.activeView === 'credit' ? 'active' : ''}"
            @click=${() => this.handleViewChange('credit')}
          >
            Cards
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

        ${this.activeView === 'credit' ? html`
          <!-- Credit Card View -->
          ${this.selectedCardId ? html`
            <!-- Selected Card Detail View -->
            ${this.creditCards.filter(card => card.id === this.selectedCardId).map(card => html`
              <div class="credit-card" style="background-color: ${card.color}">
                <div class="card-header">
                  <div>
                    <div class="card-name">${card.name}</div>
                    <div class="card-number">••••${card.lastFourDigits}</div>
                  </div>
                  <div @click=${this.clearSelectedCard} style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
                <div class="card-body">
                  <div class="balance-row">
                    <div class="balance-label">Current Balance</div>
                    <div class="balance-amount">${formatCurrency(card.currentBalance, this.settings?.currency || 'USD')}</div>
                  </div>
                  <div class="balance-row">
                    <div class="balance-label">Credit Limit</div>
                    <div class="balance-amount">${formatCurrency(card.limit, this.settings?.currency || 'USD')}</div>
                  </div>
                  <div class="balance-row">
                    <div class="balance-label">Available Credit</div>
                    <div class="balance-amount">${formatCurrency(Math.max(0, card.limit - card.currentBalance), this.settings?.currency || 'USD')}</div>
                  </div>
                  <div class="credit-utilization">
                    <div class="utilization-fill" style="width: ${this.calculateUtilization(card)}%"></div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="due-date">
                    ${this.formatDueDate(card.dueDate)}
                  </div>
                  <div>
                    <button class="payment-button" @click=${() => this.openPaymentModal(card)}>Make Payment</button>
                  </div>
                </div>
              </div>

              <!-- Card detail tabs -->
              <div class="view-selector" style="margin-top: 16px;">
                <div
                  class="view-option ${this.selectedCardTab === 'overview' ? 'active' : ''}"
                  @click=${() => this.selectCardTab('overview')}
                >
                  Overview
                </div>
                <div
                  class="view-option ${this.selectedCardTab === 'payments' ? 'active' : ''}"
                  @click=${() => this.selectCardTab('payments')}
                >
                  Payments
                </div>
                <div
                  class="view-option ${this.selectedCardTab === 'transactions' ? 'active' : ''}"
                  @click=${() => this.selectCardTab('transactions')}
                >
                  Transactions
                </div>
              </div>

              ${this.selectedCardTab === 'overview' ? html`
                <div class="card-detail-header">Card Details</div>
                <div class="budget-card">
                  <div class="balance-row">
                    <div>Minimum Payment</div>
                    <div>${formatCurrency(card.minimumPayment, this.settings?.currency || 'USD')}</div>
                  </div>
                  <div class="balance-row">
                    <div>APR</div>
                    <div>${card.apr}%</div>
                  </div>
                  <div class="balance-row">
                    <div>Monthly Interest</div>
                    <div>${formatCurrency(calculateMonthlyInterest(card), this.settings?.currency || 'USD')}</div>
                  </div>
                  <div class="balance-row">
                    <div>Payment Due</div>
                    <div class="${this.getDueDateClass(card.dueDate)}">${this.formatDueDate(card.dueDate)}</div>
                  </div>
                </div>

                <div class="ios-button-container">
                  <button
                    class="ios-native-button ios-blue-button filled"
                    @click=${() => this.openEditCardForm(card)}
                  >
                    Edit Card
                  </button>
                  <button
                    class="ios-native-button ios-red-button"
                    @click=${() => this.confirmDeleteCard(card.id)}
                  >
                    Delete
                  </button>
                </div>
              ` : this.selectedCardTab === 'payments' ? html`
                <!-- Payment History Tab -->
                <credit-card-payment-history
                  .cardId=${card.id}
                  .settings=${this.settings}
                  @payment-deleted=${this.handlePaymentSaved}
                ></credit-card-payment-history>
              ` : html`
                <!-- Transactions Tab -->
                <div class="fixed-expense-header">
                  <div>Card Transactions</div>
                  <div class="add-fixed-expense" @click=${() => {
                    // Pre-select this card when adding a transaction
                    this.openAddExpenseForm(`card-${card.id}`);
                  }}>+ Add Transaction</div>
                </div>
                <div class="expense-list">
                  ${(() => {
                    // Filter expenses for this specific card
                    const cardExpenses = this.expenses.filter(expense =>
                      expense.paymentMethod === `card-${card.id}`
                    );

                    // Group card expenses by date
                    const groupedCardExpenses = this.groupExpensesByDateForCard(cardExpenses);

                    if (!cardExpenses || cardExpenses.length === 0) {
                      return html`
                        <div class="empty-state">
                          <div>No transactions for this card yet</div>
                          <div>Tap the + button to add your first expense</div>
                        </div>
                      `;
                    } else {
                      return html`
                        ${groupedCardExpenses.map(group => html`
                          <div class="expense-date-header">
                            ${this.formatDate(group.date)}
                          </div>
                          ${group.expenses.map(expense => {
                            // Check if this is a fixed expense
                            const isFixedExpense = expense.isFixedExpense === true;
                            const expenseId = isFixedExpense ? expense.fixedExpenseId : expense.id;
                            const elementId = isFixedExpense ? `fixed-expense-${expenseId}` : `variable-expense-${expenseId}`;

                            return html`
                              <div class="expense-item swipeable-item"
                                @click=${() => isFixedExpense ? this.openEditFixedExpenseForm(this.fixedExpenses.find(e => e.id === expenseId)) : this.openEditExpenseForm(expense)}
                                id="${elementId}">
                                <div class="expense-content">
                                  <div class="expense-info">
                                    <div class="expense-name">${expense.name || 'Expense'}</div>
                                    <div class="expense-category">
                                      ${expense.category || 'Uncategorized'}
                                      ${isFixedExpense ? html`<span class="fixed-expense-badge">Monthly</span>` : ''}
                                    </div>
                                  </div>
                                  <div class="expense-amount">
                                    ${formatCurrency(expense.amount || 0, this.settings?.currency || 'USD')}
                                  </div>
                                </div>
                                <div class="delete-action">
                                  <div class="delete-button" @click="${(e) => {
                                    e.stopPropagation();
                                    isFixedExpense ? this.deleteFixedExpense(expenseId) : this.deleteVariableExpense(expenseId);
                                  }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                      <line x1="10" y1="11" x2="10" y2="17"></line>
                                      <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    <span>Delete</span>
                                  </div>
                                </div>
                              </div>
                            `;
                          })}
                        `)}
                      `;
                    }
                  })()}
                </div>
              `}
            `)}
          ` : html`
            <!-- Credit Card List View -->
            ${this.creditCards.length === 0 ? html`
              <div class="empty-state">
                <div class="empty-state-icon">💳</div>
                <div>No credit cards yet</div>
                <div>Tap the + button to add your first card</div>
              </div>
            ` : html`
              ${this.creditCards.map(card => html`
                <div class="credit-card" style="background-color: ${card.color}" @click=${() => this.selectCard(card.id)}>
                  <div class="card-header">
                    <div>
                      <div class="card-name">${card.name}</div>
                      <div class="card-number">••••${card.lastFourDigits}</div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="balance-row">
                      <div class="balance-label">Current Balance</div>
                      <div class="balance-amount">${formatCurrency(card.currentBalance, this.settings?.currency || 'USD')}</div>
                    </div>
                    <div class="credit-utilization">
                      <div class="utilization-fill" style="width: ${this.calculateUtilization(card)}%"></div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="due-date">
                      ${this.formatDueDate(card.dueDate)}
                    </div>
                  </div>
                </div>
              `)}

              <div class="add-card-button" @click=${this.openAddCardForm}>
                <div class="add-card-icon">+</div>
                <div class="add-card-text">Add Credit Card</div>
              </div>
            `}
          `}
        ` : html`
          <!-- Budget overview -->
          <div class="budget-card">
            <div class="card-title">
              ${this.activeView === 'weekly' ? 'Weekly Budget' : 'Monthly Budget'}
            </div>
            <div class="budget-amount">
              ${formatCurrency(budget, this.settings?.currency || 'USD')}
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill ${this.getBudgetProgressClass()}"
                style="width: ${budgetProgress}%"
              ></div>
            </div>
            <div class="budget-details">
              <div>${formatCurrency(totalSpent, this.settings?.currency || 'USD')} spent</div>
              <div>${formatCurrency(remaining, this.settings?.currency || 'USD')} left</div>
            </div>
          </div>

          <!-- Spending Analysis -->
          ${this.expenses && this.expenses.length > 0 ? html`
            <div class="spending-analysis">
              <div class="analysis-header">Spending Analysis</div>

              <!-- Stats Cards -->
              <div class="stats-container">
                <div class="stat-card">
                  <div class="stat-value">${formatCurrency(this.spendingStats.avgPerDay, this.settings?.currency || 'USD')}</div>
                  <div class="stat-label">Avg. Per Day</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${this.spendingStats.topCategory || 'N/A'}</div>
                  <div class="stat-label">Top Category</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${this.spendingStats.mostExpensiveDay || 'N/A'}</div>
                  <div class="stat-label">Highest Day</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${formatCurrency(this.spendingStats.mostExpensiveAmount, this.settings?.currency || 'USD')}</div>
                  <div class="stat-label">Highest Amount</div>
                </div>
              </div>

              <!-- Category Chart -->
              <div class="chart-container">
                <div class="chart-title">Spending by Category</div>
                <canvas id="category-chart"></canvas>
                ${!this.expenses || this.expenses.length === 0 ? html`
                  <div class="no-data-message">No data available</div>
                ` : ''}
              </div>

              <!-- Daily Chart -->
              <div class="chart-container">
                <div class="chart-title">Daily Spending</div>
                <canvas id="daily-chart"></canvas>
                ${!this.expenses || this.expenses.length === 0 ? html`
                  <div class="no-data-message">No data available</div>
                ` : ''}
              </div>
            </div>
          ` : ''}

          ${this.activeView === 'monthly' ? html`
            <!-- Fixed Expenses Section -->
            <div class="fixed-expense-section">
              <div class="fixed-expense-header">
                <div>Monthly Bills</div>
                <div class="add-fixed-expense" @click=${() => this.openAddFixedExpenseForm()}>+ Add</div>
              </div>

              ${!this.fixedExpenses || this.fixedExpenses.length === 0 ? html`
                <div class="empty-state">
                  <div>No monthly bills yet</div>
                  <div>Add your recurring monthly expenses like rent and subscriptions</div>
                </div>
              ` : html`
                ${this.fixedExpenses.map(expense => html`
                  <div class="fixed-expense-item swipeable-item" @click=${() => this.openEditFixedExpenseForm(expense)} id="expense-${expense.id}">
                    <div class="fixed-expense-content">
                      <div class="fixed-expense-top">
                        <div class="fixed-expense-name">${expense.name}</div>
                        <div class="fixed-expense-amount">
                          ${formatCurrency(expense.amount, this.settings?.currency || 'USD')}
                        </div>
                      </div>
                      <div class="fixed-expense-details">
                        <div class="fixed-expense-category">
                          <span class="fixed-expense-category-icon">${this.getFixedExpenseIcon(expense.category)}</span>
                          ${expense.category}
                          ${expense.paymentMethod && expense.paymentMethod.startsWith('card-') ? html`
                            <span class="payment-method">
                              💳 ${this.getCardNameById(expense.paymentMethod.replace('card-', ''))}
                            </span>
                          ` : expense.paymentMethod === 'cash' ? html`
                            <span class="payment-method">
                              💵 Cash
                            </span>
                          ` : ''}
                        </div>
                        <div class="fixed-expense-due ${this.getDueDateClass(expense.dueDate, expense.isPaid)}">
                          ${this.formatDueDate(expense.dueDate)}
                        </div>
                      </div>
                      <div class="payment-status" @click=${(e) => e.stopPropagation()}>
                        <div class="payment-status-label">Paid</div>
                        <div class="payment-status-toggle">
                          <label class="toggle-switch">
                            <input
                              type="checkbox"
                              ?checked=${expense.isPaid}
                              @change=${() => this.toggleFixedExpensePaid(expense.id)}
                            >
                            <span class="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="delete-action">
                      <div class="delete-button" @click="${(e) => { e.stopPropagation(); this.deleteFixedExpense(expense.id); }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                `)}

                <div class="budget-card" style="margin-top: 16px;">
                  <div class="card-title">TOTAL MONTHLY BILLS</div>
                  <div class="budget-amount">
                    ${formatCurrency(this.calculateTotalFixedExpenses(), this.settings?.currency || 'USD')}
                  </div>
                </div>
              `}
            </div>
          ` : ''}

          <!-- Variable Expenses -->
          <div class="expense-list">
            <div class="fixed-expense-header">
              <div>${this.activeView === 'monthly' ? 'Everyday Spending' : 'Expenses'}</div>
              <div class="add-fixed-expense" @click=${() => this.openAddExpenseForm()}>+ Add Transaction</div>
            </div>

            ${!this.expenses || this.expenses.length === 0 ? html`
              <div class="empty-state">
                <div class="empty-state-icon">💰</div>
                <div>No expenses yet</div>
                <div>Tap the + button to add your first expense</div>
              </div>
            ` : html`
              ${this.groupedExpenses && this.groupedExpenses.map(group => html`
                <div class="expense-date-header">
                  ${this.formatDate(group.date)}
                </div>
                ${group.expenses && group.expenses.map(expense => html`
                  <div class="expense-item swipeable-item" @click=${() => this.openEditExpenseForm(expense)} id="variable-expense-${expense.id}">
                    <div class="expense-content">
                      <div class="expense-info">
                        <div class="expense-name">${expense.name || 'Expense'}</div>
                        <div class="expense-category">
                          ${expense.category || 'Uncategorized'}
                          ${expense.paymentMethod && expense.paymentMethod.startsWith('card-') ? html`
                            <span class="payment-method">
                              💳 ${this.getCardNameById(expense.paymentMethod.replace('card-', ''))}
                            </span>
                          ` : ''}
                        </div>
                      </div>
                      <div class="expense-amount">
                        ${formatCurrency(expense.amount || 0, this.settings?.currency || 'USD')}
                      </div>
                    </div>
                    <div class="delete-action">
                      <div class="delete-button" @click="${(e) => { e.stopPropagation(); this.deleteVariableExpense(expense.id); }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                `)}
              `)}
            `}
          </div>
        `}
      </div>

      <!-- Add button (expense or card based on active view) - iOS style -->
      <div class="add-expense-button" @click=${() => {
        if (this.activeView === 'credit') {
          this.openAddCardForm();
        } else if (this.activeView === 'monthly') {
          this.openAddFixedExpenseForm();
        } else {
          this.openAddExpenseForm();
        }
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      <!-- Add expense form -->
      ${this.showAddExpenseForm ? html`
        <div class="modal-backdrop" @click=${this.closeAddExpenseForm}>
          <div class="modal-content" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Everyday Expense</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="What did you spend on?"
                  .value=${this.newExpense.name}
                  @input=${(e) => this.handleInputChange(e, 'name')}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newExpense.amount}
                  @input=${(e) => this.handleInputChange(e, 'amount')}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${expenseCategories.map(category => html`
                    <div
                      class="category-item ${this.newExpense.category === category ? 'selected' : ''}"
                      @click=${() => this.selectCategory(category)}
                    >
                      <div class="category-icon">${this.getCategoryIcon(category)}</div>
                      <div class="category-name">${category}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Date input -->
              <div class="form-group">
                <label class="form-label">Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newExpense.date}
                  @input=${(e) => this.handleInputChange(e, 'date')}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.newExpense.paymentMethod || 'cash'}
                  @change=${(e) => this.handleInputChange(e, 'paymentMethod')}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards && this.creditCards.map(card => html`
                    <option value="card-${card.id}">${card.name} (••••${card.lastFourDigits})</option>
                  `)}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${this.closeAddExpenseForm}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${this.saveExpense}>
                Save
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Add credit card form -->
      ${this.showAddCardForm ? html`
        <div class="modal-backdrop" @click=${this.closeAddCardForm}>
          <div class="modal-content" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Credit Card</h3>
            </div>

            <div class="modal-body">
              <!-- Card name input -->
              <div class="form-group">
                <label class="form-label">Card Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Chase Sapphire"
                  .value=${this.newCreditCard.name}
                  @input=${(e) => this.handleCardInputChange(e, 'name')}
                />
              </div>

              <!-- Last 4 digits input -->
              <div class="form-group">
                <label class="form-label">Last 4 Digits</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="1234"
                  maxlength="4"
                  pattern="[0-9]{4}"
                  .value=${this.newCreditCard.lastFourDigits}
                  @input=${(e) => this.handleCardInputChange(e, 'lastFourDigits')}
                />
              </div>

              <!-- Credit limit input -->
              <div class="form-group">
                <label class="form-label">Credit Limit</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="5000.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.limit}
                  @input=${(e) => this.handleCardInputChange(e, 'limit')}
                />
              </div>

              <!-- Current balance input -->
              <div class="form-group">
                <label class="form-label">Current Balance</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.currentBalance}
                  @input=${(e) => this.handleCardInputChange(e, 'currentBalance')}
                />
              </div>

              <!-- APR input -->
              <div class="form-group">
                <label class="form-label">APR (%)</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="15.99"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.apr}
                  @input=${(e) => this.handleCardInputChange(e, 'apr')}
                />
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Payment Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newCreditCard.dueDate}
                  @input=${(e) => this.handleCardInputChange(e, 'dueDate')}
                />
              </div>

              <!-- Minimum payment input -->
              <div class="form-group">
                <label class="form-label">Minimum Payment</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="35.00"
                  min="0"
                  step="0.01"
                  .value=${this.newCreditCard.minimumPayment}
                  @input=${(e) => this.handleCardInputChange(e, 'minimumPayment')}
                />
              </div>

              <!-- Card color selection -->
              <div class="form-group">
                <label class="form-label">Card Color</label>
                <div class="color-options-container">
                  ${creditCardColors.map(color => html`
                    <div
                      class="color-option ${this.newCreditCard.color === color ? 'selected' : ''}"
                      style="background-color: ${color}"
                      @click=${() => this.selectCardColor(color)}
                    ></div>
                  `)}
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${this.closeAddCardForm}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${this.saveCard}>
                Save
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Add fixed expense form -->
      ${this.showAddFixedExpenseForm ? html`
        <div class="modal-backdrop" @click=${this.closeAddFixedExpenseForm}>
          <div class="modal-content" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Add Monthly Bill</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Rent, Netflix, Car Insurance"
                  .value=${this.newFixedExpense.name}
                  @input=${(e) => this.handleFixedExpenseInputChange(e, 'name')}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.newFixedExpense.amount}
                  @input=${(e) => this.handleFixedExpenseInputChange(e, 'amount')}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${fixedExpenseCategories.map(category => html`
                    <div
                      class="category-item ${this.newFixedExpense.category === category ? 'selected' : ''}"
                      @click=${() => this.selectFixedExpenseCategory(category)}
                    >
                      <div class="category-icon">${this.getFixedExpenseIcon(category)}</div>
                      <div class="category-name">${category}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.newFixedExpense.dueDate}
                  @input=${(e) => this.handleFixedExpenseInputChange(e, 'dueDate')}
                />
              </div>

              <!-- Recurrence frequency -->
              <div class="form-group">
                <label class="form-label">Recurrence</label>
                <select
                  class="form-input"
                  .value=${this.newFixedExpense.recurrenceFrequency}
                  @change=${(e) => this.handleFixedExpenseInputChange(e, 'recurrenceFrequency')}
                >
                  ${recurrenceFrequencies.map(frequency => html`
                    <option value=${frequency}>${frequency}</option>
                  `)}
                </select>
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.newFixedExpense.paymentMethod || 'cash'}
                  @change=${(e) => this.handleFixedExpenseInputChange(e, 'paymentMethod')}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards && this.creditCards.map(card => html`
                    <option value="card-${card.id}">${card.name} (••••${card.lastFourDigits})</option>
                  `)}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${() => this.closeAddFixedExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${() => this.saveFixedExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Edit fixed expense form -->
      ${this.showEditFixedExpenseForm && this.editingFixedExpense ? html`
        <div class="modal-backdrop" @click=${() => this.closeEditFixedExpenseForm()}>
          <div class="modal-content" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Edit Monthly Bill</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g., Rent, Netflix, Car Insurance"
                  .value=${this.editingFixedExpense.name}
                  @input=${(e) => this.handleEditFixedExpenseInputChange(e, 'name')}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.editingFixedExpense.amount}
                  @input=${(e) => this.handleEditFixedExpenseInputChange(e, 'amount')}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${fixedExpenseCategories.map(category => html`
                    <div
                      class="category-item ${this.editingFixedExpense.category === category ? 'selected' : ''}"
                      @click=${() => this.selectEditFixedExpenseCategory(category)}
                    >
                      <div class="category-icon">${this.getFixedExpenseIcon(category)}</div>
                      <div class="category-name">${category}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Due date input -->
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.editingFixedExpense.dueDate}
                  @input=${(e) => this.handleEditFixedExpenseInputChange(e, 'dueDate')}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.editingFixedExpense.paymentMethod || 'cash'}
                  @change=${(e) => this.handleEditFixedExpenseInputChange(e, 'paymentMethod')}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards && this.creditCards.map(card => {
                    const optionValue = `card-${card.id}`;
                    const isSelected = this.editingFixedExpense.paymentMethod === optionValue;
                    return html`
                      <option value="${optionValue}" ?selected=${isSelected}>${card.name} (••••${card.lastFourDigits})</option>
                    `;
                  })}
                </select>
              </div>

              <!-- Recurrence frequency -->
              <div class="form-group">
                <label class="form-label">Recurrence</label>
                <select
                  class="form-input"
                  .value=${this.editingFixedExpense.recurrenceFrequency}
                  @change=${(e) => this.handleEditFixedExpenseInputChange(e, 'recurrenceFrequency')}
                >
                  ${recurrenceFrequencies.map(frequency => html`
                    <option value=${frequency}>${frequency}</option>
                  `)}
                </select>
              </div>

              <!-- Paid status -->
              <div class="form-group">
                <label class="form-label">
                  <input
                    type="checkbox"
                    ?checked=${this.editingFixedExpense.isPaid}
                    @change=${(e) => this.handleEditFixedExpenseInputChange(e, 'isPaid', true)}
                  />
                  Paid
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${() => this.closeEditFixedExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${() => this.saveEditFixedExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Edit variable expense form -->
      ${this.showEditExpenseForm && this.editingExpense ? html`
        <div class="modal-backdrop" @click=${() => this.closeEditExpenseForm()}>
          <div class="modal-content" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h3 class="modal-title">Edit Everyday Expense</h3>
            </div>

            <div class="modal-body">
              <!-- Name input -->
              <div class="form-group">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="What did you spend on?"
                  .value=${this.editingExpense.name}
                  @input=${(e) => this.handleEditExpenseInputChange(e, 'name')}
                />
              </div>

              <!-- Amount input -->
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.editingExpense.amount}
                  @input=${(e) => this.handleEditExpenseInputChange(e, 'amount')}
                />
              </div>

              <!-- Category selection -->
              <div class="form-group">
                <label class="form-label">Category</label>
                <div class="category-grid">
                  ${expenseCategories.map(category => html`
                    <div
                      class="category-item ${this.editingExpense.category === category ? 'selected' : ''}"
                      @click=${() => this.selectEditExpenseCategory(category)}
                    >
                      <div class="category-icon">${this.getCategoryIcon(category)}</div>
                      <div class="category-name">${category}</div>
                    </div>
                  `)}
                </div>
              </div>

              <!-- Date input -->
              <div class="form-group">
                <label class="form-label">Date</label>
                <input
                  type="date"
                  class="form-input"
                  .value=${this.editingExpense.date}
                  @input=${(e) => this.handleEditExpenseInputChange(e, 'date')}
                />
              </div>

              <!-- Payment Method selection -->
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select
                  class="form-input"
                  .value=${this.editingExpense.paymentMethod || 'cash'}
                  @change=${(e) => this.handleEditExpenseInputChange(e, 'paymentMethod')}
                >
                  <option value="cash">Cash</option>
                  ${this.creditCards && this.creditCards.map(card => {
                    const optionValue = `card-${card.id}`;
                    const isSelected = this.editingExpense.paymentMethod === optionValue;
                    console.log(`Card option: ${optionValue}, Selected: ${isSelected}, Current value: ${this.editingExpense.paymentMethod}`);
                    return html`
                      <option value="${optionValue}" ?selected=${isSelected}>${card.name} (••••${card.lastFourDigits})</option>
                    `;
                  })}
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-button cancel-button" @click=${() => this.closeEditExpenseForm()}>
                Cancel
              </button>
              <button class="modal-button save-button" @click=${() => this.saveEditExpense()}>
                Save
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Delete confirmation dialog -->
      ${this.showDeleteConfirmation ? html`
        <div class="confirmation-dialog-backdrop" @click=${this.closeDeleteConfirmation}>
          <div class="confirmation-dialog" @click=${(e) => e.stopPropagation()}>
            <div class="confirmation-title">
              ${this.pendingDeleteType === 'fixed' ? 'Delete Monthly Bill' :
                this.pendingDeleteType === 'variable' ? 'Delete Everyday Expense' :
                this.pendingDeleteType === 'card' ? 'Delete Credit Card' :
                'Delete Payment'}
            </div>
            <div class="confirmation-message">
              ${this.pendingDeleteType === 'fixed' ? 'Are you sure you want to delete this monthly bill?' :
                this.pendingDeleteType === 'variable' ? 'Are you sure you want to delete this everyday expense?' :
                this.pendingDeleteType === 'card' ? 'Are you sure you want to delete this credit card? All payment history will also be deleted.' :
                'Are you sure you want to delete this payment? This will add the payment amount back to your card balance.'}
            </div>
            <div class="confirmation-buttons">
              <button class="confirmation-button delete-button" @click=${this.confirmDelete}>
                Delete
              </button>
              <button class="confirmation-button cancel-button" @click=${this.closeDeleteConfirmation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Credit Card Payment Modal -->
      <credit-card-payment-modal
        @payment-saved=${this.handlePaymentSaved}
      ></credit-card-payment-modal>

      <!-- Credit Card Edit Form -->
      <credit-card-edit-form
        @card-saved=${this.handleCardSaved}
      ></credit-card-edit-form>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        /* Notes app style modal */
        .notes-style-modal {
          background-color: white;
          background: white;
          border-radius: 14px;
          width: 270px;
          max-width: 90%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .notes-style-icon {
          margin: 20px auto 15px;
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes notes-style-animation {
          0% {
            transform: scale(1.2);
            opacity: 0;
          }
          45% {
            transform: scale(1.02);
            opacity: 1;
          }
          60% {
            transform: scale(0.98);
          }
          80% {
            transform: scale(1.01);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .notes-style-content {
          padding: 20px 16px 0;
        }

        .notes-style-title {
          font-size: 17px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #000;
          line-height: 1.3;
        }

        .notes-style-message {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.4;
          font-weight: 400;
        }

        .notes-style-buttons {
          display: flex;
          flex-direction: row;
          border-top: 0.5px solid rgba(0, 0, 0, 0.15);
          margin-top: 5px;
        }

        .notes-style-button {
          font-size: 17px;
          padding: 0;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s;
          -webkit-tap-highlight-color: transparent;
          margin: 0;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          border-radius: 0;
          background: none;
        }

        .notes-style-cancel {
          color: #007AFF;
          font-weight: 400;
          border-bottom-left-radius: 14px;
          border-right: 0.5px solid rgba(0, 0, 0, 0.15);
        }

        .notes-style-delete {
          color: #FF3B30;
          font-weight: 500;
          border-bottom-right-radius: 14px;
        }

        .notes-style-button:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `
    ];
  }
}

customElements.define('spend-view-new', SpendViewNew);
