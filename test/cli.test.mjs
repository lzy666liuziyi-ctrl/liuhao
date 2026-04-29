import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';

test('cli json mode returns parseable report with boundary field', () => {
  const output = execFileSync('node', [
    'dist/cli.js',
    '--birth', '1990-01-01',
    '--predict', '2026-04-28',
    '--boundary', 'lichun',
    '--json',
  ], { encoding: 'utf8' });

  const parsed = JSON.parse(output);
  assert.equal(parsed.yearBoundaryUsed, 'lichun');
  assert.equal(parsed.birthDateStr, '1990-01-01');
  assert.equal(parsed.meta.engine, 'wuyunliuqi-engine');
});

test('cli help prints usage', () => {
  const output = execFileSync('node', ['dist/cli.js', '--help'], { encoding: 'utf8' });
  assert.match(output, /Usage:/);
  assert.match(output, /--boundary/);
});

test('cli unknown option exits with code 2', () => {
  const result = spawnSync('node', ['dist/cli.js', '--unknown-opt'], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Unknown option/);
});


test('cli invalid date exits with code 2 and structured error text', () => {
  const result = spawnSync('node', ['dist/cli.js', '--birth', '1990-02-31', '--predict', '2026-04-28'], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /INVALID_DATE_VALUE/);
  assert.match(result.stderr, /birthDate/);
});


test('cli date range error exits with code 2', () => {
  const result = spawnSync('node', ['dist/cli.js', '--birth', '2026-04-28', '--predict', '1990-01-01'], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /INVALID_DATE_RANGE/);
});
