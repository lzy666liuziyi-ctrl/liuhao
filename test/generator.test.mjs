import test from 'node:test';
import assert from 'node:assert/strict';

import { generateReport, generateReportSafe, validateInput } from '../dist/lib/generator.js';
import { toLegacyResult } from '../dist/lib/legacy-app.js';

// 固定样例：仅验证“结构稳定 + 关键字段存在”，避免把算法微调变成脆弱快照。
test('generateReport returns stable core fields', () => {
  const report = generateReport({
    birthDate: '1990-01-01',
    predictDate: '2026-04-28',
    gender: '男',
    rules: { yearBoundary: 'lichun' },
  });

  assert.equal(report.birthYear, 1989);
  assert.equal(report.currentYear, 2026);
  assert.equal(report.yearBoundaryUsed, 'lichun');
  assert.equal(typeof report.currentQiName, 'string');
  assert.equal(report.meta.engine, 'wuyunliuqi-engine');
  assert.match(report.meta.version, /^\d+\.\d+\.\d+/);
  assert.ok(report.tizhi.tizhiType.length > 0);
  assert.ok(report.birth.gz.gan.length > 0);
});

test('generateReportSafe catches invalid dates', () => {
  const res = generateReportSafe({
    birthDate: '1990-02-31',
    predictDate: '2026-04-28',
    gender: '男',
  });

  assert.equal(res.ok, false);
  if (!res.ok) {
    assert.equal(res.error.code, 'INVALID_DATE_VALUE');
    assert.equal(res.error.field, 'birthDate');
  }
});

test('yearBoundary rules produce different year mapping around January', () => {
  const baseInput = { birthDate: '1990-01-01', predictDate: '2026-01-25', gender: '男' };

  const byDahan = generateReport({ ...baseInput, rules: { yearBoundary: 'dahan' } });
  const byLichun = generateReport({ ...baseInput, rules: { yearBoundary: 'lichun' } });

  assert.equal(byDahan.currentYear, 2026);
  assert.equal(byLichun.currentYear, 2025);
});

test('legacy adapter preserves key public fields', () => {
  const report = generateReport({ birthDate: '1990-01-01', predictDate: '2026-04-28', gender: '男' });
  const legacy = toLegacyResult(report);

  assert.equal(legacy.birthYear, report.birthYear);
  assert.equal(legacy.currentYear, report.currentYear);
  assert.equal(legacy.currentQiName, report.currentQiName);
  assert.equal(legacy.yearBoundaryUsed, report.yearBoundaryUsed);
});


test('generateReportSafe catches invalid date range (predict before birth)', () => {
  const res = generateReportSafe({
    birthDate: '2026-04-28',
    predictDate: '1990-01-01',
    gender: '男',
  });

  assert.equal(res.ok, false);
  if (!res.ok) {
    assert.equal(res.error.code, 'INVALID_DATE_RANGE');
    assert.equal(res.error.field, 'predictDate');
  }
});


test('validateInput returns multiple errors without throwing', () => {
  const errors = validateInput({
    birthDate: 'bad-date',
    predictDate: '2026-02-31',
    gender: '男',
  });

  assert.equal(errors.length, 2);
  assert.equal(errors[0].field, 'birthDate');
  assert.equal(errors[1].field, 'predictDate');
});
