# Bàn giao hiện tại

## Report v0 và Hunt 1A · GiftU v0.5.0 · Sites version 9

**23/11/2026** · [Live Testbed](https://giftu.batmanbegun.chatgpt.site/) · [PR #6](https://github.com/batman-begun/GiftU/pull/6)

- GitHub merge `cffd70f37aa313ca566cbf3e418fb6cc9ea92b54`, source Sites `3dfb62ec0a561b8d2fd98132a5f57ea56c446ffc`. Rollback là Sites version 8.
- Live smoke kiểm sáu asset khớp byte, tạo phòng GuBot, consent, report, tạo hunt, thử sai, mở quà và quyền truy cập tách biệt. Chrome live đã mở form từ nhánh “Đã có quà”.

- GuBot clay v0.4.4 đã được chủ dự án UAT và duyệt ngày 23/11/2026.
- Report riêng hiện ba gợi ý mua và một mẹo cho mỗi hướng đã chia sẻ. Vào cùng form hunt từ report hoặc nhánh người tặng “Đã có quà”. Mỗi hunt có một câu đố và một lời nhắn, lưu qua migration `0001_hunts`, hết hạn sau 7 ngày.
- Chrome preview đã đi qua các tab riêng từ lời mời, lượt đoán, consent, report, xem trước hunt, tạo link, thử đáp án sai và mở quà bằng đáp án không dấu. Đã kiểm cả đường vào 1A trực tiếp. `npm test` kiểm quyền link, consent, báo cáo rỗng, hết hạn và dữ liệu reveal.
- Việc tiếp theo là UAT một vòng gửi thật trên Android. Phạm vi mở rộng hunt và catalog xem trong [spec](PRODUCT.md).

## GuBot clay · Spike A v0.4.4 · Sites version 8

**23/11/2026** · [Live Testbed](https://giftu.batmanbegun.chatgpt.site/) · [PR #5](https://github.com/batman-begun/GiftU/pull/5)

- GitHub merge `b85fb9e31b78807c3ef438c93f4468525e09bdae`, source Sites `5d182ea62c2f5f3d041a7573ebf84a89ad20c759`. Rollback là Sites version 7. WebP và module GuBot trên live khớp byte với bản đã test.

- Bản live thay hình GuBot trên trang mở và trong game bằng atlas clay 2.5D. Mười hai ô dùng chung một WebP 19.272 byte. Canvas giữ sóng, nhịp thở và hiệu ứng theo lượt chơi. Service worker cache atlas cùng app shell.
- Chrome preview đã kiểm GuBot xuất hiện bên món giấy dát vàng, bấm Không hợp khi tắt tiếng, rồi chuyển sang Nến thơm. Chạy lại bằng `npm run dev`, chọn “Tôi được mời chơi” và chơi thử. `npm test` kiểm Worker, Matrix và định dạng/dung lượng atlas.
- Độ rõ miệng, nhịp liếc và nụ cười đã qua UAT của chủ dự án. Phần dưới ghi lại bản live trước lần triển khai clay.


**22/11/2026 · Spike A v0.4.3 · Sites version 7** · [Mở GiftU Live Testbed](https://giftu.batmanbegun.chatgpt.site/).

| Mốc | Nguồn |
| --- | --- |
| GitHub, [PR #4](https://github.com/batman-begun/GiftU/pull/4) | `c9396a26da05b475a315d731ea6fdffd2f4c7a6b` |
| Source deploy trên Sites | `ce367fce508b2ffacd39ea38008774cc3f623bf3` |
| Rollback | Sites version 6 · v0.4.2 · `894fdb0f4846ac36fea3232ea33f450b88d83e54` |

## Đã triển khai

- Matrix phủ viewport, giảm chuyển động và mật độ glyph dưới nội dung đọc. GuBot và nét miệng dùng `0`/`1`. Mỗi lượt xé lưới số để hé một trong năm vật phẩm clay SVG 2.5D.
- Nút Âm thanh có từ màn mở, mặc định tắt. Khi bật, có tiếng xé, tiếng chúc mừng khi thích, tiếng xả khi không hợp, và tiếng cảm thán khi bỏ qua. SVG và module âm thanh nằm trong cache PWA `giftu-shell-0.4.3`.
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

- Live v0.4.3 đã publish và 9 asset kiểm tra khớp byte với nguồn đã test.

## Việc tiếp theo

1. UAT v0.4.3 trên Android qua Live Testbed. Kiểm độ rõ nét miệng và quà, cảm giác cú xé, âm thanh và hai link.
2. Build lát cắt 1A với một manh mối và một màn bật mí. Report v0 để sau.

Chạy `npm run dev` từ root để thử Worker với database mẫu trong bộ nhớ. `npm test` kiểm bản Sites, `npm run test:prototype` kiểm spike Node cũ trong `prototypes/node-spike/`. Xem [quy ước asset](../assets/README.md) và [quy trình release](RELEASE.md).
