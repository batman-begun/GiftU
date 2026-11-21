# GiftU MVP — spec hiện hành

## Hướng sản phẩm

- **1A** — người tặng đã có quà, tạo hunt và gửi link riêng cho người nhận. Quà chính có clue và reveal, mood và decoy là tùy chọn. Luật hunt, cơ chế upload và độ tự động hóa còn mở.
- **1B** — người tặng chọn catalog, tự gửi link mời qua Zalo hoặc Messenger. Người nhận chơi GuBot, review và quyết định chia sẻ. Người tặng có thể đọc report, tự mua quà rồi vào 1A.
- Vai trò sender/receiver độc lập với giới tính. `for_her` và `for_him` dùng chung scene, luật và quyền truy cập. `open` là khả năng mở rộng của schema.

## Spike A

- Hai pack dữ liệu mẫu, mỗi lượt chơi gồm 2 món thật và 1 troll. Dùng sticker 2D, mascot hai trạng thái, kịch bản định sẵn và tái dùng hiệu ứng Matrix sau khi xác minh source.
- Mobile-first. Người chơi có Thích, Không hợp, Bỏ qua, Undo và nút thay cho swipe. Âm thanh tắt mặc định, có reduced motion và giữ tiến độ lúc reload.
- Review cho xác nhận 0–3 hướng quà thật. Report chỉ chứa các hướng đã được xác nhận sau khi người nhận đồng ý chia sẻ. Với 0 hướng đã chia sẻ, report hiển thị chưa có tín hiệu đủ rõ. Đây là quy ước chuẩn hóa cho Spike A, giải quyết khác biệt với v1.1 từng đề xuất thêm nhóm Không hợp/Bỏ qua.
- Link sender và receiver có quyền riêng, được kiểm tra phía server. Receiver không được đọc report hay ngân sách. Sender chưa có consent không đọc được kết quả. Nếu share thành công, Report v0 minh họa món cụ thể và mẹo chọn. Catalog, version và seed được giữ ổn định theo phòng.
- Kiểm tra hai chiều, người nhận từ chối, chỉ thích troll, reload, receiver thử truy cập report và trải nghiệm trên Android thật. Sau Spike A, dựa vào UAT để chọn mở rộng hoặc dùng fallback tĩnh cùng luồng review/consent/report.

## Sau Spike A

Tier 1 hướng tới 8 món thật + 2 troll, report đủ nội dung và đường quay về 1A. Chờ chốt catalog nam, mapping tuổi hai bộ, mức ngân sách, nội dung report, mascot và joke, luật hunt 1A, stack, vòng đời phòng và kế hoạch Noel. Marketplace, giao dịch và AI suy luận gu là hướng sau MVP. Xem [lịch sử](HISTORY.md) để đọc các bản đầy đủ.

## Tạo hình và animation GuBot

- GuBot là kem ốc quế tan lệch một bên, tụ từ cùng lưới số 0/1 đa sắc trên nền trắng ngà. Rìa silhouette chuyển dần về mật độ và màu của nền. Mắt nheo ước lệ.
- **Miệng là kênh biểu cảm chính.** Biên miệng sắc, đọc được ở kích thước nhỏ, có thể rõ như một nét vẽ. Quy tắc làm mềm rìa áp dụng cho silhouette bên ngoài.
- Khi triển khai, tách pose và timing của miệng khỏi hình thân để đổi độ cong, độ mở và độ lệch độc lập. Duy trì điểm neo theo mặt khi thân biến dạng. Pose mặc định tự tin, nhiệt huyết. Các pose khác bao gồm khoe khoang, xin lỗi, ngu ngơ và kiệt sức.
