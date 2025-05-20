import path from "path";
import { Types } from "../src/types";
import { run } from "./utils/run";

const fixtures = (name: string) => path.resolve(__dirname, "fixtures", name);

describe("E2E edge cases", () => {
  it("handles missing fields gracefully (birthday)", () => {
    const csv = run(fixtures("test-missing.csv"), "csv", "json");
    const prn = run(fixtures("test-missing.prn"), "prn", "json");
    expect(csv).toBe(prn);
  });

  it("renders non-ASCII characters correctly", () => {
    const html = run(fixtures("test.prn"), "prn", "html");
    expect(html).toContain("Børkestraße");
    expect(html).toContain("Smith, John");
  });

  it("skips empty lines and trims spaces", () => {
    const out = run(fixtures("test.csv"), "csv", "json");
    const parsed = JSON.parse(out);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0]).toHaveProperty("name");

    expect((parsed as Types[]).every((r: Types) => r.name)).toBe(true);
  });

  it("errors on invalid format", () => {
    expect(() => run(fixtures("test.csv"), "txt", "html")).toThrow();
  });

  it("errors on invalid output type", () => {
    expect(() => run(fixtures("test.csv"), "csv", "md")).toThrow();
  });
});
