const copy = {
  vi: {
    create: 'Tạo cuộc săn quà', lead: 'Để lại một manh mối. Khi giải đúng, người ấy sẽ thấy lời nhắn bật mí của bạn.',
    clue: 'Manh mối', answer: 'Đáp án', reveal: 'Lời nhắn bật mí',
    clueExample: 'Quán lần đầu mình gặp nhau tên gì?', answerExample: 'Tên quán',
    revealExample: 'Quà ở trong ngăn kéo bên trái. Mở ra đi!',
    preview: 'Xem trước', previewTitle: 'Xem trước cuộc săn quà', createLink: 'Tạo link săn quà',
    edit: 'Sửa manh mối', back: 'Quay lại', creating: 'Đang tạo link…',
    ready: 'Link săn quà đã sẵn sàng', send: 'Gửi link này cho người nhận qua tin nhắn. Link có hiệu lực 7 ngày.',
    link: 'Mở link săn quà', copy: 'Sao chép link săn quà', copied: 'Đã sao chép link',
    another: 'Tạo cuộc săn khác', hunt: 'Săn quà', loading: 'Đang mở cuộc săn quà…',
    guess: 'Đáp án của bạn', solve: 'Mở quà', checking: 'Đang kiểm tra…',
    wrong: 'Chưa đúng. Nhìn lại manh mối và thử thêm lần nữa nhé.',
    invalid: 'Link săn quà không hợp lệ hoặc đã hết hạn', ask: 'Nhờ người tặng gửi lại link mới.',
    error: 'Có lỗi kết nối. Thử lại nhé.', retry: 'Thử lại', found: 'Bạn tìm thấy quà rồi!', home: 'Về trang chủ',
  },
  en: {
    create: 'Create a treasure hunt', lead: 'Leave a clue. When they solve it, they’ll see your reveal message.',
    clue: 'Clue', answer: 'Answer', reveal: 'Reveal message',
    clueExample: 'Where did we first meet?', answerExample: 'The café name',
    revealExample: 'Look in the drawer on the left. Your gift is inside!',
    preview: 'Preview', previewTitle: 'Preview your treasure hunt', createLink: 'Create hunt link',
    edit: 'Edit clue', back: 'Back', creating: 'Creating link…',
    ready: 'Your hunt link is ready', send: 'Send this link to the recipient. It expires in 7 days.',
    link: 'Open hunt link', copy: 'Copy hunt link', copied: 'Link copied',
    another: 'Create another hunt', hunt: 'Treasure hunt', loading: 'Opening the treasure hunt…',
    guess: 'Your answer', solve: 'Unlock the gift', checking: 'Checking…',
    wrong: 'Not quite. Take another look at the clue and try again.',
    invalid: 'This hunt link is invalid or expired', ask: 'Ask the sender for a new link.',
    error: 'Could not connect. Please try again.', retry: 'Try again', found: 'You found the gift!', home: 'Back to home',
  },
  zh: {
    create: '创建寻宝游戏', lead: '留下一条线索。对方答对后，就能看到你的揭晓留言。',
    clue: '线索', answer: '答案', reveal: '揭晓留言',
    clueExample: '我们第一次见面的店叫什么？', answerExample: '店名',
    revealExample: '打开左边的抽屉，礼物就在里面！',
    preview: '预览', previewTitle: '预览寻宝游戏', createLink: '创建寻宝链接',
    edit: '编辑线索', back: '返回', creating: '正在创建链接…',
    ready: '寻宝链接已准备好', send: '把这个链接发给收礼人。链接有效期为 7 天。',
    link: '打开寻宝链接', copy: '复制寻宝链接', copied: '链接已复制',
    another: '再创建一个寻宝游戏', hunt: '寻宝游戏', loading: '正在打开寻宝游戏…',
    guess: '你的答案', solve: '解锁礼物', checking: '正在检查…',
    wrong: '还不对。再看看线索，试一次吧。',
    invalid: '寻宝链接无效或已过期', ask: '请让送礼人发一个新链接。',
    error: '连接失败，请重试。', retry: '重试', found: '你找到礼物了！', home: '返回首页',
  },
};

export function huntFlow({ api, add, action, focus, language, token }) {
  const text = key => copy[language()][key];
  let draft = { clue: '', answer: '', reveal: '' };
  let step = 'draft';
  let published;
  let clue;
  let reveal;
  let guess = '';
  let pending = false;
  let notice;
  let expired = false;
  let loadFailed = false;
  let root;
  let back;

  function heading(key) {
    const title = add(root, 'h1', text(key));
    title.tabIndex = -1;
    return title;
  }

  function paragraph(value) {
    add(root, 'p', value).className = 'hunt-text';
  }

  function field(form, key, value, limit, hint, multiline = false) {
    const label = add(form, 'label', text(key));
    const input = add(label, multiline ? 'textarea' : 'input', '');
    input.name = key;
    input.value = value;
    input.maxLength = limit;
    input.required = true;
    if (hint) input.placeholder = text(hint);
    if (multiline) input.rows = 3;
    else input.autocomplete = 'off';
    input.oninput = () => input.setCustomValidity('');
    return input;
  }

  function submit(parent, key) {
    const button = add(parent, 'button', text(key));
    button.className = 'primary';
    button.type = 'submit';
    return button;
  }

  function actions(parent = root) {
    const row = add(parent, 'div', '');
    row.className = 'actions';
    return row;
  }

  function status(key) {
    const line = add(root, 'p', text(key));
    line.className = 'hunt-status';
    line.setAttribute('role', 'alert');
  }

  function go(next) {
    notice = undefined;
    step = next;
    focus(renderCreator(root, back));
  }

  function renderCreator(container, onBack) {
    root = container;
    back = onBack;
    root.replaceChildren();
    if (step === 'draft') {
      const title = heading('create');
      add(root, 'p', text('lead'));
      const form = add(root, 'form', '');
      const clue = field(form, 'clue', draft.clue, 300, 'clueExample', true);
      const answer = field(form, 'answer', draft.answer, 100, 'answerExample');
      const reveal = field(form, 'reveal', draft.reveal, 500, 'revealExample', true);
      form.oninput = () => { draft = { clue: clue.value, answer: answer.value, reveal: reveal.value }; };
      const controls = actions(form);
      submit(controls, 'preview');
      action(controls, text('back'), back, {kind:'quiet'});
      form.onsubmit = event => {
        event.preventDefault();
        const invalid = [clue, answer, reveal].find(input => !input.value.trim());
        if (invalid) {
          invalid.value = '';
          invalid.reportValidity();
          return;
        }
        draft = { clue: clue.value.trim(), answer: answer.value.trim(), reveal: reveal.value.trim() };
        go('preview');
      };
      return title;
    }
    if (step === 'preview') {
      const title = heading('previewTitle');
      for (const key of ['clue', 'answer', 'reveal']) {
        add(root, 'h2', text(key));
        paragraph(draft[key]);
      }
      if (notice) status(notice);
      const controls = actions();
      const publish = action(controls, text(pending ? 'creating' : 'createLink'), create, {kind:'primary'});
      const edit = action(controls, text('edit'), () => go('draft'), {kind:'quiet'});
      publish.disabled ||= pending;
      edit.disabled ||= pending;
      return title;
    }
    const title = heading('ready');
    add(root, 'p', text('send'));
    const controls = actions();
    const copy = action(controls, text('copy'), async () => {
      try {
        await navigator.clipboard.writeText(published);
        copy.textContent = text('copied');
      } catch { window.prompt(text('link'), published); }
    }, {kind:'primary'});
    const link = add(controls, 'a', text('link'));
    link.href = published;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const secondary = actions();
    action(secondary, text('another'), () => {
      draft = { clue: '', answer: '', reveal: '' };
      published = undefined;
      go('draft');
    }, {kind:'quiet'});
    action(secondary, text('back'), back, {kind:'quiet'});
    return title;
  }

  async function create() {
    if (pending) return;
    pending = true;
    notice = undefined;
    renderCreator(root, back);
    try {
      const result = await api('hunts', null, draft);
      published = new URL('#hunt=' + result.token, location.origin + location.pathname).href;
      step = 'ready';
    } catch {
      notice = 'error';
    } finally {
      pending = false;
      if (!root.hidden) focus(renderCreator(root, back));
    }
  }

  function renderPlayer(container) {
    root = container;
    root.replaceChildren();
    if (expired) {
      const title = heading('invalid');
      add(root, 'p', text('ask'));
      add(root, 'a', text('home')).href = './';
      return title;
    }
    if (reveal !== undefined) {
      const title = heading('found');
      const message = add(root, 'p', reveal);
      message.className = 'hunt-text hunt-reveal';
      add(root, 'a', text('home')).href = './';
      return title;
    }
    if (clue === undefined) {
      const title = heading(loadFailed ? 'error' : 'loading');
      if (loadFailed) action(root, text('retry'), load, {kind:'primary'});
      return title;
    }
    const title = heading('hunt');
    paragraph(clue);
    if (notice) status(notice);
    const form = add(root, 'form', '');
    const answer = field(form, 'guess', guess, 100);
    answer.disabled = pending;
    answer.oninput = () => { guess = answer.value; };
    const button = submit(actions(form), pending ? 'checking' : 'solve');
    button.disabled = pending;
    form.onsubmit = event => {
      event.preventDefault();
      if (answer.value.trim()) solve(answer.value.trim());
      else {
        answer.value = '';
        answer.reportValidity();
      }
    };
    return title;
  }

  const isExpired = error => [401, 404, 410].includes(error.status);
  async function load() {
    if (pending) return;
    pending = true;
    loadFailed = false;
    renderPlayer(root);
    try {
      clue = (await api('hunt', token)).clue;
    } catch (error) {
      expired = isExpired(error);
      loadFailed = !expired;
    } finally {
      pending = false;
      renderPlayer(root);
    }
  }

  async function solve(answer) {
    if (pending) return;
    pending = true;
    notice = undefined;
    renderPlayer(root);
    try {
      const result = await api('hunt/solve', token, { answer });
      if (result.solved) reveal = result.reveal;
      else notice = 'wrong';
    } catch (error) {
      expired = isExpired(error);
      if (!expired) notice = 'error';
    } finally {
      pending = false;
      const title = renderPlayer(root);
      focus(root.querySelector('input') ?? title);
    }
  }

  return {renderCreator, renderPlayer, load};
}
