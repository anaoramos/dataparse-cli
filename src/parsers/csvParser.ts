import {parse} from 'csv-parse/sync';
import {Record} from '../types/Record';
import {normalizeBirthday, normalizeCreditLimit} from "../utils/normalize";

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
        creditLimit: normalizeCreditLimit(row?.['Credit Limit']) || '',
        birthday: normalizeBirthday(row?.Birthday) || '',
    }));
}
