/**
 * Expense Pie Chart Component
 * Renders a pie chart for expense categories using Chart.js
 */

import { LitElement, html, css } from 'lit';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

export class ExpensePieChart extends LitElement {
  static properties = {
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
    this.data = [];
    this.currency = 'USD';
    this.chart = null;
  }

  firstUpdated() {
    this.renderChart();
  }

  updated(changedProperties) {
    if (changedProperties.has('data')) {
      this.renderChart();
    }
  }

  renderChart() {
    console.log("Rendering expense pie chart with data:", this.data);

    if (!this.data || this.data.length === 0) {
      console.log("No data to render expense pie chart");
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

    // iOS-style colors for different expense categories
    const categoryColors = {
      'Monthly Bills': 'rgba(255, 149, 0, 0.8)',      // Orange
      'Everyday Spending': 'rgba(52, 199, 89, 0.8)',  // Green
      'Credit Cards': 'rgba(255, 59, 48, 0.8)',       // Red
      'Housing': 'rgba(0, 122, 255, 0.8)',            // Blue
      'Utilities': 'rgba(88, 86, 214, 0.8)',          // Indigo
      'Transportation': 'rgba(255, 204, 0, 0.8)',     // Yellow
      'Food': 'rgba(90, 200, 250, 0.8)',              // Light Blue
      'Entertainment': 'rgba(255, 45, 85, 0.8)',      // Pink
      'Health': 'rgba(175, 82, 222, 0.8)',            // Purple
      'Other': 'rgba(142, 142, 147, 0.8)'             // Gray
    };

    // Prepare data for pie chart
    const chartData = {
      labels: this.data.map(item => item.category),
      datasets: [{
        data: this.data.map(item => item.amount),
        backgroundColor: this.data.map(item =>
          categoryColors[item.category] || 'rgba(142, 142, 147, 0.7)' // Default gray for unknown categories
        ),
        borderColor: this.data.map(item =>
          categoryColors[item.category]?.replace('0.7', '1') || 'rgba(142, 142, 147, 1)'
        ),
        borderWidth: 1,
        hoverOffset: 4
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '40%', // Donut style chart
      radius: '90%', // Slightly smaller to fit better
      plugins: {
        legend: {
          display: false // We'll handle the legend in our own UI
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#000',
          bodyColor: '#000',
          bodyFont: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            size: 14
          },
          padding: 12,
          cornerRadius: 8,
          boxPadding: 6,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);

              return `${label}: ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.currency
              }).format(value)} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: 'easeOutQuart'
      }
    };

    // Create the chart
    console.log("Creating pie chart with data:", chartData);
    try {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: chartOptions
      });
      console.log("Pie chart created successfully");
    } catch (error) {
      console.error("Error creating pie chart:", error);
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

customElements.define('expense-pie-chart', ExpensePieChart);
