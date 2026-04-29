import type { GeneratedReport } from './app-types';

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/**
 * 运行时守卫：用于前端缓存反序列化后做最小结构校验。
 */
export function isGeneratedReport(v: unknown): v is GeneratedReport {
  if (!isObject(v)) return false;
  if (!isObject(v.birth) || !isObject(v.current) || !isObject(v.meta)) return false;

  return (
    typeof v.birthYear === 'number' &&
    typeof v.currentYear === 'number' &&
    typeof v.birthDateStr === 'string' &&
    typeof v.predDateStr === 'string' &&
    typeof v.yearBoundaryUsed === 'string' &&
    typeof v.meta.engine === 'string' &&
    typeof v.meta.version === 'string' &&
    typeof v.meta.generatedAt === 'string'
  );
}
