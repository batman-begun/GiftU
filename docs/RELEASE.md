# Triển khai GiftU

Codex phụ trách review cuối, merge vào main và publish GiftU bằng ChatGPT Sites. Mọi agent có quyền repo có thể đóng góp code, test, tài liệu và chuẩn bị bản release. GitHub giữ source và lịch sử, Sites giữ phiên bản triển khai.

Trước khi publish, Codex chọn commit ứng viên, xác minh cấu hình, tạo preview và kiểm thử các luồng thật từ preview. Kiểm tra Android, quyền riêng giữa sender và receiver, consent và các chức năng thuộc phạm vi release. Sau khi publish, kiểm tra live rồi ghi URL, commit SHA, phiên bản Sites, kết quả smoke test và phiên bản có thể rollback trong HANDOFF. Giữ cấu hình nhạy cảm trong môi trường triển khai.

## Tạo bản ứng viên

- Từ root chạy `npm test`, rồi `npm run dev` để kiểm Worker và luồng hai link tại máy.
- Source phát hành nằm trong `sites/`. Build tạo `sites/dist/server/`. Giữ binding D1 `DB` và các migration trong `sites/drizzle/` khi chuẩn bị gói. Dùng project GiftU hiện có và giữ origin live.
- Xem [bàn giao](HANDOFF.md) để biết phiên bản live, SHA triển khai, bản rollback và phần kiểm còn mở.
