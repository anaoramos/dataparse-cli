import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';

const fixturesDir = path.resolve(__dirname, 'fixtures');
const cliCommand = `npx ts-node src/index.ts`;


describe('Evaluation-style E2E diff tests', () => {
    const csv = path.join(fixturesDir, 'test.csv.txt');
    const prn = path.join(fixturesDir, 'test.prn.txt');

    const outputs = {
        csvHtml: path.join(fixturesDir, 'csv.html.txt'),
        prnHtml: path.join(fixturesDir, 'prn.html.txt'),
        csvJson: path.join(fixturesDir, 'csv.json.txt'),
        prnJson: path.join(fixturesDir, 'prn.json.txt'),
    };

    it('produces identical HTML output from CSV and PRN', () => {
        fs.writeFileSync(outputs.csvHtml, execSync(`cat ${csv} | ${cliCommand} csv html`, {encoding: 'utf-8'}));
        fs.writeFileSync(outputs.prnHtml, execSync(`cat ${prn} | ${cliCommand} prn html`, {encoding: 'utf-8'}));

        const htmlCsv = fs.readFileSync(outputs.csvHtml, 'utf-8').trim();
        const htmlPrn = fs.readFileSync(outputs.prnHtml, 'utf-8').trim();

        expect(htmlCsv).toBe(htmlPrn);
    });

    it('produces identical JSON output from CSV and PRN', () => {
        fs.writeFileSync(outputs.csvJson, execSync(`cat ${csv} | ${cliCommand} csv json`, {encoding: 'utf-8'}));
        fs.writeFileSync(outputs.prnJson, execSync(`cat ${prn} | ${cliCommand} prn json`, {encoding: 'utf-8'}));

        const jsonCsv = fs.readFileSync(outputs.csvJson, 'utf-8').trim();
        const jsonPrn = fs.readFileSync(outputs.prnJson, 'utf-8').trim();

        expect(jsonCsv).toBe(jsonPrn);
    });
});
