import { Types } from '../types';

export function renderHTML(data: Types[]): string {
    if (data.length === 0) {
        return `
      <html>
        <head><meta charset="UTF-8"><title>Data Output</title></head>
        <body>
          <table border="1">
            <thead><tr><th>No data</th></tr></thead>
            <tbody></tbody>
          </table>
        </body>
      </html>
    `.trim();
    }

    const headers = Object.keys(data[0]);

    const headerRow = headers.map(h => `<th>${h}</th>`).join('');
    const bodyRows = data.map(row =>
        `<tr>${headers.map(h => `<td>${row[h as keyof Types]}</td>`).join('')}</tr>`
    ).join('\n');

    return `
    <html>
      <head><meta charset="UTF-8"><title>Data Output</title></head>
      <body>
        <table border="1">
          <thead><tr>${headerRow}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </body>
    </html>
  `.trim();
}
