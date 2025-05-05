/**
 * Diagnostic View Component
 * Simple component to help diagnose rendering issues
 */

import { LitElement, html, css } from 'lit';

export class DiagnosticView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .diagnostic-container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      color: #007aff;
    }
    
    .status {
      margin-bottom: 16px;
      padding: 8px;
      border-radius: 8px;
      background-color: #f2f2f7;
    }
    
    .success {
      background-color: #e5fff0;
      color: #34c759;
    }
    
    .error {
      background-color: #fff0f0;
      color: #ff3b30;
    }
    
    button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  `;

  static properties = {
    status: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.status = 'Diagnostic view loaded successfully';
    this.error = '';
    
    // Capture any errors
    window.addEventListener('error', (event) => {
      this.error = `Error: ${event.message} at ${event.filename}:${event.lineno}`;
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Diagnostic view connected');
  }

  checkDatabase() {
    try {
      // Import dynamically to avoid circular dependencies
      import('../db/db.js').then(module => {
        const db = module.default;
        
        // Check if database is accessible
        db.settings.get(1).then(settings => {
          if (settings) {
            this.status = `Database check: OK. Settings found: ${JSON.stringify(settings)}`;
          } else {
            this.status = 'Database check: Settings not found';
          }
        }).catch(err => {
          this.status = `Database error: ${err.message}`;
        });
      });
    } catch (err) {
      this.status = `Import error: ${err.message}`;
    }
  }

  navigateToWeek() {
    window.location.hash = 'week';
  }

  navigateToSummary() {
    window.location.hash = 'summary';
  }

  navigateToSettings() {
    window.location.hash = 'settings';
  }

  render() {
    return html`
      <div class="diagnostic-container">
        <h2>Hour Halo Diagnostic Tool</h2>
        
        <div class="status ${this.error ? 'error' : 'success'}">
          ${this.error || this.status}
        </div>
        
        <div>
          <button @click=${this.checkDatabase}>Check Database</button>
          <button @click=${this.navigateToWeek}>Go to Week</button>
          <button @click=${this.navigateToSummary}>Go to Summary</button>
          <button @click=${this.navigateToSettings}>Go to Settings</button>
        </div>
      </div>
    `;
  }
}

customElements.define('diagnostic-view', DiagnosticView);
