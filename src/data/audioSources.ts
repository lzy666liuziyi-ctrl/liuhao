export type AudioSource = {
  id: string;
  instrument: 'guqin' | 'dongxiao' | 'xun' | 'qing' | 'nature';
  displayName: string;
  fileName: string;
  audioUrl: string;
  sourceName?: string;
  sourcePage?: string;
  author?: string;
  license?: string;
  attributionRequired?: boolean;
  personalUseOnly?: boolean;
  note?: string;
};

export const audioSources: AudioSource[] = [
  { id:'guqin-demo', instrument:'guqin', displayName:'古琴演示音源', fileName:'guqin-demo.mp3', audioUrl:'/samples/guqin/guqin-demo.mp3', personalUseOnly:true, note:'请将下载的古琴音频重命名为 guqin-demo.mp3 后放入 public/samples/guqin/' },
  { id:'dongxiao-demo', instrument:'dongxiao', displayName:'洞箫演示音源', fileName:'dongxiao-demo.mp3', audioUrl:'/samples/dongxiao/dongxiao-demo.mp3', personalUseOnly:true },
  { id:'xun-demo', instrument:'xun', displayName:'埙演示音源', fileName:'xun-demo.mp3', audioUrl:'/samples/xun/xun-demo.mp3', personalUseOnly:true },
  { id:'qing-demo', instrument:'qing', displayName:'磬演示音源', fileName:'qing-demo.mp3', audioUrl:'/samples/qing/qing-demo.mp3', personalUseOnly:true },
  { id:'rain-demo', instrument:'nature', displayName:'雨声演示音源', fileName:'rain.mp3', audioUrl:'/samples/nature/rain.mp3', personalUseOnly:true },
];

export const findAudioByInstrumentKeyword = (instrumentText: string) => {
  if (instrumentText.includes('古琴')) return audioSources.find((a) => a.id === 'guqin-demo');
  if (instrumentText.includes('洞箫')) return audioSources.find((a) => a.id === 'dongxiao-demo');
  if (instrumentText.includes('埙')) return audioSources.find((a) => a.id === 'xun-demo');
  if (instrumentText.includes('磬')) return audioSources.find((a) => a.id === 'qing-demo');
  return undefined;
};
