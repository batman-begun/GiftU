# Bàn giao hiện tại

**22/11/2026 · Spike A.** [GiftU live](https://giftu.batmanbegun.chatgpt.site/) đã public, bản 0.1.0 (Sites version 1). Live có ba ngôn ngữ, Binary Matrix, GuBot và PWA. Chạy thử trên live đã xác nhận đổi cả ba ngôn ngữ và loại món troll khỏi kết quả. Cài đặt và offline trên điện thoại thật còn chờ UAT. Live lưu trên thiết bị và mô phỏng consent.

**Backend Spike A chạy local trên GitHub.** Hai bộ Cho nàng / Cho chàng dùng chung luồng GuBot. Tạo phòng, gửi link chơi riêng, giữ link report, phản ứng với 2 món thật và 1 troll, undo, review, consent và đọc report. SQLite lưu tiến độ và bản chụp nội dung. Hai token riêng chỉ được lưu dưới dạng hash, phòng hết hạn sau 7 ngày.

## Chạy và kiểm tra

- Cần Node.js 24 trở lên. Chạy `npm start`, mở `http://localhost:3000`. Không cần cài dependency. Có thể đặt `PORT` và `GIFTU_DB`.
- Chạy `npm test` để kiểm API cả hai bộ, quyền link, consent, resume, undo, stale request và loại troll khỏi report. Đã chạy, 3/3 pass. `node --check public/app.js` pass. Đã smoke-test server khởi động.
- Kiểm UI thủ công bằng hai tab: tạo phòng, mở hai link, thử tải lại giữa lượt, review, đồng ý hoặc từ chối, mở hoặc cập nhật report. Chromium local không khởi động được vì môi trường chặn socket hệ thống. Android thật chưa UAT.

## Việc tiếp theo

1. Đối chiếu giao diện đang live với code GitHub, rồi đưa phần Matrix, PWA và ba ngôn ngữ vào cùng nguồn GitHub trước khi tích hợp backend lên Sites. Xác minh cách lưu dữ liệu và kiểm quyền bằng Sites. Node + SQLite là lựa chọn local cho spike. Publish bản tích hợp lên chính URL ở trên.
2. Test hai flow trên Android thật, gồm swipe/scroll, copy link, âm thanh, reload, hiệu ứng và chất hài. Tìm source Matrix Gate D đã qua UAT. Hiện dùng CSS, emoji và âm tổng hợp tạm thay cho renderer và assets cuối.
3. Trước khi mở preview ra ngoài, quyết định rate limit tạo phòng, dọn dữ liệu hết hạn và quy tắc vận hành. Lượt đã hoàn thành chỉ đọc, lịch sử replay và khôi phục link sender chưa có.
4. Chốt catalog và gameplay 1A sau UAT. Bản này dùng thứ tự fixture cố định và lưu snapshot của từng phòng. Chưa có tuổi/ngân sách, seed/version riêng, ba hướng mua mỗi thẻ hoặc màn tạo hunt.
