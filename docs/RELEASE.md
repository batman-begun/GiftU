# Triển khai GiftU

Codex phụ trách review cuối, merge vào main và publish GiftU bằng ChatGPT Sites. Mọi agent có quyền repo có thể đóng góp code, test, tài liệu và chuẩn bị bản release. GitHub giữ source và lịch sử, Sites giữ phiên bản triển khai.

Trước khi publish, Codex chọn commit ứng viên, xác minh cấu hình, tạo preview và kiểm thử các luồng thật từ preview. Kiểm tra Android, quyền riêng giữa sender và receiver, consent và các chức năng thuộc phạm vi release. Sau khi publish, kiểm tra live rồi ghi URL, commit SHA, phiên bản Sites, kết quả smoke test và phiên bản có thể rollback trong HANDOFF. Giữ cấu hình nhạy cảm trong môi trường triển khai.

## Bản đang chạy

- [GiftU live](https://giftu.batmanbegun.chatgpt.site/) · public, v0.1.0 (Sites version 1). Dùng cùng URL cho từng bản review và cho production.
- Commit nguồn triển khai trên Sites `c7d686d5330c5b1398eb0669e694af548f8b8902`. Đây là snapshot frontend chạy độc lập. Backend hiện ở GitHub và chạy local. Đưa giao diện live về GitHub và chuẩn hóa đường phát hành từ commit đã review ở lần tích hợp tiếp theo.
- Đã kiểm trên live luồng GuBot, lọc món troll và đổi cả ba ngôn ngữ. Đây là bản Sites đầu tiên, chưa có bản trước để rollback.
