import {parse} from 'csv-parse/sync';
import {Record} from '../types/Record';

export function parseCSV(input: string): Record[] {
    if (!input.trim()) return [];

    const parsed = parse(input, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return parsed.map((row: any) => ({
        name: row?.Name || '',
        address: row?.Address || '',
        postcode: row?.Postcode || '',
        phone: row?.Phone || '',
        creditLimit: row?.['Credit Limit'] || '',
        birthday: row?.Birthday || '',
    }));
}
