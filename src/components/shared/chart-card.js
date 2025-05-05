/**
 * Chart Card Component
 * A reusable component for displaying charts
 */

import { LitElement, html, css } from 'lit';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export class ChartCard extends LitElement {
  static properties = {
    title: { type: String },
    type: { type: String }, // 'bar', 'line', 'pie', etc.
    data: { type: Object },
    options: { type: Object },
    height: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
    }
    
    .chart-container {
      position: relative;
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.type = 'bar';
    this.data = {};
    this.options = {};
    this.height = 200;
    this.chart = null;
  }

  firstUpdated() {
    this.initChart();
  }

  updated(changedProperties) {
    if (changedProperties.has('data') || changedProperties.has('options') || changedProperties.has('type')) {
      // Destroy existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }
      
      // Initialize new chart with updated data
      this.initChart();
    }
  }

  initChart() {
    const canvas = this.shadowRoot.querySelector('canvas');
    if (!canvas) return;
    
    // Create chart instance
    this.chart = new Chart(canvas, {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.options
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up chart instance when component is removed
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    return html`
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        ${this.title ? html`<h3 class="text-lg font-medium mb-2">${this.title}</h3>` : ''}
        <div class="chart-container" style="height: ${this.height}px;">
          <canvas></canvas>
        </div>
      </div>
    `;
  }
}

customElements.define('chart-card', ChartCard);
