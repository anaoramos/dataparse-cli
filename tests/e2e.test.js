"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fixturesDir = path_1.default.resolve(__dirname, 'fixtures');
const cliCommand = `npx ts-node src/index.ts`;
describe('Evaluation-style E2E diff tests', () => {
    const csv = path_1.default.join(fixturesDir, 'test.csv.txt');
    const prn = path_1.default.join(fixturesDir, 'test.prn.txt');
    const outputs = {
        csvHtml: path_1.default.join(fixturesDir, 'csv.html.txt'),
        prnHtml: path_1.default.join(fixturesDir, 'prn.html.txt'),
        csvJson: path_1.default.join(fixturesDir, 'csv.json.txt'),
        prnJson: path_1.default.join(fixturesDir, 'prn.json.txt'),
    };
    it('produces identical HTML output from CSV and PRN', () => {
        fs_1.default.writeFileSync(outputs.csvHtml, (0, child_process_1.execSync)(`cat ${csv} | ${cliCommand} csv html`, { encoding: 'utf-8' }));
        fs_1.default.writeFileSync(outputs.prnHtml, (0, child_process_1.execSync)(`cat ${prn} | ${cliCommand} prn html`, { encoding: 'utf-8' }));
        const htmlCsv = fs_1.default.readFileSync(outputs.csvHtml, 'utf-8').trim();
        const htmlPrn = fs_1.default.readFileSync(outputs.prnHtml, 'utf-8').trim();
        expect(htmlCsv).toBe(htmlPrn);
    });
    it('produces identical JSON output from CSV and PRN', () => {
        fs_1.default.writeFileSync(outputs.csvJson, (0, child_process_1.execSync)(`cat ${csv} | ${cliCommand} csv json`, { encoding: 'utf-8' }));
        fs_1.default.writeFileSync(outputs.prnJson, (0, child_process_1.execSync)(`cat ${prn} | ${cliCommand} prn json`, { encoding: 'utf-8' }));
        const jsonCsv = fs_1.default.readFileSync(outputs.csvJson, 'utf-8').trim();
        const jsonPrn = fs_1.default.readFileSync(outputs.prnJson, 'utf-8').trim();
        expect(jsonCsv).toBe(jsonPrn);
    });
});
