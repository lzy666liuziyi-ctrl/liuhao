import type { LiuQiName, TianGan } from './wuyun';

export interface FangJiHerb {
  herb: string;
  amount: string;
}

export interface LiuQiFang {
  name: string;
  siTian: LiuQiName;
  zaiQuan: LiuQiName;
  indication: string;
  symptoms: string[];
  composition: FangJiHerb[];
  decoction: string;
  explanation: string;
  modifications: Record<string, string>;
}

export interface WuYunFang {
  name: string;
  ganGroup: string;
  indication: string;
  composition: FangJiHerb[];
  explanation: string;
}

const LIU_QI_FANG_DB: LiuQiFang[] = [
  {
    name: '少阴司天方（示例）',
    siTian: '少阴君火',
    zaiQuan: '阳明燥金',
    indication: '君火偏旺、燥热并见。',
    symptoms: ['心烦失眠', '咽干口燥', '干咳少痰'],
    composition: [
      { herb: '黄芩', amount: '9g' },
      { herb: '麦冬', amount: '12g' },
      { herb: '玄参', amount: '10g' },
      { herb: '炙甘草', amount: '6g' },
    ],
    decoction: '清水浸泡30分钟后煎煮两次，混合分2次温服。',
    explanation: '清君火、润燥金，以平司天在泉偏性。',
    modifications: {
      初之气: '偏寒者加生姜。',
      三之气: '火盛者加丹皮。',
      五之气: '燥甚者加沙参玉竹。',
    },
  },
  {
    name: '厥阴司天方（示例）',
    siTian: '厥阴风木',
    zaiQuan: '少阳相火',
    indication: '风木偏动，肝胆失调。',
    symptoms: ['眩晕', '胁肋胀痛', '情绪易怒'],
    composition: [
      { herb: '柴胡', amount: '10g' },
      { herb: '白芍', amount: '12g' },
      { herb: '黄芩', amount: '9g' },
      { herb: '炙甘草', amount: '6g' },
    ],
    decoction: '常规煎服。',
    explanation: '疏肝理气，调和木火。',
    modifications: {
      二之气: '胁痛重者加郁金。',
      四之气: '火旺者加栀子。',
    },
  },
];

const WU_YUN_FANG_DB: WuYunFang[] = [
  {
    name: '甲己土运调理方（示例）',
    ganGroup: '甲己',
    indication: '土运失衡，脾胃运化不健。',
    composition: [
      { herb: '党参', amount: '10g' },
      { herb: '白术', amount: '10g' },
      { herb: '茯苓', amount: '12g' },
      { herb: '炙甘草', amount: '6g' },
    ],
    explanation: '补土健脾，兼顾运化。',
  },
  {
    name: '丙辛水运调理方（示例）',
    ganGroup: '丙辛',
    indication: '水运偏颇，寒热错杂。',
    composition: [
      { herb: '黄芩', amount: '9g' },
      { herb: '泽泻', amount: '12g' },
      { herb: '麦冬', amount: '10g' },
      { herb: '炙甘草', amount: '6g' },
    ],
    explanation: '调水运，兼清兼润。',
  },
];

export function findFangJi(siTian: LiuQiName, zaiQuan: LiuQiName): LiuQiFang | null {
  return LIU_QI_FANG_DB.find((v) => v.siTian === siTian && v.zaiQuan === zaiQuan) ?? null;
}

export function findWuYunFang(yearGan: TianGan): WuYunFang | null {
  const group = ['甲己', '乙庚', '丙辛', '丁壬', '戊癸'].find((g) => g.includes(yearGan));
  if (!group) return null;
  return WU_YUN_FANG_DB.find((v) => v.ganGroup === group) ?? null;
}
