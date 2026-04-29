import type { analyze } from './wuyun';
import type { findFangJi, findWuYunFang } from './fangji';
import type { xianTianTiZhi } from './tizhi';

export type AnalyzeResult = ReturnType<typeof analyze>;
export type TizhiResult = ReturnType<typeof xianTianTiZhi>;
export type LiuQiFangResult = NonNullable<ReturnType<typeof findFangJi>>;
export type WuYunFangResult = NonNullable<ReturnType<typeof findWuYunFang>>;

export interface GeneratedReport {
  birth: AnalyzeResult;
  current: AnalyzeResult;
  tizhi: TizhiResult;
  liuQiFang: LiuQiFangResult | null;
  wuYunFang: WuYunFangResult | null;
  birthYear: number;
  currentYear: number;
  birthQiIdx: number;
  birthQiStep: {
    zhuQi: AnalyzeResult['zqi'][number];
    keQi: AnalyzeResult['kqi'][number];
  };
  birthJiaLin: {
    relation: string;
    desc: string;
    status: 'good' | 'warning' | 'bad';
  };
  predQiIdx: number;
  predQiStep: {
    zhuQi: AnalyzeResult['zqi'][number];
    keQi: AnalyzeResult['kqi'][number];
  };
  predJiaLin: {
    relation: string;
    desc: string;
    status: 'good' | 'warning' | 'bad';
  };
  currentQiName: string;
  currentQiIdx: number;
  gender: '男' | '女';
  birthDateStr: string;
  predDateStr: string;
  yearBoundaryUsed: 'dahan' | 'lichun' | 'newyear';
  meta: {
    engine: string;
    version: string;
    generatedAt: string;
  };
}
