import {Record} from '../types/Record';
import {normalizeBirthday, normalizeCreditLimit} from "../utils/normalize";

const FIELD_WIDTHS = {
    name: 16,
    address: 22,
    postcode: 9,
    phone: 14,
    creditLimit: 13,
    birthday: 8
};

export function parsePRN(input: string): Record[] {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return [];

    lines.shift();

    let pos = 0
    const fields = {
        name: [pos, pos += FIELD_WIDTHS.name],
        address: [pos, pos += FIELD_WIDTHS.address],
        postcode: [pos, pos += FIELD_WIDTHS.postcode],
        phone: [pos, pos += FIELD_WIDTHS.phone],
        creditLimit: [pos, pos += FIELD_WIDTHS.creditLimit],
        birthday: [pos, pos + FIELD_WIDTHS.birthday]
    }


    return lines.map(line => ({
        name: line.slice(...fields.name).trim(),
        address: line.slice(...fields.address).trim(),
        postcode: line.slice(...fields.postcode).trim(),
        phone: line.slice(...fields.phone).trim(),
        creditLimit: normalizeCreditLimit(line.slice(...fields.creditLimit), 100),
        birthday: normalizeBirthday(line.slice(...fields.birthday))
    }))
}
