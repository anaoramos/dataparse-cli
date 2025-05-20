import { Types } from '../types';


export function renderJSON(data: Types[]): string {
    if (!Array.isArray(data)) {
        throw new TypeError('Input to renderJSON must be an array of records');
    }
    return JSON.stringify(data, null, 2);
}