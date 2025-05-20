import iconv from "iconv-lite";
import jschardet from "jschardet";

export function detectEncoding(input: Buffer): string {
  const detection = jschardet.detect(input);
  return detection.encoding?.toLowerCase() || "windows-1252";
}

export function decodeToUtf8(input: Buffer | string): string {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const encoding = detectEncoding(buffer);
  return iconv.decode(buffer, encoding).normalize("NFC");
}
