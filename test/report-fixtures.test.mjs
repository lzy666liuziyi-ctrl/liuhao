import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { generateReport } from '../dist/lib/generator.js';

const cases = JSON.parse(fs.readFileSync(new URL('./fixtures/report-cases.json', import.meta.url), 'utf8'));

for (const c of cases) {
  test(`fixture: ${c.name}`, () => {
    const report = generateReport(c.input);
    assert.equal(report.birthYear, c.expect.birthYear);
    assert.equal(report.currentYear, c.expect.currentYear);
    assert.equal(report.yearBoundaryUsed, c.expect.yearBoundaryUsed);
  });
}
