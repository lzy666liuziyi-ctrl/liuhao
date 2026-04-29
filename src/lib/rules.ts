export type YearBoundaryRule = 'dahan' | 'lichun' | 'newyear';

export interface YearBoundaryConfig {
  /** 大寒切换日（默认 21，表示 1 月 21 日 00:00 后进入新年） */
  dahanDay: number;
  /** 立春切换日（默认 4，表示 2 月 4 日 00:00 后进入新年） */
  lichunDay: number;
}

/**
 * 五运六气年份切换规则配置。
 * - dahan: 大寒（约1月20/21）
 * - lichun: 立春（约2月4）
 * - newyear: 公历1月1日
 */
export interface WuyunRules {
  yearBoundary: YearBoundaryRule;
  boundaryConfig: YearBoundaryConfig;
}

export const DEFAULT_RULES: WuyunRules = {
  yearBoundary: 'dahan',
  boundaryConfig: {
    dahanDay: 21,
    lichunDay: 4,
  },
};
