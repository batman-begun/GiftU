const screen = document.querySelector('#screen');
const error = document.querySelector('#error');
const sound = document.querySelector('#sound');
const params = new URLSearchParams(location.hash.slice(1));
const receiver = params.get('play');
const sender = params.get('report');
let room;
let busy = false;
let audio;

function element(tag, value, parent = screen) {
  const el = document.createElement(tag);
  if (value) el.textContent = value;
  parent.append(el);
  return el;
}

function page(title, description) {
  screen.replaceChildren();
  element('h1', title).id = 'title';
  if (description) element('p', description);
}

function button(label, handler, parent = screen) {
  const el = element('button', label, parent);
  el.onclick = () => run(handler);
  return el;
}

async function run(handler) {
  if (busy) return;
  busy = true;
  error.textContent = '';
  try {
    await handler();
  } catch (problem) {
    error.textContent = problem.message;
  } finally {
    busy = false;
  }
}

async function api(path, method = 'GET', body, token) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  if (body) headers['Content-Type'] = 'application/json';
  const response = await fetch('/api/' + path, { method, headers, body: body && JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

function create() {
  page('GuBot đoán gu', 'Tạo một phòng để người ấy thử tài đoán gu của GuBot.');
  const label = element('label', 'Bộ gợi ý');
  const select = element('select', '', label);
  for (const [value, text] of [['for_her', 'Cho nàng'], ['for_him', 'Cho chàng']]) {
    element('option', text, select).value = value;
  }
  button('Tạo phòng', async () => {
    const keys = await api('rooms', 'POST', { profile: select.value });
    page('Phòng đã mở', 'Gửi link chơi qua Zalo hoặc Messenger. Giữ link kết quả cho riêng bạn.');
    for (const [caption, fragment] of [['Link chơi', 'play=' + keys.receiver], ['Link kết quả', 'report=' + keys.sender]]) {
      const url = new URL('#' + fragment, location.href).href;
      const link = element('a', caption);
      link.href = url;
      button('Sao chép ' + caption.toLowerCase(), async () => {
        if (!navigator.clipboard) {
          const field = element('input');
          field.value = url;
          field.readOnly = true;
          field.select();
          return;
        }
        await navigator.clipboard.writeText(url);
        error.textContent = 'Đã sao chép.';
      });
    }
  });
}

async function report() {
  page('Kết quả đoán gu');
  const data = await api('report', 'GET', undefined, sender);
  if (data.status === 'unavailable') element('p', 'Chưa có kết quả được chia sẻ.');
  else if (!data.cards.length) element('p', 'Chưa có hướng quà nào được chọn.');
  else for (const card of data.cards) {
    element('h2', card.label);
    element('p', card.gift + '. ' + card.tip);
  }
  button('Kiểm tra lại', report);
}

function playSound() {
  if (!audio || audio.state !== 'running') return;
  const oscillator = audio.createOscillator();
  const volume = audio.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(170, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(45, audio.currentTime + 0.18);
  volume.gain.setValueAtTime(0.07, audio.currentTime);
  volume.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.2);
  oscillator.connect(volume).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.21);
}

sound.onclick = () => run(async () => {
  if (!window.AudioContext) return;
  audio ??= new AudioContext();
  if (sound.getAttribute('aria-pressed') !== 'true') {
    await audio.resume();
    sound.textContent = 'Âm thanh: bật';
    sound.setAttribute('aria-pressed', 'true');
  } else {
    await audio.suspend();
    sound.textContent = 'Âm thanh: tắt';
    sound.setAttribute('aria-pressed', 'false');
  }
});

const undo = () => react('undo');
async function react(action, card) {
  const data = await api('react', 'POST', { action, index: room.progress.length }, receiver);
  room.progress = data.progress;
  if (card && action !== 'skip' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    card.classList.add(action);
    if (action === 'dislike') playSound();
    await new Promise(resolve => setTimeout(resolve, 260));
  }
  draw();
}

function draw() {
  if (room.done) {
    page('GuBot xong nhiệm vụ', 'Cảm ơn bạn đã thử tài GuBot.');
    sound.hidden = true;
    return;
  }
  const index = room.progress.length;
  if (index === room.deck.length) {
    page('GuBot xin đính chính', 'Giữ những hướng bạn thật sự thích.');
    const choices = [];
    room.deck.forEach((item, i) => {
      if (item.kind !== 'real' || room.progress[i] !== 'like') return;
      const label = element('label', '', screen);
      const input = element('input', '', label);
      input.type = 'checkbox';
      input.checked = true;
      element('span', item.label, label);
      choices.push([item.id, input]);
    });
    if (!choices.length) element('p', 'Bạn có thể kết thúc với danh sách trống.');
    button('Hoàn tác lượt cuối', undo);
    button('Tiếp tục', () => consent(choices.filter(([, input]) => input.checked).map(([id]) => id)));
    return;
  }
  const item = room.deck[index];
  page('GuBot', 'Lượt ' + (index + 1) + ' / ' + room.deck.length);
  const card = element('article');
  card.className = 'card';
  element('div', '◆ ◉ ◉ ◆', card).className = 'mascot';
  element('div', item.icon, card).className = 'icon';
  element('h2', item.label, card);
  element('p', item.joke, card);
  let start;
  card.onpointerdown = event => { start = [event.clientX, event.clientY]; };
  card.onpointercancel = () => { start = null; };
  card.onpointerup = event => {
    if (!start) return;
    const dx = event.clientX - start[0];
    const dy = event.clientY - start[1];
    start = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) run(() => react(dx > 0 ? 'like' : 'dislike', card));
  };
  const actions = element('div');
  actions.className = 'actions';
  button('Không hợp', () => react('dislike', card), actions);
  button('Thích', () => react('like', card), actions);
  button('Bỏ qua', () => react('skip', card), actions);
  if (index) button('Hoàn tác lượt cuối', undo);
}

function consent(ids) {
  page('GuBot xin phép mách', 'Bạn có đồng ý gửi các hướng quà vừa giữ cho người đã mời bạn chơi không?');
  for (const id of ids) element('p', room.deck.find(item => item.id === id).label);
  if (!ids.length) element('p', 'Kết quả sẽ ghi rằng bạn chưa chọn hướng quà nào.');
  const finish = async approved => {
    await api('finish', 'POST', { approved, ids: approved ? ids : [] }, receiver);
    room.done = true;
    draw();
  };
  button('Đồng ý chia sẻ', () => finish(true));
  button('Kết thúc riêng tư', () => finish(false));
  button('Quay lại', draw);
}

async function route() {
  if (receiver) {
    page('GuBot đang mở phòng');
    room = await api('play', 'GET', undefined, receiver);
    sound.hidden = room.done || !window.AudioContext;
    if (room.progress.length || room.done) draw();
    else {
      page('GuBot đoán gu', 'Tôi hiểu gu của bạn. Độ chính xác… đang tải.');
      button('Bắt đầu', draw);
    }
  } else if (sender) await report();
  else create();
}

window.addEventListener('hashchange', () => location.reload());
run(route);
