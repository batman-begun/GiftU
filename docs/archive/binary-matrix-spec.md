# BINARY LIVING MATRIX
## Interactive Design Lab — Product & Technical Specification

**Version:** 1.0 — 21/11/2026  
**Status:** Build-ready specification; chưa triển khai hoặc benchmark  
**Product:** Showcase website + interactive graphics experiment + reusable UI/animation engine  
**Proposed repository:** `binary-living-matrix` (tên dự kiến, chưa tạo repo)  
**Primary audience:** Designers, creative developers, frontend engineers, người yêu thích generative UI  
**Languages:** Giao diện showcase ưu tiên tiếng Anh tối giản để chia sẻ quốc tế; tài liệu README có EN/VI; không phụ thuộc ngôn ngữ cho graphics engine.

---

## 0. Executive decision

Xây **một website showcase công khai, mobile-first, frontend-only, không backend, không AI model/API**, với một renderer duy nhất vẽ hàng nghìn ký tự `0` và `1`. Các ký tự cùng kích thước tạo thành một trường đồ họa có thể *thở, gợn sóng, trôi nổi và lõm đàn hồi khi chạm*. Trang giới thiệu trọn vẹn một hệ ngôn ngữ thị giác có thể tái sử dụng cho các webapp về sau.

**Không được triển khai thành 4 animation/video độc lập.** Mọi trạng thái cùng sử dụng một `GlyphField` và một hệ thống chuyển trạng thái liên tục. Phần UI nổi trên canvas là component thật, có thể bấm/focus, không phải ảnh phẳng.

### Định nghĩa thành công

Một người mở đường link trên điện thoại sẽ thấy ngay những chữ số nhỏ đang tạo thành dáng một người phụ nữ mơ hồ, phập phồng. Chạm bento: cùng những chữ số ấy tự biến thành biển. Chạm ô nhập: chúng hóa bộ não. Chạm vùng trống trên matrix: một vết lõm lan thành sóng đàn hồi. Chuyển động mượt, nội dung UI vẫn rõ, site tải độc lập và source code trên GitHub đủ để người khác chạy/fork được.

---

## 1. Scope

### In scope — v1

- Homepage showcase responsive, ưu tiên màn hình điện thoại, vẫn đẹp ở desktop.
- 3 hình thái chính: `WOMAN`, `OCEAN`, `BRAIN`.
- Lớp phản ứng `TOUCH` chồng lên mọi hình thái.
- Shape morphing liên tục, không cắt cảnh/flash, không thay canvas.
- Bento cards tương tác; chat-like prompt chỉ dùng cho demo, không gửi API.
- Control panel phòng lab: đổi mode, mức chuyển động, chất lượng, bật/tắt debug.
- Chế độ auto-quality, reduced motion, static fallback.
- FPS/memory proxy/active glyph count diagnostics trong Dev/Lab panel.
- Bộ test, tài liệu, ảnh/GIF minh họa lấy từ sản phẩm thật, demo deploy, public GitHub repo.

### Out of scope — v1

- LLM thật, hội thoại AI thật, đăng nhập, database, payment, CMS, multi-user.
- Mô phỏng vật lý chất lỏng/3D thực sự; nhận diện gương mặt/người dùng.
- Trình biên tập shape tùy ý, marketplace theme, SDK đa framework.
- WebGL bắt buộc ngay từ đầu; backend rendering hoặc video-generation.

---

## 2. Visual DNA — non-negotiable

### 2.1 Color and background

1. Nền luôn **phẳng, đơn sắc**: `#F7F7F4` mặc định (tinh chỉnh bằng design tokens nếu hình ảnh thực tế yêu cầu).
2. Tuyệt đối **không có** red radial-gradient, heatmap, red cloud, glow, bloom, smeared paint, blur filter, vùng màu phủ nền hoặc canvas layer có màu đỏ.
3. Mọi vùng sắc đỏ trong **matrix layer** chỉ được xuất hiện **bên trong nét của glyph `0` hoặc `1`**; các nút UI và icon được phép dùng accent đỏ riêng biệt.
4. Gradient thị giác được tạo bằng thay đổi **màu/alpha/mật độ hiện diện** của từng glyph, không được tạo bởi pixel fill giữa các glyph.
5. Không dùng `shadowBlur`, `filter: blur()` cho matrix layer; cảm giác mơ hồ phải đến từ *phân bố sắc độ theo không gian*, chứ không phải làm nhòe chữ số.

### 2.2 Binary glyph invariant

- **Chỉ** hai glyph `0` và `1`, mỗi glyph vẫn nhìn ra là số (không bị biến thành chấm tròn).
- **Mọi glyph cùng một kích thước hiển thị**, cùng font family, font weight, font size và letter treatment trong cùng frame.
- Không random font size, không scale glyph theo chiều sâu, không biến dạng nét, không đổi thành particle/dot.
- Font monospace có phân biệt `0` và `1` tốt ở kích thước nhỏ, được bundle cục bộ/giấy phép tương thích hoặc dùng font hệ thống có fallback được kiểm thử.
- Giá trị ban đầu để test: **7–9 CSS px**; chọn mức nhỏ nhất **vẫn nhận ra từng chữ số trên thiết bị thật**. Đây là tham số nghiệm thu, không phải con số đã xác minh.
- Glyph có thể đổi **vị trí x/y, opacity, màu và trạng thái active**; tuyệt đối không đổi kích thước tương đối giữa các glyph.
- Thay đổi mật độ phải mượt, không nhảy loạn hoặc chớp tắt giữa các frame.

### 2.3 Composition

- Cô gái: chỉ là *gợi ý hình thể*; không có silhouette sắc nét, không vạch contour cơ thể hoặc các đường cong đỏ liên tục.
- Biển: là các lớp nhịp điệu có độ sâu/đường chân trời gợi hình, không phải một dải sine thô.
- Bộ não: hình thái trôi bồng bềnh với nếp gấp gợi hình bằng chữ số, không phải bức ảnh não bị overlay binary.
- Visual field rải gần sát **mọi viền màn hình**; không tập trung thành một blob ở giữa rồi để biên trống.
- UI panels nền trắng/frosted trung tính, chiếm ít diện tích, tương phản đủ để đọc dễ dàng.

---

## 3. UX / interaction contract

### 3.1 Entry → WOMAN

- Khi load, có static/low-motion preview tức thì; sau đó bắt đầu chuyển động khi canvas sẵn sàng.
- Mặc định `WOMAN` với chu kỳ thở mục tiêu **5–7 giây**.
- Thở bằng trường biến dạng phi tuyến rất nhẹ (vị trí glyph) + điều biến màu/opacity; không scale toàn bộ canvas/hình người.
- Không cho toàn bộ glyph cùng lên xuống đồng pha: tạo lệch pha mềm theo tọa độ để có cảm giác sinh học.
- Hình thể phải dễ cảm nhận sau vài giây nhưng vẫn ước lệ, không rõ nét đến mức giống cutout.

### 3.2 Bento → OCEAN

- Có 3 bento cards ngang thấp/dẹt khi đủ rộng; trên mobile phải vừa width và touch target, cho phép bố cục responsive.
- Bento click/tap/keyboard activation chuyển shape sang `OCEAN`; hover (desktop) chỉ preview nhẹ, không yêu cầu hover để hoàn thành tác vụ.
- Morph mục tiêu **1.2–2.2 giây**, easing êm, không teleport glyph.
- Ở `OCEAN`, các luồng sóng lệch pha tạo lớp mặt biển; tốc độ vừa phải, không gây chóng mặt.
- Các bento đại diện cho **bộ showcase kỹ thuật**, ví dụ `Explore Shapes`, `Feel the Motion`, `Touch the Field`; không giả vờ là feature sản phẩm thật.

### 3.3 Chat-like prompt → BRAIN

- Focus chat input hoặc bắt đầu nhập làm chuyển sang `BRAIN`.
- Não dập dềnh, hơi nghiêng theo phase thời gian (giả 3D nếu cần, không xoay glyph riêng lẻ).
- Input keystroke tạo xung màu nhẹ chạy qua các vùng não; throttle/debounce để không giật.
- Submit chỉ hiển thị response UI minh bạch: **"This is an interactive visual demo — no message was sent."** Không mô phỏng phản hồi LLM thật, không gửi dữ liệu lên máy chủ.
- Blur có chủ đích: sau thời gian ngắn, quay lại state trước khi focus (`OCEAN` hoặc `WOMAN`); nếu đang ở Lab manual override thì tôn trọng mode đã chọn.

### 3.4 Touch / pointer → ELASTIC IMPRESSION

- Pointer down trên vùng matrix **không bị UI che** gây lõm cục bộ quanh điểm chạm; khi drag, vùng lõm đi theo ngón tay/chuột.
- Pointer up cho hiệu ứng hồi phục có overshoot rất nhẹ và gợn tắt dần.
- Nên dùng hàm Gaussian/radial falloff với damping thay vì mô phỏng vật lý đầy đủ.
- Chạm đồng thời nhiều điểm: tối thiểu xử lý 2 touch nếu thiết bị hỗ trợ, có ngưỡng cắt để bảo vệ FPS.
- Touch không làm vỡ grid glyph, không làm glyph trùng thành vệt hoặc bị phóng lớn.
- Khi người dùng cuộn trang, không được chặn vertical scroll bình thường; xử lý `touch-action` đúng vùng, không chiếm toàn bộ gesture của trang.
- Layer `TOUCH` là **overlay effect**, không phải state loại trừ: áp dụng được trong cả `WOMAN`, `OCEAN`, `BRAIN`.

### 3.5 Priority / state machine

```text
DEFAULT → WOMAN
BENTO_ACTIVATE → OCEAN
INPUT_FOCUS → BRAIN (temporarily overrides current main mode)
INPUT_BLUR → last main mode (WOMAN / OCEAN)
LAB_SET_MODE → explicit WOMAN / OCEAN / BRAIN
POINTER_TOUCH → transient elastic overlay on current mode
REDUCED_MOTION → static shapes + minimal/instant transitions
HIDDEN_TAB → pause render loop
```

- Có nút `Reset` đưa về `WOMAN`, giải phóng touch impulses và reset trạng thái lab.
- Không đặt timeout tự đổi mode ngẫu nhiên làm người dùng mất kiểm soát.

---

## 4. UI layout — showcase, không phải webtool giả

### 4.1 Above the fold, mobile portrait

1. Thin top identity: `BINARY / ALIVE` + phụ đề `Interactive Design Lab`.
2. Một câu ngắn: *"A living interface made entirely of zeros and ones."*
3. Ba bento cards phẳng, glass-like, có icon mảnh; cả ba là trigger vào trải nghiệm `OCEAN`.
4. Trung tâm/không gian trống là matrix; vùng này phải có đủ diện tích cho hình thể nhận ra được.
5. Chat-like command input gần đáy: `Type something. Watch it think.`
6. `Open Lab` nhỏ và có chủ ý, không cản trải nghiệm chính.

### 4.2 Lab panel (drawer)

- Shape: Woman / Ocean / Brain.
- Motion: Still / Ambient / Alive.
- Quality: Auto / Eco / High.
- Sliders: breath depth, wave energy, touch elasticity (đều có safe range).
- Counters: actual FPS (rolling average), number of rendered glyphs, renderer mode, quality tier, approximate frame time.
- `Reset to defaults` và `Copy configuration` (JSON config, không phải state dump lớn).
- UI controls phải focusable, có label, keyboard usable và không bắt gesture với matrix.

### 4.3 Responsive

- Mobile 360–430 CSS px là ưu tiên thiết kế; hỗ trợ rộng hơn và tablet/desktop.
- Safe-area insets, bottom navigation area, đổi portrait/landscape, font scaling và keyboard xuất hiện không làm sai layout.
- Bento có thể thành hàng 2+1 hay horizontal scroll trên viewport hẹp, miễn là vẫn rõ và dễ chạm.
- Canvas resize theo viewport, tái tính layout/mask nhưng giữ transition nhất quán, tránh nháy trắng.

---

## 5. Technical architecture

### 5.1 Recommended stack

- **Vite + React + TypeScript** cho showcase UI và Lab; core graphics là **TypeScript thuần**, không phụ thuộc React.
- **Canvas 2D** cho renderer v1: đơn giản, dễ debug và chứng minh motion quality.
- `requestAnimationFrame`, timestamp-based simulation (không dùng frame counter để quyết định vật lý).
- `OffscreenCanvas`/Web Worker là **progressive enhancement**, có feature detection và main-thread Canvas fallback; chỉ chuyển sang Worker nếu benchmark cho thấy cải thiện thực tế.
- `WebGL2` glyph atlas + instancing là đường nâng cấp **sau benchmark**, không phải phụ thuộc v1.
- Tránh runtime animation framework nặng cho matrix; animation UI nhỏ có thể dùng CSS.

Thông tin tham chiếu: Canvas API và OffscreenCanvas là web platform APIs; tính khả dụng của từng phần cần feature detect. `prefers-reduced-motion` phải được tôn trọng. Xem `docs/references.md`.

### 5.2 Core design

```text
UI / Interaction Layer (React)
  ├── Showcase homepage / Bento / Prompt / Lab drawer
  └── Event bus + state machine
                ↓
Shape System (framework-agnostic TypeScript)
  ├── WOMAN: subtle anatomical color/density field
  ├── OCEAN: multilayer wave/color field
  └── BRAIN: abstract neural contour/fold field
                ↓
Motion System
  ├── Breathing oscillator
  ├── Ocean waves
  ├── Floating + pulse
  ├── Morph interpolation
  └── Touch impulse solver (overlay)
                ↓
Glyph Field + Renderer
  ├── Stable glyph IDs, base positions, bit values (0/1)
  ├── Target position / alpha / RGB per glyph
  ├── Canvas2D renderer; optional Worker / WebGL2 later
  └── DPR-aware draw scheduling + adaptive quality
```

### 5.3 Key rule: stable glyph identity

- Tạo glyphs **một lần** theo seed và viewport configuration. Mỗi glyph có `id`, `bit`, `baseX`, `baseY`, `phase`, `colorSeed`.
- Không random lại toàn bộ glyphs mỗi frame; tránh nhấp nháy và cảm giác đổi từ vật này sang vật khác.
- Khi chuyển shape, sample trường mục tiêu cho cùng một tập `glyph IDs`, và nội suy các tham số theo thời gian.
- Mục tiêu visual là **same matter, different form**: các chữ số mang cảm giác là cùng một thực thể.

### 5.4 Suggested data model

```ts
type ShapeMode = 'woman' | 'ocean' | 'brain';
type MotionMode = 'still' | 'ambient' | 'alive';
type QualityMode = 'auto' | 'eco' | 'high';

type Glyph = {
  id: number;
  bit: 0 | 1;
  baseX: number;
  baseY: number;
  phase: number;
  seed: number;
};

type GlyphSample = {
  x: number;
  y: number;
  alpha: number;
  red: number;
  green: number;
  blue: number;
};

type TouchImpulse = {
  x: number;
  y: number;
  bornAt: number;
  strength: number;
  radius: number;
};
```

### 5.5 Formula sketch (conceptual, not final numerical tuning)

For each glyph `i` at time `t`:

```text
position_i(t)
  = basePosition_i
  + shapeDisplacement(mode, basePosition_i, t)
  + morphDisplacement(previousMode, mode, transitionProgress)
  + touchDisplacement(activeImpulses, basePosition_i, t)

color_i(t)
  = mix(previousShapeColor, nextShapeColor, easedTransitionProgress)
  × subtleMotionModulation(mode, basePosition_i, t)

fontSize_i(t) = FIXED_FONT_SIZE  // applies to all glyphs
backgroundColor(t) = #F7F7F4  // constant
```

**Chú ý:** công thức là mô tả cấu trúc; tránh cộng hai phép morph trùng nhau khi triển khai. Logic render thực tế phải interpolate **hai target fields** rồi cộng trường touch; tất cả tham số được clamp. Shape field chỉ trả về giá trị glyph, **không fill pixel vùng nền**.

### 5.6 Shape implementation

**WOMAN**
- Sử dụng 2D continuous mask/field được viết bằng toán học hoặc SVG path gốc (sample mask offline hoặc runtime), không render ảnh người trực tiếp.
- Shape ở vùng phải/giữa; gradient nhiều mức sắc đỏ theo độ gần vùng hình thể, môi trường ngoài vẫn có 0/1 màu nhạt.
- Contour không sắc nét: feather theo alpha của **glyph riêng lẻ**, tuyệt đối không blur background.
- Oscillator có phase variation theo vị trí, chuyển động nhịp hít/thở tinh tế.

**OCEAN**
- Trường nhiều lớp sóng có phase và tốc độ khác nhau, có đường chân trời gợi hình.
- Lateral undulation + vertical displacement nhẹ; thay đổi độ đậm glyph theo lớp sóng.
- Không dùng tô polygon/surface màu xanh hay đỏ; chỉ chữ số và màu chữ.

**BRAIN**
- Shape trường pseudo-3D bằng mask 2D/contour paths gốc, neural folds từ signed distance functions/noise có seed.
- Dịu, trôi nổi; xuất hiện neural pulses bằng thay đổi màu glyph dọc theo các quỹ đạo, không có vệt sáng đồ họa.
- Chưa cần mesh 3D thật hoặc rotating individual glyph; giữ ổn định khả năng đọc `0/1`.

**TOUCH**
- Một or nhiều radial impulse fields, phân bố dạng Gaussian/elastic damping, vị trí và độ mạnh được clamp.
- Pointer sampling có throttle theo animation frame; solve tại glyph positions gần vùng tác động để hạn chế CPU.
- Phải tương tác được bằng touch và mouse; bàn phím dùng riêng các controls có label.

---

## 6. Performance, rendering, accessibility

### 6.1 Initial targets — chỉ là budgets, phải đo thực tế

| KPI | Mục tiêu thử nghiệm | Ghi chú |
|---|---|---|
| Mobile mid-range | ≥30 FPS ổn định ở Ambient | Benchmark bằng thiết bị thật, không giả định thành công |
| Modern desktop | ≥55 FPS ở Ambient | Target trên màn 60 Hz, không cố khóa 60 khi thiết bị yếu |
| Glyph count | Auto tune, khởi điểm ~1.500–3.500 glyph mobile | Readability và diện tích màn hình quyết định count cuối |
| Touch response | First visual feedback ≤100 ms mục tiêu | Đo bằng performance trace/video |
| Morph length | 1.2–2.2 s | Có thể rút ngắn theo reduced motion |
| Main-thread long tasks | Tránh frame spikes liên tục | Dùng performance profiling, không đoán |
| Quality fallback | Không crash, không mất UI | Eco hoặc static mode |

- DPR và canvas backing resolution có cap theo thiết bị để tránh băng thông pixel quá cao; không hạ đến mức glyph biến thành dots.
- Adaptive quality được ưu tiên thay đổi **glyph count / render cadence / resolution** (toàn màn), không chọn nhiều cỡ font từng vùng.
- `document.visibilityState === 'hidden'`: dừng loop; khi quay lại dùng timestamp mới, tránh delta time lớn làm hình biến dạng.
- Nút/tương tác UI có khả năng đáp ứng ngay cả khi engine đang hạ chất lượng.
- Không sử dụng DOM node riêng cho từng glyph.
- `prefers-reduced-motion: reduce`: mặc định `Still`, cho phép bật motion thủ công một cách có chủ đích.
- Hỗ trợ keyboard focus, text contrast, accessible labels, không phụ thuộc duy nhất vào màu sắc.
- Tránh flashing/strobing; giới hạn tốc độ và biên độ alpha fluctuation.

### 6.2 Instrumentation

- Rolling FPS (ví dụ 60-frame window), average frame time và p95 frame time trong Lab panel.
- Debug overlays: glyph bounds, mask contour (chỉ dev mode), pointer force radius, actual DPR, canvas pixel count.
- Tùy chọn xuất `benchmark.json` cho từng thiết bị, ghi browser, viewport, quality, FPS samples, cảnh báo throttling (không thu fingerprint hay upload dữ liệu mặc định).

---

## 7. Acceptance criteria — UAT gates

### GATE A — Visual fidelity (BLOCKING)

- [ ] Background RGB đồng nhất ngoài UI/matrix; **không có** màu loang, vệt đỏ, gradient nền, glow hay heatmap.
- [ ] Phóng to screenshot: màu đỏ ở vùng matrix chỉ xuất hiện trên nét `0`/`1`, không có fill đỏ giữa ký tự (chấp nhận anti-aliasing nằm sát mép nét).
- [ ] Tất cả glyph cùng font size, weight, không bị scale; `0` và `1` còn đọc ra trên Android thật ở khoảng cách xem bình thường.
- [ ] Glyph có mặt sát đủ bốn viền; màu/sắc độ khác nhau giữa glyph, không phải dots.
- [ ] WOMAN gợi hình nhưng không có đường contour rõ; hít thở dễ nhận ra khi xem liên tục.
- [ ] UI bento phẳng, bố cục sạch, không lấn hoàn toàn vào vùng thể hiện matrix.

### GATE B — Behaviors (BLOCKING)

- [ ] Load → Woman breathing.
- [ ] Tương tác bento → morph liên tục thành Ocean; Ocean có sóng có chiều sâu.
- [ ] Focus/chat typing → Brain floating + pulse; không gọi API/không giả lập phản hồi AI.
- [ ] Blur input → quay về mode trước đó chính xác.
- [ ] Tap/drag matrix → lõm + phục hồi đàn hồi trên cả 3 shape, UI và scroll vẫn hoạt động.
- [ ] Rapid interactions không tạo race condition, kẹt shape, giật hình hoặc memory leak.
- [ ] Manual mode controls và Reset chạy đúng.

### GATE C — Mobile/performance/accessibility (BLOCKING)

- [ ] Test thực trên ít nhất một Android tầm trung; ưu tiên thêm iPhone Safari và desktop Chrome/Firefox.
- [ ] Ghi nhận FPS/frametime và hành vi nóng máy/hao pin tương đối; performance target đạt hoặc có Eco fallback được chấp nhận.
- [ ] Browser không hỗ trợ một đường render nâng cao vẫn dùng Canvas 2D/main thread fallback.
- [ ] Keyboard, touch, portrait/landscape, resize, soft keyboard, reduced motion, tab background được kiểm thử.
- [ ] No console errors/unhandled promise rejections, no runaway event listeners.

### GATE D — Public showcase/reproducibility (BLOCKING)

- [ ] `npm ci && npm run dev` khởi động được trên máy mới.
- [ ] `npm run build`, `npm run test`, `npm run lint`, typecheck qua CI.
- [ ] Có public live demo + README hữu ích + video/GIF 4 hành vi + architecture doc + LICENSE.
- [ ] No secrets/API keys; nội dung demo không gửi ra third-party endpoints.
- [ ] Deploy từ commit đã tag; repo/source và demo thể hiện cùng một phiên bản.

---

## 8. Testing methodology

- **Unit tests:** seeded glyph field deterministic; invariant equal font size; interpolation endpoints; touch damping returns to zero; transitions obey priorities; quality downgrade logic.
- **Component tests:** bento keyboard activation, Lab controls, chat blur/focus, reset, labels.
- **E2E (Playwright):** load, switch modes, enter text, blur, pointer drag, reduced motion, resize; screenshot snapshots.
- **Visual inspection:** overlay zoomed crop of glyphs on `WOMAN`, `OCEAN`, `BRAIN` to detect blur/big glyphs/color bleed.
- **Manual UAT:** Android Chrome portrait primary; Android landscape; desktop Chrome; Safari mobile when available; verify actual touch, scroll, input keyboard, battery/thermal behavior.
- **Reproducibility:** fixed RNG seed for test snapshots; user-facing session can keep same seed for stable identity.

---

## 9. Suggested repository layout

```text
binary-living-matrix/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
├── public/
│   ├── favicon.svg
│   └── og-cover.png
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── showcase.css
│   ├── components/
│   │   ├── BentoCards.tsx
│   │   ├── ChatTrigger.tsx
│   │   ├── LabDrawer.tsx
│   │   └── MetricsPanel.tsx
│   ├── matrix/
│   │   ├── core/
│   │   │   ├── GlyphField.ts
│   │   │   ├── MatrixEngine.ts
│   │   │   ├── StateMachine.ts
│   │   │   └── quality.ts
│   │   ├── shapes/
│   │   │   ├── woman.ts
│   │   │   ├── ocean.ts
│   │   │   └── brain.ts
│   │   ├── motion/
│   │   │   ├── breathing.ts
│   │   │   ├── waves.ts
│   │   │   ├── morph.ts
│   │   │   └── touch.ts
│   │   ├── render/
│   │   │   ├── CanvasRenderer.ts
│   │   │   ├── workerAdapter.ts
│   │   │   └── fallback.ts
│   │   └── types.ts
│   ├── hooks/
│   ├── styles/
│   └── main.tsx
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── visual/
├── docs/
│   ├── SPEC.md
│   ├── ARCHITECTURE.md
│   ├── VISUAL-DNA.md
│   ├── UAT.md
│   ├── PERFORMANCE.md
│   └── references.md
├── media/
│   ├── screenshots/
│   └── demos/
├── README.md
├── README.vi.md
├── LICENSE
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

`src/matrix/` là hạt nhân có thể tách ra thành `@batcave/binary-matrix` sau khi đã ổn định; **không vội publish npm package trong v1**.

---

## 10. GitHub and public launch

### Repository bar for a portfolio-worthy release

- Public repo mô tả rõ project không phải AI chatbot, không cần backend và không cần model inference.
- README EN với hero GIF 4 trạng thái, nút live demo, core principles, setup, architecture, benchmarks, accessibility, browser compatibility, screenshots; README.vi.md song song.
- Có LICENSE rõ ràng. **MIT được đề xuất cho code**, nhưng chỉ áp dụng khi chủ repo chấp thuận; tài sản đồ họa/font/ảnh có giấy phép riêng nếu cần. Public repo **không tự động đồng nghĩa** open-source licensed.
- CI checks trên pull requests + production build; deploy GitHub Pages qua GitHub Actions (hoặc deploy trên Sites/hosting khác nếu môi trường thực tế cho phép, trong khi source giữ tại GitHub).
- Nếu chọn GitHub Pages cho Vite project subpath, cấu hình `base: '/binary-living-matrix/'`; có thể đổi nếu dùng custom domain.
- Repo demo có pinned release/tag `v1.0.0`, CHANGELOG, demo video/GIF được ghi từ **bản triển khai thật**, không dùng mockup giả làm bằng chứng chạy được.
- Optional: một dòng `Built as a living design system experiment` và `View source` dẫn thẳng GitHub.

**Không thực hiện trong bước viết tài liệu:** tạo repository, commit, publish site, gắn domain. Đây là các hành động triển khai riêng sau khi có code hoàn chỉnh.

---

## 11. Build phases and checkpoints

**Phase 0 — Establish visual proof**  
Implement seeded glyph field, fixed-size legible text, ivory background, tinted glyphs, static WOMAN. Gate A must pass **before animation work**. Nếu chưa đẹp thì dừng, không cố vá bằng hiệu ứng blur.

**Phase 1 — Breathing & touch**  
Add oscillator and elastic pointer overlay; verify mobile interaction and FPS; write unit tests. Ưu tiên tạo cảm giác sinh thể, không làm mạnh tay đến biến dạng loạn.

**Phase 2 — Morphable shapes**  
Build OCEAN, BRAIN field functions; stable glyph mapping, deterministic morph, transition state machine. Gate B.

**Phase 3 — Showcase UI & Lab**  
Bento, chat trigger, settings, metrics, responsive, accessibility, local demo disclaimers.

**Phase 4 — Performance hardening**  
Instrument, auto quality, reduced motion, Worker evaluation, device UAT. Chỉ cân nhắc WebGL2 nếu dữ liệu chứng minh cần thiết. Gate C.

**Phase 5 — Public release**  
Docs, GIF, screenshots, EN/VI README, CI, LICENSE decision, GitHub public repo, live deploy, tag release. Gate D.

---

## 12. Risk register / design decisions

| Risk | Severity | Mitigation |
|---|---|---|
| Glyph quá bé thành dots | Critical | Optical UAT trên mobile thật; tăng global font-size đồng đều khi cần |
| Hiệu ứng thành heatmap giả | Critical | Pixel/background invariant + screenshot crop review; no glow/gradient fills |
| Hình cô gái quá rõ hoặc quá vô hình | High | Tunable mask feather/colors + visual review trước motion |
| Morph teleport/flicker | High | Stable glyph IDs + continuous field interpolation + deterministic seed |
| Mobile FPS sụt | High | Adaptive density/cadence/DPR, hidden-tab pause, reduced-motion static fallback |
| Touch cản scroll/input | High | Pointer ownership và `touch-action` theo vùng; regression E2E/mobile UAT |
| Brain trông như khối mờ | Medium | Fold fields/contours via glyph colors, no image overlay |
| Scope creep thành app AI | Medium | Chat is an interaction trigger only; zero API/network by default |
| Code bị gắn cứng UI | Medium | Framework-agnostic engine, clear contracts, no import from React into core |
| Public repo thiếu quyền assets | Medium | Original assets or license audit; MIT only for eligible code |

---

## 13. Definition of Done

**v1 DONE** chỉ khi đồng thời thỏa mãn:

1. Tất cả **Gate A–D** được đánh dấu PASS dựa trên kiểm thử thực tế.
2. Bốn hành vi thể hiện bằng **screen capture từ demo thật**.
3. URL public mở được trên mobile không cần MacBook/thiết bị nguồn chạy liên tục.
4. GitHub public repo có source/build instructions/CI/license/technical docs và các link hoạt động.
5. Matrix engine được tách module sạch, có thể tái sử dụng; không cần copy-paste nguyên site cho sản phẩm khác.

**Non-goal:** đạt FPS tối đa bằng mọi giá. **Ưu tiên đúng thứ tự:** visual DNA → trải nghiệm/độ phản ứng → accessibility → performance → mở rộng renderer. Không chấp nhận tăng FPS bằng cách làm glyph thành dots hoặc chèn heatmap màu.

---

## References (external technical facts; not project test results)

- MDN Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- MDN OffscreenCanvas: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- Vite static deployment / GitHub Pages: https://vite.dev/guide/static-deploy.html
- GitHub licensing: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository

**Status note:** Tài liệu này là kế hoạch/spec được đề xuất, không tuyên bố rằng source, GitHub repository, website, browser compatibility hay benchmark đã được thực hiện.