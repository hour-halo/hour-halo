/**
 * Hour Pill Component
 * A reusable component for displaying and editing hours for a day
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency } from '../../js/helpers.js';

export class HourPill extends LitElement {
  static properties = {
    day: { type: String },
    date: { type: String },
    hours: { type: Number },
    tips: { type: Number },
    hourlyRate: { type: Number },
    showTips: { type: Boolean },
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
    this.day = '';
    this.date = '';
    this.hours = 0;
    this.tips = 0;
    this.hourlyRate = 10;
    this.showTips = true;
    this.currency = 'USD';
    this.editable = true;
  }

  // Calculate earnings based on hours and rate
  get earnings() {
    return this.hours * this.hourlyRate;
  }

  // Get total earnings including tips
  get totalEarnings() {
    return this.earnings + this.tips;
  }

  // Format day name (e.g., "Mon")
  get formattedDay() {
    return this.day.substring(0, 3);
  }

  // Handle click on the pill
  handleClick() {
    if (!this.editable) return;

    this.dispatchEvent(new CustomEvent('edit-hours', {
      detail: {
        day: this.day,
        date: this.date,
        hours: this.hours,
        tips: this.tips
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div
        class="hour-pill ${this.hours > 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}"
        @click=${this.handleClick}
      >
        <div class="flex items-center">
          <span class="font-bold">${this.formattedDay}</span>
          <span class="ml-2 text-xs opacity-70">${this.date}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="font-medium">${this.hours}h</span>
          ${this.showTips && this.tips > 0 ? html`
            <span class="text-xs text-green-600 dark:text-green-400">
              +${formatCurrency(this.tips, this.currency)}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('hour-pill', HourPill);
