// A fixed-size 0/1 field. Only glyph ink carries color.
export function matrix(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let width, height, points, frame, mode = 0, blend = 0;
  const waves = [];
  function draw(time) {
    frame = undefined;
    ctx.clearRect(0, 0, width, height);
    ctx.font = '8px monospace';
    blend = motion.matches ? mode : blend + (mode - blend) * .06;
    while (waves.length && time - waves[0].time > 850) waves.shift();
    const t = motion.matches ? 0 : time / 990;
    for (const [x,y,bit,seed] of points) {
      const nx = (x-width/2)/width, ny = (y-height*.36)/height;
      const head = Math.exp(-((nx/.096)**2+((ny+.15)/.09)**2));
      const body = Math.exp(-(((nx+.16*ny)/(.15+.06*Math.cos(ny*18)))**2+((ny-.08)/.24)**2));
      const ocean = Math.exp(-(((ny-.09*Math.sin(nx*12+t)-.09)/.20)**2))*(.45+.4*Math.cos(ny*66+nx*8+t));
      const ink = Math.min(.88,.08+seed*.14+(head+body)*.49*(1-blend)+ocean*.65*blend);
      let dx = 0, dy = 0;
      if (!motion.matches) for (const wave of waves) {
        const a = (time-wave.time)/850, dist = Math.hypot(x-wave.x,y-wave.y);
        const push = 22*Math.sin((dist-a*180)/18)*Math.exp(-(((dist-a*180)/58)**2))*(1-a);
        dx += (x-wave.x)/Math.max(dist,1)*push;
        dy += (y-wave.y)/Math.max(dist,1)*push;
      }
      ctx.fillStyle = 'rgba(154,35,48,'+ink+')';
      ctx.fillText(bit,x+dx+Math.sin(t+ny*12+seed)*1.7,y+dy+Math.sin(t+nx*10)*2);
    }
    if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function refresh() {
    cancelAnimationFrame(frame);
    draw(performance.now());
  }
  new ResizeObserver(() => {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const ratio = Math.min(devicePixelRatio,2);
    canvas.width = width*ratio; canvas.height = height*ratio;
    ctx.setTransform(ratio,0,0,ratio,0,0);
    points = [];
    for (let y=8;y<height+8;y+=11) for (let x=4;x<width;x+=9) points.push([x,y,Math.random()<.5?'0':'1',Math.random()]);
    refresh();
  }).observe(canvas);
  canvas.addEventListener('pointerdown',e => {
    const box = canvas.getBoundingClientRect();
    waves.push({x:e.clientX-box.left,y:e.clientY-box.top,time:performance.now()});
    if (waves.length>4) waves.shift();
  });
  document.addEventListener('visibilitychange', () => { if (points) refresh(); });
  motion.addEventListener('change', () => { if (points) refresh(); });
  return value => { mode = value; if (points) refresh(); };
}
