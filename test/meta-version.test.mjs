import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { ENGINE_NAME, ENGINE_VERSION } from '../dist/lib/meta.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

test('engine metadata should stay in sync with package version/name', () => {
  assert.equal(ENGINE_NAME, pkg.name);
  assert.equal(ENGINE_VERSION, pkg.version);
});
