import type { YearBoundaryConfig } from './rules';

/**
 * 五运六气核心计算引擎 v2.1
 * 目标：在保持你原始口径的前提下，提供可维护、可类型检查的实现。
 */

export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
export const WU_XING = ['木', '火', '土', '金', '水'] as const;
export const LIU_QI_NAMES = ['厥阴风木', '少阴君火', '少阳相火', '太阴湿土', '阳明燥金', '太阳寒水'] as const;

export type TianGan = (typeof TIAN_GAN)[number];
export type DiZhi = (typeof DI_ZHI)[number];
export type WuXing = (typeof WU_XING)[number];
export type LiuQiName = (typeof LIU_QI_NAMES)[number];
export type YinYang = '阳' | '阴';

export interface GanZhi {
  gan: TianGan;
  zhi: DiZhi;
}

export const GAN_ATTR: Record<TianGan, { yinYang: YinYang; wx: WuXing; order: number }> = {
  甲: { yinYang: '阳', wx: '木', order: 1 },
  乙: { yinYang: '阴', wx: '木', order: 2 },
  丙: { yinYang: '阳', wx: '火', order: 3 },
  丁: { yinYang: '阴', wx: '火', order: 4 },
  戊: { yinYang: '阳', wx: '土', order: 5 },
  己: { yinYang: '阴', wx: '土', order: 6 },
  庚: { yinYang: '阳', wx: '金', order: 7 },
  辛: { yinYang: '阴', wx: '金', order: 8 },
  壬: { yinYang: '阳', wx: '水', order: 9 },
  癸: { yinYang: '阴', wx: '水', order: 10 },
};

export const ZHI_ATTR: Record<DiZhi, { yinYang: YinYang; wx: WuXing; animal: string; order: number }> = {
  子: { yinYang: '阳', wx: '水', animal: '鼠', order: 1 },
  丑: { yinYang: '阴', wx: '土', animal: '牛', order: 2 },
  寅: { yinYang: '阳', wx: '木', animal: '虎', order: 3 },
  卯: { yinYang: '阴', wx: '木', animal: '兔', order: 4 },
  辰: { yinYang: '阳', wx: '土', animal: '龙', order: 5 },
  巳: { yinYang: '阴', wx: '火', animal: '蛇', order: 6 },
  午: { yinYang: '阳', wx: '火', animal: '马', order: 7 },
  未: { yinYang: '阴', wx: '土', animal: '羊', order: 8 },
  申: { yinYang: '阳', wx: '金', animal: '猴', order: 9 },
  酉: { yinYang: '阴', wx: '金', animal: '鸡', order: 10 },
  戌: { yinYang: '阳', wx: '土', animal: '狗', order: 11 },
  亥: { yinYang: '阴', wx: '水', animal: '猪', order: 12 },
};

export const GAN_HE: Record<string, { wx: WuXing; name: string }> = {
  甲己: { wx: '土', name: '土运' },
  乙庚: { wx: '金', name: '金运' },
  丙辛: { wx: '水', name: '水运' },
  丁壬: { wx: '木', name: '木运' },
  戊癸: { wx: '火', name: '火运' },
};

export const ZHI_LIUQI: Record<DiZhi, LiuQiName> = {
  子: '少阴君火', 午: '少阴君火',
  丑: '太阴湿土', 未: '太阴湿土',
  寅: '少阳相火', 申: '少阳相火',
  卯: '阳明燥金', 酉: '阳明燥金',
  辰: '太阳寒水', 戌: '太阳寒水',
  巳: '厥阴风木', 亥: '厥阴风木',
};

export const LIUQI_ORDER: LiuQiName[] = ['厥阴风木', '少阴君火', '太阴湿土', '少阳相火', '阳明燥金', '太阳寒水'];
export const ZHU_QI: LiuQiName[] = ['厥阴风木', '少阴君火', '少阳相火', '太阴湿土', '阳明燥金', '太阳寒水'];

export const WX_SHENG: Record<WuXing, WuXing> = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
export const WX_KE: Record<WuXing, WuXing> = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
export const WU_YIN: Record<WuXing, string> = { 木: '角', 火: '徵', 土: '宫', 金: '商', 水: '羽' };
export const WX_COLORS: Record<WuXing, string> = { 木: '#4CAF50', 火: '#F44336', 土: '#8D6E63', 金: '#78909C', 水: '#2196F3' };
export const WX_COLORS_LIGHT: Record<WuXing, string> = { 木: '#E8F5E9', 火: '#FFEBEE', 土: '#EFEBE9', 金: '#ECEFF1', 水: '#E3F2FD' };

export const LIUQI_DETAIL: Record<LiuQiName, { sanyinSanyang: string; yinYang: YinYang; wx: WuXing; zangfu: string }> = {
  厥阴风木: { sanyinSanyang: '厥阴', yinYang: '阴', wx: '木', zangfu: '肝胆' },
  少阴君火: { sanyinSanyang: '少阴', yinYang: '阴', wx: '火', zangfu: '心小肠' },
  太阴湿土: { sanyinSanyang: '太阴', yinYang: '阴', wx: '土', zangfu: '脾胃' },
  少阳相火: { sanyinSanyang: '少阳', yinYang: '阳', wx: '火', zangfu: '三焦胆' },
  阳明燥金: { sanyinSanyang: '阳明', yinYang: '阳', wx: '金', zangfu: '肺大肠' },
  太阳寒水: { sanyinSanyang: '太阳', yinYang: '阳', wx: '水', zangfu: '肾膀胱' },
};

const SI_TIAN_TO_ZAI_QUAN: Record<LiuQiName, LiuQiName> = {
  少阴君火: '阳明燥金',
  太阴湿土: '太阳寒水',
  少阳相火: '厥阴风木',
  阳明燥金: '少阴君火',
  太阳寒水: '太阴湿土',
  厥阴风木: '少阳相火',
};

const QI_JIEQI = [
  { range: '大寒~春分', months: '1月下旬~3月下旬' },
  { range: '春分~小满', months: '3月下旬~5月下旬' },
  { range: '小满~大暑', months: '5月下旬~7月下旬' },
  { range: '大暑~秋分', months: '7月下旬~9月下旬' },
  { range: '秋分~小雪', months: '9月下旬~11月下旬' },
  { range: '小雪~大寒', months: '11月下旬~1月下旬' },
] as const;

const normalizeIndex = (v: number, modulo: number) => ((v % modulo) + modulo) % modulo;

/** 年干支（按公历年直接换算） */
export function yearGZ(year: number): GanZhi {
  return { gan: TIAN_GAN[normalizeIndex(year - 4, 10)], zhi: DI_ZHI[normalizeIndex(year - 4, 12)] };
}

/** 日干支（简化算法，满足一般应用） */
export function dayGZ(date: Date): GanZhi {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const g = y % 100;
  const G = g === 0 ? 100 : g;
  const C = Math.floor(y / 100);
  const i = m % 2 === 1 ? 0 : 6;
  const dgz = 49 + Math.floor(C / 4) - 2 * C + G + Math.floor(G / 4) + Math.floor((26 * (m + 1)) / 10) + d - 1 + i;
  return { gan: TIAN_GAN[normalizeIndex(dgz, 10)], zhi: DI_ZHI[normalizeIndex(dgz, 12)] };
}

/** 月干支（简化模型，按公历月份） */
export function monthGZ(year: number, month: number): GanZhi {
  const yearGanIdx = normalizeIndex(year - 4, 10);
  const monthGanIdx = (yearGanIdx * 2 + month) % 10;
  const monthZhiIdx = (month + 1) % 12;
  return { gan: TIAN_GAN[monthGanIdx], zhi: DI_ZHI[monthZhiIdx] };
}

/** 时干支 */
export function hourGZ(dayGan: TianGan, hour: number): GanZhi {
  const dayGanIdx = TIAN_GAN.indexOf(dayGan);
  const zhiIdx = normalizeIndex(Math.floor((hour + 1) / 2), 12);
  const startIdx = (dayGanIdx % 5) * 2;
  const ganIdx = (startIdx + zhiIdx) % 10;
  return { gan: TIAN_GAN[ganIdx], zhi: DI_ZHI[zhiIdx] };
}

/** 中运（岁运） */
export function zhongYun(yearGan: TianGan) {
  const g = GAN_ATTR[yearGan];
  const foundPair = Object.keys(GAN_HE).find((k) => k.includes(yearGan));
  if (!foundPair) throw new Error(`天干${yearGan}无合化配对`);
  const pair = yearGan + foundPair.replace(yearGan, '');
  const h = GAN_HE[pair] || GAN_HE[foundPair];
  const taiBu = g.yinYang === '阳' ? '太过' : '不及';
  const yin = g.yinYang === '阳' ? '太' : '少';
  const shuYin = WU_YIN[h.wx];

  return {
    wx: h.wx,
    name: h.name,
    taiBu,
    fullName: `${yin}${shuYin}(${h.name}${taiBu})`,
    yinYang: g.yinYang,
    color: WX_COLORS[h.wx],
  };
}

export function siTianZaiQuan(yearZhi: DiZhi) {
  const siTian = ZHI_LIUQI[yearZhi];
  const zaiQuan = SI_TIAN_TO_ZAI_QUAN[siTian];
  return { siTian, zaiQuan };
}

/** 主运（五步） */
export function zhuYun(yearGan: TianGan) {
  const startYY = GAN_ATTR[yearGan].yinYang === '阳' ? '太' : '少';
  const wxList: WuXing[] = ['木', '火', '土', '金', '水'];
  return wxList.map((wx, i) => {
    const yy = (startYY === '太' ? (i % 2 === 0 ? '太' : '少') : (i % 2 === 0 ? '少' : '太')) as '太' | '少';
    return { step: i + 1, wx, yy, name: `${yy}${WU_YIN[wx]}(${wx})`, color: WX_COLORS[wx] };
  });
}

/** 客运（以中运为初运） */
export function keYun(yearGan: TianGan) {
  const zy = zhongYun(yearGan);
  const wxList: WuXing[] = ['木', '火', '土', '金', '水'];
  const startIdx = wxList.indexOf(zy.wx);
  const startYY = GAN_ATTR[yearGan].yinYang === '阳' ? '太' : '少';

  return Array.from({ length: 5 }, (_, i) => {
    const wx = wxList[(startIdx + i) % 5];
    const yy = (startYY === '太' ? (i % 2 === 0 ? '太' : '少') : (i % 2 === 0 ? '少' : '太')) as '太' | '少';
    return { step: i + 1, wx, yy, name: `${yy}${WU_YIN[wx]}(${wx})`, color: WX_COLORS[wx] };
  });
}

export function zhuQi() {
  return ZHU_QI.map((qi, i) => ({
    step: i + 1,
    name: qi,
    ...LIUQI_DETAIL[qi],
    jieQi: QI_JIEQI[i],
    color: WX_COLORS[LIUQI_DETAIL[qi].wx],
  }));
}

export function keQi(yearZhi: DiZhi) {
  const st = ZHI_LIUQI[yearZhi];
  const stIdx = LIUQI_ORDER.indexOf(st);
  const positions = ['初之气', '二之气', '三之气（司天）', '四之气', '五之气', '终之气（在泉）'];

  return Array.from({ length: 6 }, (_, i) => {
    const qiIdx = normalizeIndex(stIdx + i - 2, 6);
    const name = LIUQI_ORDER[qiIdx];
    return {
      step: i + 1,
      name,
      position: positions[i],
      ...LIUQI_DETAIL[name],
      jieQi: QI_JIEQI[i],
      color: WX_COLORS[LIUQI_DETAIL[name].wx],
    };
  });
}

export function keZhuJiaLin(yearZhi: DiZhi) {
  const zq = zhuQi();
  const kq = keQi(yearZhi);
  return zq.map((z, i) => {
    const k = kq[i];
    const zYY = LIUQI_DETAIL[z.name].yinYang;
    const kYY = LIUQI_DETAIL[k.name].yinYang;
    let relation: string;
    let desc: string;
    let status: 'good' | 'warning' | 'bad';

    if (z.name === k.name) {
      relation = '同气';
      desc = '主客同气，其气专一，气候特征明显';
      status = 'good';
    } else if (zYY === kYY) {
      relation = '不相得';
      desc = '主客同阴阳，气不相得，易生异常';
      status = 'warning';
    } else {
      relation = '相得';
      desc = '主客异阴阳，气相得，气候平和';
      status = 'good';
    }

    if ((z.name.includes('君火') && k.name.includes('相火')) || (z.name.includes('相火') && k.name.includes('君火'))) {
      relation = '顺';
      desc = '君相二火相加，顺而不逆';
      status = 'good';
    }

    return { step: i + 1, zhuQi: z.name, keQi: k.name, relation, desc, status, position: k.position };
  });
}

export function keZhuJiaLinDetail(zhuQiName: LiuQiName, keQiName: LiuQiName) {
  const zDetail = LIUQI_DETAIL[zhuQiName];
  const kDetail = LIUQI_DETAIL[keQiName];
  const sameYinYang = zDetail.yinYang === kDetail.yinYang;
  const isJunXiang = (zhuQiName.includes('君火') && keQiName.includes('相火')) || (zhuQiName.includes('相火') && keQiName.includes('君火'));

  if (zhuQiName === keQiName) return { relation: '同气', desc: '主客同气，其气专一，气候特征明显', status: 'good' as const };
  if (isJunXiang) {
    if (zhuQiName.includes('君火')) return { relation: '顺', desc: '君位臣则顺（君火为主，相火为客）', status: 'good' as const };
    return { relation: '逆', desc: '臣位君则逆（相火为主，君火为客）', status: 'bad' as const };
  }
  if (sameYinYang) return { relation: '不相得', desc: '主客同阴阳，气不相得，易生异常', status: 'warning' as const };
  return { relation: '相得', desc: '主客异阴阳，气相得，气候平和', status: 'good' as const };
}

function checkPingQi(zyWX: WuXing, taiBu: string, stWX: WuXing) {
  if (taiBu === '太过' && WX_KE[stWX] === zyWX) return { isPingQi: true, reason: `${zyWX}运太过，司天${stWX}克之，成平气之年` };
  if (taiBu === '不及' && WX_SHENG[stWX] === zyWX) return { isPingQi: true, reason: `${zyWX}运不及，司天${stWX}生之，成平气之年` };
  if (taiBu === '太过' && WX_KE[zyWX] === stWX) return { isPingQi: true, reason: `${zyWX}运太过，克司天${stWX}，成平气之年` };
  return { isPingQi: false, reason: '' };
}

export function tongHua(yearGan: TianGan, yearZhi: DiZhi) {
  const zy = zhongYun(yearGan);
  const { siTian, zaiQuan } = siTianZaiQuan(yearZhi);
  const stWX = LIUQI_DETAIL[siTian].wx;
  const zqWX = LIUQI_DETAIL[zaiQuan].wx;
  const zhiWX = ZHI_ATTR[yearZhi].wx;
  const ganYY = GAN_ATTR[yearGan].yinYang;

  const results: Array<{ type: string; desc: string; level: 'special' | 'normal' | 'pingqi' }> = [];

  if (zy.wx === stWX) results.push({ type: '天符', desc: `中运${zy.name}与司天${siTian}同化`, level: 'special' });
  if (zy.wx === zhiWX) results.push({ type: '岁会', desc: `中运${zy.name}与岁支${yearZhi}同化`, level: 'special' });
  if (zy.wx === stWX && zy.wx === zhiWX) results.push({ type: '太乙天符', desc: '中运、司天、岁支三者同化', level: 'special' });
  if (ganYY === '阳' && zy.wx === zqWX) results.push({ type: '同天符', desc: `阳年太过，中运${zy.name}与在泉${zaiQuan}同化`, level: 'special' });
  if (ganYY === '阴' && zy.wx === zqWX) results.push({ type: '同岁会', desc: `阴年不及，中运${zy.name}与在泉${zaiQuan}同化`, level: 'special' });

  const pingQi = checkPingQi(zy.wx, zy.taiBu, stWX);
  if (pingQi.isPingQi) results.push({ type: '平气', desc: pingQi.reason, level: 'pingqi' });
  if (results.length === 0) results.push({ type: '普通年', desc: '非运气同化年份，按常规太过/不及推算', level: 'normal' });

  const main =
    results.find((r) => r.type === '太乙天符') ??
    results.find((r) => r.type === '天符') ??
    results.find((r) => r.type === '岁会') ??
    results.find((r) => r.type === '同天符') ??
    results.find((r) => r.type === '同岁会') ??
    results.find((r) => r.type === '平气') ??
    results[0];

  return { type: main.type, desc: main.desc, isSpecial: main.level === 'special', allResults: results, isPingQi: pingQi.isPingQi, pingQiReason: pingQi.reason };
}

export function currentQi(date: Date) {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  const ranges = [
    { start: 120, end: 321, name: '初之气', idx: 0 },
    { start: 321, end: 521, name: '二之气', idx: 1 },
    { start: 521, end: 723, name: '三之气', idx: 2 },
    { start: 723, end: 923, name: '四之气', idx: 3 },
    { start: 923, end: 1122, name: '五之气', idx: 4 },
    { start: 1122, end: 1232, name: '终之气', idx: 5 },
    { start: 0, end: 120, name: '终之气', idx: 5 },
  ] as const;

  const hit = ranges.find((r) => md >= r.start && md < r.end) ?? ranges[0];
  return { name: hit.name, index: hit.idx, ...QI_JIEQI[hit.idx] };
}

export function getQiAtStep(zhi: DiZhi, qiIndex: number) {
  const idx = Math.max(0, Math.min(5, qiIndex));
  const zq = zhuQi();
  const kq = keQi(zhi);
  return { zhuQi: zq[idx], keQi: kq[idx] };
}

export function getYearForWuyun(date: Date, boundary: 'dahan' | 'lichun' | 'newyear' = 'dahan'): number {
  return getYearForWuyunWithConfig(date, boundary, { dahanDay: 21, lichunDay: 4 });
}

export function getYearForWuyunWithConfig(
  date: Date,
  boundary: 'dahan' | 'lichun' | 'newyear',
  config: YearBoundaryConfig,
): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (boundary === 'newyear') return year;
  if (boundary === 'dahan') return month === 1 && day < config.dahanDay ? year - 1 : year;
  return month < 2 || (month === 2 && day < config.lichunDay) ? year - 1 : year;
}

export function analyze(year: number, date?: Date) {
  const gz = yearGZ(year);
  const zy = zhongYun(gz.gan);
  const stzq = siTianZaiQuan(gz.zhi);
  const zyun = zhuYun(gz.gan);
  const kyun = keYun(gz.gan);
  const zqi = zhuQi();
  const kqi = keQi(gz.zhi);
  const jialin = keZhuJiaLin(gz.zhi);
  const th = tongHua(gz.gan, gz.zhi);
  const cq = date ? currentQi(date) : null;
  const dg = date ? dayGZ(date) : null;

  return { year, gz, zy, stzq, zyun, kyun, zqi, kqi, jialin, th, cq, dg, shengXiao: ZHI_ATTR[gz.zhi].animal };
}

export function analyzeByDate(date: Date, boundary: 'dahan' | 'lichun' | 'newyear' = 'dahan', config: YearBoundaryConfig = { dahanDay: 21, lichunDay: 4 }) {
  const year = getYearForWuyunWithConfig(date, boundary, config);
  return analyze(year, date);
}
