declare const process: { argv: string[]; exit: (code?: number) => never };

import { generateReportSafe } from './lib/generator';
import type { YearBoundaryRule } from './lib/rules';
import { summarizeReport } from './lib/format';

interface CliArgs {
  birthDate: string;
  predictDate: string;
  gender: '男' | '女';
  boundary: YearBoundaryRule;
  json: boolean;
  help: boolean;
}

const HELP_TEXT = `
五运六气 CLI

Usage:
  npm run cli -- --birth 1990-01-01 --predict 2026-04-28 --boundary lichun
  npm run cli -- --birth 1990-01-01 --predict 2026-04-28 --boundary dahan --json

Options:
  --birth YYYY-MM-DD
  --predict YYYY-MM-DD
  --gender 男|女
  --boundary dahan|lichun|newyear
  --json
  --help
`.trim();

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    birthDate: '1990-01-01',
    predictDate: new Date().toISOString().slice(0, 10),
    gender: '男',
    boundary: 'dahan',
    json: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }

    if (token === '--birth' && next) {
      args.birthDate = next;
      i += 1;
      continue;
    }
    if (token === '--predict' && next) {
      args.predictDate = next;
      i += 1;
      continue;
    }
    if (token === '--gender' && next && (next === '男' || next === '女')) {
      args.gender = next;
      i += 1;
      continue;
    }
    if (token === '--boundary' && next && (next === 'dahan' || next === 'lichun' || next === 'newyear')) {
      args.boundary = next;
      i += 1;
      continue;
    }
    if (token === '--json') {
      args.json = true;
      continue;
    }

    if (token.startsWith('--')) {
      console.error(`[ERROR] Unknown option: ${token}`);
      console.error(HELP_TEXT);
      process.exit(2);
    }
  }

  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(HELP_TEXT);
    return;
  }

  const result = generateReportSafe({
    birthDate: args.birthDate,
    predictDate: args.predictDate,
    gender: args.gender,
    rules: { yearBoundary: args.boundary },
  });

  if (!result.ok) {
    console.error(`[ERROR] ${result.error.code} (${result.error.field}): ${result.error.message}`);
    process.exit(2);
  }

  const report = result.data;
  const summary = summarizeReport(report);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('=== 五运六气报告摘要 ===');
  console.log(`出生日期: ${report.birthDateStr}`);
  console.log(`预测日期: ${report.predDateStr}`);
  console.log(`换年口径: ${summary.yearBoundaryUsed}`);
  console.log(`引擎版本: ${report.meta.engine}@${summary.engineVersion}`);
  console.log(`出生年份: ${summary.birthYear} (${summary.birthGZ})`);
  console.log(`预测年份: ${summary.currentYear} (${summary.currentGZ})`);
  console.log(`当前之气: ${summary.currentQi}`);
  console.log(`体质类型: ${summary.tizhiType}`);
  console.log(`六气方: ${summary.liuQiFang}`);
  console.log(`五运方: ${summary.wuYunFang}`);
}

main();
