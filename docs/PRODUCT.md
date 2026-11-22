# GiftU MVP — spec hiện hành

## Hướng sản phẩm

- **1A** — người tặng đã có quà, tạo hunt và gửi link riêng cho người nhận. Quà chính có clue và reveal, mood và decoy là tùy chọn. Luật hunt, cơ chế upload và độ tự động hóa còn mở.
- **1B** — người tặng chọn catalog, tự gửi link mời qua Zalo hoặc Messenger. Người nhận chơi GuBot, review và quyết định chia sẻ. Người tặng có thể đọc report, tự mua quà rồi vào 1A.
- Vai trò sender/receiver độc lập với giới tính. `for_her` và `for_him` dùng chung scene, luật và quyền truy cập. `open` là khả năng mở rộng của schema.

## Spike A

- Hai pack dữ liệu mẫu, mỗi lượt chơi gồm 2 món thật và 1 troll. GuBot và vết xé dùng chung lưới Binary Matrix. Vật phẩm clay SVG 2.5D xuất hiện từ vết xé. GuBot có thoại chữ định sẵn, đổi dáng miệng và phát tiếng cảm thán ngắn khi người chơi bật âm thanh.
- Mobile-first. Người chơi có Thích, Không hợp, Bỏ qua, Undo và nút thay cho swipe. Âm thanh tắt mặc định, có reduced motion và giữ tiến độ lúc reload.
- Review cho xác nhận 0–3 hướng quà thật. Report chỉ chứa các hướng đã được xác nhận sau khi người nhận đồng ý chia sẻ. Với 0 hướng đã chia sẻ, report hiển thị chưa có tín hiệu đủ rõ. Đây là quy ước chuẩn hóa cho Spike A, giải quyết khác biệt với v1.1 từng đề xuất thêm nhóm Không hợp/Bỏ qua.
- Link sender và receiver có quyền riêng, được kiểm tra phía server. Receiver không được đọc report hay ngân sách. Sender chưa có consent không đọc được kết quả. Nếu share thành công, Report v0 minh họa món cụ thể và mẹo chọn. Catalog, version và seed được giữ ổn định theo phòng.
- Kiểm tra hai chiều, người nhận từ chối, chỉ thích troll, reload, receiver thử truy cập report và trải nghiệm trên Android thật. Sau Spike A, dựa vào UAT để chọn mở rộng hoặc dùng fallback tĩnh cùng luồng review/consent/report.

## Sau Spike A

Tier 1 hướng tới 8 món thật + 2 troll, report đủ nội dung và đường quay về 1A. Chờ chốt catalog nam, mapping tuổi hai bộ, mức ngân sách, nội dung report, mascot và joke, luật hunt 1A, stack, vòng đời phòng và kế hoạch Noel. Marketplace, giao dịch và AI suy luận gu là hướng sau MVP. Xem [lịch sử](HISTORY.md) để đọc các bản đầy đủ.

## Quy tắc hình ảnh Binary Matrix

- Toàn viewport là một trường Matrix liên tục, kể cả dưới header và điều khiển. Giảm tương phản glyph ngay dưới chữ. Phản ứng vuốt thuộc vùng vật phẩm và chạm nền tạo sóng. Các màn review, xin phép và đọc kết quả ưu tiên chữ, giảm chuyển động.
- Trang chủ cho người tặng được GuBot mở lời bằng “Bạn đã có quà chưa?”. 1A hiện là hướng săn kho báu đang phát triển. 1B đưa tới setup mời chơi đoán gu. Demo là thao tác phụ. Link mời đưa thẳng tới vai người nhận, link kết quả tới vai người tặng.
- Bản UAT thử lưới dày hơn, thân GuBot đặc hơn, nền thở nhẹ và sóng lan khi chạm nền. Khi Thích, quà đập lên giữa viewport kèm hợp âm sáng nguyên bản. Khi Không hợp, glyph xoáy xuống kéo quà chìm, kèm tiếng nước xả tổng hợp. Reduced motion bỏ chuyển động lớn.
- Chỉ số `0` và `1` tạo hình mọi thành phần trực quan trong cảnh Matrix, gồm GuBot, mắt, miệng, giọt kem và vết xé. Vật phẩm là ngoại lệ đã chốt theo UAT: clay SVG 2.5D xuất hiện khi lưới số dạt ra hai mép. Mỗi ô có tối đa một số màu phẳng hoặc để trống. Nền trắng ngà giữ màu phẳng xuyên suốt. Không vẽ gradient phủ nền, mảng màu, đường viền, stroke, glow, sprite hoặc hình đệm giữa các số. Hình học nội bộ có thể chọn ô nhưng không được vẽ ra cảnh.
- GuBot là kem ốc quế tan lệch một bên và tụ từ cùng lưới số với vùng nền. Khi đi qua rìa silhouette, thay đổi dần tỷ lệ ô có số và cách chọn màu từng số. Giữ nét của từng số rõ. Mắt nheo ước lệ bằng mật độ ô.
- **Miệng là kênh biểu cảm chính.** Miệng đọc sắc như một nét vẽ nhờ một dải ô số tương phản cao. Từng ô trong miệng vẫn là số, với khoảng trắng ngà giữa ký tự. Không viền hay vẽ nét liền đè lên lưới.
- Tách pose và timing của miệng khỏi thân để thay đổi độ cong, độ mở và độ lệch. Miệng neo theo mặt khi thân biến dạng. Mỗi frame kết xuất pose thành tập ô số trên cùng lưới. Pose mặc định tự tin, nhiệt huyết. Các pose khác gồm khoe khoang, xin lỗi, ngu ngơ và kiệt sức.
- Kiểm bằng cách phóng to miệng, rìa và giọt rơi. Ngoài nét glyph, toàn bộ vùng cảnh phải là nền trắng ngà. Kiểm cả lúc đổi pose và chạy hiệu ứng.

- [Baseline GuBot đã duyệt](../assets/mockups/gubot/gubot-melting-cone-smirk-v1.png) ghi lại dáng kem, phối màu, rìa mềm và nét cười mặc định. Dùng hình để đối chiếu thiết kế khi triển khai theo quy tắc lưới ở trên.
