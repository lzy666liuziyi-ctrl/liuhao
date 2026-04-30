import type { WuxingId, WuxingItem } from '../types';

export const wuxingMap: Record<WuxingId, WuxingItem> = {
  wood: { id:'wood', wuxing:'木', tone:'角音', elementColor:'#2f8f6b', theme:'春生、舒展、山林、生发', description:'木行对应角音，取春木生发、清扬舒展之意，适合生成山林、竹风、晨起、舒展类音乐。', mainInstruments:['竹笛','洞箫','古筝','古琴泛音'], natureSounds:['竹林风声','鸟鸣','山溪','春雨'], scenes:['晨起','山林','阅读','舒展','情绪整理'], titleSeeds:['青木生风','竹影流泉','春山初醒','风入青林','木气舒扬'], defaultBpm:68, moodWords:['清新','流动','舒展','轻盈']},
  fire: { id:'fire', wuxing:'火', tone:'徵音', elementColor:'#b94a48', theme:'夏长、温暖、明亮、光感', description:'火行对应徵音，取夏火明朗、温暖上扬之意，适合生成午后、暖阳、茶会、轻快类音乐。', mainInstruments:['笙','琵琶','扬琴','竹笛','古筝'], natureSounds:['夏夜虫鸣','微火声','晨光鸟鸣','茶炉声'], scenes:['午后','暖阳','茶会','轻运动','阳光阅读'], titleSeeds:['赤日微光','夏火轻鸣','心灯初燃','花间徵音','暖阳入怀'], defaultBpm:76, moodWords:['温暖','明亮','轻快','柔和']},
  earth: { id:'earth', wuxing:'土', tone:'宫音', elementColor:'#c2a77a', theme:'中和、安定、大地、茶室', description:'土行对应宫音，取中土安和、厚重平稳之意，适合生成茶室、静坐、阅读、午后安稳类音乐。', mainInstruments:['古琴','埙','古筝','笙','低音鼓'], natureSounds:['山谷风声','细雨','茶水声','庭院环境声'], scenes:['茶室','静坐','阅读','午后','空间音乐'], titleSeeds:['中土安和','黄庭静坐','山居慢音','茶烟入宫','一念归中'], defaultBpm:58, moodWords:['稳定','厚重','温和','安定']},
  metal: { id:'metal', wuxing:'金', tone:'商音', elementColor:'#d8d9dc', theme:'秋收、清肃、空谷、月色', description:'金行对应商音，取秋金清肃、空谷留白之意，适合生成独处、静坐、空谷、月夜类音乐。', mainInstruments:['编钟','磬','洞箫','古琴','琵琶弱奏'], natureSounds:['秋风','远钟','空谷回声','月夜风声'], scenes:['空谷','独处','静坐','茶道','夜间静思'], titleSeeds:['白露清音','秋山远钟','商音入月','金声玉振','风过寒林'], defaultBpm:52, moodWords:['清冷','空灵','留白','收敛']},
  water: { id:'water', wuxing:'水', tone:'羽音', elementColor:'#1d2b3a', theme:'冬藏、深静、流水、夜雨', description:'水行对应羽音，取夜水归藏、深沉低回之意，适合生成睡前、夜雨、冥想、深度放松类音乐。', mainInstruments:['古琴低音','洞箫低音','埙','磬','大提琴低音'], natureSounds:['夜雨','溪流','湖水','远雷','深夜风声'], scenes:['睡前','夜雨','冥想','午休','深夜'], titleSeeds:['夜水归藏','羽音入梦','星河静流','冬藏无声','江月沉音'], defaultBpm:48, moodWords:['深沉','安静','柔和','缓慢']},
};
export const wuxingList = Object.values(wuxingMap);
