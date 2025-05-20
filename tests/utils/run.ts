import fs from "fs";
import {execSync} from "child_process";

export const run = (file: string, format: string, out: string): string => {
    const fileBuffer = fs.readFileSync(file);

    return execSync(`npx ts-node src/index.ts ${format} ${out}`, {
        input: fileBuffer,
        encoding: 'utf-8',
    });

};