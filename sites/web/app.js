import {matrix} from './matrix.js';

const copy = {
 vi: ['GuBot đoán gu. Mày chấm.','Một căn phòng Binary Matrix, một chú bot quá tự tin và ba lần đoán quà.','Cho nàng','Cho chàng','Chơi với GuBot','Bản thử Spike A · Lựa chọn lưu trên thiết bị này.','Cài app','Tắt tiếng','Bật tiếng','Tôi biết rõ gu của bạn. Độ chính xác… đang tải.','Bắt đầu để mở vết xé Matrix.','Thích','Không hợp','Bỏ qua','Hoàn tác','Giữ hướng quà nào?','Chạm để giữ hoặc bỏ. Bạn có thể bỏ hết.','Tiếp tục','Thử bước chia sẻ','Trong bản đầy đủ, chỉ các hướng đã giữ mới được gửi cho người mời. Ở bản thử, kết quả chỉ hiển thị trên thiết bị này.','Cho phép mô phỏng','Giữ riêng','Kết quả thử','Bạn đã giữ riêng kết quả.','Chưa giữ hướng quà nào.','Chơi lại','Trên iPhone/iPad, mở Safari, chọn Chia sẻ rồi Thêm vào MH chính. Trên Android, mở menu trình duyệt rồi chọn Cài ứng dụng hoặc Thêm vào màn hình chính.','Đóng','Đã cài','Gói giấy vệ sinh dát vàng','Nến thơm','Vé workshop làm gốm','Cà phê đặc sản','Vé xem trận đấu','Vàng thật. Giấy cũng thật.','GuBot dự đoán phòng sẽ thơm hơn hẳn.','Một cái cốc méo. Tự tay làm mới vui.','Mùi cà phê vẫn thắng mùi cháy máy.','GuBot chỉ đoán vé. Tỉ số thì chịu.','Duyệt lựa chọn'],
 en: ['GuBot guesses. You judge.','One Binary Matrix room, one wildly confident bot, and three gift guesses.','For her','For him','Play with GuBot','Spike A test build · Choices stay on this device.','Install app','Sound off','Sound on','I know your taste perfectly. Accuracy… loading.','Start to tear open the Matrix.','Like','Not for me','Skip','Undo','Which gifts would you keep?','Tap to keep or remove. You can leave it empty.','Continue','Try the share step','In the full version, only the picks you keep go to the person who invited you. This test shows them on this device only.','Simulate sharing','Keep private','Test result','Your picks stayed private.','No gift ideas kept.','Play again','On iPhone or iPad, open Safari and choose Share, then Add to Home Screen. On Android, open the browser menu and choose Install app or Add to Home screen.','Close','Installed','Gold-plated toilet paper','Scented candle','Pottery workshop ticket','Specialty coffee','Match ticket','Real gold. Real paper.','GuBot predicts a much better-smelling room.','A crooked cup. More fun when you make it.','Coffee beats the smell of fried circuits.','GuBot can guess the tickets. The score is on you.','Review picks'],
 zh: ['GuBot 猜礼物，你来打分。','一个二进制矩阵房间，一个过度自信的机器人，三次猜礼物的机会。','送给她','送给他','和 GuBot 一起玩','Spike A 测试版 · 选择保存在此设备上。','安装应用','声音已关','声音已开','我太懂你的喜好了。准确率……加载中。','点击开始，撕开矩阵。','喜欢','不适合我','跳过','撤销','想保留哪些礼物？','点按可保留或移除。也可以全部不选。','继续','试用分享步骤','正式版只会把你保留的选项发给邀请你的人。测试版仅在本设备上显示结果。','模拟分享','保密','测试结果','你已将结果保密。','没有保留礼物选项。','再玩一次','在 iPhone 或 iPad 上，用 Safari 打开，选择“分享”，然后选择“添加到主屏幕”。在 Android 上，从浏览器菜单选择“安装应用”或“添加到主屏幕”。','关闭','已安装','镀金厕纸','香薰蜡烛','陶艺体验券','精品咖啡','球赛门票','金是真的。纸也是真的。','GuBot 预测你的房间会更香。','杯子歪一点，自己做才好玩。','咖啡香总比电路烧焦的味道好。','GuBot 只会猜球票，比分就靠你了。','复核选择']
};
const $ = id => document.getElementById(id);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const setMatrix = matrix($('matrix'), $('avatar'), $('artifact'));
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
const roomCopy = {
 vi: ['Tạo phòng chia sẻ','Link chơi','Link kết quả riêng','Người mời xem được các hướng bạn giữ nếu bạn đồng ý.','Đồng ý chia sẻ','Kết quả đoán gu','Chưa có kết quả được chia sẻ.','Tải lại kết quả','Không mở được phòng hoặc kết nối bị gián đoạn. Thử tải lại.','Đã gửi kết quả.','Sao chép','Đã sao chép','Đang mở phòng…','Giữ riêng link kết quả. Chỉ gửi link chơi cho người nhận.'],
 en: ['Create a shared room','Play link','Private report link','The person who invited you can see the picks you keep if you agree.','Share my picks','Gift picks','No result has been shared.','Refresh report','Could not load the room or connection was interrupted. Try reloading.','Your picks were shared.','Copy','Copied','Opening room…','Keep the report link private. Send only the play link.'],
 zh: ['创建分享房间','游戏链接','私人报告链接','如果你同意，邀请你的人就能看到你保留的选项。','分享我的选择','礼物选择','还没有分享结果。','刷新报告','无法打开房间或网络中断，请刷新重试。','选择已分享。','复制','已复制','正在打开房间…','请保管报告链接，只发送游戏链接。'],
};
let remoteDeck, reportData, links, remoteError, ready = !playToken && !reportToken;
const roomText = n => roomCopy[lang][n];
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
  });
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
function action(parent, n, callback, pressed) {
  const button = add(parent,'button',label(n));
  button.type = 'button';
  if (pressed !== undefined) button.setAttribute('aria-pressed',pressed);
  button.onclick = callback;
  return button;
}
function transition(phase) { state.phase = phase; store(); render(); }
function begin() {
  if (pending) return;
  if (!playToken) state = {...fresh(),profile:state.profile};
  transition('play');
  $('room-title').scrollIntoView({block:'start',behavior:motion.matches?'instant':'smooth'});
  $('game').focus({preventScroll:true});
}
async function react(value) {
  if (pending) return;
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
  setTimeout(() => { pending = false; render(); $('game').focus({preventScroll:true}); },motion.matches?0:330);
}
function undo() {
  if (playToken) return request(async () => {
    state.reactions = (await api('react', playToken, { action: 'undo', index: state.reactions.length })).progress;
    state.phase = 'play';
  });
  state.reactions.pop();
  transition('play');
}
function render() {
  document.documentElement.lang = lang;
  $('lang').value = lang;
  $('lang').setAttribute('aria-label',{vi:'Ngôn ngữ',en:'Language',zh:'语言'}[lang]);
  $('profiles').setAttribute('aria-label',{vi:'Bộ gợi ý quà',en:'Gift catalog',zh:'礼物目录'}[lang]);
  $('build').textContent = {vi:'BẢN THỬ LIVE',en:'LIVE TESTBED',zh:'在线测试版'}[lang]+' · 0.3.0';
  const installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone || window.giftuInstalled;
  for (const [id,n] of Object.entries({headline:0,intro:1,her:2,him:3,start:state.phase==='idle'?4:25,scope:5,install:installed?28:6,sound:sound?8:7,helptext:26,close:27})) $(id).textContent = label(n);
  $('install').disabled = Boolean(installed);
  $('sound').setAttribute('aria-pressed',sound);
  for (const profile of Object.keys(packs)) $(profile).setAttribute('aria-pressed',profile === state.profile);
  const activeItem = ready && !reportToken && state.phase === 'play' ? deck()[state.reactions.length] : null;
  const artifact = $('artifact');
  $('scene').classList.toggle('playing', activeItem !== null);
  artifact.hidden = activeItem === null;
  setMatrix({
    item: activeItem,
    mood: {review:'puzzled', consent:'sorry', done:state.shared ? 'boast' : 'tired'}[state.phase],
  });
  for (const id of ['profiles','start','scope','create-room']) $(id).hidden = Boolean(playToken || reportToken);
  $('create-room').textContent = roomText(0);
  const linkBox = $('links');
  linkBox.replaceChildren();
  if (links) add(linkBox,'p',roomText(13));
  if (links) for (const [role, token, title] of [['play',links.receiver,1],['report',links.sender,2]]) {
    const url = new URL(location.pathname + '#' + role + '=' + token, location.origin);
    const row = add(linkBox,'p','');
    const anchor = add(row,'a',roomText(title));
    anchor.href = url.href;
    const copyButton = add(row,'button',roomText(10));
    copyButton.onclick = async () => {
      try { await navigator.clipboard.writeText(url.href); copyButton.textContent = roomText(11); }
      catch { window.prompt(roomText(title), url.href); }
    };
  }
  $('room-error').textContent = remoteError ? roomText(8) : '';
  const game = $('game');
  game.tabIndex = -1;
  game.replaceChildren();
  if (!ready) {
    if (!remoteError) add(game,'p',roomText(12));
    return;
  }
  if (reportToken) {
    add(game,'h3',roomText(5));
    add(game,'p',reportData.status === 'shared' ? reportData.ids.map(id=>label(29+id)).join(' · ') || label(24) : roomText(6));
    add(game,'button',roomText(7)).onclick = loadReport;
    return;
  }
  if (state.phase === 'idle') {
    add(game,'h3',label(9));
    add(game,'p',label(10));
    if (playToken) action(game,4,begin);
  } else if (state.phase === 'play') {
    const id = deck()[state.reactions.length];
    add(game,'small',`${state.reactions.length+1} / 3`);
    add(game,'h3',label(29+id));
    add(game,'p',label(34+id));
    const actions = add(game,'div',''); actions.className = 'actions';
    action(actions,11,()=>react('like'));
    action(actions,12,()=>react('no'));
    action(actions,13,()=>react('skip'));
    if (state.reactions.length) action(actions,14,undo);
  } else if (state.phase === 'review') {
    add(game,'h3',label(15));
    add(game,'p',label(16));
    const actions = add(game,'div',''); actions.className = 'actions';
    for (const id of deck().filter((id,i) => id !== 0 && state.reactions[i] === 'like')) action(actions,29+id,e=>{
      state.kept = state.kept.includes(id) ? state.kept.filter(value=>value!==id) : [...state.kept,id];
      store(); e.currentTarget.setAttribute('aria-pressed',state.kept.includes(id));
    },state.kept.includes(id));
    action(actions,14,undo);
    action(actions,17,()=>transition('consent'));
  } else if (state.phase === 'consent') {
    add(game,'h3',playToken ? roomText(4) : label(18));
    add(game,'p',playToken ? roomText(3) : label(19));
    const actions = add(game,'div',''); actions.className = 'actions';
    action(actions,39,()=>transition('review'));
    if (playToken) add(actions,'button',roomText(4)).onclick = () => finish(true);
    else action(actions,20,()=>finish(true));
    action(actions,21,()=>finish(false));
  } else {
    add(game,'h3',label(22));
    if (playToken) { if (state.shared) add(game,'p',roomText(9)); return; }
    add(game,'p',state.shared ? state.kept.map(id=>label(29+id)).join(' · ') || label(24) : label(23));
    action(game,25,begin);
  }
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
  if (pending || state.profile === profile) return;
  links = undefined;
  state = {...fresh(), profile}; store(); render();
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
  links = await api('rooms', null, {profile:state.profile});
});
function loadReport() {
  return request(async () => { reportData = await api('report', reportToken); ready = true; });
}
if (playToken) request(async () => {
  const data = await api('play', playToken);
  remoteDeck = data.deck;
  state.reactions = data.progress;
  if (data.done) state.phase = 'done';
  else if (state.reactions.length === deck().length) review();
  else if (state.reactions.length) state.phase = 'play';
  ready = true;
});
else if (reportToken) loadReport();
window.addEventListener('hashchange', () => location.reload());
