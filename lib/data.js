import fs from 'node:fs';
import path from 'node:path';

const dataFile = path.join(process.cwd(), 'data.json');

export function readRecords() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

export function writeRecords(records) {
  fs.writeFileSync(dataFile, JSON.stringify(records, null, 2) + '\n');
}
