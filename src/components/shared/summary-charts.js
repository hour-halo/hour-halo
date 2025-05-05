/**
 * Summary Charts Component
 * Renders charts for the Summary view using Chart.js
 */

import { LitElement, html, css } from 'lit';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

export class SummaryCharts extends LitElement {
  static properties = {
    type: { type: String }, // 'earnings' or 'hours'
    data: { type: Array },
    currency: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();
    this.type = 'earnings';
    this.data = [];
    this.currency = 'USD';
    this.chart = null;
  }

  firstUpdated() {
    this.renderChart();
  }

  updated(changedProperties) {
    if (changedProperties.has('data') || changedProperties.has('type')) {
      this.renderChart();
    }
  }

  renderChart() {
    console.log("Rendering chart with data:", this.data);

    if (!this.data || this.data.length === 0) {
      console.log("No data to render chart");
      return;
    }

    const canvas = this.shadowRoot.querySelector('canvas');
    if (!canvas) {
      console.error("Canvas element not found in shadow DOM");
      return;
    }

    // Destroy existing chart if it exists
    if (this.chart) {
      console.log("Destroying existing chart");
      this.chart.destroy();
    }

    console.log("Getting canvas context");
    const ctx = canvas.getContext('2d');

    // Prepare data based on chart type
    let chartData, chartOptions;

    if (this.type === 'earnings') {
      chartData = {
        labels: this.data.map(item => item.day.substring(0, 3)),
        datasets: [{
          label: 'Earnings',
          data: this.data.map(item => item.earnings),
          backgroundColor: 'rgba(0, 122, 255, 0.5)',
          borderColor: 'rgba(0, 122, 255, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 16,
        }]
      };

      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: this.currency
                }).format(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: this.currency,
                  maximumFractionDigits: 0
                }).format(value);
              }
            }
          }
        }
      };
    } else {
      // Hours chart
      chartData = {
        labels: this.data.map(item => item.day.substring(0, 3)),
        datasets: [{
          label: 'Hours',
          data: this.data.map(item => item.hours),
          backgroundColor: 'rgba(52, 199, 89, 0.5)',
          borderColor: 'rgba(52, 199, 89, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 16,
        }]
      };

      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return context.raw + ' hours';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value + 'h'
            }
          }
        }
      };
    }

    // Create the chart
    console.log("Creating chart with data:", chartData);
    try {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
      console.log("Chart created successfully");
    } catch (error) {
      console.error("Error creating chart:", error);
    }
  }

  render() {
    return html`<canvas></canvas>`;
  }

  // Clean up chart when element is removed
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.chart) {
      this.chart.destroy();
    }
  }
}

customElements.define('summary-charts', SummaryCharts);
