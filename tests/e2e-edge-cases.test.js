"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const run = (file, format, out) => {
    const fileBuffer = fs_1.default.readFileSync(file);
    return (0, child_process_1.execSync)(`npx ts-node src/index.ts ${format} ${out}`, {
        input: fileBuffer,
        encoding: 'utf-8',
    });
};
const fixtures = (name) => path_1.default.resolve(__dirname, 'fixtures', name);
describe('E2E edge cases', () => {
    it('handles missing fields gracefully (birthday)', () => {
        const csv = run(fixtures('test-missing.csv'), 'csv', 'json');
        const prn = run(fixtures('test-missing.prn'), 'prn', 'json');
        expect(csv).toBe(prn);
    });
    it('renders non-ASCII characters correctly', () => {
        const html = run(fixtures('test.prn'), 'prn', 'html');
        expect(html).toContain('Bärkestraße');
        expect(html).toContain('John Smith');
    });
    it('skips empty lines and trims spaces', () => {
        const out = run(fixtures('test.csv'), 'csv', 'json');
        const parsed = JSON.parse(out);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
        expect(parsed[0]).toHaveProperty('name');
        expect(parsed.every((r) => r.name)).toBe(true);
    });
    it('errors on invalid format', () => {
        expect(() => run(fixtures('test.csv'), 'txt', 'html')).toThrow();
    });
    it('errors on invalid output type', () => {
        expect(() => run(fixtures('test.csv'), 'csv', 'md')).toThrow();
    });
});
