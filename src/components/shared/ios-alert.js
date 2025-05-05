/**
 * iOS-style Alert Dialog Component
 * A reusable alert dialog component that matches iOS native alerts
 */

import { LitElement, html, css } from 'lit';

export class IosAlert extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
    cancelText: { type: String },
    confirmText: { type: String },
    destructive: { type: Boolean },
    forceLightMode: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
    }

    /* iOS-style alert backdrop */
    .ios-alert-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ios-fade-in 0.2s ease-out;
    }

    /* iOS-style alert content - Light Mode (default) */
    .ios-alert-content {
      background-color: #ffffff;
      border-radius: 14px;
      width: 270px;
      max-width: 90%;
      overflow: hidden;
      animation: ios-scale-in 0.2s ease-out;
      box-shadow: 0 4px 23px rgba(0, 0, 0, 0.2);
    }

    /* iOS-style alert header */
    .ios-alert-header {
      padding: 18px 16px 0px;
      text-align: center;
    }

    /* iOS-style alert title - Light Mode */
    .ios-alert-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style alert message - Light Mode */
    .ios-alert-message {
      font-size: 13px;
      color: #666666;
      margin: 8px 0 0;
      padding: 0;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* iOS-style alert buttons container - Light Mode */
    .ios-alert-buttons {
      display: flex;
      flex-direction: column;
      margin-top: 18px;
      border-top: 1px solid rgba(60, 60, 67, 0.2);
    }

    /* iOS-style alert button - Light Mode */
    .ios-alert-button {
      padding: 12px;
      font-size: 17px;
      font-weight: 500;
      text-align: center;
      background: none;
      border: none;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #007aff;
      border-bottom: 1px solid rgba(60, 60, 67, 0.2);
    }

    .ios-alert-button:last-child {
      border-bottom: none;
    }

    .ios-alert-button.destructive {
      color: #ff3b30;
      font-weight: 600;
    }

    .ios-alert-button.cancel {
      font-weight: 600;
    }

    .ios-alert-button:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    /* Dark mode styles */
    .dark-mode .ios-alert-content {
      background-color: #1c1c1e;
    }

    .dark-mode .ios-alert-title {
      color: #ffffff;
    }

    .dark-mode .ios-alert-message {
      color: #98989f;
    }

    .dark-mode .ios-alert-buttons {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    .dark-mode .ios-alert-button {
      color: #0a84ff;
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .dark-mode .ios-alert-button.destructive {
      color: #ff453a;
    }

    .dark-mode .ios-alert-button:active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* iOS-style animations */
    @keyframes ios-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ios-scale-in {
      from { transform: scale(1.2); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this.cancelText = 'Cancel';
    this.confirmText = 'OK';
    this.destructive = false;
    this.forceLightMode = true; // Default to light mode for iOS alerts
    this.isDarkMode = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkDarkMode();
  }

  // Check if dark mode is active
  checkDarkMode() {
    // If forceLightMode is true, always use light mode
    if (this.forceLightMode) {
      this.isDarkMode = false;
      return;
    }

    // Check if the document has a dark class or prefers-color-scheme is dark
    const documentIsDark = document.documentElement.classList.contains('dark');
    const prefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode = documentIsDark || prefersColorSchemeDark;
  }

  // Show the alert
  show() {
    this.checkDarkMode();
    this.open = true;
  }

  // Hide the alert
  hide() {
    this.open = false;
  }

  // Handle cancel button click
  handleCancel() {
    this.hide();
    this.dispatchEvent(new CustomEvent('alert-cancel', {
      bubbles: true,
      composed: true
    }));
  }

  // Handle confirm button click
  handleConfirm() {
    this.hide();
    this.dispatchEvent(new CustomEvent('alert-confirm', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.open) return html``;

    // Determine if we should use dark mode
    const themeClass = this.isDarkMode && !this.forceLightMode ? 'dark-mode' : '';

    return html`
      <div class="ios-alert-backdrop">
        <div class="ios-alert-content ${themeClass}">
          <div class="ios-alert-header">
            <h3 class="ios-alert-title">${this.title}</h3>
            ${this.message ? html`<p class="ios-alert-message">${this.message}</p>` : ''}
          </div>
          <div class="ios-alert-buttons">
            ${this.cancelText ? html`
              <button class="ios-alert-button cancel" @click=${this.handleCancel}>
                ${this.cancelText}
              </button>
            ` : ''}
            <button
              class="ios-alert-button ${this.destructive ? 'destructive' : ''}"
              @click=${this.handleConfirm}
            >
              ${this.confirmText}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ios-alert', IosAlert);
