import type { GeneratedReport } from './app-types';

export interface ReportSummary {
  birthYear: number;
  birthGZ: string;
  currentYear: number;
  currentGZ: string;
  currentQi: string;
  yearBoundaryUsed: 'dahan' | 'lichun' | 'newyear';
  engineVersion: string;
  tizhiType: string;
  liuQiFang: string;
  wuYunFang: string;
}

export function summarizeReport(report: GeneratedReport): ReportSummary {
  return {
    birthYear: report.birthYear,
    birthGZ: `${report.birth.gz.gan}${report.birth.gz.zhi}`,
    currentYear: report.currentYear,
    currentGZ: `${report.current.gz.gan}${report.current.gz.zhi}`,
    currentQi: report.currentQiName,
    yearBoundaryUsed: report.yearBoundaryUsed,
    engineVersion: report.meta.version,
    tizhiType: report.tizhi.tizhiType,
    liuQiFang: report.liuQiFang?.name ?? '无匹配方',
    wuYunFang: report.wuYunFang?.name ?? '无匹配方',
  };
}
