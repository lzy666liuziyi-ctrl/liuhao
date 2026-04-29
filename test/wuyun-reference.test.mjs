import test from 'node:test';
import assert from 'node:assert/strict';

import { yearGZ, siTianZaiQuan, analyzeByDate } from '../dist/lib/wuyun.js';

// 基础参考点（公开常识，固定不变）
test('yearGZ reference: 1984 is 甲子', () => {
  const gz = yearGZ(1984);
  assert.equal(gz.gan, '甲');
  assert.equal(gz.zhi, '子');
});

test('siTianZaiQuan mapping should be symmetric pair for 子年', () => {
  const stzq = siTianZaiQuan('子');
  assert.equal(stzq.siTian, '少阴君火');
  assert.equal(stzq.zaiQuan, '阳明燥金');
});

test('analyzeByDate uses boundary rule', () => {
  const jan25 = new Date('2026-01-25T00:00:00Z');
  const dahan = analyzeByDate(jan25, 'dahan');
  const lichun = analyzeByDate(jan25, 'lichun');

  assert.equal(dahan.year, 2026);
  assert.equal(lichun.year, 2025);
});
