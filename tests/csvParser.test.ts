import {parseCSV} from '../src/parsers/csvParser';

describe('parseCSV', () => {
    it('parses a real example from test.csv (Anderson, Paul)', () => {
        const csv = `Name,Address,Postcode,Phone,Credit Limit,Birthday
"Anderson, Paul",Dorpsplein 3A,4532 AA,030 3458986,109093,03/12/1965`;

        const result = parseCSV(csv);

        expect(result).toEqual([
            {
                name: 'Anderson, Paul',
                address: 'Dorpsplein 3A',
                postcode: '4532 AA',
                phone: '030 3458986',
                creditLimit: '109093',
                birthday: '03/12/1965',
            },
        ]);
    });

    it('handles missing credit limit by defaulting to empty string', () => {
        const csv = `Name,Address,Postcode,Phone,Birthday
"Anderson, Paul",Dorpsplein 3A,4532 AA,030 3458986,03/12/1965`;

        const result = parseCSV(csv);
        expect(result[0].creditLimit).toBe('');
    });

    it('returns an empty array for empty input', () => {
        const csv = '';
        const result = parseCSV(csv);
        expect(result).toEqual([]);
    });

    it('ignores extra/unexpected columns', () => {
        const csv = `Name,Address,Postcode,Phone,Credit Limit,Birthday,Notes
"Anderson, Paul",Dorpsplein 3A,4532 AA,030 3458986,109093,03/12/1965,VIP`;

        const result = parseCSV(csv);

        expect(result[0].name).toBe('Anderson, Paul');
        expect((result[0] as any).Notes).toBeUndefined();
    });
});
