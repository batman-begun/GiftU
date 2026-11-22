import { roomLink } from './room-link.js';
import {matrix, TEAR_MS, IMPACT_MS, SINK_MS} from './matrix.js';
import {giftSound} from './sound.js';

const copy = {
  vi: {
    her: "Cho nàng", him: "Cho chàng",
    install: "Cài app", sound: "Âm thanh", greeting: "Tôi biết rõ gu của bạn. Độ chính xác… đang tải.",
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
    install: "Install app", sound: "Sound", greeting: "I know your taste perfectly. Accuracy… loading.",
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
    install: "安装应用", sound: "声音", greeting: "我太懂你的喜好了。准确率……加载中。",
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
const { mode, token } = roomLink(location.hash);
const playToken = mode === 'play' ? token : null;
const reportToken = mode === 'report' ? token : null;
const key = 'giftu-spike-a-v1';
let state = fresh(), lang, pending = false, installPrompt;
let sound = false;
const soundFX = giftSound();
try {
  const stored = JSON.parse(localStorage.getItem(key));
  if (mode === 'demo' && stored && Object.hasOwn(packs,stored.profile) && ['idle','play','review','consent','done'].includes(stored.phase) && Array.isArray(stored.reactions) && Array.isArray(stored.kept)) state = stored;
  lang = localStorage.getItem('giftu-language');
} catch {}
if (!Object.hasOwn(copy,lang)) lang = Object.keys(copy).find(code => navigator.language.toLowerCase().startsWith(code)) || 'en';
function store() { if (mode !== 'demo') return; try { localStorage.setItem(key,JSON.stringify(state)); } catch {} }
const ui = {
  vi: {
    purpose: "Biến việc tặng quà thành một trò chơi.",
    rolePrompt: "Tôi là GuBot. Bạn muốn tặng quà hay được mời chơi?",
    giver: "Tôi muốn tặng quà",
    receiver: "Tôi được mời chơi",
    receiverHelp: "Mở lại link người ấy gửi trong tin nhắn để vào đúng trò chơi. Bạn cũng có thể chơi thử một ván tại đây.",
    huntHelp: "Chuẩn bị manh mối và màn bật mí, rồi gửi link để người ấy đi tìm món quà. Trò săn kho báu đang được phát triển.",
    inviteTitle: "Rủ người ấy chơi với GuBot",
    inviteLead: "Một ván, ba lượt đoán. Bạn tự nhắn và trò chuyện với người ấy.",
    steps: ["Chọn bộ quà, tạo link rồi tự gửi qua tin nhắn.", "Tôi đoán ba món. Người ấy chấm từng món và chọn có chia sẻ kết quả hay không.", "Nếu họ chia sẻ, mở link kết quả riêng rồi tự quyết định tặng gì."],
    preview: "Xem trước lời chào người nhận",
    greetingPlay: "Cho tôi đoán gu của bạn qua ba món nhé? Đoán trật thì cứ cho món đó chìm!",
    consentNote: "Cuối ván, bạn tự chọn có chia sẻ kết quả với người mời hay không.",
    messageLabel: "Lời mời gửi kèm (có thể sửa)",
    message: "Thử xem GuBot đoán gu của bạn trúng mấy món nhé!",
    copyMessage: "Sao chép lời mời và link",
    shareReady: "Hai link đã sẵn sàng",
    headline: 'Bạn đã có quà chưa?', intro: 'Tôi là GuBot. Mình chọn quà hoặc giấu quà nhé.', hunt: 'Đã có quà', huntDetail: 'Giấu quà bằng một cuộc săn kho báu. Đang phát triển.', guess: 'Chưa biết tặng gì', guessDetail: 'Mời người ấy chơi đoán gu.',
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
    invalidLink: 'Link không hợp lệ hoặc đã hết hạn', inviteLinkHelp: 'Kiểm tra lại link hoặc xin người mời gửi link mới.', reportLinkHelp: 'Dùng link kết quả riêng đã lưu. Nếu phòng đã hết hạn, hãy tạo phòng mới.', home: 'Về trang chủ',
    copy: 'Sao chép', copied: 'Đã sao chép',
  },
  en: {
    purpose: "Turn gift-giving into a game.",
    rolePrompt: "I’m GuBot. Are you giving a gift, or did someone invite you to play?",
    giver: "I want to give a gift",
    receiver: "I was invited to play",
    receiverHelp: "Open the invite from your messages to find the right game. You can also play a demo here.",
    huntHelp: "Prepare a clue and a reveal, then send a link so they can hunt for the gift. Treasure hunts are in development.",
    inviteTitle: "Invite them to play with GuBot",
    inviteLead: "One game, three guesses. You do the messaging.",
    steps: ["Pick a gift catalog, create the link and send it in a message.", "I guess three gifts. They rate each one and decide whether to share the result.", "If they share, open your private results link and decide what to give."],
    preview: "Preview their welcome",
    greetingPlay: "Can I guess your taste in three gifts? If I miss, send that gift down the drain!",
    consentNote: "After the game, you decide whether to share your result with your host.",
    messageLabel: "Editable message to send",
    message: "Try GuBot and see how many gifts it guesses right!",
    copyMessage: "Copy message and invite link",
    shareReady: "Your two links are ready",
    hunt: 'I have a gift', huntDetail: 'Hide it in a treasure hunt. In development.', guess: 'I need a gift idea', guessDetail: 'Invite them to a taste-guessing game.', headline: 'Do you have a gift yet?', intro: 'I’m GuBot. Let’s find a gift or hide one.',
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
    invalidLink: 'This link is invalid or expired', inviteLinkHelp: 'Check the link or ask the sender for a new one.', reportLinkHelp: 'Use your saved private results link. If the room expired, create a new one.', home: 'Back to home',
    copy: 'Copy', copied: 'Copied',
  },
  zh: {
    purpose: "把送礼变成一场游戏。",
    rolePrompt: "我是 GuBot。你想送礼物，还是有人邀请你玩？",
    giver: "我想送礼物",
    receiver: "我收到邀请了",
    receiverHelp: "请打开消息里的邀请链接进入对应的游戏。你也可以在这里试玩。",
    huntHelp: "准备线索和揭晓环节，再发链接让对方寻找礼物。寻宝游戏正在开发中。",
    inviteTitle: "邀请对方和 GuBot 玩",
    inviteLead: "一局猜三次，你负责发消息和聊天。",
    steps: ["选择礼物目录，创建链接，再通过消息发送。", "我猜三件礼物，对方逐一评价，并决定是否分享结果。", "如果对方分享，打开私人结果链接，再决定送什么。"],
    preview: "预览收礼人看到的欢迎语",
    greetingPlay: "让我用三件礼物猜猜你喜欢什么。猜错了，就把那件礼物冲走！",
    consentNote: "游戏结束后，你可以选择是否把结果分享给邀请人。",
    messageLabel: "可编辑的邀请消息",
    message: "来试试 GuBot 能猜中几件你喜欢的礼物！",
    copyMessage: "复制邀请消息和链接",
    shareReady: "两个链接已准备好",
    hunt: '已经有礼物', huntDetail: '用寻宝游戏藏起礼物。开发中。', guess: '还没想好送什么', guessDetail: '邀请对方玩礼物猜猜看。', headline: '你已经准备好礼物了吗？', intro: '我是 GuBot。你可以把礼物藏进寻宝游戏，或者让我帮你猜对方的喜好。',
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
    invalidLink: '链接无效或已过期', inviteLinkHelp: '请检查链接，或请邀请人发送新链接。', reportLinkHelp: '请使用之前保存的私人结果链接。如果房间已过期，请创建新房间。', home: '返回首页',
    copy: '复制', copied: '已复制',
  },
};
let remoteDeck, reportData, links, remoteError, ready = mode === 'demo';
let setupOpen = false, homeOpen = false;
let introStep = 'home';
let inviteDraft;
let roomProfile = state.profile;
const text = key => ui[lang][key];
const deck = () => remoteDeck ?? packs[state.profile];
async function api(path, token, data) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  if (data) headers['Content-Type'] = 'application/json';
  const response = await fetch('/api/' + path, { method: data ? 'POST' : 'GET', headers, body: data ? JSON.stringify(data) : undefined });
  if (!response.ok) {
    const error = new Error('Room request failed');
    error.status = response.status;
    throw error;
  }
  return response.json();
}
function roomError(error) {
  return mode !== 'demo' && [401, 404, 410].includes(error.status) ? 'link' : 'retry';
}

async function request(task) {
  if (pending) return;
  pending = true;
  remoteError = false;
  render();
  try { await task(); } catch (error) { remoteError = roomError(error); }
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
  focus(phase === 'idle' ? $('headline') : $('game'));
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
    } catch (error) {
      remoteError = roomError(error);
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
  soundFX.play(value);
  const duration = value === 'like' ? IMPACT_MS : value === 'no' ? SINK_MS : 330;
  if (value === 'like') playImpact();
  else animateGift(value === 'no' ? [
    {transform:'none', opacity:1},
    {transform:'translateY(16%) rotate(-30deg) scale(.84)', opacity:1, offset:.36},
    {transform:'translateY(92%) rotate(-175deg) scale(.14)', opacity:0},
  ] : [{transform:'none'}, {transform:'translateX(26%) rotate(-12deg)', opacity:0}], duration, 'ease-in');
  if (state.reactions.length === deck().length) review();
  store();
  setTimeout(() => { pending = false; render(); focus($('game')); },motion.matches ? 0 : duration);
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
  const heading = add(box, 'h2', text('shareReady'));
  heading.id = 'links-ready';
  heading.tabIndex = -1;
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
  const invite = new URL(location.pathname + '#play=' + links.receiver, location.origin);
  const messageLabel = add(box, 'label', text('messageLabel'));
  messageLabel.htmlFor = 'invite-message';
  const editor = add(box, 'textarea', '');
  editor.id = 'invite-message';
  editor.rows = 2;
  editor.value = inviteDraft ?? text('message');
  editor.oninput = () => { inviteDraft = editor.value; };
  const copyMessage = action(box, text('copyMessage'), async () => {
    const message = [editor.value.trim(), invite.href].filter(Boolean).join('\n');
    try {
      await navigator.clipboard.writeText(message);
      copyMessage.textContent = text('copied');
    } catch { window.prompt(text('copyMessage'), message); }
  });
}

function render() {
  document.documentElement.lang = lang;
  $('lang').value = lang;
  $('lang').setAttribute('aria-label', {vi:'Ngôn ngữ', en:'Language', zh:'语言'}[lang]);
  $('profiles').setAttribute('aria-label', {vi:'Bộ gợi ý quà', en:'Gift catalog', zh:'礼物目录'}[lang]);
  const installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone || window.giftuInstalled;
  for (const [id, n] of Object.entries({her:'her', him:'him', install:'install', sound:'sound', helptext:'help', close:'close'})) {
    $(id).textContent = label(n);
  }
  $('sound').setAttribute('aria-pressed', sound);
  const screen = mode === 'invalid' || remoteError === 'link' ? 'invalid-link' : !ready ? 'loading' : reportToken ? 'report' : setupOpen ? 'setup' :
    homeOpen || state.phase === 'idle' ? 'entry' : state.phase;
  stage.dataset.screen = screen;
  $('install').hidden = Boolean(installed || screen === 'play');
  $('sound').hidden = screen !== 'play' && (screen !== 'entry' || Boolean(reportToken));
  const isHome = mode === 'demo' && introStep === 'home';
  const isGiver = mode === 'demo' && introStep === 'giver';
  const isReceiver = mode === 'demo' && introStep === 'receiver';
  const isHunt = mode === 'demo' && introStep === 'hunt';
  $('headline').textContent = text(playToken ? 'play' : isHome ? 'purpose' : isGiver ? 'headline' : isReceiver ? 'receiver' : 'hunt');
  $('intro').textContent = text(playToken ? 'greetingPlay' : isHome ? 'rolePrompt' : isGiver ? 'intro' : isReceiver ? 'receiverHelp' : 'huntHelp');
  $('entry-roles').hidden = !isHome;
  $('choose-giver').textContent = text('giver');
  $('choose-receiver').textContent = text('receiver');
  $('gift-paths').hidden = !isGiver;
  for (const key of ['hunt', 'huntDetail', 'guess', 'guessDetail']) $(key).textContent = text(key);
  $('start').textContent = playToken ? text('play') : text(resumeDemo() ? 'resume' : 'start');
  $('start').hidden = !(playToken || isReceiver || (isHome && resumeDemo()));
  $('start').classList.toggle('primary', Boolean(playToken || isReceiver));
  $('start').classList.toggle('quiet', !playToken && !isReceiver);
  $('intro-back').hidden = isHome || Boolean(playToken);
  $('intro-back').textContent = text('back');
  $('scope').textContent = text(playToken ? 'consentNote' : 'scope');
  $('scope').hidden = !(playToken || isReceiver);
  document.querySelector('.intro').hidden = screen !== 'entry';
  $('setup').hidden = screen !== 'setup';
  $('setup-title').textContent = text('inviteTitle');
  $('setup-lead').textContent = text('inviteLead');
  $('invite-steps').replaceChildren();
  for (const step of text('steps')) add($('invite-steps'), 'li', step);
  $('preview-title').textContent = text('preview');
  $('preview-greeting').textContent = text('greetingPlay');
  $('preview-consent').textContent = text('consentNote');
  $('close-setup').textContent = text('back');
  $('create-room').textContent = text(pending && setupOpen ? 'creating' : 'create');
  for (const id of ['her', 'him', 'create-room', 'close-setup']) $(id).disabled = pending;
  for (const profile of Object.keys(packs)) $(profile).setAttribute('aria-pressed', profile === roomProfile);
  renderLinks();
  $('room-error').hidden = !remoteError || screen === 'invalid-link' || screen === 'loading';
  $('room-error').textContent = remoteError ? text('error') : '';
  const activeItem = screen === 'play' ? deck()[state.reactions.length] : null;
  $('scene').classList.toggle('playing', activeItem !== null);
  $('artifact').hidden = activeItem === null;
  showGift(activeItem);
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
  if (screen === 'invalid-link') {
    add(game, 'h2', text('invalidLink'));
    add(game, 'p', text(mode === 'report' ? 'reportLinkHelp' : 'inviteLinkHelp'));
    add(game, 'a', text('home')).href = './';
  } else if (screen === 'loading') {
    if (remoteError) {
      add(game, 'h2', text('error'));
      action(game, text('retry'), playToken ? loadPlay : loadReport, {kind:'primary'});
    } else add(game, 'p', text('loading'));
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

const clay = $('clay-gift');
let visibleGift = null, giftAnimation;
function animateGift(keyframes, duration, easing) {
  giftAnimation?.cancel();
  giftAnimation = motion.matches ? null : clay.animate?.(keyframes, {duration, easing, fill:'forwards'});
}

function playImpact() {
  if (motion.matches || !clay.animate) return;
  const box = clay.getBoundingClientRect();
  if (!box.width) return;
  giftAnimation?.cancel();
  const impact = $('impact-gift');
  impact.firstElementChild.setAttribute('href', $('gift-shape').getAttribute('href'));
  const size = Math.min(window.innerWidth, window.innerHeight) * .99;
  const dx = box.left + box.width / 2 - window.innerWidth / 2;
  const dy = box.top + box.height / 2 - window.innerHeight / 2;
  impact.style.setProperty('--impact-size', size + 'px');
  impact.hidden = false;
  clay.style.visibility = 'hidden';
  const animation = impact.animate([
    { transform: `translate(${dx}px,${dy}px) scale(${box.width / size})` },
    { transform: 'scale(1.24)', offset: .36 },
    { transform: 'scale(1.24,.85)', offset: .48 },
    { transform: 'scale(1.03)', opacity: 1, offset: .68 },
    { transform: 'scale(.97)', opacity: 0 },
  ], { duration: IMPACT_MS, easing: 'cubic-bezier(.18,.7,.23,1)' });
  const clear = () => { impact.hidden = true; clay.style.visibility = ''; };
  animation.onfinish = clear;
  animation.oncancel = clear;
  giftAnimation = animation;
}

function showGift(id) {
  if (id === visibleGift) return;
  visibleGift = id;
  giftAnimation?.cancel();
  if (id === null) return;
  $('gift-shape').setAttribute('href', './clay-gifts.svg#gift-' + id);
  animateGift([
    {clipPath:'inset(48% 50%)', transform:'scale(.76) rotate(-10deg)', opacity:0},
    {clipPath:'inset(22% 17%)', transform:'scale(.88) rotate(-6deg)', opacity:1, offset:.42},
    {clipPath:'inset(0)', transform:'scale(1.07) rotate(2deg)', offset:.79},
    {clipPath:'inset(0)', transform:'none', opacity:1},
  ], TEAR_MS, 'ease-out');
  soundFX.play('tear');
}
motion.addEventListener('change', () => { if (motion.matches) giftAnimation?.cancel(); });

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
  if (mode !== 'demo' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (pending) return;
  homeOpen = true;
  setupOpen = false;
  remoteError = false;
  introStep = 'home';
  render();
  focus($('headline'));
});
function goIntro(step) {
  introStep = step;
  render();
  focus($('headline'));
}
$('choose-giver').onclick = () => goIntro('giver');
$('choose-receiver').onclick = () => goIntro('receiver');
$('open-hunt').onclick = () => goIntro('hunt');
$('intro-back').onclick = () => goIntro(introStep === 'hunt' ? 'giver' : 'home');
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
$('sound').onclick = async event => {
  const button = event.currentTarget;
  button.disabled = true;
  sound = await soundFX.toggle();
  button.setAttribute('aria-pressed', sound);
  button.disabled = false;
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

$('create-room').onclick = async () => {
  await request(async () => {
    links = await api('rooms', null, {profile:roomProfile});
  });
  const readyHeading = $('links-ready');
  if (links && readyHeading) focus(readyHeading);
};
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
