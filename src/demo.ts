import { createDefaultInput, generateReportSafe } from './lib/generator';
import { toLegacyResult } from './lib/legacy-app';
import { summarizeReport } from './lib/format';

const input = {
  ...createDefaultInput(new Date('2026-04-28T00:00:00Z')),
  rules: { yearBoundary: 'lichun' as const },
};

const reportResult = generateReportSafe(input);

if (!reportResult.ok) {
  console.error({ code: reportResult.error.code, field: reportResult.error.field, message: reportResult.error.message });
  throw new Error(reportResult.error.message);
}

const report = reportResult.data;
const legacy = toLegacyResult(report);

console.log({
  input,
  ...summarizeReport(report),
  legacyFields: Object.keys(legacy).length,
});
