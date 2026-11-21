import {matrix} from './matrix.js';

const copy = {
  vi: {
    her: "Cho nàng", him: "Cho chàng",
    install: "Cài app", soundOff: "Tắt tiếng",
    soundOn: "Bật tiếng", greeting: "Tôi biết rõ gu của bạn. Độ chính xác… đang tải.",
    like: "Thích", no: "Không hợp",
    skip: "Bỏ qua", undo: "Hoàn tác",
    demoConsent: "Thử bước chia sẻ", demoResult: "Kết quả thử",
    noPicks: "Chưa giữ hướng quà nào.", again: "Chơi lại",
    help: "Trên iPhone/iPad, mở Safari, chọn Chia sẻ rồi Thêm vào MH chính. Trên Android, mở menu trình duyệt rồi chọn Cài ứng dụng hoặc Thêm vào màn hình chính.", close: "Đóng",
    gifts: ["Gói giấy vệ sinh dát vàng","Nến thơm","Vé workshop làm gốm","Cà phê đặc sản","Vé xem trận đấu"],
    jokes: ["Vàng thật. Giấy cũng thật.","GuBot dự đoán phòng sẽ thơm hơn hẳn.","Một cái cốc méo. Tự tay làm mới vui.","Mùi cà phê vẫn thắng mùi cháy máy.","GuBot chỉ đoán vé. Tỉ số thì chịu."],
  },
  en: {
    her: "For her", him: "For him",
    install: "Install app", soundOff: "Sound off",
    soundOn: "Sound on", greeting: "I know your taste perfectly. Accuracy… loading.",
    like: "Like", no: "Not for me",
    skip: "Skip", undo: "Undo",
    demoConsent: "Try the share step", demoResult: "Test result",
    noPicks: "No gift ideas kept.", again: "Play again",
    help: "On iPhone or iPad, open Safari and choose Share, then Add to Home Screen. On Android, open the browser menu and choose Install app or Add to Home screen.", close: "Close",
    gifts: ["Gold-plated toilet paper","Scented candle","Pottery workshop ticket","Specialty coffee","Match ticket"],
    jokes: ["Real gold. Real paper.","GuBot predicts a much better-smelling room.","A crooked cup. More fun when you make it.","Coffee beats the smell of fried circuits.","GuBot can guess the tickets. The score is on you."],
  },
  zh: {
    her: "送给她", him: "送给他",
    install: "安装应用", soundOff: "声音已关",
    soundOn: "声音已开", greeting: "我太懂你的喜好了。准确率……加载中。",
    like: "喜欢", no: "不适合我",
    skip: "跳过", undo: "撤销",
    demoConsent: "试用分享步骤", demoResult: "测试结果",
    noPicks: "没有保留礼物选项。", again: "再玩一次",
    help: "在 iPhone 或 iPad 上，用 Safari 打开，选择“分享”，然后选择“添加到主屏幕”。在 Android 上，从浏览器菜单选择“安装应用”或“添加到主屏幕”。", close: "关闭",
    gifts: ["镀金厕纸","香薰蜡烛","陶艺体验券","精品咖啡","球赛门票"],
    jokes: ["金是真的。纸也是真的。","GuBot 预测你的房间会更香。","杯子歪一点，自己做才好玩。","咖啡香总比电路烧焦的味道好。","GuBot 只会猜球票，比分就靠你了。"],
  },
};
const $ = id => document.getElementById(id);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const stage = document.querySelector('main');
const brand = document.querySelector('.brand');
const setMatrix = matrix($('matrix'), $('avatar'), $('artifact'), {
  shade: () => [...document.querySelectorAll('header > *, .experience section:not([hidden]) > *, #room-error:not([hidden])')],
  quiet: () => !['entry', 'play'].includes(stage.dataset.screen),
});
const packs = {her:[0,1,2], him:[0,3,4]};
const fresh = () => ({profile:'her', phase:'idle', reactions:[], kept:[], shared:false});
const link = new URLSearchParams(location.hash.slice(1));
const playToken = link.get('play');
const reportToken = link.get('report');
const key = 'giftu-spike-a-v1';
let state = fresh(), lang, sound = false, audio, pending = false, installPrompt;
try {
  const stored = JSON.parse(localStorage.getItem(key));
  if (!playToken && !reportToken && stored && Object.hasOwn(packs,stored.profile) && ['idle','play','review','consent','done'].includes(stored.phase) && Array.isArray(stored.reactions) && Array.isArray(stored.kept)) state = stored;
  lang = localStorage.getItem('giftu-language');
} catch {}
if (!Object.hasOwn(copy,lang)) lang = Object.keys(copy).find(code => navigator.language.toLowerCase().startsWith(code)) || 'en';
function store() { if (playToken || reportToken) return; try { localStorage.setItem(key,JSON.stringify(state)); } catch {} }
const ui = {
  vi: {
    headline: 'GuBot đoán quà.', intro: 'Bạn chấm ba món, GuBot lo phần tự tin.',
    start: 'Chơi thử', resume: 'Chơi tiếp', invite: 'Tạo link mời chơi', room: 'Chọn bộ quà gợi ý',
    create: 'Tạo phòng', creating: 'Đang tạo phòng…', back: 'Quay lại',
    play: 'Bắt đầu đoán quà', scope: 'Bản thử lưu lựa chọn trên thiết bị này.',
    review: 'Giữ hướng quà nào?', reviewHint: 'Chạm để giữ hoặc bỏ. Bạn có thể bỏ hết.',
    emptyReview: 'Bạn chưa thích món quà thật nào.', next: 'Xem bước chia sẻ',
    consent: 'Chia sẻ lựa chọn?', shareHint: 'Người mời sẽ thấy những hướng quà bạn đã giữ nếu bạn đồng ý.',
    demoHint: 'Trong bản thử, lựa chọn chỉ hiện trên thiết bị này.',
    share: 'Chia sẻ lựa chọn', simulate: 'Xem kết quả thử', private: 'Giữ riêng',
    finished: 'Đã chơi xong', shared: 'Đã gửi lựa chọn cho người mời.', privateDone: 'Bạn đã giữ riêng kết quả.',
    playLink: 'Link mời chơi', reportLink: 'Link kết quả riêng',
    linkHint: 'Gửi link mời chơi cho người nhận. Giữ riêng link kết quả.',
    report: 'Kết quả đoán quà', unavailable: 'Chưa có kết quả được chia sẻ.',
    refresh: 'Tải lại kết quả', loading: 'Đang mở phòng…',
    error: 'Không kết nối được với phòng. Hãy thử lại.', retry: 'Thử lại',
    copy: 'Sao chép', copied: 'Đã sao chép',
  },
  en: {
    headline: 'GuBot guesses gifts.', intro: 'Rate three gifts. GuBot supplies the confidence.',
    start: 'Try it', resume: 'Resume', invite: 'Create an invite', room: 'Choose a gift catalog',
    create: 'Create room', creating: 'Creating room…', back: 'Back',
    play: 'Start guessing', scope: 'Demo picks stay on this device.',
    review: 'Which gifts would you keep?', reviewHint: 'Tap to keep or remove a pick. You can leave it empty.',
    emptyReview: 'You haven’t liked any real gifts.', next: 'Review sharing',
    consent: 'Share your picks?', shareHint: 'The person who invited you will see the picks you keep if you agree.',
    demoHint: 'In this demo, picks appear on this device only.',
    share: 'Share my picks', simulate: 'See demo results', private: 'Keep private',
    finished: 'Game complete', shared: 'Your picks went to the person who invited you.', privateDone: 'You kept your picks private.',
    playLink: 'Invite link', reportLink: 'Private results link',
    linkHint: 'Send the invite link to the recipient. Keep the results link private.',
    report: 'Gift picks', unavailable: 'No result has been shared.',
    refresh: 'Refresh results', loading: 'Opening room…',
    error: 'Could not reach the room. Try again.', retry: 'Try again',
    copy: 'Copy', copied: 'Copied',
  },
  zh: {
    headline: 'GuBot 猜礼物。', intro: '你来评三件礼物，GuBot 负责自信。',
    start: '试玩', resume: '继续游戏', invite: '创建邀请链接', room: '选择礼物目录',
    create: '创建房间', creating: '正在创建房间…', back: '返回',
    play: '开始猜礼物', scope: '试玩选择只保存在此设备上。',
    review: '想保留哪些礼物？', reviewHint: '点按可保留或移除，也可以全部不选。',
    emptyReview: '你还没有喜欢的真实礼物。', next: '查看分享设置',
    consent: '分享你的选择？', shareHint: '如果你同意，邀请你的人会看到你保留的选项。',
    demoHint: '试玩时，选择只会显示在此设备上。',
    share: '分享我的选择', simulate: '查看试玩结果', private: '保密',
    finished: '游戏结束', shared: '选择已发送给邀请你的人。', privateDone: '你已将结果保密。',
    playLink: '邀请链接', reportLink: '私人结果链接',
    linkHint: '请将邀请链接发给对方，并保管结果链接。',
    report: '礼物选择', unavailable: '还没有分享结果。',
    refresh: '刷新结果', loading: '正在打开房间…',
    error: '无法连接房间，请重试。', retry: '重试',
    copy: '复制', copied: '已复制',
  },
};
let remoteDeck, reportData, links, remoteError, ready = !playToken && !reportToken;
let setupOpen = false, homeOpen = false;
let roomProfile = state.profile;
const text = key => ui[lang][key];
const deck = () => remoteDeck ?? packs[state.profile];
async function api(path, token, data) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  if (data) headers['Content-Type'] = 'application/json';
  const response = await fetch('/api/' + path, { method: data ? 'POST' : 'GET', headers, body: data ? JSON.stringify(data) : undefined });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
}
async function request(task) {
  if (pending) return;
  pending = true;
  remoteError = false;
  render();
  try { await task(); } catch { remoteError = true; }
  finally { pending = false; render(); }
}
function review() {
  state.kept = deck().filter((id,i) => id !== 0 && state.reactions[i] === 'like');
  state.phase = 'review';
}
function finish(approved) {
  if (playToken) return request(async () => {
    await api('finish', playToken, { approved, ids: approved ? state.kept : [], index: state.reactions.length });
    state.shared = approved;
    state.phase = 'done';
  }).then(() => focus($('game')));
  state.shared = approved;
  transition('done');
}
function label(n) { return copy[lang][n]; }
function add(parent, tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.append(element);
  return element;
}
function action(parent, title, callback, { kind, pressed } = {}) {
  const button = add(parent, 'button', title);
  if (kind) button.className = kind;
  button.disabled = pending;
  button.type = 'button';
  if (pressed !== undefined) button.setAttribute('aria-pressed',pressed);
  button.onclick = callback;
  return button;
}
function focus(target) {
  target.focus({ preventScroll: true });
  const rect = target.getBoundingClientRect();
  if (rect.top < 0 || rect.bottom > window.innerHeight) target.scrollIntoView({ block: 'nearest' });
}
function transition(phase) {
  state.phase = phase;
  store();
  render();
  focus(phase === 'idle' ? $('start') : $('game'));
}
function resumeDemo() {
  return homeOpen && ['play', 'review', 'consent'].includes(state.phase);
}
function begin() {
  if (pending) return;
  const resume = resumeDemo();
  homeOpen = false;
  if (resume) return transition(state.phase);
  if (!playToken) state = {...fresh(),profile:state.profile};
  transition('play');
}
async function react(value) {
  if (pending || state.phase !== 'play') return;
  pending = true;
  $('game').querySelectorAll('button').forEach(button => button.disabled = true);
  if (playToken) {
    try {
      state.reactions = (await api('react', playToken, { action: value, index: state.reactions.length })).progress;
      remoteError = false;
    } catch {
      remoteError = true;
      pending = false;
      render();
      return;
    }
  } else state.reactions.push(value);
  setMatrix({
    item: deck()[state.reactions.length - 1],
    mood: {like:'boast', no:'sorry', skip:'puzzled'}[value],
    reaction: value,
  });
  if (sound && audio && value !== 'skip') {
    const osc = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime;
    osc.type = value === 'like' ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(value === 'like' ? 330 : 150,now);
    osc.frequency.exponentialRampToValueAtTime(45,now+.22);
    gain.gain.setValueAtTime(.09,now);
    gain.gain.exponentialRampToValueAtTime(.001,now+.22);
    osc.connect(gain).connect(audio.destination);
    osc.start(); osc.stop(now+.23);
  }
  if (state.reactions.length === deck().length) review();
  store();
  setTimeout(() => { pending = false; render(); focus($('game')); },motion.matches?0:330);
}
function undo() {
  if (playToken) return request(async () => {
    state.reactions = (await api('react', playToken, { action: 'undo', index: state.reactions.length })).progress;
    state.phase = 'play';
  }).then(() => focus($('game')));
  state.reactions.pop();
  transition('play');
}
function renderLinks() {
  const box = $('links');
  box.replaceChildren();
  if (!links) return;
  add(box, 'p', text('linkHint'));
  for (const [role, token, key] of [['play', links.receiver, 'playLink'], ['report', links.sender, 'reportLink']]) {
    const url = new URL(location.pathname + '#' + role + '=' + token, location.origin);
    const row = add(box, 'div', '');
    row.className = 'link-row';
    add(row, 'a', text(key)).href = url.href;
    const copy = action(row, text('copy'), async () => {
      try {
        await navigator.clipboard.writeText(url.href);
        copy.textContent = text('copied');
      } catch { window.prompt(text(key), url.href); }
    });
    copy.setAttribute('aria-label', text('copy') + ' · ' + text(key));
  }
}

function render() {
  document.documentElement.lang = lang;
  $('lang').value = lang;
  $('lang').setAttribute('aria-label', {vi:'Ngôn ngữ', en:'Language', zh:'语言'}[lang]);
  $('profiles').setAttribute('aria-label', {vi:'Bộ gợi ý quà', en:'Gift catalog', zh:'礼物目录'}[lang]);
  const installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone || window.giftuInstalled;
  for (const [id, n] of Object.entries({her:'her', him:'him', install:'install', sound:sound ? 'soundOn' : 'soundOff', helptext:'help', close:'close'})) {
    $(id).textContent = label(n);
  }
  $('sound').setAttribute('aria-pressed', sound);
  const screen = !ready ? 'loading' : reportToken ? 'report' : setupOpen ? 'setup' :
    homeOpen || state.phase === 'idle' ? 'entry' : state.phase;
  stage.dataset.screen = screen;
  $('install').hidden = Boolean(installed || screen === 'play');
  $('sound').hidden = screen !== 'play';
  $('intro').textContent = playToken ? label('greeting') : text('intro');
  $('headline').textContent = text('headline');
  $('start').textContent = playToken ? text('play') : text(resumeDemo() ? 'resume' : 'start');
  $('start').hidden = false;
  $('open-setup').textContent = text('invite');
  $('open-setup').hidden = Boolean(playToken);
  $('scope').textContent = text('scope');
  $('scope').hidden = Boolean(playToken);
  document.querySelector('.intro').hidden = screen !== 'entry';
  $('setup').hidden = screen !== 'setup';
  $('setup-title').textContent = text('room');
  $('close-setup').textContent = text('back');
  $('create-room').textContent = text(pending && setupOpen ? 'creating' : 'create');
  for (const id of ['her', 'him', 'create-room', 'close-setup']) $(id).disabled = pending;
  for (const profile of Object.keys(packs)) $(profile).setAttribute('aria-pressed', profile === roomProfile);
  renderLinks();
  $('room-error').hidden = !remoteError;
  $('room-error').textContent = remoteError ? text('error') : '';
  const activeItem = screen === 'play' ? deck()[state.reactions.length] : null;
  $('scene').classList.toggle('playing', activeItem !== null);
  $('artifact').hidden = activeItem === null;
  const game = $('game');
  game.hidden = screen === 'entry' || screen === 'setup';
  game.replaceChildren();
  renderGame(game, screen, activeItem);
  setMatrix({
    item: activeItem,
    mood: {review:'puzzled', consent:'sorry', done:state.shared ? 'boast' : 'tired'}[screen],
  });
}

function renderGame(game, screen, id) {
  if (screen === 'loading') {
    if (remoteError) action(game, text('retry'), playToken ? loadPlay : loadReport, {kind:'primary'});
    else add(game, 'p', text('loading'));
  } else if (screen === 'report') {
    add(game, 'h2', text('report'));
    if (reportData.status === 'shared') showPicks(game, reportData.ids);
    else add(game, 'p', text('unavailable'));
    action(game, text('refresh'), loadReport, {kind:'primary'});
  } else if (screen === 'play') {
    add(game, 'small', (state.reactions.length + 1) + ' / ' + deck().length);
    add(game, 'h2', label('gifts')[id]);
    add(game, 'p', label('jokes')[id]);
    const actions = add(game, 'div', '');
    actions.className = 'actions';
    action(actions, label('like'), () => react('like'));
    action(actions, label('no'), () => react('no'));
    action(actions, label('skip'), () => react('skip'), {kind:'quiet'});
    if (state.reactions.length) action(actions, label('undo'), undo, {kind:'quiet'});
  } else if (screen === 'review') {
    add(game, 'h2', text('review'));
    const liked = deck().filter((gift, index) => gift !== 0 && state.reactions[index] === 'like');
    add(game, 'p', text(liked.length ? 'reviewHint' : 'emptyReview'));
    if (liked.length) {
      const choices = add(game, 'div', '');
      choices.className = 'choices';
      for (const gift of liked) action(choices, label('gifts')[gift], event => {
        const selected = state.kept.includes(gift);
        state.kept = selected ? state.kept.filter(value => value !== gift) : [...state.kept, gift];
        store();
        event.currentTarget.setAttribute('aria-pressed', !selected);
      }, {kind:'pick', pressed:state.kept.includes(gift)});
    }
    const actions = add(game, 'div', '');
    actions.className = 'actions';
    action(actions, text('next'), () => transition('consent'), {kind:'primary'});
    action(actions, label('undo'), undo, {kind:'quiet'});
  } else if (screen === 'consent') {
    add(game, 'h2', playToken ? text('consent') : label('demoConsent'));
    add(game, 'p', text(playToken ? 'shareHint' : 'demoHint'));
    const actions = add(game, 'div', '');
    actions.className = 'actions';
    action(actions, text(playToken ? 'share' : 'simulate'), () => finish(true), {kind:'primary'});
    action(actions, text('private'), () => finish(false));
    action(actions, text('back'), () => transition('review'), {kind:'quiet'});
  } else if (screen === 'done') {
    add(game, 'h2', playToken ? text('finished') : label('demoResult'));
    if (playToken) {
      if (state.shared !== undefined) add(game, 'p', text(state.shared ? 'shared' : 'privateDone'));
    } else {
      if (state.shared) showPicks(game, state.kept);
      else add(game, 'p', text('privateDone'));
      const actions = add(game, 'div', '');
      actions.className = 'actions';
      action(actions, label('again'), begin, {kind:'primary'});
      action(actions, text('back'), () => transition('idle'), {kind:'quiet'});
    }
  }
}

function showPicks(parent, ids) {
  if (!ids.length) return add(parent, 'p', label('noPicks'));
  const list = add(parent, 'ul', '');
  for (const id of ids) add(list, 'li', label('gifts')[id]);
}

const artifact = $('artifact');
let swipeOrigin;
artifact.onpointerdown = event => {
  swipeOrigin = [event.clientX, event.clientY];
  artifact.setPointerCapture(event.pointerId);
};
artifact.onpointercancel = () => { swipeOrigin = undefined; };
artifact.onpointerup = event => {
  const start = swipeOrigin;
  swipeOrigin = undefined;
  if (!start) return;
  const dx = event.clientX - start[0];
  if (Math.abs(dx) > 42 && Math.abs(event.clientY - start[1]) < 35) react(dx > 0 ? 'like' : 'no');
};

for (const profile of Object.keys(packs)) $(profile).onclick = () => {
  if (pending || roomProfile === profile) return;
  links = undefined;
  remoteError = false;
  roomProfile = profile;
  if (state.phase === 'idle') {
    state.profile = profile;
    store();
  }
  render();
};
brand.addEventListener('click', event => {
  if (playToken || reportToken || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (pending) return;
  homeOpen = true;
  setupOpen = false;
  remoteError = false;
  render();
  focus($('start'));
});
$('open-setup').onclick = () => {
  setupOpen = true;
  render();
  focus($('setup-title'));
};
$('close-setup').onclick = () => {
  setupOpen = false;
  remoteError = false;
  render();
  focus($('open-setup'));
};
$('start').onclick = begin;
$('lang').onchange = event => {
  lang = event.target.value;
  try { localStorage.setItem('giftu-language',lang); } catch {}
  if (!pending) render();
};
$('sound').onclick = async () => {
  sound = !sound;
  if (sound && window.AudioContext) {
    audio ??= new AudioContext();
    try { await audio.resume(); } catch {}
  }
  if (!pending) render();
};
window.addEventListener('beforeinstallprompt',event=>{ event.preventDefault(); installPrompt = event; });
window.addEventListener('appinstalled',()=>{ window.giftuInstalled = true; installPrompt = undefined; if (!pending) render(); });
$('install').onclick = async () => {
  if (!installPrompt) { $('help').showModal(); return; }
  const prompt = installPrompt;
  installPrompt = undefined;
  try { await prompt.prompt(); } catch { $('help').showModal(); }
};
navigator.serviceWorker?.register('./sw.js').catch(console.error);
render();

$('create-room').onclick = () => request(async () => {
  links = await api('rooms', null, {profile:roomProfile});
});
function loadReport() {
  return request(async () => { reportData = await api('report', reportToken); ready = true; });
}
function loadPlay() {
  return request(async () => {
    const data = await api('play', playToken);
    remoteDeck = data.deck;
    state.reactions = data.progress;
    if (data.done) {
      state.shared = undefined;
      state.phase = 'done';
    } else if (state.reactions.length === deck().length) review();
    else if (state.reactions.length) state.phase = 'play';
    ready = true;
  });
}
if (playToken) loadPlay();
else if (reportToken) loadReport();
window.addEventListener('hashchange', () => location.reload());
