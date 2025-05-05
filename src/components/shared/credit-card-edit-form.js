/**
 * Credit Card Edit Form Component
 * Form for adding or editing credit cards
 */

import { LitElement, html, css } from 'lit';
import { creditCardColors } from '../../db/schema.js';
import { addCreditCard, updateCreditCard } from '../../js/credit-card-manager.js';

export class CreditCardEditForm extends LitElement {
  static properties = {
    open: { type: Boolean },
    isEditing: { type: Boolean },
    card: { type: Object },
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

    /* iOS-style color options */
    .color-options-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .color-option {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s;
    }

    .color-option.selected {
      border-color: #000000;
      transform: scale(1.1);
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

    /* Reminder section */
    .reminder-section {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .reminder-header {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000000;
    }

    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .toggle-label {
      font-size: 14px;
      color: #3a3a3c;
    }

    /* iOS-style toggle switch */
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
      transition: .3s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    input:checked + .toggle-slider {
      background-color: #34c759;
    }

    input:focus + .toggle-slider {
      box-shadow: 0 0 1px #34c759;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }

    /* Days before selector */
    .days-before-selector {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }

    .days-option {
      flex: 1;
      padding: 8px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #ffffff;
    }

    .days-option.selected {
      border-color: #007aff;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
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
        color: #ffffff;
      }

      .form-input:focus {
        background-color: #3a3a3c;
      }

      .color-option.selected {
        border-color: #ffffff;
      }

      .modal-header, .modal-footer {
        border-color: rgba(255, 255, 255, 0.1);
      }

      .modal-footer {
        background-color: #1c1c1e;
      }

      .reminder-section {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .reminder-header {
        color: #ffffff;
      }

      .toggle-label {
        color: #8e8e93;
      }

      .toggle-slider {
        background-color: #3a3a3c;
      }

      .toggle-slider:before {
        background-color: #8e8e93;
      }

      input:checked + .toggle-slider {
        background-color: #30d158;
      }

      .days-option {
        background-color: #2c2c2e;
        border-color: #3a3a3c;
        color: #ffffff;
      }

      .days-option.selected {
        background-color: rgba(10, 132, 255, 0.2);
        border-color: #0a84ff;
        color: #0a84ff;
      }
    }
    */
  `;

  constructor() {
    super();
    this.open = false;
    this.isEditing = false;
    this.card = {
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
    this.isSaving = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Force light mode for this component
    this.style.colorScheme = 'light';
  }

  show(card = null) {
    if (card) {
      this.card = { ...card };
      this.isEditing = true;
    } else {
      this.card = {
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
      this.isEditing = false;
    }

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
    this.card = {
      ...this.card,
      [field]: e.target.value
    };
  }

  selectCardColor(color) {
    this.card = {
      ...this.card,
      color
    };
  }

  toggleReminder(e) {
    this.card = {
      ...this.card,
      reminderEnabled: e.target.checked
    };
  }

  selectReminderDays(days) {
    this.card = {
      ...this.card,
      reminderDays: days
    };
  }

  async handleSave() {
    if (!this.card.name) {
      // Show validation error
      return;
    }

    this.isSaving = true;

    try {
      if (this.isEditing) {
        // Update existing card
        await updateCreditCard(this.card.id, this.card);
      } else {
        // Add new card
        await addCreditCard(this.card);
      }

      // Close modal and notify parent
      this.hide();
      this.dispatchEvent(new CustomEvent('card-saved', {
        bubbles: true,
        composed: true,
        detail: { success: true }
      }));
    } catch (error) {
      console.error('Error saving card:', error);
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
    if (!this.open) return html``;

    return html`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">${this.isEditing ? 'Edit' : 'Add'} Credit Card</div>
          </div>
          <div class="modal-body">
            <!-- Card name input -->
            <div class="form-group">
              <label class="form-label">Card Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g., Chase Sapphire"
                .value=${this.card.name}
                @input=${(e) => this.handleInputChange(e, 'name')}
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
                .value=${this.card.lastFourDigits}
                @input=${(e) => this.handleInputChange(e, 'lastFourDigits')}
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
                .value=${this.card.limit}
                @input=${(e) => this.handleInputChange(e, 'limit')}
              />
            </div>

            <!-- Current balance input -->
            <div class="form-group">
              <label class="form-label">Current Balance</label>
              <input
                type="number"
                class="form-input"
                placeholder="1500.00"
                min="0"
                step="0.01"
                .value=${this.card.currentBalance}
                @input=${(e) => this.handleInputChange(e, 'currentBalance')}
              />
            </div>

            <!-- Due date input -->
            <div class="form-group">
              <label class="form-label">Payment Due Date</label>
              <input
                type="date"
                class="form-input"
                .value=${this.card.dueDate}
                @input=${(e) => this.handleInputChange(e, 'dueDate')}
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
                .value=${this.card.minimumPayment}
                @input=${(e) => this.handleInputChange(e, 'minimumPayment')}
              />
            </div>

            <!-- APR input -->
            <div class="form-group">
              <label class="form-label">APR (%)</label>
              <input
                type="number"
                class="form-input"
                placeholder="19.99"
                min="0"
                step="0.01"
                .value=${this.card.apr}
                @input=${(e) => this.handleInputChange(e, 'apr')}
              />
            </div>

            <!-- Card color selection -->
            <div class="form-group">
              <label class="form-label">Card Color</label>
              <div class="color-options-container">
                ${creditCardColors.map(color => html`
                  <div
                    class="color-option ${this.card.color === color ? 'selected' : ''}"
                    style="background-color: ${color}"
                    @click=${() => this.selectCardColor(color)}
                  ></div>
                `)}
              </div>
            </div>

            <!-- Payment reminder settings -->
            <div class="reminder-section">
              <div class="reminder-header">Payment Reminders</div>

              <div class="toggle-row">
                <div class="toggle-label">Enable Payment Reminders</div>
                <label class="toggle-switch">
                  <input
                    type="checkbox"
                    ?checked=${this.card.reminderEnabled}
                    @change=${this.toggleReminder}
                  >
                  <span class="toggle-slider"></span>
                </label>
              </div>

              ${this.card.reminderEnabled ? html`
                <div class="form-group">
                  <label class="form-label">Remind me</label>
                  <div class="days-before-selector">
                    ${[3, 5, 7, 10].map(days => html`
                      <div
                        class="days-option ${this.card.reminderDays === days ? 'selected' : ''}"
                        @click=${() => this.selectReminderDays(days)}
                      >
                        ${days} days before
                      </div>
                    `)}
                  </div>
                </div>
              ` : ''}
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
              ?disabled=${this.isSaving || !this.card.name}
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

customElements.define('credit-card-edit-form', CreditCardEditForm);
