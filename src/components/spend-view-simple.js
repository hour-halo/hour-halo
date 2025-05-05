/**
 * Simplified Spend View Component
 * Basic version for testing
 */

import { LitElement, html, css } from 'lit';

export class SpendViewSimple extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      color: #007aff;
    }
    
    .budget-card {
      background-color: #f2f2f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .budget-amount {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .progress-bar {
      height: 8px;
      background-color: #e5e5ea;
      border-radius: 4px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      width: 30%;
      background-color: #34c759;
      border-radius: 4px;
    }
    
    .add-button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 16px;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>Spend</h2>
        
        <div class="budget-card">
          <div class="budget-amount">$200.00</div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div>$60.00 spent · $140.00 left</div>
        </div>
        
        <div>
          <p>This is a simplified version of the Spend tab for testing.</p>
          <p>No expenses to display yet.</p>
        </div>
        
        <button class="add-button">Add Expense</button>
      </div>
    `;
  }
}

customElements.define('spend-view-simple', SpendViewSimple);
