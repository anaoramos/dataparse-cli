import {normalizeBirthday, normalizeCreditLimit} from "../utils/normalize";
import iconv from "iconv-lite";
import {Types} from "../types";
import {detectEncoding} from "../utils/encoding";

const FIELD_WIDTHS = {
    name: 16,
    address: 22,
    postcode: 9,
    phone: 14,
    creditLimit: 13,
    birthday: 8
};

export function parsePRN(input: Buffer | string): Types[] {
    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input)
    const encoding = detectEncoding(buffer);
    const decoded = iconv.decode(buffer, encoding)
    const lines = decoded.trim().split('\n')


    if (lines.length < 2) return []

    const dataLines = lines.slice(1)

    return dataLines.map(line => {
        const rawBuffer = iconv.encode(line, encoding);
        const fields = sliceFields(rawBuffer, encoding);

        return {
            name: fields.name,
            address: fields.address,
            postcode: fields.postcode,
            phone: fields.phone,
            creditLimit: normalizeCreditLimit(fields.creditLimit, 100),
            birthday: normalizeBirthday(fields.birthday),
        };
    });

}

function sliceFields(buffer: Buffer, encoding: string): Record<string, string> {
    let offset = 0;
    const result: Record<string, string> = {};

    for (const [field, width] of Object.entries(FIELD_WIDTHS)) {
        const segment = buffer.slice(offset, offset + width);
        result[field] = iconv.decode(segment, encoding).trim();
        offset += width;
    }

    return result;
}