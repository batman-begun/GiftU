# GiftU MVP — spec hiện hành

## Hướng sản phẩm

- **1A** — người tặng đã có quà, tạo hunt và gửi link riêng cho người nhận. Bản đầu có một manh mối, một đáp án chữ và một lời nhắn bật mí. Các chặng bổ sung, media và mood riêng thuộc phạm vi sau.
- **1B** — người tặng chọn catalog, tự gửi link mời qua Zalo hoặc Messenger. Người nhận chơi GuBot, review và quyết định chia sẻ. Người tặng có thể đọc report, tự mua quà rồi vào 1A.
- Vai trò sender/receiver độc lập với giới tính. `for_her` và `for_him` dùng chung scene, luật và quyền truy cập. `open` là khả năng mở rộng của schema.

## Spike A

- Hai pack dữ liệu mẫu, mỗi lượt chơi gồm 2 món thật và 1 troll. GuBot là nhân vật clay 2.5D. Binary Matrix mở vết xé, phản hồi chạm và diễn mood theo sự kiện game. Vật phẩm clay SVG 2.5D xuất hiện từ vết xé. GuBot có thoại chữ định sẵn và phát tiếng cảm thán ngắn khi người chơi bật âm thanh. Lượt món giấy dát vàng thử nhép miệng theo nhịp thoại, nheo mắt và cười chữa quê.
- Mobile-first. Người chơi có Thích, Không hợp, Bỏ qua, Undo và nút thay cho swipe. Âm thanh tắt mặc định, có reduced motion và giữ tiến độ lúc reload.
- Review cho xác nhận 0–3 hướng quà thật. Report chỉ chứa các hướng đã được xác nhận sau khi người nhận đồng ý chia sẻ. Với 0 hướng đã chia sẻ, report hiển thị chưa có tín hiệu đủ rõ. Đây là quy ước chuẩn hóa cho Spike A, giải quyết khác biệt với v1.1 từng đề xuất thêm nhóm Không hợp/Bỏ qua.
- Link sender và receiver có quyền riêng, được kiểm tra phía server. Receiver không được đọc report hay ngân sách. Sender chưa có consent không đọc được kết quả. Nếu share thành công, Report v0 đưa ba gợi ý mua và một mẹo chọn cho mỗi hướng đã đồng ý chia sẻ. Từ report, người tặng có thể bấm “Tôi đã có quà” để sang form tạo hunt. Catalog, version và seed được giữ ổn định theo phòng.
- Kiểm tra hai chiều, người nhận từ chối, chỉ thích troll, reload, receiver thử truy cập report và trải nghiệm trên Android thật. Sau Spike A, dựa vào UAT để chọn mở rộng hoặc dùng fallback tĩnh cùng luồng review/consent/report.

## Hunt 1A và Report v0

- Bản đầu nhận đúng một manh mối (tối đa 300 ký tự), một đáp án (100) và một lời nhắn bật mí (500). Người tặng xem trước, chỉnh sửa, tạo link và tự gửi. Có thể vào từ trang chủ hoặc report riêng.
- Mở link săn quà chỉ thấy manh mối. Worker kiểm đáp án và trả lời bật mí khi đúng. So khớp bỏ qua dấu tiếng Việt, hoa thường và khoảng trắng thừa. Link hunt có hiệu lực 7 ngày và thuộc một quyền truy cập riêng với link chơi GuBot và link report.
- Report phân biệt chưa chia sẻ với đã chia sẻ mà không giữ hướng quà nào. Gợi ý là nội dung biên tập theo từng hướng quà trong Spike A, áp dụng cho VI/EN/ZH.

## Sau Spike A

Tier 1 hướng tới 8 món thật + 2 troll, report đủ nội dung và đường quay về 1A. Các bước mở rộng gồm danh mục quà, mapping tuổi, mức ngân sách, luật hunt nhiều bước và kế hoạch Noel. Marketplace, giao dịch và AI suy luận gu là hướng sau MVP. Xem [lịch sử](HISTORY.md) để đọc các bản đầy đủ.

## Quy tắc hình ảnh Binary Matrix

- Toàn viewport là một trường Matrix liên tục, kể cả dưới header và điều khiển. Giảm tương phản glyph ngay dưới chữ. Phản ứng vuốt thuộc vùng vật phẩm và chạm nền tạo sóng. Các màn review, xin phép và đọc kết quả ưu tiên chữ, giảm chuyển động.
- Trang chủ giới thiệu GiftU rồi để GuBot hỏi khách muốn tặng quà hay được mời chơi. Chỉ người tặng được hỏi đã có quà chưa. 1A mở thẳng form tạo hunt không qua phòng GuBot. 1B giải thích một ván ba lượt, có xem trước lời chào và sao chép lời mời chỉnh sửa được với link chơi. Người tặng tự gửi tin và giữ riêng link kết quả. Người nhận có link đi thẳng vào trò tương ứng và tự quyết việc chia sẻ. Khách được mời nhưng chưa mở link được hướng dẫn tìm lại tin nhắn hoặc chơi demo.
- Ngày 23/11/2026, chủ dự án chốt GuBot clay 2.5D. Giữ silhouette kem tan lệch và nét cười lệch từ [baseline đã duyệt](../assets/mockups/gubot/gubot-melting-cone-smirk-v1.png). Tạo hình clay v1 đang thử nghiệm.
- Matrix phủ màn hình bằng glyph 0/1, dợn nhẹ khi chờ và lan sóng từ vị trí chạm. Khi hiện quà, glyph dạt ra hai bên. Khi Thích, glyph lan từ vùng va đập. Khi Không hợp, glyph cuộn xoáy kéo vật phẩm xuống. Reduced motion tắt chuyển động lớn.
- GuBot dùng một atlas WebP với thân, bóng, chóp kem, giọt clay, ba dáng mắt và năm dáng miệng. Các lớp dùng chung gốc tọa độ. Cảnh giấy dát vàng thử nheo mắt, nhép câu hiện trên màn, liếc xuống và cười chữa quê trong cùng mốc thời gian với hiệu ứng Matrix. Lip-sync theo tiếng nói thuộc phiên bản sau.
