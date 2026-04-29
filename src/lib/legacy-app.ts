import type { GeneratedReport } from './app-types';

/**
 * 把新引擎输出映射成你原先 App.tsx 已使用的字段命名，
 * 便于无痛替换旧逻辑（先跑起来，再逐步重构 UI）。
 */
export function toLegacyResult(report: GeneratedReport) {
  return {
    birth: report.birth,
    current: report.current,
    tizhi: report.tizhi,
    liuQiFang: report.liuQiFang,
    wuYunFang: report.wuYunFang,
    currentQiName: report.currentQiName,
    currentQiIdx: report.currentQiIdx,
    birthQiStep: report.birthQiStep,
    birthJiaLin: report.birthJiaLin,
    birthQiIdx: report.birthQiIdx,
    predQiStep: report.predQiStep,
    predJiaLin: report.predJiaLin,
    predQiIdx: report.predQiIdx,
    birthYear: report.birthYear,
    currentYear: report.currentYear,
    gender: report.gender,
    birthDateStr: report.birthDateStr,
    predDateStr: report.predDateStr,
    yearBoundaryUsed: report.yearBoundaryUsed,
    meta: report.meta,
  };
}

export type LegacyResult = ReturnType<typeof toLegacyResult>;
