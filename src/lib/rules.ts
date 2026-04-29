export type YearBoundaryRule = 'dahan' | 'lichun' | 'newyear';

/**
 * 五运六气年份切换规则配置。
 * - dahan: 大寒（约1月20日）
 * - lichun: 立春（约2月4日）
 * - newyear: 公历1月1日
 */
export interface WuyunRules {
  yearBoundary: YearBoundaryRule;
}

export const DEFAULT_RULES: WuyunRules = {
  yearBoundary: 'dahan',
};
