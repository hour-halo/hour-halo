/**
 * Modal Component
 * A reusable modal dialog component
 */

import { LitElement, html, css } from 'lit';

export class ModalDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    hideClose: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    /* iOS-style modal backdrop */
    .ios-modal-backdrop {
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
      animation: ios-fade-in 0.2s ease-out;
    }

    /* iOS-style modal content */
    .ios-modal-content {
      background-color: #ffffff;
      border-radius: 14px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: ios-slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15);
      margin: 0 16px;
    }

    /* iOS-style modal header */
    .ios-modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 16px 10px;
      position: relative;
      border-bottom: 1px solid rgba(60, 60, 67, 0.1);
    }

    /* iOS-style modal title */
    .ios-modal-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.01em;
    }

    /* iOS-style close button container */
    .ios-modal-close {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    /* iOS-style modal body */
    .ios-modal-body {
      padding: 0;
      background-color: white;
      overflow: hidden;
    }

    /* iOS-style modal footer */
    .ios-modal-footer {
      padding: 16px;
      display: flex !important;
      justify-content: space-between;
      width: 100%;
    }

    /* iOS-style animations */
    @keyframes ios-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ios-slide-up {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* We're forcing light mode for modals regardless of system theme */
    /* This ensures modals always use light mode styling */
  `;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.hideClose = false;
  }

  // Show the modal
  show() {
    this.open = true;
  }

  // Hide the modal
  hide() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('modal-close', {
      bubbles: true,
      composed: true,
      detail: { closed: true }
    }));
  }

  // Handle backdrop click
  handleBackdropClick(e) {
    // Only close if clicking directly on the backdrop, not its children
    if (e.target === e.currentTarget) {
      this.hide();
    }
  }

  // Handle escape key press
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.hide();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        // Add event listener for escape key when modal opens
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // Remove event listener when modal closes
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        // Restore body scrolling
        document.body.style.overflow = '';
      }
    }
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="ios-modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="ios-modal-content">

          <div class="ios-modal-header">
            <h3 class="ios-modal-title">${this.title}</h3>
            ${!this.hideClose ? html`
              <div class="ios-modal-close">
                <button
                  style="color: var(--ios-blue); background: none; border: none; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"
                  @click=${this.hide}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ` : ''}
          </div>
          <div class="ios-modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-dialog', ModalDialog);
