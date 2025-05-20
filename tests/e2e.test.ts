import fs from "fs";
import path from "path";
import { run } from "./utils/run";

const fixturesDir = path.resolve(__dirname, "fixtures");

describe("Evaluation-style E2E diff tests", () => {
  const csv = path.join(fixturesDir, "test.csv");
  const prn = path.join(fixturesDir, "test.prn");

  afterEach(() => {
    Object.values(outputs).forEach((file) => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });
  });

  const outputs = {
    csvHtml: path.join(fixturesDir, "csv.html.txt"),
    prnHtml: path.join(fixturesDir, "prn.html.txt"),
    csvJson: path.join(fixturesDir, "csv.json.txt"),
    prnJson: path.join(fixturesDir, "prn.json.txt"),
  };

  it("produces identical HTML output from CSV and PRN", () => {
    fs.writeFileSync(outputs.csvHtml, run(csv, "csv", "html"));
    fs.writeFileSync(outputs.prnHtml, run(prn, "prn", "html"));

    const htmlCsv = fs.readFileSync(outputs.csvHtml, "utf-8").trim();
    const htmlPrn = fs.readFileSync(outputs.prnHtml, "utf-8").trim();

    expect(htmlCsv).toBe(htmlPrn);
  });

  it("produces identical JSON output from CSV and PRN", () => {
    fs.writeFileSync(outputs.csvJson, run(csv, "csv", "json"));
    fs.writeFileSync(outputs.prnJson, run(prn, "prn", "json"));

    const jsonCsv = fs.readFileSync(outputs.csvJson, "utf-8").trim();
    const jsonPrn = fs.readFileSync(outputs.prnJson, "utf-8").trim();

    expect(jsonCsv).toBe(jsonPrn);
  });
});
