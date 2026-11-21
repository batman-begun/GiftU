# GiftU — Product Strategy Checkpoint

**Ngày checkpoint:** 2026-11-21 (Asia/Ho_Chi_Minh)  
**Trạng thái:** Discovery / product strategy. **Chưa chốt PRD, chưa triển khai GiftU.**  
**Mục đích:** Handoff sang thread mới để tiếp tục **Group 1B — WHAT TO GIFT / Chưa biết tặng gì (MVP)**.

> **Nguyên tắc đọc:** Các mục **ĐÃ THỐNG NHẤT** phản ánh hướng đã đồng thuận trong hội thoại; **ĐỀ XUẤT** là ý tưởng của assistant chưa được user duyệt thành requirement; **CHƯA CHỐT** cần bàn tiếp. Không trộn ba loại.

## 1. Tầm nhìn / insight cốt lõi — ĐÃ THỐNG NHẤT

GiftU giải **hai bài toán liên tiếp** cho người tặng:

1. **WHAT TO GIFT?** — Tặng cái gì? Có quà sẵn hay chưa biết chọn quà.
2. **HOW TO GIFT?** — Trao món quà theo cách độc đáo: cuộc săn kho báu/giải đố trong thế giới **Binary Matrix**.

Bản thân treasure hunt là **CÁCH tặng quà**, không phải toàn bộ giá trị sản phẩm. USP mong muốn là **trải nghiệm truy tìm kho báu đặc trưng, gắn với chính vật lý/interaction của Binary Matrix** (sóng, phản xạ, biến dạng hình học, morph), chứ không phải game tầm thường phủ một “Matrix skin”.

**Tránh:** quà số sến súa/generic được AI xào như thể đó là lời giải cho nỗi đau chọn quà. Người tặng thường muốn món quà **có giá trị thực tế, hợp sở thích, đáng tiền** nhưng khó quyết định (điện thoại đắt, hoa nhàm, quần áo sai size, son không biết màu/brand...). Thiệp, nhạc, ảnh, voice có thể làm **mood** hoặc nội dung phụ; đừng mặc định chúng thay thế quà chính.

## 2. Tài sản kỹ thuật sẵn có — ĐÃ CÓ

- **Binary Matrix showcase** đã được UAT thực tế trên Android và user đánh giá **đạt/perfect** sau các vòng chỉnh sửa.
- Những thế mạnh phải kế thừa: hình bằng ký tự nhị phân, morph hình, ripple/touch feedback mạnh, bố cục và keyboard-awareness trên mobile, animation có cảm giác sống.
- **Không coi GiftU đã build hoặc đã live** chỉ vì showcase đã đạt UAT. Cần kiểm tra repository/engine thực tế khi bắt tay code.

## 3. User journey — ĐÃ THỐNG NHẤT Ở MỨC CONCEPT

### 3A. Sender — người tặng

1. Vào homepage, **feel Binary Matrix khoảng 3 giây**. Scene mặc định được hình dung là **góc phòng Noel, cây thông lấp lánh, nhiều hộp quà trên sàn**, đều thể hiện bằng Matrix.
2. **Lần chạm thứ hai** kích hoạt câu hỏi chọn vai trò: **Người tặng / Người nhận**.
3. Chọn **Người tặng** → SOP nhanh khoảng **15 giây** để hiểu cần chuẩn bị gì.
4. Người dùng **có thể rời website chuẩn bị quà rồi quay lại** để thiết lập. Hành vi rời site ở đây là một phần hành trình, không luôn đồng nghĩa bỏ cuộc.
5. Thiết lập các item theo ba nhóm; duyệt chim mồi; publish.
6. Hệ thống sinh **unique code** để tạo URL căn phòng riêng, người tặng gửi cho người nhận.

### 3B. Receiver — người nhận

1. Mở **unique URL** → trực tiếp vào căn phòng đã gắn với món quà; **không hỏi vai trò**.
2. Khám phá Binary Matrix; **lần chạm thứ hai** hé lộ hint về sóng, phản xạ, méo không gian... để bắt đầu săn kho báu.
3. Tương tác với các đối tượng, phân biệt hint/decoy/camo, khám phá món quà thật.
4. Mục tiêu: cảm giác khám phá một **thế giới bí mật riêng**, không chỉ bấm mở hộp ngẫu nhiên.

**Ưu tiên UX:** Hint nên được diễn đạt trong chính hành vi Matrix hơn là popup chữ làm đứt immersion. Đây là **đề xuất thiết kế**; chưa khóa toàn bộ gameplay.

### 3C. Unique gift room URL

Ví dụ mong muốn (mang tính minh họa, **chưa xác minh domain/hosting**):

`https://giftu.batmanbegun.chatgpt.site/ABC123XYZ`

- `ABC123XYZ` là **URL path / gift-room identifier**, không phải tên miền riêng.
- Mong muốn mới nhất: **server phát sinh mã unique** tại bước publish.
- Người có đúng đường dẫn truy cập được đúng căn phòng; không cung cấp danh sách public để dò phòng.
- **Lưu ý bảo mật:** URL là *bearer link*, ai nhận được/chuyển tiếp link cũng có thể vào; URL bí mật **không phải xác thực danh tính tuyệt đối**. Không nhúng sẵn quà nhạy cảm vào frontend rồi chỉ che bằng CSS/animation. Thiết kế thêm quyền truy cập, rate limit, private media và chính sách xóa phù hợp khi triển khai.

## 4. Gift Setup — ba nhóm item — ĐÃ THỐNG NHẤT

**Mỗi nhóm mục tiêu 1–2 item → một màn chơi khoảng 3–6 item, lý tưởng 5–6 item.** Các nhóm là cấu trúc **cho sender thiết lập**, không nhất thiết lộ phân nhóm cho receiver; có thể trộn vị trí/role khi hiển thị trong Matrix. **Số item ≠ số file upload.**

### GROUP 1 — WHAT TO GIFT (1–2 items): QUÀ CHÍNH

**1A. Đã có / đã lên kế hoạch quà cụ thể:**
- Ví dụ đã mua iPhone; GiftU không giao đồ vật mà giúp người tặng giấu **dấu vết/quà reveal**.
- Sender upload ảnh, hóa đơn (nên che thông tin nhạy cảm), audio, video hoặc file khác gợi ý, bằng chứng, nội dung reveal; phân biệt **clue** với **final reveal** là hướng thiết kế hợp lý.
- Ưu tiên JPEG/PNG/MP3/MP4; có thể mở rộng WebP/M4A/PDF sau kiểm chứng kỹ thuật.
- **Mốc tạm đề nghị** ≤10 MB/file cho MVP; chưa khóa chính sách upload đầy đủ.
- **Video 10 GB:** KHÔNG hứa nén được xuống 10 MB ngay trong browser, nhất là Android; cần pipeline upload/chuyển mã phía server rất phức tạp nếu muốn hỗ trợ về sau. MVP ưu tiên clip ngắn, file nhỏ hoặc nguồn được host ngoài.

**1B. Chưa biết tặng gì:**
- **VẤN ĐỀ TRỌNG TÂM CHƯA GIẢI.** Không mặc nhiên thay bằng AI thiệp + ký ức + lời yêu, cũng chưa mặc định gift voucher, e-commerce, affiliate hay quyền chọn quà.
- Cần tiếp tục thảo luận chiến lược riêng cho **MVP Noel 2026**: giúp người nam vượt rào cản “tặng cái gì thực sự có giá trị?” mà không biến GiftU thành shopping mall hay một AI gift advisor vô hồn.
- Đây là **điểm mở chính cho thread kế tiếp**.

### GROUP 2 — MORE ON MOOD (1–2 items): PHỤ KIỆN CẢM XÚC

- Link nhạc YouTube (có thể embed iframe khi hợp lệ), thiệp cá nhân hóa/AI, voice, video, ảnh riêng tư, file sender tự upload, ký ức chung... **tùy chọn**.
- Vai trò: làm đẹp không khí/trải nghiệm và bổ trợ quà chính. Không ép người nam sản xuất những nội dung sến sáo.
- YouTube embed phụ thuộc quyền nhúng, chính sách autoplay/click-to-play, kết nối và UX mobile.

### GROUP 3 — RANDOM DECOY (1–2 items): CHIM MỒI

- GiftU **tự generate** các item giả/lời trêu vui, sender phải **approve** (có thể sửa, thay, generate lại) trước publish.
- Ví dụ tone: “Anh yêu em như rừng yêu thú dữ, nhưng đây chưa phải món quà đâu nhé, haha bị lừa rồi...”
- Decoy cần góp vui hoặc tạo tín hiệu cho gameplay, không chỉ gây mất thời gian vô nghĩa.
- **Camo** liên quan ngụy trang/nhiễu tín hiệu: nên phân biệt với **Decoy** (đánh lừa về *nội dung*). Một item thật hay giả đều có thể được ngụy trang. Cách hiện thực Camo **chưa chốt**.

## 5. USP gameplay Matrix — ĐỊNH HƯỚNG, CHƯA CHỐT LUẬT

- **ECHO:** chạm tạo sóng, phản hồi, phản xạ; tìm khác biệt để suy ra vị trí.
- **RESONANCE:** giao thoa, cộng hưởng, đồng bộ tín hiệu để phát hiện bí mật.
- **MORPH:** biến hình các glyph/đối tượng để biểu lộ manh mối hoặc reveal.
- Đây là **các candidate mechanics**, không phải yêu cầu phải có đủ ba trò chơi trong MVP.
- Ưu tiên thử **ECHO** trước do touch/ripple engine đã có và trực quan với người chưa phải gamer; nhưng **chưa được user khóa chính thức**.
- Phải tránh bấm mò 6 hộp; người chơi cần cảm thấy **quan sát → hiểu quy luật → giải mã → tìm thấy quà**.
- Duy trì chất lượng Android và cảm xúc receiver; thiết kế clue/hint/fallback để người ít chơi game không mắc kẹt.

## 6. Long-term business vision — ĐÃ NÓI RÕ LÀ GIẤC MƠ CÓ ĐIỀU KIỆN

**Nếu GiftU thành công**, nhánh **1B** sẽ trở thành nơi cung cấp **deal từ vendor/partner**:
- Voucher nhãn hàng, ưu đãi thương hiệu.
- Đặt vé, đặt chỗ, trải nghiệm/dịch vụ.
- Dịch vụ điện hoa, sản phẩm/dịch vụ có thể tặng.
- Các tích hợp marketplace/affiliate/commission hoặc booking về sau.

Tầm nhìn: kết nối người muốn mua quà nhưng chưa biết tặng gì với vendor có giải pháp; sau đó dùng **Binary Matrix Treasure Hunt** để trao quà. **KHÔNG coi vendor integration, payment, logistics hay marketplace là scope MVP Noel 2026.** Tránh đánh mất USP và trải nghiệm người nhận vì ưu tiên quảng cáo/vendor.

## 7. Kiến trúc hướng đến — ĐỀ XUẤT, CHƯA PHÊ DUYỆT

- Tách **Gift Content / Assets** khỏi **Game Objects / Behaviors**: một món quà có nhiều asset, một asset có thể phục vụ clue/reveal, camo là thuộc tính/hành vi chứ không nhất thiết là loại quà.
- Có thể chia module: **Gift Setup (creator)** / **Treasure Hunt (rules/state)** / **Binary Matrix (render/interaction)**.
- Backend dự kiến: API/Workers + DB metadata + private object storage, ví dụ Cloudflare Workers + D1 + R2. **Chưa xác nhận stack/giá/triển khai**.
- Game phải có world identity/seed nhất quán khi receiver refresh; nội dung bí mật chỉ cấp khi đúng điều kiện của game.
- Không bổ sung AI agent, vendor engine, payments, transcoding video lớn trước khi biết rõ yêu cầu MVP.

## 8. Các quyết định còn mở — KHÔNG ĐƯỢC TỰ CHỐT

1. **1B MVP:** hỗ trợ WHAT TO GIFT kiểu nào để thật sự có ích? Là câu hỏi lớn nhất và là đầu bài thread kế tiếp.
2. Với **1A**, cách kiểm tra quà đã mua/đã cam kết, phân biệt clue và reveal; quy trình upload/preview và dung lượng thực tế.
3. Vai trò cụ thể của 3–6 item, bố cục phòng và cơ chế giải đố được sinh ra như thế nào; mức độ procedural/personalization.
4. Tỷ lệ decoy/camo; liệu người tặng được tùy chỉnh luật chơi hay chỉ duyệt nội dung.
5. Receiver save progress, replay, redeem offline, thời hạn/xóa quà, quy tắc chia sẻ link và privacy.
6. Cách giữ sự tinh tế, không 'rẻ tiền/sến' ở cả quà thật lẫn decoy.
7. Pricing, ads, conversion metrics, A/B experiment: mới là hướng thử, chưa có dữ liệu chứng minh.
8. Domain thật, repo, khả năng host, upload pipeline, quota, chi phí: phải kiểm chứng khi bắt đầu build.

## 9. Trật tự ưu tiên đề xuất cho thread mới

**Chỉ tập trung 1B — WHAT TO GIFT / CHƯA BIẾT TẶNG GÌ (MVP).**

- Xuất phát từ mental model của người nam: sẵn sàng tiêu tiền, muốn nàng thích, sợ đắt/sai gu/nhàm/sến.
- Tạo vài phương án chiến lược **khác nhau thực chất** (không tự nhiên ép dùng AI cards, vouchers hoặc marketplace).
- Đánh giá từng phương án theo: giá trị thật của quà, giảm áp lực quyết định, tính bất ngờ, UX vài thao tác, khả năng triển khai trước Noel 2026, ít phụ thuộc vendor, khả năng phát triển về partner deals lâu dài.
- **Chưa code** trước khi user và assistant thống nhất lời giải sản phẩm của 1B.

### Prompt khởi động thread mới (copy/paste)

> Tiếp tục dự án GiftU từ file `GiftU_checkpoint_2026-11-21.md`. Tập trung duy nhất nhánh **Group 1B: người nam chưa biết tặng gì** cho MVP Noel 2026. Giữ đúng hai pain point WHAT TO GIFT → HOW TO GIFT; GiftU là trải nghiệm treasure hunt độc đáo bằng Binary Matrix. **Không mặc định AI thiệp/ảnh kỷ niệm/nhạc là quà chính, không mặc định marketplace hay partner đã có.** Tao muốn bàn kỹ product strategy dựa vào user mindset: muốn quà có giá trị thực, đáng tiền, đúng gu nhưng khó chọn. Long-term 1B là vendor/partner deals (voucher, booking, điện hoa...), nhưng MVP phải độc lập với partner. Đề xuất các lựa chọn chiến lược có trade-off, chưa vội code hay chốt hộ tao.

---

**Checkpoint kết thúc.** Không có claim rằng GiftU đã deploy, game mechanics đã chốt, hoặc 1B đã giải xong.