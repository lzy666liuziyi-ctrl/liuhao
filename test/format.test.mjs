import test from 'node:test';
import assert from 'node:assert/strict';

import { generateReport } from '../dist/lib/generator.js';
import { summarizeReport } from '../dist/lib/format.js';

test('summarizeReport extracts stable display fields', () => {
  const report = generateReport({
    birthDate: '1990-01-01',
    predictDate: '2026-04-28',
    gender: '男',
    rules: { yearBoundary: 'lichun' },
  });

  const s = summarizeReport(report);
  assert.equal(s.birthYear, 1989);
  assert.equal(s.currentYear, 2026);
  assert.equal(s.yearBoundaryUsed, 'lichun');
  assert.equal(s.engineVersion, report.meta.version);
  assert.ok(s.birthGZ.length === 2);
});
