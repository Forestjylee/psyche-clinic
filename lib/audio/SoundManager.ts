// ============================================================
// SoundManager · 基于 Web Audio API 的合成音效系统
//
// 设计目标：
// - 零外部音频资源，纯合成，体积小，公测即可用
// - 提供环境 BGM（低频氛围 pad）+ 各类 SFX
// - SSR 安全：仅在浏览器且有 AudioContext 时工作
// - 后续可扩展为加载真实音频文件（保留 play(name) 接口）
// ============================================================

type SfxName =
  | "click"
  | "hover"
  | "combo"
  | "achievement"
  | "endingGood"
  | "endingBad"
  | "endingNeutral"
  | "levelUp"
  | "locked"
  | "page"
  | "rest"
  | "veil";

class SoundManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmNodes: OscillatorNode[] = [];
  private bgmLfo: OscillatorNode | null = null;
  private bgmFilter: BiquadFilterNode | null = null;
  private bgmRunning = false;
  private _muted = false;
  private _volume = 0.7;
  private _bgmVolume = 0.35;
  private started = false;

  /** 首次用户交互后调用，创建/恢复 AudioContext */
  init(): void {
    if (typeof window === "undefined") return;
    if (this.ctx) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return;
    }
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this._muted ? 0 : this._volume;
      this.master.connect(this.ctx.destination);
      this.started = true;
    } catch {
      this.ctx = null;
    }
  }

  get ready(): boolean {
    return !!this.ctx && this.ctx.state === "running";
  }

  get muted(): boolean {
    return this._muted;
  }
  setMuted(m: boolean): void {
    this._muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : this._volume, this.ctx.currentTime, 0.02);
    }
  }
  setVolume(v: number): void {
    this._volume = Math.max(0, Math.min(1, v));
    if (this.master && this.ctx && !this._muted) {
      this.master.gain.setTargetAtTime(this._volume, this.ctx.currentTime, 0.02);
    }
  }

  // ---------- 基础音符 ----------
  private tone(
    freq: number,
    start: number,
    dur: number,
    type: OscillatorType = "sine",
    gain = 0.3,
    dest?: AudioNode
  ): void {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + start;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest ?? this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  private noise(start: number, dur: number, gain = 0.2, hp = 800): void {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + start;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = hp;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur);
  }

  // ---------- SFX ----------
  play(name: SfxName): void {
    if (!this.ctx || !this.master || this._muted) return;
    switch (name) {
      case "click":
        this.tone(420, 0, 0.08, "triangle", 0.18);
        this.tone(630, 0.01, 0.06, "sine", 0.1);
        break;
      case "hover":
        this.tone(880, 0, 0.04, "sine", 0.05);
        break;
      case "page":
        this.tone(300, 0, 0.12, "sine", 0.14);
        this.tone(450, 0.04, 0.1, "triangle", 0.1);
        this.noise(0, 0.06, 0.06, 1200);
        break;
      case "combo":
        // 上升琶音
        [523, 659, 784, 1047].forEach((f, i) =>
          this.tone(f, i * 0.06, 0.18, "triangle", 0.16)
        );
        this.noise(0, 0.12, 0.08, 1500);
        break;
      case "locked":
        this.tone(180, 0, 0.16, "sawtooth", 0.12);
        this.tone(140, 0.02, 0.14, "square", 0.08);
        break;
      case "rest":
        this.tone(392, 0, 0.5, "sine", 0.12);
        this.tone(523, 0.12, 0.6, "sine", 0.1);
        this.tone(659, 0.24, 0.7, "sine", 0.08);
        break;
      case "veil":
        this.noise(0, 0.3, 0.05, 400);
        this.tone(220, 0, 0.35, "sine", 0.08);
        break;
      case "levelUp":
        [523, 659, 784, 1047, 1319].forEach((f, i) =>
          this.tone(f, i * 0.08, 0.3, "triangle", 0.14)
        );
        break;
      case "achievement":
        // 华彩和弦 + 闪光
        [659, 988, 1319].forEach((f) => this.tone(f, 0, 0.5, "triangle", 0.12));
        [784, 1175, 1568].forEach((f) => this.tone(f, 0.12, 0.5, "sine", 0.1));
        this.tone(2093, 0.28, 0.4, "sine", 0.08);
        this.noise(0, 0.5, 0.04, 3000);
        break;
      case "endingGood":
        [523, 659, 784, 1047].forEach((f, i) =>
          this.tone(f, i * 0.12, 0.8, "sine", 0.14)
        );
        this.tone(1568, 0.5, 1.2, "triangle", 0.08);
        break;
      case "endingBad":
        this.tone(220, 0, 1.0, "sawtooth", 0.14);
        this.tone(165, 0.1, 1.2, "sine", 0.12);
        this.tone(110, 0.25, 1.6, "triangle", 0.1);
        this.noise(0, 0.8, 0.06, 200);
        break;
      case "endingNeutral":
        this.tone(440, 0, 0.8, "sine", 0.12);
        this.tone(523, 0.2, 0.9, "triangle", 0.1);
        this.tone(659, 0.4, 1.0, "sine", 0.08);
        break;
    }
  }

  // ---------- BGM ----------
  startBgm(): void {
    if (!this.ctx || !this.master || this.bgmRunning) return;
    this.bgmRunning = true;
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0;
    this.bgmGain.gain.setTargetAtTime(this._bgmVolume, this.ctx.currentTime, 1.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.6;
    this.bgmFilter = filter;
    this.bgmGain.connect(filter);
    filter.connect(this.master);

    // 三个微微失谐的低频振荡器构成氛围 pad
    const freqs = [110, 138.59, 164.81]; // A2, C#3, E3（A 大调）
    this.bgmNodes = freqs.map((f, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (i - 1) * 6;
      const g = this.ctx!.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.28;
      osc.connect(g);
      g.connect(this.bgmGain!);
      osc.start();
      return osc;
    });

    // 慢速 LFO 调制滤波器，营造呼吸感
    this.bgmLfo = this.ctx.createOscillator();
    this.bgmLfo.frequency.value = 0.07;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 220;
    this.bgmLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    this.bgmLfo.start();
  }

  stopBgm(): void {
    if (!this.ctx || !this.bgmRunning) return;
    this.bgmRunning = false;
    if (this.bgmGain) {
      this.bgmGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    }
    const nodes = this.bgmNodes;
    const lfo = this.bgmLfo;
    window.setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* noop */
        }
      });
      try {
        lfo?.stop();
      } catch {
        /* noop */
      }
    }, 800);
    this.bgmNodes = [];
    this.bgmLfo = null;
    this.bgmFilter = null;
  }

  /** 根据理智值动态调整 BGM 滤波（低理智更压抑） */
  setTension(sanity: number): void {
    if (!this.ctx || !this.bgmFilter) return;
    // 理智 100 → 滤波 900Hz（相对明亮）；理智 0 → 滤波 280Hz（沉闷压抑）
    const cutoff = 280 + (Math.max(0, Math.min(100, sanity)) / 100) * 620;
    this.bgmFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.8);
  }
}

// 单例
let _instance: SoundManager | null = null;
export function getSound(): SoundManager {
  if (!_instance) _instance = new SoundManager();
  return _instance;
}
