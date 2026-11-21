# Bàn giao hiện tại

**22/11/2026 · Spike A v0.2.0** · [Mở GiftU live](https://giftu.batmanbegun.chatgpt.site/). Sites version 2 đã publish, source Sites `d25de5c6bb4b5972ec872dab9f0b2080718e9796`. Bản trước để rollback là Sites version 1.

## Đã làm

- Đưa giao diện Matrix, GuBot, ba ngôn ngữ và tài sản PWA vào `sites/`. Có demo lưu trên thiết bị và luồng phòng chia sẻ qua hai link riêng.
- Worker + D1 lưu deck, tiến độ và consent. Link bearer riêng, token hash trong storage, hết hạn sau 7 ngày. Report chỉ trả về các hướng thật đã xác nhận và chia sẻ.
- Chạy `cd sites && node build.mjs && node --test worker.test.mjs` với Node 24+. Kiểm thử Worker qua SQLite shim pass cho cả hai catalog, quyền link, reload qua API, troll và consent. Sites v2 publish thành công. Smoke test HTTPS trên live pass cả hai bộ, gồm tạo phòng, chặn link chơi đọc report, tải lại tiến độ, chặn troll, đồng ý chia sẻ và giữ riêng. POST smoke dùng Origin của chính site.
- Node/SQLite ở repo root là spike local trước đó. Source phục vụ release nằm trong `sites/`.

## Việc tiếp theo

1. UAT trên Android bằng hai thiết bị hoặc hai cửa sổ riêng. Tạo phòng, chuyển link chơi, tải lại giữa lượt, đồng ý hoặc từ chối, rồi kiểm link report. Kiểm PWA install/offline, swipe, âm thanh và chuyển ngôn ngữ.
2. Bổ sung Report v0 chi tiết. Bản live chỉ hiện hướng đã chọn, chưa có gợi ý mua/mẹo và chưa có nhánh 1A. Age/budget, nội dung catalog thật, rate limit tạo phòng và chính sách replay còn mở.
3. Tìm source Matrix Gate D nếu cần nâng hiệu ứng. Khi release tiếp, giữ origin hiện tại và ghi Sites version, SHA, kiểm chứng live và bản rollback trong file này.
