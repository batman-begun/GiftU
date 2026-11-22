export function roomLink(hash) {
  const params = new URLSearchParams(hash.slice(1));
  const play = params.getAll('play');
  const report = params.getAll('report');
  const tokens = [...play, ...report];
  if (!tokens.length) return { mode: 'demo' };
  if (tokens.length !== 1 || !/^[a-f0-9]{64}$/.test(tokens[0])) return { mode: 'invalid' };
  return { mode: play.length ? 'play' : 'report', token: tokens[0] };
}
