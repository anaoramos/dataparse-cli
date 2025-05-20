import {Record} from '../types/Record';

export function parsePRN(input: string): Record[] {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return [];

    lines.shift();

    return lines.map(line => ({
        name: line.slice(0, 16).trim(),
        address: line.slice(16, 38).trim(),
        postcode: line.slice(38, 47).trim(),
        phone: line.slice(47, 61).trim(),
        creditLimit: line.slice(61, 74).trim(),
        birthday: line.slice(74).trim(),
    }));
}
