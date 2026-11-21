# Bàn giao hiện tại

**22/11/2026 · Spike A v0.4.0 · Sites version 4** · [Mở GiftU Live Testbed](https://giftu.batmanbegun.chatgpt.site/).

| Mốc | Nguồn |
| --- | --- |
| GitHub, [PR #1](https://github.com/batman-begun/GiftU/pull/1) đã merge | `ca33c730ed6b03ed7f945fef17fe733c5726988d` |
| Source deploy trên Sites | `6e0db2668f78f9eb36900c7aa8f2c3a89afab0db` |
| Rollback | Sites version 3 · v0.3.0 · `419d11ba2b0463f58da9845459212c254a10e629` |

## Đã triển khai

- Matrix phủ viewport, giảm chuyển động và mật độ glyph dưới nội dung đọc. GuBot và nét miệng dùng `0`/`1`. Mỗi lượt xé lưới số để hé một trong năm vật phẩm clay SVG 2.5D.
- Nút Âm thanh có từ màn mở, mặc định tắt. Khi bật, có tiếng xé và tiếng cảm thán ngắn cho ba phản ứng. SVG và module âm thanh nằm trong cache PWA `giftu-shell-0.4.0-clay`.
- Demo lưu trên thiết bị. Setup tạo link chơi và link kết quả riêng. Người nhận review, quyết định chia sẻ và tải lại để tiếp tục. Worker + D1 duy trì quyền link và chỉ gửi các lựa chọn thật đã được chia sẻ.

## Kiểm chứng

- `npm test` trên SHA GitHub và build/test trên checkout Sites đều pass 5/5 trên Node 24.
- Chrome 320–430 CSS px đã render vật phẩm SVG. Ở 390 px đã bật nút âm thanh, thử ba phản ứng và đến review. UAT âm sắc, timing, swipe, reduced motion và PWA install/offline còn chờ Android thật.

- Smoke HTTPS trên live: 8 asset khớp byte với SHA GitHub, SVG đúng MIME, tạo phòng Cho chàng, tải lại tiến độ, đồng ý chia sẻ và đọc report đều pass. Chrome live mở được món clay và bật được nút âm thanh.

## Việc tiếp theo

1. UAT v0.4.0 trên Android qua Live Testbed. Kiểm độ rõ nét miệng và quà, cảm giác cú xé, âm thanh và hai link.
2. Xử lý hash có cả `play` và `report`, link token rỗng rơi về demo và phân biệt link lỗi với mạng lỗi.
3. Hoàn thiện Report v0 với gợi ý mua và mẹo cụ thể, rồi nối sang nhánh săn kho báu 1A. Hạn mức tạo phòng, catalog mở rộng và replay còn mở.

Chạy `npm run dev` từ root để thử Worker với database mẫu trong bộ nhớ. `npm test` kiểm bản Sites, `npm run test:prototype` kiểm spike Node cũ trong `prototypes/node-spike/`. Xem [quy ước asset](../assets/README.md) và [quy trình release](RELEASE.md).
