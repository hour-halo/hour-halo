/**
 * Expense Form Component
 * Modal form for adding and editing expenses
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../../js/helpers.js';
import { expenseCategories } from '../../db/schema.js';

export class ExpenseForm extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    expense: { type: Object },
    isEditing: { type: Boolean },
    settings: { type: Object },
    weekId: { type: String },
    monthId: { type: String },
  };

  static styles = css`
    :host {
      display: block;
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
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .form-input:focus {
      outline: none;
      border-color: #007aff;
    }

    .amount-input {
      position: relative;
    }

    .currency-symbol {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #8e8e93;
      font-size: 16px;
      pointer-events: none;
    }

    .amount-input input {
      padding-left: 28px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 16px;
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
      transition: all 0.2s ease;
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
      color: #000000;
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

    .save-button {
      color: #007aff;
    }

    .delete-button {
      color: #ff3b30;
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
    this.isEditing = false;

    // Get today's date in YYYY-MM-DD format using local timezone
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${year}-${month}-${day}`;
    console.log(`Expense form initialized with local date: ${todayFormatted}`);

    this.expense = {
      name: '',
      amount: '',
      category: '',
      date: todayFormatted,
      notes: '',
      paymentMethod: 'cash',
      isRecurring: false
    };
    this.settings = {
      currency: 'USD'
    };
    this.weekId = '';
    this.monthId = '';
  }

  open(expense = null, weekId = '', monthId = '') {
    this.weekId = weekId;
    this.monthId = monthId;

    if (expense) {
      // When editing an existing expense, ensure the date is properly formatted
      let formattedExpense = { ...expense };

      // Format the date if it exists
      if (formattedExpense.date) {
        // If it's a Date object, convert to string using local timezone
        if (formattedExpense.date instanceof Date) {
          const year = formattedExpense.date.getFullYear();
          const month = String(formattedExpense.date.getMonth() + 1).padStart(2, '0');
          const day = String(formattedExpense.date.getDate()).padStart(2, '0');
          formattedExpense.date = `${year}-${month}-${day}`;
          console.log(`Editing: Converted date object to local string: ${formattedExpense.date}`);
        }

        // If it has a time component, strip it
        if (formattedExpense.date.includes('T')) {
          formattedExpense.date = formattedExpense.date.split('T')[0];
          console.log(`Editing: Stripped time component: ${formattedExpense.date}`);
        }

        // Validate the date format
        if (!formattedExpense.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          console.warn(`Invalid date format when editing: ${formattedExpense.date}, using today's date`);
          // Use local timezone for today's date
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          formattedExpense.date = `${year}-${month}-${day}`;
          console.log(`Editing: Using default local date: ${formattedExpense.date}`);
        }
      } else {
        // If no date, use today with local timezone
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        formattedExpense.date = `${year}-${month}-${day}`;
        console.log(`Editing: No date provided, using today: ${formattedExpense.date}`);
      }

      console.log(`Editing expense with date: ${formattedExpense.date}`);
      this.expense = formattedExpense;
      this.isEditing = true;
    } else {
      // Get today's date in YYYY-MM-DD format using local timezone
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayFormatted = `${year}-${month}-${day}`;
      console.log(`New expense with local date: ${todayFormatted}`);

      this.expense = {
        name: '',
        amount: '',
        category: '',
        date: todayFormatted,
        notes: '',
        paymentMethod: 'cash',
        isRecurring: false
      };
      this.isEditing = false;
    }

    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  handleInputChange(e, field) {
    // Special handling for date field
    if (field === 'date') {
      // Ensure date is in YYYY-MM-DD format
      let dateValue = e.target.value;

      // Validate the date format
      if (dateValue && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        console.log(`Date input changed to: ${dateValue}`);

        // Store the date as is - it's already in YYYY-MM-DD format
        // This preserves the exact date the user selected without timezone conversion
        this.expense = {
          ...this.expense,
          [field]: dateValue
        };

        console.log(`Stored expense date as: ${this.expense.date}`);
      } else {
        console.warn(`Invalid date format entered: ${dateValue}`);
        // If invalid, don't update
        return;
      }
    } else {
      // Normal handling for other fields
      this.expense = {
        ...this.expense,
        [field]: e.target.value
      };
    }
  }

  selectCategory(category) {
    this.expense = {
      ...this.expense,
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

  handleSave() {
    // Validate form
    if (!this.expense.amount || !this.expense.category || !this.expense.date) {
      // Show error
      return;
    }

    // Ensure date is in YYYY-MM-DD format with proper timezone handling
    let formattedDate = this.expense.date;

    // If it's a Date object, convert to string using local timezone
    if (formattedDate instanceof Date) {
      // Use local timezone instead of UTC
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
      console.log(`Converted date object to local string: ${formattedDate}`);
    }

    // If it has a time component, strip it
    if (formattedDate && formattedDate.includes('T')) {
      formattedDate = formattedDate.split('T')[0];
      console.log(`Stripped time component: ${formattedDate}`);
    }

    // Validate the date format
    if (!formattedDate || !formattedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      console.warn(`Invalid date format: ${formattedDate}, using today's date`);
      // Use local timezone for today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
      console.log(`Using default local date: ${formattedDate}`);
    }

    console.log(`Expense form - Original date: ${this.expense.date}, Formatted date: ${formattedDate}`);

    // Create expense object
    const expenseData = {
      ...this.expense,
      date: formattedDate, // Use the properly formatted date
      amount: parseFloat(this.expense.amount),
      weekId: this.weekId,
      monthId: this.monthId,
      createdAt: new Date().toISOString()
    };

    // Dispatch save event
    const event = new CustomEvent('save-expense', {
      detail: {
        expense: expenseData,
        isEditing: this.isEditing
      }
    });

    this.dispatchEvent(event);

    // Notify other components that data has changed
    window.dispatchEvent(new CustomEvent('hour-halo-data-changed', {
      detail: {
        type: this.isEditing ? 'expense-updated' : 'expense-added',
        expense: expenseData
      }
    }));

    this.close();
  }

  handleDelete() {
    if (!this.isEditing) return;

    // Dispatch delete event
    const event = new CustomEvent('delete-expense', {
      detail: {
        expense: this.expense
      }
    });

    this.dispatchEvent(event);

    // Notify other components that data has changed
    window.dispatchEvent(new CustomEvent('hour-halo-data-changed', {
      detail: {
        type: 'expense-deleted',
        expense: this.expense
      }
    }));

    this.close();
  }

  render() {
    if (!this.isOpen) return null;

    return html`
      <div class="modal-backdrop" @click=${this.close}>
        <div class="modal-content" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">
              ${this.isEditing ? 'Edit Expense' : 'Add Expense'}
            </h3>
          </div>

          <div class="modal-body">
            <!-- Name input -->
            <div class="form-group">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="What did you spend on?"
                .value=${this.expense.name}
                @input=${(e) => this.handleInputChange(e, 'name')}
              />
            </div>

            <!-- Amount input -->
            <div class="form-group">
              <label class="form-label">Amount</label>
              <div class="amount-input">
                <span class="currency-symbol">
                  ${this.settings.currency === 'USD' ? '$' : this.settings.currency}
                </span>
                <input
                  type="number"
                  class="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  .value=${this.expense.amount}
                  @input=${(e) => this.handleInputChange(e, 'amount')}
                />
              </div>
            </div>

            <!-- Category selection -->
            <div class="form-group">
              <label class="form-label">Category</label>
              <div class="category-grid">
                ${expenseCategories.map(category => html`
                  <div
                    class="category-item ${this.expense.category === category ? 'selected' : ''}"
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
                .value=${this.expense.date}
                @input=${(e) => this.handleInputChange(e, 'date')}
              />
            </div>

            <!-- Notes input -->
            <div class="form-group">
              <label class="form-label">Notes (optional)</label>
              <textarea
                class="form-input"
                rows="3"
                placeholder="Add any additional details"
                .value=${this.expense.notes}
                @input=${(e) => this.handleInputChange(e, 'notes')}
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-button cancel-button" @click=${this.close}>
              Cancel
            </button>

            ${this.isEditing ? html`
              <button class="modal-button delete-button" @click=${this.handleDelete}>
                Delete
              </button>
            ` : ''}

            <button class="modal-button save-button" @click=${this.handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('expense-form', ExpenseForm);
