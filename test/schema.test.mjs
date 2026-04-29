import test from 'node:test';
import assert from 'node:assert/strict';

import { generateReport } from '../dist/lib/generator.js';
import { isGeneratedReport } from '../dist/lib/schema.js';

test('isGeneratedReport accepts real report', () => {
  const report = generateReport({
    birthDate: '1990-01-01',
    predictDate: '2026-04-28',
    gender: '男',
  });

  assert.equal(isGeneratedReport(report), true);
});

test('isGeneratedReport rejects malformed payload', () => {
  const bad = {
    birthYear: '1990',
    currentYear: 2026,
    meta: { engine: 'x' },
  };
  assert.equal(isGeneratedReport(bad), false);
});
