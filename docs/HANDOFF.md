# Bàn giao hiện tại

**22/11/2026 · Spike A v0.4.1 · Sites version 5** · [Mở GiftU Live Testbed](https://giftu.batmanbegun.chatgpt.site/).

| Mốc | Nguồn |
| --- | --- |
| GitHub, bản vá link | `d09d3d429378e9b370178b602b3205c3c7486f7b` |
| Source deploy trên Sites | `e1fcabf8702d76561104d6f6da5d78fb9190ffcc` |
| Rollback | Sites version 4 · v0.4.0 · `6e0db2668f78f9eb36900c7aa8f2c3a89afab0db` |

## Đã triển khai

- Matrix phủ viewport, giảm chuyển động và mật độ glyph dưới nội dung đọc. GuBot và nét miệng dùng `0`/`1`. Mỗi lượt xé lưới số để hé một trong năm vật phẩm clay SVG 2.5D.
- Nút Âm thanh có từ màn mở, mặc định tắt. Khi bật, có tiếng xé và tiếng cảm thán ngắn cho ba phản ứng. SVG và module âm thanh nằm trong cache PWA `giftu-shell-0.4.1`.
- Demo lưu trên thiết bị. Setup tạo link chơi và link kết quả riêng. Người nhận review, quyết định chia sẻ và tải lại để tiếp tục. Worker + D1 duy trì quyền link và chỉ gửi các lựa chọn thật đã được chia sẻ.

## Kiểm chứng

- `npm test` trên SHA GitHub và build/test trên checkout Sites đều pass 6/6 trên Node 24.
- Chrome 320–430 CSS px đã render vật phẩm SVG. Ở 390 px đã bật nút âm thanh, thử ba phản ứng và đến review. UAT âm sắc, timing, swipe, reduced motion và PWA install/offline còn chờ Android thật.

- Smoke HTTPS trên live: 9 asset khớp byte với SHA GitHub, SVG đúng MIME, tạo phòng Cho chàng, tải lại tiến độ, đồng ý chia sẻ và đọc report đều pass. Chrome live kiểm link rỗng và link có hai vai trò, rồi quay về phiên demo đã lưu. Kiểm mô phỏng lỗi mạng xác nhận Thử lại nạp đúng link chơi.

## Bản vá link v0.4.1

- Chặn link thiếu mã, sai định dạng, trùng tham số hoặc chứa cả hai vai trò. Link sai hoặc hết hạn có hướng thoát, lỗi mạng lúc mở phòng có nút thử lại. Quyền link và consent vẫn do Worker xử lý.

## Việc tiếp theo

1. UAT v0.4.1 trên Android qua Live Testbed. Kiểm độ rõ nét miệng và quà, cảm giác cú xé, âm thanh và hai link.
2. Hoàn thiện Report v0 với gợi ý mua và mẹo cụ thể, rồi nối sang nhánh săn kho báu 1A. Hạn mức tạo phòng, catalog mở rộng và replay còn mở.

Chạy `npm run dev` từ root để thử Worker với database mẫu trong bộ nhớ. `npm test` kiểm bản Sites, `npm run test:prototype` kiểm spike Node cũ trong `prototypes/node-spike/`. Xem [quy ước asset](../assets/README.md) và [quy trình release](RELEASE.md).
