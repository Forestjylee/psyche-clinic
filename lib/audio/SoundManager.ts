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
  | "veil"
  | "memory";

class SoundManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  /** BGM 音频元素（加载 MP3 循环播放） */
  private bgmEl: HTMLAudioElement | null = null;
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
    if (this.bgmEl) {
      this.bgmEl.volume = m ? 0 : this._bgmVolume;
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
      case "memory":
        // 记忆闪回：低频下坠 + 耳鸣
        this.tone(440, 0, 0.9, "sine", 0.1);
        this.tone(330, 0.06, 1.0, "sine", 0.09);
        this.tone(220, 0.14, 1.3, "triangle", 0.1);
        this.noise(0, 0.5, 0.03, 500);
        break;
    }
  }

  // ---------- BGM ----------
  /** BGM 音频文件路径（免费可商用轻音乐） */
  private bgmSrc = "/audio/bgm-relax.mp3";

  startBgm(): void {
    if (typeof window === "undefined" || this.bgmRunning) return;
    if (this.bgmEl) {
      this.bgmEl.play().catch(() => {
        /* autoplay 被浏览器拦截时静默，等下次用户交互 */
      });
      return;
    }
    const el = new Audio(this.bgmSrc);
    el.loop = true;
    el.volume = this._bgmVolume * (this._muted ? 0 : 1);
    el.preload = "auto";
    el.addEventListener("loadeddata", () => {
      if (this.bgmRunning) el.play().catch(() => {});
    });
    this.bgmEl = el;
    this.bgmRunning = true;
    el.play().catch(() => {
      /* 等待 loadeddata 或用户交互 */
    });
  }

  stopBgm(): void {
    if (!this.bgmRunning) return;
    this.bgmRunning = false;
    if (this.bgmEl) {
      this.bgmEl.pause();
    }
  }

  /** 根据理智值动态调整 BGM 音量（低理智更沉、音量更低，营造压抑） */
  setTension(sanity: number): void {
    if (!this.bgmEl) return;
    // 理智 100 → 音量 100%；理智 0 → 音量 55%（低沉压抑）
    const vol = (this._muted ? 0 : 1) * this._bgmVolume * (0.55 + (Math.max(0, Math.min(100, sanity)) / 100) * 0.45);
    this.bgmEl.volume = vol;
  }
}

// 单例
let _instance: SoundManager | null = null;
export function getSound(): SoundManager {
  if (!_instance) _instance = new SoundManager();
  return _instance;
}
