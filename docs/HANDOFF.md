# Bàn giao hiện tại

**22/11/2026 · Spike A v0.4.2 · Sites version 6** · [Mở GiftU Live Testbed](https://giftu.batmanbegun.chatgpt.site/).

| Mốc | Nguồn |
| --- | --- |
| GitHub, [PR #3](https://github.com/batman-begun/GiftU/pull/3) | `36a096bb22774c57803199f0225eb103c23168dd` |
| Source deploy trên Sites | `894fdb0f4846ac36fea3232ea33f450b88d83e54` |
| Rollback | Sites version 5 · v0.4.1 · `e1fcabf8702d76561104d6f6da5d78fb9190ffcc` |

## Đã triển khai

- Matrix phủ viewport, giảm chuyển động và mật độ glyph dưới nội dung đọc. GuBot và nét miệng dùng `0`/`1`. Mỗi lượt xé lưới số để hé một trong năm vật phẩm clay SVG 2.5D.
- Nút Âm thanh có từ màn mở, mặc định tắt. Khi bật, có tiếng xé, tiếng chúc mừng khi thích, tiếng xả khi không hợp, và tiếng cảm thán khi bỏ qua. SVG và module âm thanh nằm trong cache PWA `giftu-shell-0.4.2`.
- Demo lưu trên thiết bị. Setup tạo link chơi và link kết quả riêng. Người nhận review, quyết định chia sẻ và tải lại để tiếp tục. Worker + D1 duy trì quyền link và chỉ gửi các lựa chọn thật đã được chia sẻ.

## Kiểm chứng

- `npm test` trên SHA GitHub và build/test trên checkout Sites đều pass 6/6 trên Node 24.
- Chrome 320–430 CSS px đã render vật phẩm SVG. Ở 390 px đã bật nút âm thanh, thử ba phản ứng và đến review. UAT âm sắc, timing, swipe, reduced motion và PWA install/offline còn chờ Android thật.

- Smoke HTTPS trên v0.4.1: 9 asset khớp byte với SHA GitHub, SVG đúng MIME, tạo phòng Cho chàng, tải lại tiến độ, đồng ý chia sẻ và đọc report đều pass. Chrome live kiểm link rỗng và link có hai vai trò, rồi quay về phiên demo đã lưu. Kiểm mô phỏng lỗi mạng xác nhận Thử lại nạp đúng link chơi.

## Bản vá link v0.4.1

- Chặn link thiếu mã, sai định dạng, trùng tham số hoặc chứa cả hai vai trò. Link sai hoặc hết hạn có hướng thoát, lỗi mạng lúc mở phòng có nút thử lại. Quyền link và consent vẫn do Worker xử lý.

## Thay đổi trải nghiệm v0.4.2

- Đối chiếu mockup GuBot và renderer Binary Matrix Showcase ở `2a43fbe`. Tăng mật độ glyph, tách nhịp thở khỏi vòng sóng, thêm phản ứng đập toàn màn hình và lưới xoáy nhấn chìm vật phẩm. Hai cue âm thanh là chime và tiếng xả tổng hợp.
- Trang chủ thử hỏi theo ý định người tặng, trình bày 1A đang phát triển và 1B đang chạy. Người nhận có link vẫn đi thẳng tới lời mời.
- Kiểm Node 24 pass 6/6. Chrome 390 CSS px đã kiểm vào setup, quay lại, Thích và Không hợp đến review. Kiểm tĩnh giao diện sạch. Cần UAT độ mượt, âm thanh và nhận diện nhánh trên Android thật. Report v0 để sau.

- Trên live v0.4.2, 7 asset kiểm tra khớp byte với nguồn đã test.

## Luồng GuBot v0.4.3

- Homepage giải thích mục đích rồi hỏi vai; nhánh 1B hướng dẫn trước khi tạo và sao chép link. Bên nhận có lời chào riêng và quyền chia sẻ được nói trước.
- Node 24 pass 6/6. Chrome preview đã kiểm hai vai, điều hướng quay lại, xem trước, tạo phòng, sửa và copy lời mời chỉ kèm link chơi, mở link nhận vào thẳng game và link kết quả vào đúng màn riêng.
- 1A hiện có lời hướng dẫn và trạng thái đang phát triển. Lát cắt một manh mối và một màn bật mí là bước tiếp theo. Report v0 để sau.

## Việc tiếp theo

1. UAT v0.4.2 trên Android qua Live Testbed. Kiểm độ rõ nét miệng và quà, cảm giác cú xé, âm thanh và hai link.
2. Build lát cắt 1A với một manh mối và một màn bật mí. Report v0 để sau.

Chạy `npm run dev` từ root để thử Worker với database mẫu trong bộ nhớ. `npm test` kiểm bản Sites, `npm run test:prototype` kiểm spike Node cũ trong `prototypes/node-spike/`. Xem [quy ước asset](../assets/README.md) và [quy trình release](RELEASE.md).
