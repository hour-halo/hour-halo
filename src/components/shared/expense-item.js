/**
 * Expense Item Component
 * A reusable component for displaying an expense
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency, formatDate } from '../../js/helpers.js';

export class ExpenseItem extends LitElement {
  static properties = {
    id: { type: String },
    amount: { type: Number },
    category: { type: String },
    date: { type: String },
    notes: { type: String },
    currency: { type: String },
    editable: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.id = '';
    this.amount = 0;
    this.category = '';
    this.date = '';
    this.notes = '';
    this.currency = 'USD';
    this.editable = true;
  }

  // Get category icon based on category name
  getCategoryIcon() {
    const icons = {
      'Food': 'M3 3h18v18H3V3zm4.5 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z',
      'Transport': 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
      'Entertainment': 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25H12a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25z',
      'Shopping': 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      'Bills': 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
      'Health': 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
      'Other': 'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
    };
    
    return icons[this.category] || icons['Other'];
  }

  // Handle click on the expense item
  handleClick() {
    if (!this.editable) return;
    
    this.dispatchEvent(new CustomEvent('edit-expense', {
      detail: {
        id: this.id,
        amount: this.amount,
        category: this.category,
        date: this.date,
        notes: this.notes
      },
      bubbles: true,
      composed: true
    }));
  }

  // Handle delete button click
  handleDelete(e) {
    e.stopPropagation();
    
    this.dispatchEvent(new CustomEvent('delete-expense', {
      detail: { id: this.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="expense-item" @click=${this.handleClick}>
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.getCategoryIcon()}" />
            </svg>
          </div>
          <div>
            <div class="font-medium">${this.category}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">${formatDate(this.date)}</div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-right">
            <div class="font-bold text-red-600 dark:text-red-400">
              -${formatCurrency(this.amount, this.currency)}
            </div>
            ${this.notes ? html`
              <div class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                ${this.notes}
              </div>
            ` : ''}
          </div>
          ${this.editable ? html`
            <button 
              class="ml-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              @click=${this.handleDelete}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('expense-item', ExpenseItem);
