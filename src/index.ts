import { parseCSV } from "./parsers/csvParser";
import { parsePRN } from "./parsers/prnParser";
import { renderJSON } from "./renderer/jsonRenderer";
import { renderHTML } from "./renderer/htmlRenderer";
import { InputFormat, OutputFormat } from "./types";

const rawInputFormat = process.argv[2];
const rawOutputFormat = process.argv[3];

if (!["csv", "prn"].includes(rawInputFormat)) {
  process.stderr.write("Invalid input format\n");
  process.exit(1);
}

if (!["json", "html"].includes(rawOutputFormat)) {
  process.stderr.write("Invalid output format\n");
  process.exit(1);
}

const inputFormat = rawInputFormat as InputFormat;
const outputFormat = rawOutputFormat as OutputFormat;

const readStdin = async (): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    process.stdin.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks)));
    process.stdin.on("error", reject);
  });
};

(async () => {
  try {
    const inputBuffer = await readStdin();

    const records =
      inputFormat === "csv" ? parseCSV(inputBuffer) : parsePRN(inputBuffer);
    const output =
      outputFormat === "json" ? renderJSON(records) : renderHTML(records);

    process.stdout.write(output);
  } catch {
    process.stderr.write("Failed to process input\n");
    process.exit(1);
  }
})();
