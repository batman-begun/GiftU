# Bàn giao hiện tại

**22/11/2026 · Spike A chạy local.** Hai bộ Cho nàng / Cho chàng dùng chung luồng GuBot. Tạo phòng, gửi link chơi riêng, giữ link report, phản ứng với 2 món thật và 1 troll, undo, review, consent và đọc report. SQLite lưu tiến độ và bản chụp nội dung. Hai token riêng chỉ được lưu dưới dạng hash, phòng hết hạn sau 7 ngày.

## Chạy và kiểm tra

- Cần Node.js 24 trở lên. Chạy `npm start`, mở `http://localhost:3000`. Không cần cài dependency. Có thể đặt `PORT` và `GIFTU_DB`.
- Chạy `npm test` để kiểm API cả hai bộ, quyền link, consent, resume, undo, stale request và loại troll khỏi report. Đã chạy, 3/3 pass. `node --check public/app.js` pass. Đã smoke-test server khởi động.
- Kiểm UI thủ công bằng hai tab: tạo phòng, mở hai link, thử tải lại giữa lượt, review, đồng ý hoặc từ chối, mở hoặc cập nhật report. Chromium local không khởi động được vì môi trường chặn socket hệ thống. Android thật chưa UAT.

## Việc tiếp theo

1. Chuẩn bị preview qua ChatGPT Sites. Xác minh cách tích hợp backend giữ dữ liệu và kiểm quyền. Node + SQLite là lựa chọn local cho spike. Chưa có bản Sites hoặc URL live.
2. Test hai flow trên Android thật, gồm swipe/scroll, copy link, âm thanh, reload, hiệu ứng và chất hài. Tìm source Matrix Gate D đã qua UAT. Hiện dùng CSS, emoji và âm tổng hợp tạm thay cho renderer và assets cuối.
3. Trước khi mở preview ra ngoài, quyết định rate limit tạo phòng, dọn dữ liệu hết hạn và quy tắc vận hành. Lượt đã hoàn thành chỉ đọc, lịch sử replay và khôi phục link sender chưa có.
4. Chốt catalog và gameplay 1A sau UAT. Bản này dùng thứ tự fixture cố định và lưu snapshot của từng phòng. Chưa có tuổi/ngân sách, seed/version riêng, ba hướng mua mỗi thẻ hoặc màn tạo hunt.
