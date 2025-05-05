/**
 * Modal Buttons Component
 * A component for displaying modal action buttons
 */

import { LitElement, html, css } from 'lit';

export class ModalButtons extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    isSaving: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      background-color: rgba(249, 249, 249, 0.94);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      transform: translateY(100%);
      transition: transform 0.3s ease-out;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.05);
      padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
    }

    :host([open]) {
      transform: translateY(0);
    }

    button {
      font-weight: 500;
      font-size: 17px;
      padding: 12px 20px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      transition: background-color 0.15s;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.01em;
    }

    button:active {
      background-color: rgba(0, 122, 255, 0.1);
    }

    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .cancel-button {
      color: #8e8e93;
      font-weight: 500;
    }

    .save-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--ios-blue, #007aff);
      background-color: rgba(0, 122, 255, 0.1);
      min-width: 100px;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 122, 255, 0.3);
      border-radius: 50%;
      border-top-color: var(--ios-blue, #007aff);
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* We're forcing light mode for modals regardless of system theme */
    /* This ensures modal buttons always use light mode styling */
  `;

  constructor() {
    super();
    this.open = false;
    this.isSaving = false;
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('modal-cancel', {
      bubbles: true,
      composed: true
    }));
  }

  handleSave() {
    this.dispatchEvent(new CustomEvent('modal-save', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button
        class="cancel-button"
        @click=${this.handleCancel}
        ?disabled=${this.isSaving}
      >
        Cancel
      </button>
      <button
        class="save-button"
        @click=${this.handleSave}
        ?disabled=${this.isSaving}
      >
        ${this.isSaving ? html`
          <span class="spinner"></span>
          Saving...
        ` : 'Save'}
      </button>
    `;
  }
}

customElements.define('modal-buttons', ModalButtons);
