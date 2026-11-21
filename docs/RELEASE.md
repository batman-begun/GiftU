# Triển khai GiftU

Codex phụ trách triển khai và publish GiftU bằng ChatGPT Sites. Mọi agent có quyền repo có thể đóng góp code, test, tài liệu và chuẩn bị bản release. GitHub giữ source và lịch sử, Sites giữ phiên bản triển khai.

Trước khi publish, Codex chọn commit ứng viên, xác minh cấu hình, tạo preview và kiểm thử các luồng thật từ preview. Kiểm tra Android, quyền riêng giữa sender và receiver, consent và các chức năng thuộc phạm vi release. Sau khi publish, kiểm tra live rồi ghi URL, commit SHA, phiên bản Sites, kết quả smoke test và phiên bản có thể rollback trong HANDOFF. Giữ cấu hình nhạy cảm trong môi trường triển khai.

Hiện chưa có Sites project hoặc release GiftU được xác minh.
