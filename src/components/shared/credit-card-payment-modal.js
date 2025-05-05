/**
 * Credit Card Payment Modal Component
 * Modal for recording credit card payments
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../../js/helpers.js';
import { creditCardPaymentTypes } from '../../db/schema.js';
import { recordCreditCardPayment } from '../../js/credit-card-manager.js';

export class CreditCardPaymentModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    card: { type: Object },
    payment: { type: Object },
    settings: { type: Object },
    isSaving: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
    }

    /* iOS-style modal backdrop */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade-in 0.2s ease-out;
    }

    /* iOS-style modal content */
    .modal-content {
      background-color: #ffffff;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    /* iOS-style modal header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* iOS-style modal title */
    .modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style modal body */
    .modal-body {
      padding: 16px;
    }

    /* iOS-style modal footer */
    .modal-footer {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    /* iOS-style form group */
    .form-group {
      margin-bottom: 16px;
    }

    /* iOS-style form label */
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #3a3a3c;
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style form input */
    .form-input {
      display: block;
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      background-color: #f2f2f7;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-appearance: none;
      appearance: none;
    }

    .form-input:focus {
      outline: none;
      background-color: #e9e9eb;
    }

    /* iOS-style payment options */
    .payment-options {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .payment-option {
      flex: 1;
      padding: 12px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #ffffff;
    }

    .payment-option.selected {
      border-color: #007aff;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
    }

    /* iOS-style buttons */
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
      color: #007aff;
      opacity: 0.8;
    }

    .save-button {
      color: #007aff;
      font-weight: 600;
    }

    .save-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Card info section */
    .card-info {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
    }

    .card-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-balance {
      font-size: 14px;
      color: #3a3a3c;
    }

    /* Spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: #007aff;
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Dark mode styles - DISABLED to force light mode for this component */
    /*
    @media (prefers-color-scheme: dark) {
      .modal-content {
        background-color: #1c1c1e;
      }

      .modal-title {
        color: #ffffff;
      }

      .form-label {
        color: #8e8e93;
      }

      .form-input {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .payment-option {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .payment-option.selected {
        background-color: rgba(10, 132, 255, 0.2);
        border-color: #0a84ff;
        color: #0a84ff;
      }

      .card-info {
        background-color: #2c2c2e;
      }

      .card-balance {
        color: #8e8e93;
      }

      .modal-header, .modal-footer {
        border-color: rgba(255, 255, 255, 0.1);
      }
    }
    */
  `;

  constructor() {
    super();
    this.open = false;
    this.card = null;
    this.payment = {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Custom',
      notes: ''
    };
    this.settings = {
      currency: 'USD'
    };
    this.isSaving = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Force light mode for this component
    this.style.colorScheme = 'light';
  }

  show(card, settings = { currency: 'USD' }) {
    this.card = card;
    this.settings = settings;
    this.payment = {
      amount: card.minimumPayment || '',
      date: new Date().toISOString().split('T')[0],
      type: 'Minimum',
      notes: ''
    };

    // Force light mode for this component when shown
    this.style.colorScheme = 'light';

    // Add a small delay to ensure the modal is properly styled
    setTimeout(() => {
      const modalContent = this.shadowRoot.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.backgroundColor = '#ffffff';

        // Force all text to be dark
        const labels = this.shadowRoot.querySelectorAll('.form-label');
        labels.forEach(label => label.style.color = '#3a3a3c');

        const title = this.shadowRoot.querySelector('.modal-title');
        if (title) title.style.color = '#000000';

        // Force inputs to have light background
        const inputs = this.shadowRoot.querySelectorAll('.form-input');
        inputs.forEach(input => {
          input.style.backgroundColor = '#f2f2f7';
          input.style.color = '#000000';
        });

        // Force payment options to have light background
        const paymentOptions = this.shadowRoot.querySelectorAll('.payment-option');
        paymentOptions.forEach(option => {
          option.style.backgroundColor = '#ffffff';
          option.style.color = option.classList.contains('selected') ? '#007aff' : '#000000';
        });

        // Force card info to have light background
        const cardInfo = this.shadowRoot.querySelector('.card-info');
        if (cardInfo) {
          cardInfo.style.backgroundColor = '#ffffff';

          const cardName = cardInfo.querySelector('.card-name');
          if (cardName) cardName.style.color = '#000000';

          const cardBalance = cardInfo.querySelector('.card-balance');
          if (cardBalance) cardBalance.style.color = '#3a3a3c';
        }

        // Force footer to have light background
        const footer = this.shadowRoot.querySelector('.modal-footer');
        if (footer) footer.style.backgroundColor = '#f9f9f9';
      }
    }, 10);

    this.open = true;
  }

  hide() {
    this.open = false;
    this.isSaving = false;
  }

  handleInputChange(e, field) {
    this.payment = {
      ...this.payment,
      [field]: e.target.value
    };
  }

  selectPaymentType(type) {
    let amount = this.payment.amount;

    // Set amount based on payment type
    if (type === 'Minimum') {
      amount = this.card.minimumPayment || 0;
    } else if (type === 'Full') {
      amount = this.card.currentBalance || 0;
    }

    this.payment = {
      ...this.payment,
      type,
      amount: amount.toString()
    };
  }

  async handleSave() {
    if (!this.payment.amount || !this.payment.date) {
      // Show validation error
      return;
    }

    this.isSaving = true;

    try {
      // Create payment object
      const paymentToSave = {
        ...this.payment,
        cardId: this.card.id,
        amount: parseFloat(this.payment.amount)
      };

      // Record payment
      await recordCreditCardPayment(paymentToSave);

      // Close modal and notify parent
      this.hide();
      this.dispatchEvent(new CustomEvent('payment-saved', {
        bubbles: true,
        composed: true,
        detail: { success: true }
      }));
    } catch (error) {
      console.error('Error saving payment:', error);
      this.isSaving = false;
    }
  }

  handleCancel() {
    this.hide();
  }

  // Handle backdrop click
  handleBackdropClick(e) {
    // Only close if clicking directly on the backdrop, not its children
    if (e.target === e.currentTarget && !this.isSaving) {
      this.hide();
    }
  }

  render() {
    if (!this.open || !this.card) return html``;

    return html`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">Record Payment</div>
          </div>
          <div class="modal-body">
            <!-- Card info -->
            <div class="card-info">
              <div class="card-name">${this.card.name}</div>
              <div class="card-balance">
                Current Balance: ${formatCurrency(this.card.currentBalance, this.settings?.currency || 'USD')}
              </div>
            </div>

            <!-- Payment type selection -->
            <div class="form-group">
              <label class="form-label">Payment Type</label>
              <div class="payment-options">
                ${creditCardPaymentTypes.map(type => html`
                  <div
                    class="payment-option ${this.payment.type === type ? 'selected' : ''}"
                    @click=${() => this.selectPaymentType(type)}
                  >
                    ${type}
                  </div>
                `)}
              </div>
            </div>

            <!-- Payment amount -->
            <div class="form-group">
              <label class="form-label">Payment Amount</label>
              <input
                type="number"
                class="form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                .value=${this.payment.amount}
                @input=${(e) => this.handleInputChange(e, 'amount')}
              />
            </div>

            <!-- Payment date -->
            <div class="form-group">
              <label class="form-label">Payment Date</label>
              <input
                type="date"
                class="form-input"
                .value=${this.payment.date}
                @input=${(e) => this.handleInputChange(e, 'date')}
              />
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label class="form-label">Notes (Optional)</label>
              <input
                type="text"
                class="form-input"
                placeholder="Add notes about this payment"
                .value=${this.payment.notes}
                @input=${(e) => this.handleInputChange(e, 'notes')}
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="modal-button cancel-button"
              @click=${this.handleCancel}
              ?disabled=${this.isSaving}
            >
              Cancel
            </button>
            <button
              class="modal-button save-button"
              @click=${this.handleSave}
              ?disabled=${this.isSaving || !this.payment.amount || !this.payment.date}
            >
              ${this.isSaving ? html`
                <span class="spinner"></span>
                Saving...
              ` : 'Save'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('credit-card-payment-modal', CreditCardPaymentModal);
