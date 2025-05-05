/**
 * Test Fixed Expenses View
 * A simple component to test fixed expenses functionality
 */

import { LitElement, html, css } from 'lit';
import {
  addFixedExpense,
  getFixedExpenses,
  clearFixedExpenses,
  toggleFixedExpensePaid
} from '../js/fixed-expenses-manager.js';
import { formatCurrency } from '../js/helpers.js';

export class TestFixedExpensesView extends LitElement {
  static properties = {
    expenses: { type: Array },
    isLoading: { type: Boolean },
    showForm: { type: Boolean },
    newExpense: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      color: #007aff;
    }

    .button-container {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }

    button.danger {
      background-color: #ff3b30;
    }

    .expense-list {
      margin-top: 16px;
    }

    .expense-item {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
    }

    .expense-name {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .expense-details {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #8e8e93;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }

    form {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #c7c7cc;
      font-size: 16px;
    }

    input[type="checkbox"] {
      width: auto;
      margin-right: 8px;
    }

    button[type="submit"] {
      background-color: #34c759;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.expenses = [];
    this.isLoading = false;
    this.showForm = false;
    this.newExpense = {
      name: '',
      amount: '',
      category: 'Housing',
      dueDate: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadExpenses();
  }

  loadExpenses() {
    this.isLoading = true;
    this.expenses = getFixedExpenses();
    this.isLoading = false;
  }

  handleAddTestExpense() {
    this.isLoading = true;

    // Create a test fixed expense
    const testExpense = {
      name: 'Test Rent',
      amount: 1000,
      category: 'Housing',
      dueDate: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true
    };

    // Add the expense
    addFixedExpense(testExpense);

    // Reload expenses
    this.loadExpenses();
    this.isLoading = false;
  }

  handleClearExpenses() {
    this.isLoading = true;
    clearFixedExpenses();
    this.loadExpenses();
    this.isLoading = false;
  }

  handleTogglePaid(id) {
    toggleFixedExpensePaid(id);
    this.loadExpenses();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  handleInputChange(e, field) {
    this.newExpense = {
      ...this.newExpense,
      [field]: e.target.value
    };
  }

  handleCheckboxChange(e, field) {
    this.newExpense = {
      ...this.newExpense,
      [field]: e.target.checked
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!this.newExpense.name || !this.newExpense.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Add the expense
    addFixedExpense({
      ...this.newExpense,
      amount: parseFloat(this.newExpense.amount)
    });

    // Reset form
    this.newExpense = {
      name: '',
      amount: '',
      category: 'Housing',
      dueDate: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 'Monthly',
      isPaid: false,
      isActive: true
    };

    // Close form
    this.showForm = false;

    // Reload expenses
    this.loadExpenses();
  }

  render() {
    return html`
      <div class="container">
        <h2>Fixed Expenses Test</h2>

        <div class="button-container">
          <button @click=${this.handleAddTestExpense}>Add Test Expense</button>
          <button @click=${this.toggleForm}>${this.showForm ? 'Cancel' : 'Add Custom Expense'}</button>
          <button @click=${this.loadExpenses}>Refresh</button>
          <button class="danger" @click=${this.handleClearExpenses}>Clear All</button>
        </div>

        ${this.showForm ? html`
          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label>Name:</label>
              <input
                type="text"
                .value=${this.newExpense.name}
                @input=${(e) => this.handleInputChange(e, 'name')}
                required
              />
            </div>

            <div class="form-group">
              <label>Amount:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                .value=${this.newExpense.amount}
                @input=${(e) => this.handleInputChange(e, 'amount')}
                required
              />
            </div>

            <div class="form-group">
              <label>Category:</label>
              <select
                .value=${this.newExpense.category}
                @change=${(e) => this.handleInputChange(e, 'category')}
              >
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Insurance">Insurance</option>
                <option value="Loans">Loans</option>
                <option value="Memberships">Memberships</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                .value=${this.newExpense.dueDate}
                @input=${(e) => this.handleInputChange(e, 'dueDate')}
                required
              />
            </div>

            <div class="form-group">
              <label>Recurrence:</label>
              <select
                .value=${this.newExpense.recurrenceFrequency}
                @change=${(e) => this.handleInputChange(e, 'recurrenceFrequency')}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div class="form-group">
              <label>
                <input
                  type="checkbox"
                  ?checked=${this.newExpense.isPaid}
                  @change=${(e) => this.handleCheckboxChange(e, 'isPaid')}
                />
                Paid
              </label>
            </div>

            <div class="form-group">
              <button type="submit">Save Expense</button>
            </div>
          </form>
        ` : ''}

        ${this.isLoading ? html`
          <div class="loading">Loading...</div>
        ` : html`
          <div>
            <p>Total expenses: ${this.expenses.length}</p>

            <div class="expense-list">
              ${this.expenses.length === 0 ? html`
                <p>No fixed expenses found.</p>
              ` : html`
                ${this.expenses.map(expense => html`
                  <div class="expense-item">
                    <div class="expense-name">${expense.name}</div>
                    <div class="expense-details">
                      <span>${expense.category}</span>
                      <span>${formatCurrency(expense.amount, 'USD')}</span>
                    </div>
                    <div class="expense-details">
                      <span>Due: ${expense.dueDate}</span>
                      <span>
                        Paid: ${expense.isPaid ? 'Yes' : 'No'}
                        <button @click=${() => this.handleTogglePaid(expense.id)}>
                          ${expense.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                        </button>
                      </span>
                    </div>
                  </div>
                `)}
              `}
            </div>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('test-fixed-expenses-view', TestFixedExpensesView);
