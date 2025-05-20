"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvParser_1 = require("./parsers/csvParser");
const prnParser_1 = require("./parsers/prnParser");
const jsonRenderer_1 = require("./renderer/jsonRenderer");
const htmlRenderer_1 = require("./renderer/htmlRenderer");
const inputFormat = process.argv[2];
const outputFormat = process.argv[3];
if (!['csv', 'prn'].includes(inputFormat)) {
    process.stderr.write('Invalid input format\n');
    process.exit(1);
}
if (!['json', 'html'].includes(outputFormat)) {
    process.stderr.write('Invalid output format\n');
    process.exit(1);
}
const readStdin = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', chunk => data += chunk);
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', err => reject(err));
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = yield readStdin();
        if (!input.trim()) {
            process.stdout.write(outputFormat === 'json' ? '[]' : '<table></table>');
            return;
        }
        const records = inputFormat === 'csv' ? (0, csvParser_1.parseCSV)(input) : (0, prnParser_1.parsePRN)(input);
        const output = outputFormat === 'json' ? (0, jsonRenderer_1.renderJSON)(records) : (0, htmlRenderer_1.renderHTML)(records);
        process.stdout.write(output);
    }
    catch (_a) {
        process.stderr.write('Failed to process input\n');
        process.exit(1);
    }
}))();
