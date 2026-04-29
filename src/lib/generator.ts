import { analyzeByDate, currentQi, getQiAtStep, getYearForWuyunWithConfig, keZhuJiaLinDetail } from './wuyun';
import { xianTianTiZhi } from './tizhi';
import { findFangJi, findWuYunFang } from './fangji';
import type { GeneratedReport } from './app-types';
import { DEFAULT_RULES, type WuyunRules } from './rules';
import { ReportInputError } from './errors';
import { ENGINE_NAME, ENGINE_VERSION } from './meta';

export interface GenerateRuleInput {
  yearBoundary?: WuyunRules['yearBoundary'];
  boundaryConfig?: Partial<WuyunRules['boundaryConfig']>;
}

export interface GenerateInput {
  birthDate: string; // YYYY-MM-DD
  predictDate: string; // YYYY-MM-DD
  gender?: '男' | '女';
  rules?: GenerateRuleInput;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function mustDate(field: 'birthDate' | 'predictDate', dateText: string): Date {
  if (!DATE_PATTERN.test(dateText)) {
    throw new ReportInputError('INVALID_DATE_FORMAT', field, `日期格式错误：${dateText}，应为 YYYY-MM-DD`);
  }
  const [y, m, d] = dateText.split('-').map((v) => Number(v));
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  // 反向校验，避免 2026-02-31 这类被 JS 自动进位
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    throw new ReportInputError('INVALID_DATE_VALUE', field, `非法日期：${dateText}`);
  }
  return date;
}


export function validateInput(input: GenerateInput): ReportInputError[] {
  const errors: ReportInputError[] = [];
  let birth: Date | null = null;
  let predict: Date | null = null;

  try {
    birth = mustDate('birthDate', input.birthDate);
  } catch (error) {
    if (error instanceof ReportInputError) errors.push(error);
    else throw error;
  }

  try {
    predict = mustDate('predictDate', input.predictDate);
  } catch (error) {
    if (error instanceof ReportInputError) errors.push(error);
    else throw error;
  }

  if (birth && predict && predict.getTime() < birth.getTime()) {
    errors.push(new ReportInputError('INVALID_DATE_RANGE', 'predictDate', '预测日期不能早于出生日期'));
  }

  return errors;
}

export function generateReport(input: GenerateInput): GeneratedReport {
  const inputErrors = validateInput(input);
  if (inputErrors.length > 0) throw inputErrors[0];

  const birth = mustDate('birthDate', input.birthDate);
  const predict = mustDate('predictDate', input.predictDate);

  const rules: WuyunRules = {
    ...DEFAULT_RULES,
    ...(input.rules ?? {}),
    boundaryConfig: {
      ...DEFAULT_RULES.boundaryConfig,
      ...(input.rules?.boundaryConfig ?? {}),
    },
  };

  const birthYear = getYearForWuyunWithConfig(birth, rules.yearBoundary, rules.boundaryConfig);
  const currentYear = getYearForWuyunWithConfig(predict, rules.yearBoundary, rules.boundaryConfig);

  const birthResult = analyzeByDate(birth, rules.yearBoundary, rules.boundaryConfig);
  const currentResult = analyzeByDate(predict, rules.yearBoundary, rules.boundaryConfig);

  const tizhi = xianTianTiZhi(
    birthResult.gz.gan,
    birthResult.gz.zhi,
    birthResult.stzq.siTian,
    birthResult.stzq.zaiQuan,
  );

  const liuQiFang = findFangJi(currentResult.stzq.siTian, currentResult.stzq.zaiQuan);
  const wuYunFang = findWuYunFang(currentResult.gz.gan);

  const birthQiIdx = currentQi(birth).index;
  const birthQiStep = getQiAtStep(birthResult.gz.zhi, birthQiIdx);
  const birthJiaLin = keZhuJiaLinDetail(birthQiStep.zhuQi.name, birthQiStep.keQi.name);

  const predQiIdx = currentQi(predict).index;
  const predQiStep = getQiAtStep(currentResult.gz.zhi, predQiIdx);
  const predJiaLin = keZhuJiaLinDetail(predQiStep.zhuQi.name, predQiStep.keQi.name);

  const currentQiName = currentResult.cq?.name ?? '';

  return {
    birth: birthResult,
    current: currentResult,
    tizhi,
    liuQiFang,
    wuYunFang,
    birthYear,
    currentYear,
    birthQiIdx,
    birthQiStep,
    birthJiaLin,
    predQiIdx,
    predQiStep,
    predJiaLin,
    currentQiName,
    currentQiIdx: predQiIdx,
    gender: input.gender ?? '男',
    birthDateStr: input.birthDate,
    predDateStr: input.predictDate,
    yearBoundaryUsed: rules.yearBoundary,
    meta: {
      engine: ENGINE_NAME,
      version: ENGINE_VERSION,
      generatedAt: new Date().toISOString(),
    },
  };
}

export function createDefaultInput(now = new Date()): GenerateInput {
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, '0');
  const d = `${now.getDate()}`.padStart(2, '0');
  return {
    birthDate: '1990-01-01',
    predictDate: `${y}-${m}-${d}`,
    gender: '男',
  };
}


export function generateReportSafe(input: GenerateInput): { ok: true; data: GeneratedReport } | { ok: false; error: ReportInputError } {
  try {
    return { ok: true, data: generateReport(input) };
  } catch (error) {
    if (error instanceof ReportInputError) return { ok: false, error };
    throw error;
  }
}
