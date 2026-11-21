# Bàn giao hiện tại

**22/11/2026 · Spike A v0.3.0** · [Mở GiftU live](https://giftu.batmanbegun.chatgpt.site/). Sites version 3 đã publish, source Sites `419d11ba2b0463f58da9845459212c254a10e629`. Bản rollback là Sites version 2.

## Ứng viên v0.4.0 · Matrix toàn màn hình

- Nhánh `codex/fullscreen-matrix` dùng một canvas phủ viewport từ entry tới kết quả. GuBot và quà vẫn tụ từ lưới số, nét miệng có thêm khoảng thoáng quanh glyph. Chạm nền tạo sóng. Vuốt trên món quà đi qua trình xử lý phản ứng. Màn đọc giảm chuyển động và tương phản glyph dưới chữ.
- Màn mở có Chơi thử và Tạo link mời chơi. Catalog nằm trong setup. Về trang mở qua chữ GiftU có thể tiếp tục demo đang dở. Link nhận và link kết quả vẫn riêng. Review, xin phép và kết quả là ba màn riêng. Worker và D1 dùng lại bản trước.
- Build và test bằng `cd sites && node build.mjs && node --test matrix.test.mjs worker.test.mjs` (4/4 pass trên Node 24). Có thể chạy `python3 -m http.server 4173 --directory sites/web` từ root để duyệt demo; luồng hai link cần Worker.
- Preview Chrome với Worker qua SQLite shim: kiểm bố cục desktop, canvas và nút lúc chơi ở 320×568, 390×844, 430×860 và landscape 667×375. Đã đổi ngôn ngữ, kiểm Hoàn tác và tiếp tục demo, tạo phòng Cho chàng, reload giữa lượt, bật/tắt lựa chọn trong review, chia sẻ và tải report. Report chờ consent và chỉ có cà phê, dù người nhận thích cả món troll.
- SlopLint tại pin `04977e15f3dfd6ee4b74c887dac3eb52665d6c92` sạch ở lớp tĩnh. Lớp render thiếu Puppeteer. Chưa UAT Android thật, swipe cảm ứng, giảm chuyển động theo cài đặt hệ điều hành, hiệu năng và PWA install/offline.

**Tiếp theo** là duyệt bố cục và test Android ứng viên v0.4.0, sau đó chốt phát hành Spike A trước khi làm Report v0 và nối sang nhánh 1A.

## Đã làm

- Bản live có ba ngôn ngữ, PWA, demo lưu trên thiết bị và phòng chia sẻ với link chơi và link report riêng. Worker + D1 lưu deck, tiến độ và consent. Report chỉ trả về các hướng thật đã xác nhận và chia sẻ.
- GuBot, năm vật phẩm của Spike A, hiệu ứng hiện hình, phản ứng và sóng chạm dùng cùng lưới `0`/`1` trên nền trắng ngà. Thân kem dựa theo [mockup đã duyệt](../assets/mockups/gubot/gubot-melting-cone-smirk-v1.png). Miệng được chọn ô riêng, đổi dáng tự tin, khoe khoang, xin lỗi, ngu ngơ và kiệt sức. Có hỗ trợ giảm chuyển động.
- Source phát hành nằm trong `sites/`. Logic chọn ô và mask nằm trong `sites/web/matrix-art.js`. Renderer `sites/web/matrix.js` vẽ glyph lên canvas. Luồng chơi trong `sites/web/app.js` truyền trạng thái và phản ứng. Node/SQLite ở repo root là spike local trước đó.

## Kiểm chứng

- Node 24, chạy `cd sites && node build.mjs && node --test matrix.test.mjs worker.test.mjs`. 4/4 pass. Có kiểm vị trí và loại glyph khi vẽ mô phỏng màn hình hẹp, hình học của năm món và năm dáng miệng, và quyền truy cập/consent qua SQLite shim.
- Đã mở v0.3.0 trên Chrome desktop, nhìn thấy GuBot và món troll bằng số. Chơi hết ba lượt demo Cho chàng. Like món troll và cà phê, từ chối vé, chỉ cà phê xuất hiện ở review. Shared API đã smoke qua HTTPS ở v0.2.0; Worker giữ nguyên từ bản đó.
- Android thật, swipe và cài PWA/offline chưa UAT. Preview cục bộ cho Worker này thiếu cấu hình dev, kiểm UI thực hiện trên bản đã publish.

## Sau khi duyệt UI

1. Khi phát hành, giữ origin hiện tại. Ghi bản mới, source SHA, kiểm chứng live và bản rollback trong file này.
2. Hoàn thiện Report v0 với gợi ý mua và mẹo cụ thể, rồi nối sang nhánh săn kho báu 1A. Hiện live chỉ hiện các hướng đã chọn. Tuổi/ngân sách, catalog đầy đủ, rate limit tạo phòng và replay còn mở.

Xem [quy ước asset](../assets/README.md) để lưu mockup, asset mẫu và asset chạy trên Sites.
