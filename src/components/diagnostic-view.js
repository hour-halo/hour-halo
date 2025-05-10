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

  async clearExpenseData() {
    try {
      // Import dynamically to avoid circular dependencies
      const module = await import('../js/sample-data.js');
      const result = await module.clearAllExpenseData();

      if (result) {
        this.status = 'All expense data cleared successfully!';
      } else {
        this.status = 'Failed to clear expense data.';
      }
    } catch (err) {
      this.status = `Error clearing expense data: ${err.message}`;
    }
  }

  async addSampleExpenseData() {
    try {
      // Import dynamically to avoid circular dependencies
      const module = await import('../js/sample-data.js');
      const result = await module.addSampleExpenseData();

      if (result) {
        this.status = 'Sample expense data added successfully!';
      } else {
        this.status = 'Failed to add sample expense data.';
      }
    } catch (err) {
      this.status = `Error adding sample expense data: ${err.message}`;
    }
  }

  async debugHoursData() {
    try {
      this.status = 'Analyzing hours data...';

      // Import database
      const db = (await import('../db/db.js')).default;

      // Get all weeks
      const weeks = await db.weeks.toArray();

      let output = `Found ${weeks.length} weeks:\n\n`;

      // Process each week
      for (const week of weeks) {
        output += `Week: ${week.id}, Total Hours: ${week.totalHours}, Total Tips: ${week.totalTips}\n`;

        if (!week.days) {
          output += `  No days data for this week\n`;
          continue;
        }

        // Process each day
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        dayKeys.forEach((dayKey, index) => {
          const day = week.days[dayKey];
          if (!day) {
            output += `  ${dayNames[index]}: No data\n`;
            return;
          }

          const hours = day.hours || 0;
          const tips = day.tips || 0;

          // Calculate the date for this day
          const weekDate = new Date(week.id);
          const dayDate = new Date(weekDate);
          dayDate.setDate(weekDate.getDate() + index);
          const dateStr = dayDate.toISOString().split('T')[0];

          output += `  ${dayNames[index]} (${dateStr}): Hours=${hours}, Tips=${tips}\n`;
        });

        output += '\n';
      }

      this.status = output;
    } catch (err) {
      this.status = `Error debugging hours data: ${err.message}`;
    }
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

        <h3>Expense Data Tools</h3>
        <div>
          <button @click=${this.clearExpenseData} style="background-color: #ff3b30;">Clear All Expense Data</button>
          <button @click=${this.addSampleExpenseData} style="background-color: #34c759;">Add Sample Expense Data</button>
        </div>

        <h3>Hours Data Tools</h3>
        <div>
          <button @click=${this.debugHoursData} style="background-color: #007aff;">Debug Hours Data</button>
        </div>
      </div>
    `;
  }
}

customElements.define('diagnostic-view', DiagnosticView);
