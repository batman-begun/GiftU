export function roomLink(hash) {
  const params = new URLSearchParams(hash.slice(1));
  const roles = ['play', 'report', 'hunt'];
  const links = roles.flatMap(mode => params.getAll(mode).map(token => ({ mode, token })));
  if (!links.length) return { mode: 'demo' };
  if (links.length !== 1 || !/^[a-f0-9]{64}$/.test(links[0].token)) return { mode: 'invalid' };
  return links[0];
}
