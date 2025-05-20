import {parse} from 'csv-parse/sync';
import {Types} from '../types';
import {normalizeBirthday, normalizeCreditLimit} from "../utils/normalize";
import {decodeToUtf8} from '../utils/encoding'

export function parseCSV(input: Buffer | string): Types[] {
    const decoded = decodeToUtf8(input);
    if (!decoded.trim()) return []

    const parsed = parse(input, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
    });

    return parsed.map((row: any) => ({
        name: row?.Name || '',
        address: row?.Address || '',
        postcode: row?.Postcode || '',
        phone: row?.Phone || '',
        creditLimit: normalizeCreditLimit(row?.['Credit Limit']),
        birthday: normalizeBirthday(row?.Birthday) || '',
    }));
}
