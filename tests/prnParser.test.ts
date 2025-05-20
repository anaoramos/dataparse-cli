import {parsePRN} from '../src/parsers/prnParser';

describe('parsePRN', () => {
    it('parses a real PRN line from the file (Anderson, Paul)', () => {
        const prn = `Name            Address               Postcode Phone         Credit Limit Birthday
Anderson, Paul  Dorpsplein 3A         4532 AA  030 3458986       10909300 19651203`;

        const result = parsePRN(prn);

        expect(result).toEqual([
            {
                name: 'Anderson, Paul',
                address: 'Dorpsplein 3A',
                postcode: '4532 AA',
                phone: '030 3458986',
                creditLimit: '10909300',
                birthday: '19651203',
            },
        ]);
    });


    it('returns an empty array for empty input', () => {
        const prn = '';
        const result = parsePRN(prn);
        expect(result).toEqual([]);
    });

    it('parses line with missing fields as empty strings', () => {
        const line =
            'Anderson, Paul'.padEnd(16, ' ') +
            ''.padEnd(22, ' ') +
            '4532 AA'.padEnd(9, ' ') +
            ''.padEnd(14, ' ') +
            ''.padEnd(13, ' ') +
            ''.padEnd(8, ' ');

        const prn = `Name            Address               Postcode Phone         Credit Limit Birthday\n${line}`;

        const result = parsePRN(prn);

        expect(result).toEqual([
            {
                name: 'Anderson, Paul',
                address: '',
                postcode: '4532 AA',
                phone: '',
                creditLimit: '',
                birthday: '',
            },
        ]);
    });
})
;
