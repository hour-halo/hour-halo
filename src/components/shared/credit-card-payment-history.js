/**
 * Credit Card Payment History Component
 * Displays payment history for a credit card
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../../js/helpers.js';
import { getCreditCardPayments, deleteCreditCardPayment } from '../../js/credit-card-manager.js';

export class CreditCardPaymentHistory extends LitElement {
  static properties = {
    cardId: { type: Number },
    payments: { type: Array },
    settings: { type: Object },
    isLoading: { type: Boolean },
    showDeleteConfirmation: { type: Boolean },
    pendingDeleteId: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
    }

    .payment-history-container {
      margin-top: 16px;
    }

    .payment-history-header {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .payment-list {
      border-radius: 12px;
      overflow: hidden;
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .payment-item {
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .payment-item:last-child {
      border-bottom: none;
    }

    .payment-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background-color: #ffffff;
      position: relative;
      z-index: 1;
      padding: 16px;
    }

    .swipeable-item {
      position: relative;
      overflow: hidden;
    }

    .payment-info {
      flex: 1;
    }

    .payment-date {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      color: #000000;
    }

    .payment-type {
      font-size: 13px;
      color: #8e8e93;
    }

    .payment-amount {
      font-size: 16px;
      font-weight: 600;
      color: #34c759;
    }

    .payment-notes {
      font-size: 13px;
      color: #8e8e93;
      margin-top: 4px;
    }

    .delete-action {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff3b30;
      width: 80px;
      z-index: 0;
    }

    .delete-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: white;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .delete-button svg {
      margin-bottom: 4px;
      width: 20px;
      height: 20px;
      stroke: white;
    }

    .delete-button span {
      font-size: 12px;
    }

    .empty-state {
      padding: 32px 16px;
      text-align: center;
      color: #8e8e93;
      font-size: 15px;
    }

    .loading-indicator {
      padding: 16px;
      text-align: center;
      color: #8e8e93;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #007aff;
      animation: spin 0.8s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* iOS-style confirmation dialog */
    .confirmation-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #f2f2f7;
      border-radius: 14px;
      width: 270px;
      overflow: hidden;
      z-index: 10000;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }

    .confirmation-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      z-index: 9999;
    }

    .confirmation-title {
      text-align: center;
      padding: 16px;
      font-size: 17px;
      font-weight: 600;
      color: #000000;
    }

    .confirmation-message {
      text-align: center;
      padding: 0 16px 16px;
      font-size: 13px;
      color: #3a3a3c;
    }

    .confirmation-buttons {
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .confirmation-button {
      padding: 16px;
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      background: none;
      border: none;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .confirmation-button:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .confirmation-button.delete-button {
      color: #ff3b30;
      font-weight: 600;
    }

    .confirmation-button.cancel-button {
      color: #007aff;
    }

    /* We're removing dark mode styles for now to ensure consistent appearance */
  `;

  constructor() {
    super();
    this.cardId = null;
    this.payments = [];
    this.settings = {
      currency: 'USD'
    };
    this.isLoading = false;
    this.showDeleteConfirmation = false;
    this.pendingDeleteId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.cardId) {
      this.loadPayments();
    }

    // Setup swipe-to-delete after each render
    this.updateComplete.then(() => {
      this.setupSwipeToDelete();
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('cardId') && this.cardId) {
      this.loadPayments();
    }

    if (changedProperties.has('payments')) {
      this.updateComplete.then(() => {
        this.setupSwipeToDelete();
      });
    }
  }

  async loadPayments() {
    if (!this.cardId) return;

    this.isLoading = true;
    try {
      this.payments = await getCreditCardPayments(this.cardId);
    } catch (error) {
      console.error('Error loading payments:', error);
      this.payments = [];
    } finally {
      this.isLoading = false;
    }
  }

  setupSwipeToDelete() {
    console.log('Setting up swipe-to-delete for payments');

    // We need to wait for the DOM to be updated
    setTimeout(() => {
      const paymentItems = this.shadowRoot.querySelectorAll('.payment-item');
      console.log(`Found ${paymentItems.length} payment items`);

      paymentItems.forEach(item => {
        const contentEl = item.querySelector('.payment-content');
        const deleteEl = item.querySelector('.delete-action');
        const deleteButton = item.querySelector('.delete-button');
        const paymentId = parseInt(item.dataset.id);

        console.log(`Setting up swipe for payment ID: ${paymentId}`);

        if (!contentEl || !deleteEl || !paymentId) {
          console.log('Missing required elements for swipe-to-delete');
          return;
        }

        // Store event handlers as properties on the element to be able to remove them later
        if (!item._swipeHandlers) {
          item._swipeHandlers = {};
        }

        // Clean up old handlers if they exist
        if (item._swipeHandlers.touchStart) {
          item.removeEventListener('touchstart', item._swipeHandlers.touchStart);
          item.removeEventListener('mousedown', item._swipeHandlers.touchStart);
        }
        if (item._swipeHandlers.touchMove) {
          item.removeEventListener('touchmove', item._swipeHandlers.touchMove);
          item.removeEventListener('mousemove', item._swipeHandlers.touchMove);
        }
        if (item._swipeHandlers.touchEnd) {
          item.removeEventListener('touchend', item._swipeHandlers.touchEnd);
          item.removeEventListener('mouseup', item._swipeHandlers.touchEnd);
          item.removeEventListener('mouseleave', item._swipeHandlers.touchEnd);
        }

        // Variables for tracking swipe state
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        const deleteWidth = 80; // Width of delete button

        // Touch events
        item._swipeHandlers.touchStart = (e) => {
          startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
          isDragging = true;
          if (contentEl) {
            contentEl.style.transition = 'none';
          }
        };

        item._swipeHandlers.touchMove = (e) => {
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

        item._swipeHandlers.touchEnd = () => {
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

        // Add event listeners
        item.addEventListener('touchstart', item._swipeHandlers.touchStart, { passive: true });
        item.addEventListener('touchmove', item._swipeHandlers.touchMove, { passive: true });
        item.addEventListener('touchend', item._swipeHandlers.touchEnd);
        item.addEventListener('mousedown', item._swipeHandlers.touchStart);
        item.addEventListener('mousemove', item._swipeHandlers.touchMove);
        item.addEventListener('mouseup', item._swipeHandlers.touchEnd);
        item.addEventListener('mouseleave', item._swipeHandlers.touchEnd);

        // Add click handler for delete button
        if (deleteButton) {
          // Remove old click handler if it exists
          if (item._swipeHandlers.deleteClick) {
            deleteButton.removeEventListener('click', item._swipeHandlers.deleteClick);
          }

          // Create and store new click handler
          item._swipeHandlers.deleteClick = (e) => {
            e.stopPropagation();
            this.confirmDelete(paymentId);
          };

          // Add the click handler
          deleteButton.addEventListener('click', item._swipeHandlers.deleteClick);
        }
      });
    }, 200); // Increased timeout to ensure DOM is fully updated
  }

  confirmDelete(paymentId) {
    this.pendingDeleteId = paymentId;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.pendingDeleteId = null;
  }

  async deletePayment() {
    if (!this.pendingDeleteId) return;

    try {
      await deleteCreditCardPayment(this.pendingDeleteId);
      this.showDeleteConfirmation = false;
      this.pendingDeleteId = null;

      // Reload payments
      this.loadPayments();

      // Notify parent component
      this.dispatchEvent(new CustomEvent('payment-deleted', {
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  }

  formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  render() {
    return html`
      <div class="payment-history-container">
        <div class="payment-history-header">Payment History</div>

        ${this.isLoading ? html`
          <div class="loading-indicator">
            <span class="spinner"></span>
            Loading payments...
          </div>
        ` : html`
          ${this.payments.length === 0 ? html`
            <div class="empty-state">
              No payments recorded yet
            </div>
          ` : html`
            <div class="payment-list">
              ${this.payments.map(payment => html`
                <div class="payment-item" data-id="${payment.id}">
                  <div class="payment-content">
                    <div class="payment-info">
                      <div class="payment-date">${this.formatDate(payment.date)}</div>
                      <div class="payment-type">${payment.type || 'Minimum'} Payment</div>
                      ${payment.notes ? html`<div class="payment-notes">${payment.notes}</div>` : ''}
                    </div>
                    <div class="payment-amount">
                      -${formatCurrency(payment.amount, this.settings?.currency || 'USD')}
                    </div>
                  </div>
                  <div class="delete-action">
                    <button class="delete-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              `)}
            </div>
          `}
        `}

        ${this.showDeleteConfirmation ? html`
          <div class="confirmation-backdrop" @click=${this.cancelDelete}></div>
          <div class="confirmation-dialog">
            <div class="confirmation-title">Delete Payment</div>
            <div class="confirmation-message">
              Are you sure you want to delete this payment? This will add the payment amount back to your card balance.
            </div>
            <div class="confirmation-buttons">
              <button class="confirmation-button delete-button" @click=${this.deletePayment}>
                Delete
              </button>
              <button class="confirmation-button cancel-button" @click=${this.cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('credit-card-payment-history', CreditCardPaymentHistory);
