/**
 * 先天体质判断系统 v2.1
 * 说明：在你原始实现基础上做“可运行 + 类型收敛 + 缺失函数补齐”。
 */

import type { DiZhi, LiuQiName, TianGan, WuXing } from './wuyun';
import { GAN_ATTR, GAN_HE, LIUQI_DETAIL, WX_KE, WX_SHENG, ZHI_LIUQI } from './wuyun';

const WX_ZANG: Record<WuXing, string> = { 木: '肝', 火: '心', 土: '脾', 金: '肺', 水: '肾' };

const TAI_GUO_SHOU_XIE: Record<WuXing, { zang: string; wx: WuXing; symptoms: string[]; classic: string }> = {
  木: { zang: '脾', wx: '土', symptoms: ['善怒', '眩冒巅疾', '飧泄'], classic: '岁木太过，脾土受邪。' },
  火: { zang: '肺', wx: '金', symptoms: ['喘咳', '谵妄', '心痛'], classic: '岁火太过，肺金受邪。' },
  土: { zang: '肾', wx: '水', symptoms: ['腹痛', '清厥', '足痿'], classic: '岁土太过，肾水受邪。' },
  金: { zang: '肝', wx: '木', symptoms: ['两胁疼痛', '目赤', '耳无所闻'], classic: '岁金太过，肝木受邪。' },
  水: { zang: '心', wx: '火', symptoms: ['身热', '心烦', '躁悸'], classic: '岁水太过，邪害心火。' },
};

const BU_JI_SHOU_XIE: Record<WuXing, { zang: string; wx: WuXing; symptoms: string[]; classic: string; chengWX: WuXing }> = {
  木: { zang: '肝', wx: '木', symptoms: ['胁痛', '溏泄', '目涩'], classic: '岁木不及，生气失应。', chengWX: '金' },
  火: { zang: '心', wx: '火', symptoms: ['胸痛', '畏寒', '心悸'], classic: '岁火不及，长政不用。', chengWX: '水' },
  土: { zang: '脾', wx: '土', symptoms: ['腹满', '食减', '泄泻'], classic: '岁土不及，化气不令。', chengWX: '木' },
  金: { zang: '肺', wx: '金', symptoms: ['咳嗽喘满', '自汗', '皮燥'], classic: '岁金不及，生气乃用。', chengWX: '火' },
  水: { zang: '肾', wx: '水', symptoms: ['腰膝重着', '浮肿', '耳鸣'], classic: '岁水不及，长气反用。', chengWX: '土' },
};

const LIU_QI_TI_ZHI: Record<LiuQiName, { name: string; zodiac: string[]; jingLuo: string[] }> = {
  厥阴风木: { name: '风性体质', zodiac: ['蛇', '猪'], jingLuo: ['足厥阴肝经', '足少阳胆经'] },
  少阴君火: { name: '热性体质', zodiac: ['鼠', '马'], jingLuo: ['手少阴心经', '手太阳小肠经'] },
  太阴湿土: { name: '湿性体质', zodiac: ['牛', '羊'], jingLuo: ['足太阴脾经', '足阳明胃经'] },
  少阳相火: { name: '火性体质', zodiac: ['虎', '猴'], jingLuo: ['手少阳三焦经', '手厥阴心包经'] },
  阳明燥金: { name: '燥性体质', zodiac: ['兔', '鸡'], jingLuo: ['手阳明大肠经', '手太阴肺经'] },
  太阳寒水: { name: '寒性体质', zodiac: ['龙', '狗'], jingLuo: ['足太阳膀胱经', '足少阴肾经'] },
};

function getYunWuXing(yearGan: TianGan): WuXing {
  const pair = Object.entries(GAN_HE).find(([k]) => k.includes(yearGan));
  if (!pair) throw new Error(`无法推导 ${yearGan} 的中运五行`);
  return pair[1].wx;
}

function getClassicRef(yunWX: WuXing, taiBu: '太过' | '不及') {
  const source = taiBu === '太过' ? TAI_GUO_SHOU_XIE[yunWX] : BU_JI_SHOU_XIE[yunWX];
  return `《素问·气交变大论》：${source.classic}`;
}

function getTiZhiType(yunWX: WuXing, taiBu: '太过' | '不及', siTian: LiuQiName) {
  return `${yunWX}运${taiBu} + ${siTian}司天`;
}

function analyzeShengKeZhiHua(yunWX: WuXing, taiBu: '太过' | '不及', zhuRuoWX: WuXing, ciRuoWX: WuXing) {
  const zhuSheng = WX_SHENG[zhuRuoWX];
  const zhuKe = WX_KE[zhuRuoWX];
  const zhuBeiSheng = (Object.entries(WX_SHENG).find(([, v]) => v === zhuRuoWX)?.[0] ?? '木') as WuXing;
  const zhuBeiKe = (Object.entries(WX_KE).find(([, v]) => v === zhuRuoWX)?.[0] ?? '木') as WuXing;

  const shengKeFenXi = taiBu === '太过'
    ? `${yunWX}运太过，本气偏盛，所胜之${WX_ZANG[zhuRuoWX]}受克。`
    : `${yunWX}运不及，本气不足，${WX_ZANG[zhuRuoWX]}系统偏虚并可见乘侮。`;

  return {
    zhuRuoWX,
    ciRuoWX,
    zhuSheng,
    zhuKe,
    zhuBeiSheng,
    zhuBeiKe,
    shengKeFenXi,
    zhuanHua: `${yunWX}${taiBu} -> ${zhuRuoWX}受累 -> ${ciRuoWX}联动`,
  };
}

function generateYiFaBing(zhuRuoZang: string, zhuRuoSymptoms: string[], ciRuoZang: string) {
  return `先天易发：${zhuRuoZang}/${ciRuoZang}相关问题，常见表现：${zhuRuoSymptoms.slice(0, 4).join('、')}。`;
}

export function getLiuQiTiZhi(yearZhi: DiZhi) {
  const siTian = ZHI_LIUQI[yearZhi];
  const data = LIU_QI_TI_ZHI[siTian];
  return {
    ...data,
    siTian,
    zaiQuan: siTian,
    wx: LIUQI_DETAIL[siTian].wx,
  };
}

export function analyzeFourFactors(yunWX: WuXing, taiBu: '太过' | '不及', zhuRuoWX: WuXing) {
  return {
    ming: { name: '命（先天）', percent: 40, desc: `${yunWX}运${taiBu}，先天${WX_ZANG[zhuRuoWX]}偏弱。` },
    yun: { name: '运（后天）', percent: 30, desc: '饮食作息运动影响。' },
    kanYu: { name: '堪舆（环境）', percent: 20, desc: '地域气候与居住环境影响。' },
    deXing: { name: '德行（心性）', percent: 10, desc: '情绪心态与人际关系影响。' },
  };
}

export function xianTianTiZhi(yearGan: TianGan, yearZhi: DiZhi, siTian: LiuQiName, zaiQuan: LiuQiName) {
  const yunWX = getYunWuXing(yearGan);
  const taiBu = (GAN_ATTR[yearGan].yinYang === '阳' ? '太过' : '不及') as '太过' | '不及';

  const primary = taiBu === '太过' ? TAI_GUO_SHOU_XIE[yunWX] : BU_JI_SHOU_XIE[yunWX];
  const zhuRuoWX = primary.wx;
  const ciRuoWX = LIUQI_DETAIL[siTian].wx;

  const shengKe = analyzeShengKeZhiHua(yunWX, taiBu, zhuRuoWX, ciRuoWX);
  const liuQiTiZhi = getLiuQiTiZhi(yearZhi);
  const fourFactors = analyzeFourFactors(yunWX, taiBu, zhuRuoWX);

  const wuzang = (['木', '火', '土', '金', '水'] as WuXing[]).map((wx) => {
    const isPrimary = wx === zhuRuoWX;
    const isSecondary = wx === ciRuoWX;
    const score = isPrimary ? 65 : isSecondary ? 78 : 100;
    return { wx, zang: WX_ZANG[wx], risk: isPrimary ? '主弱' : isSecondary ? '次弱' : '平和', score };
  });

  return {
    gan: yearGan,
    zhi: yearZhi,
    yunWX,
    taiBu,
    siTian,
    zaiQuan,
    yunName: `${yunWX}运${taiBu}`,
    zhuRuoZang: `${primary.zang}${zhuRuoWX}`,
    zhuRuoWX,
    zhuRuoSymptoms: primary.symptoms,
    ciRuoZang: `${WX_ZANG[ciRuoWX]}${ciRuoWX}`,
    ciRuoWX,
    ciRuoSymptoms: [LIUQI_DETAIL[siTian].zangfu],
    tizhiType: getTiZhiType(yunWX, taiBu, siTian),
    shengKe,
    yiFaBing: generateYiFaBing(primary.zang, primary.symptoms, WX_ZANG[ciRuoWX]),
    classicRef: getClassicRef(yunWX, taiBu),
    liuQiTiZhi,
    fourFactors,
    wuzang,
  };
}
