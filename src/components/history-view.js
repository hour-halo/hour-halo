/**
 * History View Component
 * Displays a chronological record of all transactions
 */
import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../js/helpers.js';
import {
  getTransactionHistory,
  filterTransactions,
  searchTransactions,
  groupTransactionsByDate,
  calculateTransactionStats
} from '../js/history-manager.js';
import { exportTransactionsToCSV } from '../js/export-manager.js';
import { clearSamplePayments } from '../js/clear-sample-data.js';

export class HistoryView extends LitElement {
  static properties = {
    transactions: { type: Array },
    groupedTransactions: { type: Array },
    isLoading: { type: Boolean },
    dateRange: { type: Object },
    searchQuery: { type: String },
    activeFilter: { type: String },
    summaryStats: { type: Object },
    showDetailModal: { type: Boolean },
    selectedTransaction: { type: Object },
    activeDateRange: { type: String },
    isClearing: { type: Boolean },
    showClearConfirmation: { type: Boolean }
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

    .header {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
    }

    .export-button {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background-color: #f2f2f7;
      border-radius: 16px;
      font-size: 14px;
      color: #007aff;
      cursor: pointer;
    }

    .export-button svg {
      margin-right: 4px;
      color: #007aff;
    }

    .export-button:hover {
      background-color: #e5e5ea;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 10px;
      padding: 8px 12px;
      margin-bottom: 16px;
    }

    .search-icon {
      color: #8e8e93;
      margin-right: 8px;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 16px;
      color: #000000;
      outline: none;
    }

    .filter-bar {
      display: flex;
      overflow-x: auto;
      margin-bottom: 16px;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }

    .filter-option {
      flex: 0 0 auto;
      padding: 8px 16px;
      margin-right: 8px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 16px;
      font-size: 14px;
      color: #8e8e93;
      white-space: nowrap;
    }

    .filter-option.active {
      background-color: #007aff;
      color: white;
    }

    .date-range-selector {
      margin-bottom: 16px;
    }

    .date-range-title {
      font-size: 14px;
      font-weight: 600;
      color: #8e8e93;
      margin-bottom: 8px;
    }

    .date-range-options {
      display: flex;
      overflow-x: auto;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }

    .date-range-option {
      flex: 0 0 auto;
      padding: 8px 16px;
      margin-right: 8px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 16px;
      font-size: 14px;
      color: #8e8e93;
      white-space: nowrap;
      cursor: pointer;
    }

    .date-range-option.active {
      background-color: #007aff;
      color: white;
    }

    /* Modal styles */
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

    .modal-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-end;
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

    /* Transaction detail styles */
    .detail-icon {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background-color: rgba(142, 142, 147, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 24px;
    }

    .detail-amount {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
    }

    .detail-description {
      font-size: 18px;
      text-align: center;
      margin-bottom: 24px;
      color: #000000;
    }

    .detail-section {
      background-color: #f2f2f7;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-size: 15px;
      color: #8e8e93;
    }

    .detail-value {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      text-align: right;
    }

    .detail-value.notes {
      white-space: pre-wrap;
      text-align: left;
      margin-top: 8px;
      font-weight: normal;
    }

    .summary-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .summary-title {
      font-size: 14px;
      font-weight: 600;
      color: #8e8e93;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .summary-label {
      font-size: 15px;
      color: #000000;
    }

    .summary-value {
      font-size: 15px;
      font-weight: 600;
    }

    .summary-value.positive {
      color: #34c759;
    }

    .summary-value.negative {
      color: #ff3b30;
    }

    .date-header {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      margin: 16px 0 8px 0;
    }

    .transaction-item {
      background-color: #ffffff;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .transaction-item {
      display: flex;
      align-items: center;
    }

    .transaction-icon {
      width: 36px;
      height: 36px;
      border-radius: 18px;
      background-color: rgba(142, 142, 147, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-size: 18px;
    }

    .transaction-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .transaction-description {
      font-size: 15px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 4px;
    }

    .transaction-category {
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

    .transaction-amount {
      font-size: 15px;
      font-weight: 600;
      margin-left: 12px;
    }

    .transaction-amount.income {
      color: #34c759;
    }

    .transaction-amount.expense {
      color: #ff3b30;
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
  `;

  constructor() {
    super();
    this.transactions = [];
    this.groupedTransactions = [];
    this.isLoading = true;

    // Calculate future date (1 year from now)
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    this.dateRange = {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      endDate: futureDate.toISOString().split('T')[0] // 1 year in the future
    };

    this.searchQuery = '';
    this.activeFilter = 'all';
    this.activeDateRange = 'month';
    this.summaryStats = {
      totalIncome: 0,
      totalExpenses: 0,
      netBalance: 0
    };
    this.showDetailModal = false;
    this.selectedTransaction = null;
    this.isClearing = false;
    this.showClearConfirmation = false;

    // Set initial date range
    this.handleDateRangeChange('month');
  }

  connectedCallback() {
    super.connectedCallback();

    // Set up event listeners for data changes
    this.setupEventListeners();

    // Load transactions
    this.loadTransactions();
  }

  setupEventListeners() {
    // Listen for database changes
    window.addEventListener('hour-halo-data-changed', (event) => {
      console.log('HISTORY TAB: Data change detected:', event.detail);
      this.loadTransactions();
    });

    // Listen for tab changes to refresh data when History tab is selected
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#history') {
        console.log('HISTORY TAB: Tab selected, refreshing data');
        // Force a complete reload of transactions when the tab is selected
        setTimeout(() => {
          this.loadTransactions();
        }, 100);
      }
    });

    // Also check if we're already on the history tab when the component is created
    if (window.location.hash === '#history') {
      console.log('HISTORY TAB: Already on history tab, loading data');
      setTimeout(() => {
        this.loadTransactions();
      }, 100);
    }

    // Add keyboard shortcut for developers to clear sample data (Ctrl+Shift+C)
    window.addEventListener('keydown', (event) => {
      // Check if we're on the history tab
      if (window.location.hash === '#history') {
        // Check for Ctrl+Shift+C (or Cmd+Shift+C on Mac)
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
          console.log('Developer shortcut detected: Clearing sample data');
          this.showClearSampleDataConfirmation();
          event.preventDefault();
        }
      }
    });
  }

  async loadTransactions() {
    this.isLoading = true;
    console.log('HISTORY TAB: Loading transactions...');
    console.log('HISTORY TAB: Date range:', this.dateRange);

    try {
      // Get transaction history directly from the history manager
      const transactions = await getTransactionHistory({
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate,
        types: ['hour', 'tips', 'payment', 'expense', 'bill', 'card-payment']
      });

      console.log('HISTORY TAB: Loaded transactions:', transactions.length);

      // Log income transactions for debugging
      const incomeTransactions = transactions.filter(t => t.isIncome);
      console.log(`HISTORY TAB: Income transactions (${incomeTransactions.length}):`);
      incomeTransactions.forEach(t => {
        console.log(`  - ${t.date}: ${t.description} - ${t.amount}`);
      });

      // Count transactions by type
      const transactionsByType = transactions.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + 1;
        return acc;
      }, {});
      console.log('HISTORY TAB: Transactions by type:', transactionsByType);

      this.transactions = transactions;

      // Apply active filter
      this.applyFilters();

      // Calculate summary statistics
      this.summaryStats = calculateTransactionStats(this.transactions);

      console.log('HISTORY TAB: Grouped transactions count:', this.groupedTransactions.length);

      // Log grouped transactions for debugging
      this.groupedTransactions.forEach(group => {
        console.log(`Group for date ${group.date}: ${group.transactions.length} transactions`);
      });

      // Dispatch an event to notify that history data has been loaded
      window.dispatchEvent(new CustomEvent('history-data-loaded', {
        detail: {
          count: transactions.length,
          dateRange: this.dateRange
        }
      }));
    } catch (error) {
      console.error('HISTORY TAB: Error loading transactions:', error);
      this.transactions = [];
      this.groupedTransactions = [];
    } finally {
      this.isLoading = false;
      this.requestUpdate();
    }
  }

  applyFilters() {
    let filteredTransactions = [...this.transactions];

    // Apply type filter
    if (this.activeFilter !== 'all') {
      const filterMap = {
        'income': { isIncome: true },
        'expenses': { isIncome: false },
        'hours': { types: ['hour'] },
        'tips': { types: ['tips'] },
        'payments': { types: ['payment'] },
        'bills': { types: ['bill'] }
      };

      console.log('Applying filter:', this.activeFilter, filterMap[this.activeFilter]);

      filteredTransactions = filterTransactions(
        filteredTransactions,
        filterMap[this.activeFilter] || {}
      );
    }

    // Apply search query
    if (this.searchQuery) {
      filteredTransactions = searchTransactions(filteredTransactions, this.searchQuery);
    }

    // Group by date
    this.groupedTransactions = groupTransactionsByDate(filteredTransactions);
  }

  handleFilterChange(filter) {
    console.log('Changing filter to:', filter);
    this.activeFilter = filter;
    this.applyFilters();
    this.requestUpdate();
  }

  handleSearchInput(e) {
    console.log('Search query:', e.target.value);
    this.searchQuery = e.target.value;
    this.applyFilters();
    this.requestUpdate();
  }

  handleDateRangeChange(range) {
    console.log('Setting active date range to:', range);
    this.activeDateRange = range;

    // Get current date
    const today = new Date();

    // Calculate future date (1 year from now)
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    switch(range) {
      case 'week':
        // Last 7 days + future
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        this.dateRange = {
          startDate: weekAgo.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
      case 'month':
        // Last 30 days + future
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        this.dateRange = {
          startDate: monthAgo.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
      case 'quarter':
        // Last 90 days + future
        const quarterAgo = new Date();
        quarterAgo.setDate(quarterAgo.getDate() - 90);
        this.dateRange = {
          startDate: quarterAgo.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
      case 'year':
        // Last 365 days + future
        const yearAgo = new Date();
        yearAgo.setDate(yearAgo.getDate() - 365);
        this.dateRange = {
          startDate: yearAgo.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
      case 'future':
        // Only future transactions
        this.dateRange = {
          startDate: today.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
      case 'all':
        // All transactions (past and future)
        const allPastDate = new Date(2020, 0, 1); // Start from Jan 1, 2020
        this.dateRange = {
          startDate: allPastDate.toISOString().split('T')[0],
          endDate: futureDateStr
        };
        break;
    }

    console.log('Date range set to:', this.dateRange);
    this.requestUpdate();
    this.loadTransactions();
  }

  openTransactionDetail(transaction) {
    this.selectedTransaction = transaction;
    this.showDetailModal = true;
  }

  closeTransactionDetail() {
    this.showDetailModal = false;
    this.selectedTransaction = null;
  }

  exportTransactions() {
    // Get the current filtered transactions
    let transactionsToExport = [];

    // If we have grouped transactions, flatten them
    if (this.groupedTransactions && this.groupedTransactions.length) {
      this.groupedTransactions.forEach(group => {
        if (group.transactions && group.transactions.length) {
          transactionsToExport = [...transactionsToExport, ...group.transactions];
        }
      });
    } else {
      // Otherwise use the full transaction list
      transactionsToExport = this.transactions;
    }

    if (!transactionsToExport.length) {
      // Show a message if there are no transactions to export
      alert('No transactions to export');
      return;
    }

    // Generate filename with date range
    const startDate = new Date(this.dateRange.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = new Date(this.dateRange.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const filename = `hour-halo-transactions-${startDate}-to-${endDate}.csv`;

    // Export to CSV
    exportTransactionsToCSV(transactionsToExport, filename);
  }

  showClearSampleDataConfirmation() {
    this.showClearConfirmation = true;
    this.requestUpdate();
  }

  cancelClearSampleData() {
    this.showClearConfirmation = false;
    this.requestUpdate();
  }

  /**
   * Clear sample data from the database
   * This is a developer feature that can be triggered with Ctrl+Shift+C (or Cmd+Shift+C on Mac)
   * when on the History tab
   */
  async clearSampleData() {
    this.isClearing = true;
    this.showClearConfirmation = false;
    this.requestUpdate();

    try {
      // Clear sample payments
      await clearSamplePayments();

      // Reload transactions
      await this.loadTransactions();

      console.log('Sample data cleared successfully');
    } catch (error) {
      console.error('Error clearing sample data:', error);
    } finally {
      this.isClearing = false;
      this.requestUpdate();
    }
  }

  formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getTransactionIcon(transaction) {
    // Check if it's a card payment with a color
    if (transaction.type === 'card-payment' && transaction.details && transaction.details.color) {
      return html`<span class="icon card-payment-icon" style="color: ${transaction.details.color}">💳</span>`;
    }

    // Default icons for each transaction type
    const iconMap = {
      'hour': '⏱️',
      'tips': '💸',
      'payment': '💰',
      'expense': '🛒',
      'bill': '📝',
      'card-payment': '💳'
    };

    return html`<span class="icon ${transaction.type}-icon">${iconMap[transaction.type] || '📋'}</span>`;
  }

  getTransactionTypeName(type) {
    const typeMap = {
      'hour': 'Hours Worked',
      'tips': 'Tips Earned',
      'payment': 'Payment Received',
      'expense': 'Expense',
      'bill': 'Monthly Bill',
      'card-payment': 'Credit Card Payment'
    };

    return typeMap[type] || 'Transaction';
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="ios-spinner"></div>
          <span>Loading transactions...</span>
        </div>
      `;
    }

    return html`
      <div class="container">
        <!-- Transaction Detail Modal -->
        ${this.showDetailModal && this.selectedTransaction ? html`
          <div class="modal-backdrop" @click=${this.closeTransactionDetail}>
            <div class="modal-content" @click=${(e) => e.stopPropagation()}>
              <div class="modal-header">
                <h3 class="modal-title">Transaction Details</h3>
              </div>
              <div class="modal-body">
                <div class="detail-icon">
                  ${this.getTransactionIcon(this.selectedTransaction)}
                </div>
                <div class="detail-amount ${this.selectedTransaction.isIncome ? 'income' : 'expense'}">
                  ${this.selectedTransaction.isIncome ? '+' : '-'}${formatCurrency(this.selectedTransaction.amount || 0)}
                </div>
                <div class="detail-description">
                  ${this.selectedTransaction.description}
                </div>

                <div class="detail-section">
                  <div class="detail-row">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${this.formatDate(this.selectedTransaction.date)}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Category</div>
                    <div class="detail-value">${this.selectedTransaction.category}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Type</div>
                    <div class="detail-value">${this.getTransactionTypeName(this.selectedTransaction.type)}</div>
                  </div>
                  ${this.selectedTransaction.details && this.selectedTransaction.details.paymentMethod ? html`
                    <div class="detail-row">
                      <div class="detail-label">Payment Method</div>
                      <div class="detail-value">
                        ${this.selectedTransaction.details.paymentMethod.startsWith('card-') ?
                          html`💳 ${this.selectedTransaction.details.cardName || 'Credit Card'} ${this.selectedTransaction.details.lastFourDigits ? `(${this.selectedTransaction.details.lastFourDigits})` : ''}` :
                          this.selectedTransaction.details.paymentMethod === 'cash' ?
                          '💵 Cash' :
                          this.selectedTransaction.details.paymentMethod === 'bank' ?
                          '🏦 Bank Transfer' : this.selectedTransaction.details.paymentMethod}
                      </div>
                    </div>
                  ` : ''}
                  ${this.selectedTransaction.details && this.selectedTransaction.details.hours ? html`
                    <div class="detail-row">
                      <div class="detail-label">Hours Worked</div>
                      <div class="detail-value">${this.selectedTransaction.details.hours}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">Hourly Rate</div>
                      <div class="detail-value">${formatCurrency(this.selectedTransaction.details.rate || 0)}</div>
                    </div>
                  ` : ''}
                  ${this.selectedTransaction.type === 'card-payment' && this.selectedTransaction.details && this.selectedTransaction.details.paymentType ? html`
                    <div class="detail-row">
                      <div class="detail-label">Payment Type</div>
                      <div class="detail-value">${this.selectedTransaction.details.paymentType}</div>
                    </div>
                  ` : ''}

                  ${this.selectedTransaction.details && this.selectedTransaction.details.isPaid !== undefined ? html`
                    <div class="detail-row">
                      <div class="detail-label">Payment Status</div>
                      <div class="detail-value">${this.selectedTransaction.details.isPaid ? '✅ Paid' : '⏳ Pending'}</div>
                    </div>
                  ` : ''}

                  ${this.selectedTransaction.details && this.selectedTransaction.details.recurrenceFrequency ? html`
                    <div class="detail-row">
                      <div class="detail-label">Recurrence</div>
                      <div class="detail-value">${this.selectedTransaction.details.recurrenceFrequency}</div>
                    </div>
                  ` : ''}

                  ${this.selectedTransaction.details && this.selectedTransaction.details.notes ? html`
                    <div class="detail-row">
                      <div class="detail-label">Notes</div>
                      <div class="detail-value notes">${this.selectedTransaction.details.notes}</div>
                    </div>
                  ` : ''}
                </div>
              </div>
              <div class="modal-footer">
                <button class="modal-button cancel-button" @click=${this.closeTransactionDetail}>
                  Close
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="header">
          <div class="title">History</div>
          <div style="display: flex; gap: 8px;">
            <!-- Clear Sample button hidden for regular users, but kept in code for developers -->
            <!-- Uncomment the following div to enable the Clear Sample button when needed
            <div class="export-button" @click=${this.showClearSampleDataConfirmation}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              <span>Clear Sample</span>
            </div>
            -->
            <div class="export-button" @click=${this.exportTransactions}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Export</span>
            </div>
          </div>
        </div>

        <!-- Clear Sample Data Confirmation Dialog -->
        ${this.showClearConfirmation ? html`
          <div class="modal-backdrop" @click=${this.cancelClearSampleData}>
            <div class="modal-content" @click=${(e) => e.stopPropagation()}>
              <div class="modal-header">
                <h3 class="modal-title">Clear Sample Data</h3>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to clear the sample payment data?</p>
                <p>This will remove the following sample payments:</p>
                <ul>
                  <li>Payment for Monday shift ($80.00)</li>
                  <li>Payment for last week ($150.00)</li>
                </ul>
              </div>
              <div class="modal-footer">
                <button class="modal-button cancel-button" @click=${this.cancelClearSampleData}>
                  Cancel
                </button>
                <button class="modal-button" style="color: #ff3b30;" @click=${this.clearSampleData}>
                  ${this.isClearing ? html`
                    <span class="ios-spinner"></span>
                    Clearing...
                  ` : 'Clear Sample Data'}
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Search Bar -->
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input
            type="text"
            class="search-input"
            placeholder="Search transactions"
            .value=${this.searchQuery}
            @input=${this.handleSearchInput}
          >
        </div>

        <!-- Date Range Selector -->
        <div class="date-range-selector">
          <div class="date-range-title">Time Period</div>
          <div class="date-range-options">
            <div
              class="date-range-option ${this.activeDateRange === 'week' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('week')}
            >
              Last 7 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange === 'month' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('month')}
            >
              Last 30 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange === 'quarter' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('quarter')}
            >
              Last 90 Days
            </div>
            <div
              class="date-range-option ${this.activeDateRange === 'year' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('year')}
            >
              Last Year
            </div>
            <div
              class="date-range-option ${this.activeDateRange === 'future' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('future')}
            >
              Upcoming
            </div>
            <div
              class="date-range-option ${this.activeDateRange === 'all' ? 'active' : ''}"
              @click=${() => this.handleDateRangeChange('all')}
            >
              All Time
            </div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <div
            class="filter-option ${this.activeFilter === 'all' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('all')}
          >
            All
          </div>
          <div
            class="filter-option ${this.activeFilter === 'income' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('income')}
          >
            Income
          </div>
          <div
            class="filter-option ${this.activeFilter === 'expenses' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('expenses')}
          >
            Expenses
          </div>
          <div
            class="filter-option ${this.activeFilter === 'hours' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('hours')}
          >
            Hours
          </div>
          <div
            class="filter-option ${this.activeFilter === 'tips' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('tips')}
          >
            Tips
          </div>
          <div
            class="filter-option ${this.activeFilter === 'payments' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('payments')}
          >
            Payments
          </div>
          <div
            class="filter-option ${this.activeFilter === 'bills' ? 'active' : ''}"
            @click=${() => this.handleFilterChange('bills')}
          >
            Bills
          </div>
        </div>

        <!-- Summary Card -->
        <div class="summary-card">
          <div class="summary-title">Summary</div>
          <div class="summary-row">
            <div class="summary-label">Income</div>
            <div class="summary-value positive">
              ${formatCurrency(this.summaryStats.totalIncome || 0)}
            </div>
          </div>
          <div class="summary-row">
            <div class="summary-label">Expenses</div>
            <div class="summary-value negative">
              ${formatCurrency(this.summaryStats.totalExpenses || 0)}
            </div>
          </div>
          <div class="summary-row">
            <div class="summary-label">Net Balance</div>
            <div class="summary-value ${this.summaryStats.netBalance >= 0 ? 'positive' : 'negative'}">
              ${formatCurrency(this.summaryStats.netBalance || 0)}
            </div>
          </div>
        </div>

        <!-- Transaction List -->
        ${this.groupedTransactions.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div>No transactions found</div>
            <div>Try adjusting your filters or search query</div>
          </div>
        ` : html`
          ${this.groupedTransactions.map(group => html`
            <div class="date-header">
              ${this.formatDate(group.date)}
            </div>
            ${group.transactions.map(transaction => html`
              <div class="transaction-item" @click=${() => this.openTransactionDetail(transaction)}>
                <div class="transaction-icon">
                  ${this.getTransactionIcon(transaction)}
                </div>
                <div class="transaction-info">
                  <div class="transaction-description">
                    ${transaction.description}
                  </div>
                  <div class="transaction-category">
                    ${transaction.category}
                    ${transaction.details && transaction.details.paymentMethod && transaction.details.paymentMethod.startsWith('card-') ? html`
                      <span class="payment-method">
                        💳 Card
                      </span>
                    ` : transaction.details && transaction.details.paymentMethod === 'cash' ? html`
                      <span class="payment-method">
                        💵 Cash
                      </span>
                    ` : ''}
                  </div>
                </div>
                <div class="transaction-amount ${transaction.isIncome ? 'income' : 'expense'}">
                  ${transaction.isIncome ? '+' : '-'}${formatCurrency(transaction.amount || 0)}
                </div>
              </div>
            `)}
          `)}
        `}
      </div>
    `;
  }
}

customElements.define('history-view', HistoryView);
