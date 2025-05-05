/**
 * Export Manager
 * Handles exporting transaction data to various formats
 */

/**
 * Export transactions to CSV format
 * @param {Array} transactions - Transactions to export
 * @param {string} filename - Name of the export file
 */
export function exportTransactionsToCSV(transactions, filename = 'transaction-history.csv') {
  if (!transactions || !transactions.length) {
    console.error('No transactions to export');
    return;
  }

  try {
    // Define CSV headers
    const headers = [
      'Date',
      'Type',
      'Description',
      'Category',
      'Amount',
      'Income/Expense',
      'Payment Method',
      'Notes'
    ];

    // Convert transactions to CSV rows
    const rows = transactions.map(transaction => {
      return [
        transaction.date,
        transaction.type,
        transaction.description,
        transaction.category,
        transaction.amount.toFixed(2),
        transaction.isIncome ? 'Income' : 'Expense',
        transaction.details?.paymentMethod || '',
        transaction.details?.notes || ''
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Add to document, click to download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting transactions:', error);
  }
}

/**
 * Export transactions to JSON format
 * @param {Array} transactions - Transactions to export
 * @param {string} filename - Name of the export file
 */
export function exportTransactionsToJSON(transactions, filename = 'transaction-history.json') {
  if (!transactions || !transactions.length) {
    console.error('No transactions to export');
    return;
  }

  try {
    // Convert transactions to JSON string
    const jsonContent = JSON.stringify(transactions, null, 2);
    
    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Add to document, click to download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting transactions:', error);
  }
}
