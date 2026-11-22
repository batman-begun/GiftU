const voice = {
  ready: [182, 207, 165, .24],
  skip: [160, 202, 144, .23],
};

export function giftSound() {
  let audio, output;
  let enabled = false;
  let noise;

  function voiceCue(cue) {
    const [start, peak, end, duration] = voice[cue];
    const now = audio.currentTime;
    const tone = audio.createOscillator();
    const overtone = audio.createOscillator();
    const formant = audio.createBiquadFilter();
    const level = audio.createGain();
    tone.type = 'triangle';
    overtone.type = 'sawtooth';
    formant.type = 'lowpass';
    formant.frequency.value = cue === 'no' ? 580 : 840;
    formant.Q.value = 2.5;
    for (const [osc, ratio] of [[tone, 1], [overtone, 1.98]]) {
      osc.frequency.setValueAtTime(start * ratio, now);
      osc.frequency.exponentialRampToValueAtTime(peak * ratio, now + duration * .34);
      osc.frequency.exponentialRampToValueAtTime(end * ratio, now + duration);
      osc.connect(formant);
      osc.start(now);
      osc.stop(now + duration);
    }
    level.gain.setValueAtTime(.001, now);
    level.gain.linearRampToValueAtTime(.16, now + .055);
    level.gain.exponentialRampToValueAtTime(.001, now + duration);
    formant.connect(level).connect(output);
  }

  function tearCue() {
    const now = audio.currentTime;
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const level = audio.createGain();
    source.buffer = noise;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(460, now);
    filter.frequency.exponentialRampToValueAtTime(1300, now + .09);
    filter.frequency.exponentialRampToValueAtTime(220, now + .27);
    level.gain.setValueAtTime(.001, now);
    level.gain.linearRampToValueAtTime(.22, now + .06);
    level.gain.exponentialRampToValueAtTime(.001, now + .28);
    source.connect(filter).connect(level).connect(output);
    source.start(now);
  }

  function celebration() {
    const now = audio.currentTime;
    for (const [frequency, delay, strength] of [[523.25, .04, .12], [659.25, .10, .13], [783.99, .136, .12], [1046.5, .157, .09]]) {
      const start = now + delay;
      const tone = audio.createOscillator();
      const level = audio.createGain();
      tone.type = 'triangle';
      tone.frequency.value = frequency;
      level.gain.setValueAtTime(.001, start);
      level.gain.linearRampToValueAtTime(strength, start + .018);
      level.gain.exponentialRampToValueAtTime(.001, start + .24);
      tone.connect(level).connect(output);
      tone.start(start);
      tone.stop(start + .245);
    }
  }

  function flush() {
    const now = audio.currentTime;
    const water = audio.createBufferSource();
    const swirl = audio.createBiquadFilter();
    const level = audio.createGain();
    water.buffer = noise;
    water.loop = true;
    swirl.type = 'bandpass';
    swirl.Q.value = .72;
    swirl.frequency.setValueAtTime(430, now);
    swirl.frequency.exponentialRampToValueAtTime(1400, now + .19);
    swirl.frequency.exponentialRampToValueAtTime(220, now + .63);
    level.gain.setValueAtTime(.001, now);
    level.gain.linearRampToValueAtTime(.31, now + .12);
    level.gain.exponentialRampToValueAtTime(.045, now + .52);
    level.gain.exponentialRampToValueAtTime(.001, now + .66);
    water.connect(swirl).connect(level).connect(output);
    water.start(now);
    water.stop(now + .67);
    for (const [hz, delay] of [[360,.16],[255,.31],[184,.43],[109,.54]]) {
      const start = now + delay;
      const bubble = audio.createOscillator();
      const pop = audio.createGain();
      bubble.frequency.setValueAtTime(hz, start);
      bubble.frequency.exponentialRampToValueAtTime(hz * .42, start + .085);
      pop.gain.setValueAtTime(.001, start);
      pop.gain.linearRampToValueAtTime(.08, start + .012);
      pop.gain.exponentialRampToValueAtTime(.001, start + .09);
      bubble.connect(pop).connect(output);
      bubble.start(start);
      bubble.stop(start + .095);
    }
  }

  return {
    async toggle() {
      if (enabled) {
        enabled = false;
        output.gain.value = 0;
        return false;
      }
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return false;
      try {
        if (!audio) {
          audio = new Context();
          output = audio.createGain();
          output.connect(audio.destination);
          noise = audio.createBuffer(1, Math.floor(audio.sampleRate * .29), audio.sampleRate);
          const samples = noise.getChannelData(0);
          for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
        }
        await audio.resume();
        if (audio.state !== 'running') return false;
        enabled = true;
        output.gain.value = .65;
        voiceCue('ready');
        return true;
      } catch {
        return false;
      }
    },
    play(cue) {
      if (!enabled || audio.state !== 'running') return;
      if (cue === 'tear') tearCue();
      else if (cue === 'like') celebration();
      else if (cue === 'no') flush();
      else voiceCue(cue);
    },
  };
}
