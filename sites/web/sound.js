const voice = {
  ready: [182, 207, 165, .24],
  like: [168, 252, 213, .29],
  no: [212, 147, 103, .31],
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
      else voiceCue(cue);
    },
  };
}
