export function clayGuBot(avatar, motion, revealDuration) {
  function layer(name, index, parent = avatar) {
    const element = document.createElement('span');
    element.className = 'clay-layer clay-' + name;
    parent.append(element);
    frame(element, index);
    return element;
  }
  function frame(element, index) {
    element.style.backgroundPosition = `${index % 4 * 100 / 3}% ${Math.floor(index / 4) * 50}%`;
  }
  const shadow = layer('shadow', 0);
  const figure = document.createElement('span');
  figure.className = 'clay-figure';
  avatar.append(figure);
  layer('body', 1, figure);
  layer('tuft', 2, figure);
  layer('drip', 3, figure);
  const eyes = layer('eyes', 4, figure);
  const mouth = layer('mouth', 7, figure);
  let item;
  let screen;
  let timers = [];
  let movement;
  let ground;
  let reacting = false;

  function face(eye, lip) {
    frame(eyes, eye);
    frame(mouth, lip);
  }
  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
    movement?.cancel();
    ground?.cancel();
    reacting = false;
    face(4, 7);
  }
  function at(ms, callback) {
    timers.push(setTimeout(callback, ms));
  }
  function move(frames, duration) {
    movement = figure.animate(frames, {duration, easing:'ease-in-out'});
  }
  function show(nextScreen, nextItem) {
    if (screen === nextScreen && item === nextItem && !reacting) return;
    reset();
    screen = nextScreen;
    item = nextItem;
    if (motion.matches || nextScreen !== 'play' || item !== 0) return;
    face(5, 7);
    move([
      {transform:'none'},
      {transform:'translateX(3%) rotate(6deg)', offset:.24},
      {transform:'translateX(3%) rotate(4deg)', offset:.78},
      {transform:'none'},
    ], revealDuration);
    // Two short phrases with a pause. The visible copy carries the words.
    for (const [time, lip] of [[90, 8], [156, 9], [212, 7], [313, 10], [372, 9], [435, 8], [515, 7]]) {
      at(time, () => frame(mouth, lip));
    }
    at(590, () => face(4, 7));
  }

  motion.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  return {
    show,
    react(reaction, duration) {
      reset();
      reacting = true;
      if (motion.matches) return;
      if (reaction === 'no') {
        face(6, 10);
        move([
          {transform:'none'},
          {transform:'translate(4%, 4%) rotate(9deg) scale(1.04, .94)', offset:.43},
          {transform:'translate(4%, 4%) rotate(9deg) scale(1.04, .94)', offset:.68},
          {transform:'none'},
        ], duration - 130);
        at(duration - 215, () => face(4, 7));
        if (item === 0) at(duration - 150, () => face(5, 11));
      } else if (reaction === 'like') {
        at(Math.round(duration * .34), () => face(4, 9));
        move([
          {transform:'none'},
          {transform:'none', offset:.32},
          {transform:'translate(-5%, -6%) rotate(-9deg) scale(.94, 1.06)', offset:.48},
          {transform:'none'},
        ], duration);
        ground = shadow.animate([{opacity:1}, {opacity:.5}, {opacity:1}], duration);
        at(duration - 110, () => face(5, 11));
      } else {
        face(5, 8);
      }
    },
  };
}
