# Data format translation CLI

A command-line utility that converts between CSV/PRN formats and outputs JSON/HTML. This tool demonstrates handling of
various data format challenges including character encoding, field normalization, and consistent output generation.

## Features

- Supports CSV and PRN (fixed-width) input formats
- Outputs to JSON or HTML formats
- Handles non-ASCII characters correctly (ä, ß, etc.)
- Consistent output regardless of input format

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Core Dependencies

1. `commander`

   - Purpose: CLI argument parsing and command structure
   - Why: Provides a robust, feature-rich way to build command-line interfaces
   - Benefits: Type-safe command definitions, automatic help generation

2. `csv-parse`

   - Purpose: Streaming CSV parsing
   - Why: Memory-efficient processing of CSV files
   - Benefits: Handles quoted fields, custom delimiters, and streaming data

3. `iconv-lite`

   - Purpose: Character encoding conversion
   - Why: Handles various text encodings (windows-1252, iso-8859-1, utf-8)
   - Benefits: Pure JavaScript implementation, no system dependencies

4. `jschardet`
   - Purpose: Character encoding detection
   - Why: Automatically detects input file encoding
   - Benefits: Supports multiple encoding formats, high accuracy

## Usage

The tool reads from stdin and writes to stdout. Use it as part of a command pipeline:

```bash
# Convert CSV to HTML
cat Workbook2.csv | npm start csv html > output.html

# Convert PRN to JSON
cat Workbook2.prn | npm start prn json > output.json
```

Or install globally and use as a CLI tool:

```bash
npm install -g .

# Then use as:
cat Workbook2.csv | dataparse-cli csv html > output.html
cat Workbook2.prn | dataparse-cli prn json > output.json
```

## Code Structure

The codebase follows a modular architecture:

```
src/
├── parsers/          # Input format parsers
│   ├── csvParser.ts  # CSV format parser
│   └── prnParser.ts  # PRN format parser
├── formatters/       # Output formatters
│   ├── htmlFormatter.ts
│   └── jsonFormatter.ts
├── utils/           # Shared utilities
│   ├── encoding.ts  # Character encoding handling
│   └── normalize.ts # Field normalization functions
└── index.ts       # CLI entry point
```

## Implementation Challenges & Solutions

1. **Character Encoding**

   - Challenge: Handling German special characters (`ä`, `ß`) correctly
   - Solution:
     - Used `jschardet` to automatically detect the file encoding.
     - Used `iconv-lite` to decode the raw bytes to normalized UTF-8 strings.
     - Applied `.normalize('NFC')` to ensure consistent Unicode representation.

2. **Credit Limit Normalization**

   - Challenge: Credit limits appear in mixed formats — e.g., `"98300"`, `"9898.3"`, or `"10,000"`.
   - Solution:
     - Stripped all non-numeric characters (except `.`).
     - Converted the cleaned number to a float.
     - Applied a scaling factor if needed (e.g., cents → decimal).
     - Final format: fixed to 2 decimal places (e.g., `"9898.30"`).

3. **Date Normalization**
   - Challenge: Dates were provided in different formats — e.g., `19990920`, `01/01/1990`, or `1999-09-20`.
   - Solution:
     - Extracted digit sequences from the string.
     - Detected format heuristically:
       - If in `YYYYMMDD` or already hyphenated, output as `YYYY-MM-DD`.
       - If in `DD/MM/YYYY`, converted using string splits and padding.
     - Invalid or empty dates result in an empty string.
