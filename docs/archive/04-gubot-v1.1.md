# GiftU — Turn 1: GuBot Comedy Room

## UX Flow · Comic Script · Interaction Contract · MVP Spec — **v1.1 (polished)**

**Ngày:** 2026-11-21\
**Trạng thái:** Product design / spec nháp để UAT; **chưa code, chưa xác nhận stack**.\
**Nguồn:** GiftU checkpoint v1/v2, spec Turn 1 v1, và đánh giá/đề xuất cắt scope ngày 2026-11-21.

> **North Star:** Nàng không bước vào một checklist tặng quà; nàng bước vào trò hề nơi một con AI tự tin quá mức cứ đoán gu sai bét. Những phản ứng của nàng, nếu được nàng đồng ý chia sẻ, giúp chàng chọn **hướng quà thật** — và **mua được món cụ thể**. Turn này phải tự nó đáng chơi và gây cười.

### Ký hiệu trạng thái

- **\[AGREED\]** Ý tưởng đã được user đưa ra / đồng ý ở mức concept.
- **\[PROPOSED\]** Chi tiết thiết kế cần review hoặc UAT, không mặc nhiên là yêu cầu đã chốt.
- **\[OPEN\]** Chưa quyết định.
- **(v1.1)** Nội dung mới hoặc đã đổi so với v1.

---

## 0. Thay đổi so với v1

| # | Thay đổi | Lý do |
| --- | --- | --- |
| 1 | Thêm **Report v0** (mục 6.2): mỗi category có 3 hướng mua cụ thể + mẹo quan sát | v1 thiên về "vui", phần giúp chàng *mua được* mới chỉ là stub |
| 2 | Tách scope thành **Tier 0 / 1 / 2**; thêm **Spike A 7 ngày** bản rẻ (mục 7, 9) | "MUST SHIP" của v1 thực ra là bản v1 đầy đủ, quá nặng so với quỹ thời gian trước Noel |
| 3 | Thêm **Fallback F** = scene tĩnh 8 vật thể đã duyệt, dùng chung data/report/consent (mục 9.3) | Không để cái đường lui bị chôn nếu hài không thành |
| 4 | Thừa nhận Review (S6) là checklist được bọc; thêm giả thuyết H2 và câu hỏi UAT tương ứng (mục 1.1, 8) | Tránh tự lừa mình rằng game đã hết checklist |
| 5 | Thêm **self-censorship**: copy S6 giảm "chọn cho lịch sự"; S7 viết thành punchline nhưng vẫn nói rõ dữ liệu đi đâu (mục 3, 5, 6) | Nàng biết kết quả đi đâu nên tín hiệu có thể lệch |
| 6 | **Bỏ ứng viên mascot "cục poop"**; còn blob / kem tan (mục 5.2) | Quà cho người yêu, hunt cuối mood cảm xúc — tránh lệch brand |
| 7 | Chuẩn hóa tuổi thành khoảng **không chồng lấn**; thống nhất nhãn **Thích / Không hợp / Bỏ qua** (mục 3, 4.1) | Dọn lỗi vặt của v1 |
| 8 | Thêm **rủi ro & cửa sổ Noel** (mục 10) và cập nhật danh sách Open decisions (mục 11) | v1 chưa nhìn funnel dài + lead time mua quà |

---

## 1. Product contract và phạm vi

**\[AGREED\]** GiftU giữ hai bài toán **WHAT TO GIFT → HOW TO GIFT**. Nhánh 1A: chàng đã có quà → thiết lập treasure hunt. Nhánh 1B: chàng chưa biết quà → mời nàng chơi turn đoán gu → xem tín hiệu → tự mua quà → quay lại 1A để tạo treasure hunt. Turn đoán gu là một **trải nghiệm độc lập, quan trọng**, mood **buồn cười**; treasure hunt cuối giữ mood bí ẩn/cảm xúc, không bị turn đầu thay thế.

**\[AGREED\]** Lời mời từ Zalo do chàng tự gửi, kiểu: “Anh mới dùng AI làm cái app đoán sở thích của em! Test thử đi =))”. Căn phòng Binary Matrix có **một nhân vật AI** ngây ngô, phấn khích, tự tin vô lý; đưa cả **đồ cực ngớ ngẩn** lẫn **category thật**; item xuất hiện qua vết xé Binary Matrix, ở phong cách **clay 3D cute**; like → **bẹp** vào màn hình; dislike → bị Matrix nuốt/chôn kèm tiếng **xả nước**. Form mascot chính xác **TBD** (xem 5.2).

**\[PROPOSED\]** Tên nội bộ: **GuBot Comedy Room**; tên/voice mascot chưa chốt. GuBot là **nhân vật được viết kịch bản**, không cần model AI dự đoán thật, không có lý do gọi LLM ở runtime chỉ để diễn màn đoán gu.

**Chỉ tiêu trải nghiệm \[PROPOSED\]:** 90–150 giây cho người chơi bình thường, có thể skip animation; điện thoại Android là nền tảng ưu tiên; không ép âm thanh; người chơi có thể bỏ qua bất kỳ item nào, quay lại/sửa lựa chọn, và kết thúc mà không cần chọn đúng 3.

### 1.1 Ba giả thuyết cần chứng minh (v1.1) \[PROPOSED\]

- **H1 — Hài thật:** nàng cười thật (không chỉ khen “cute”) trong 90–150 giây.
- **H2 — Không phải checklist:** nàng cảm thấy đang chơi trò chơi, không phải điền khảo sát. *Thừa nhận thẳng:* dữ liệu thật nằm ở bước Review chọn tối đa 3; swipe/bẹp/flush là lớp hài và lớp lọc sơ bộ. Nếu lớp hài không đủ buồn cười thì Turn 1 chỉ là một checklist dài hơn — đó là rủi ro chính cần UAT, không phải điều đã được giải quyết.
- **H3 — Chàng mua được:** sau khi đọc report, chàng nói được “mình sẽ mua \_\_\_” cụ thể, không dừng ở “nàng thích makeup”.

Spike A (mục 9) được thiết kế để kiểm H1 và H2 sớm với chi phí thấp nhất; Report v0 (mục 6.2) để kiểm H3.

---

## 2. Core gameplay loop: GUESS → REACT → FAIL → LEARN

1. **GUESS:** GuBot huênh hoang đưa ra dự đoán, Matrix bị xé, một vật clay rơi ra (đồ lố hoặc category thật).
2. **REACT:** Nàng khám phá item, **Thích** hoặc **Không hợp**, bằng thao tác swipe hoặc nút tương đương. Không có bảng 8 ô hoặc nút checkbox.
3. **FAIL:** Phản ứng vật lý cường điệu: Thích = clay đập “bẹp” lên mặt kính, rồi co về khay; Không hợp = Matrix kéo chìm, tiếng xả nước ngắn. GuBot phản ứng tự tin ngớ ngẩn.
4. **LEARN:** Chỉ *reaction với item thật* mới tạo tín hiệu sở thích. GuBot có thể sai và tự chữa ngượng. Cuối game, nàng chọn/xác nhận tối đa ba tín hiệu mà nàng thực sự thích.

**Luật quan trọng \[PROPOSED\]:** Đồ troll dùng làm nhịp hài, **không bao giờ là tín hiệu quà**. Nếu nàng cố Thích bồn cầu, GuBot có thể hoảng hốt biểu diễn, nhưng backend không được suy ra “nàng thích bồn cầu”; không đánh tráo ý nghĩa dữ liệu.

**Luật thứ hai:** Thao tác xem item **khác** thao tác xác nhận thích. Không suy ra thích từ thời gian dừng, số lần chạm, biểu cảm hoặc swipes thử nghiệm. **Chỉ ghi sở thích từ hành động chủ động.**

**Luật thứ ba:** Khi item thật hiện rõ, phải có nhãn category dễ hiểu. Artwork/animation không được khiến người chơi chọn vì tưởng nó là một món cụ thể không đại diện cho category.

**Luật thứ tư (v1.1):** Mỗi nhãn chỉ mang **một nghĩa**. “Thích” = muốn món/hướng này. Không dùng song song “có cửa”, “khả thi”, “hợp lý” trong UI hay copy.

---

## 3. End-to-end UX / scene states

| State | Trigger → Hành vi | Nội dung hiển thị | Điều kiện chuyển |
| --- | --- | --- | --- |
| **S0 Invite Created** | Chàng nhập tuổi nàng + ngân sách, tạo link riêng | Copy share qua Zalo; bản preview | Link được tạo (chưa coi là nàng đã mở) |
| **S1 Enter / Consent-lite** | Nàng mở link, touch bắt đầu; audio OFF mặc định | Căn phòng Binary Matrix, GuBot xuất hiện với tạo hình khờ khạo | Nàng bấm Bắt đầu |
| **S2 Cold Open** | GuBot khoe năng lực rồi đoán bậy cú đầu tiên | “Tôi biết rất rõ gu của em. Độ chính xác... đang tải.” | First reveal |
| **S3 Reveal** | Binary Matrix rạn, xé màng không gian, item clay lộ diện | Nhãn item + 1 punchline ngắn | Animation xong hoặc Skip |
| **S4 Reaction** | Thích / Không hợp / Bỏ qua; haptic/sound nếu được phép | Bẹp vào kính hoặc chìm xuống Matrix | Ghi state; tới item kế |
| **S5 Finale** | Đã xem đủ 8 real items; không buộc finish troll nếu skip | GuBot khổ sở “Tôi đã bị sự thật đánh bẹp.” | Nàng mở bản đoán cuối |
| **S6 Review** | Hiện tối đa 3 hướng nàng muốn giữ (ưu tiên nàng xác nhận, không AI tự bịa). **(v1.1)** GuBot đóng khung màn này bằng giọng hài, và có câu giảm chọn-cho-lịch-sự | Có thể sửa, giữ 1–3 hoặc không giữ gì | Nàng chốt kết quả |
| **S7 Share Permission** | **(v1.1)** Viết như punchline của GuBot nhưng **câu nói rõ dữ liệu đi đâu phải là chữ thường, không đùa** | “Tôi xin phép mách: gửi các món em vừa giữ cho người đã rủ em chơi nhé?” | Đồng ý hoặc từ chối |
| **S8 Done** | Nếu đồng ý: tạo report riêng cho chàng; nếu không: kết thúc không gửi | Lời chốt hài + nút xem lại / chơi lại | Kết thúc |
| **S9 Sender Returns** | Chàng vào creator link riêng | Report v0 (mục 6.2): category được cho phép chia sẻ + 3 hướng mua cụ thể; tiếp tục 1A sau khi mua | Chàng tự mua quà, setup hunt |

**\[PROPOSED\] Cú pháp chọn nhanh:** Đồ vật card ở giữa; swipe phải = **Thích**, swipe trái = **Không hợp**; hai icon/tap affordance luôn tồn tại để người không biết swipe vẫn chơi được. Mỗi phản hồi có **Undo** 3–5 giây hoặc mục xem lại cuối game. Vertical scroll trên Android không được va chạm swipe ngang. Bấm **Bỏ qua** để tránh ép chọn.

**\[PROPOSED\] Like animation:** item lao về camera trong 180–320 ms, méo ra thành một mảng clay dính trên “mặt kính”, trượt 300–600 ms rồi co thành sticker nhỏ ở mép dưới; không che item kế. Reaction “bẹp” phải nổi bật nhưng không gây giật mạnh/motion sickness.

**\[PROPOSED\] Dislike animation:** glyph 0/1 tràn lên, item bị kéo xuống như chìm vào nền, âm thanh nước xả **ngắn, hài hước**, GuBot mất biểu cảm khoảng 300 ms. Không dùng âm thanh xả dài hoặc lặp liên tục.

**\[PROPOSED\] Mobile safety:** Có chế độ Reduce Motion/Skip; sound OFF cho tới thao tác bật âm thanh; chỉ dùng vibration khi thiết bị/trình duyệt hỗ trợ; mọi interaction chạy được không cần sound/haptic. Khi tab bị background, giảm/tạm ngưng animation; giữ tiến độ khi refresh.

---

## 4. Item catalog, pacing, và ranh giới giữa đồ ngu/đồ thật

### 4.1 Real gift categories — kế thừa checkpoint v2

**\[AGREED\]** Master list 12 category. Mỗi scene = **5 core + 2 age-dependent + 1 wildcard = 8 real items**.

| Group | Categories |
| --- | --- |
| **Core — 5** | Makeup/son; Nước hoa & skincare; Trang sức/phụ kiện; Túi/ví; Chăm sóc bản thân (spa/massage/dưỡng tóc) |
| **Theo tuổi — chọn 2/5** | Thời trang/giày; Cá nhân hóa/handmade; Hẹn hò/ăn uống; Chuyến đi ngắn/nghỉ dưỡng; Sức khỏe/đồ dùng tốt cho nhà |
| **Wildcard — chọn 1/2** | Hoa; Công nghệ |

**(v1.1) \[PROPOSED\] Chuẩn hóa nhóm tuổi không chồng lấn:** **18–21 / 22–27 / 28+** (tuổi tính theo số nguyên chàng nhập). Đổi so với nhãn gốc 18–22 / 22–28 / 28+ chỉ ở chỗ biên; cần user duyệt.

**\[OPEN\]** Chưa chốt hai age-dependent category cho từng nhóm. Mapping tuổi là giả thuyết chưa có bằng chứng khảo sát trực tiếp; không mặc định “vợ 28+ sẽ thích đồ nhà”. Budget chỉ dùng để tùy biến report cho chàng, không quyết định 8 vật thể của nàng (đề xuất từ v2, chưa khóa).

### 4.2 Absurd decoys (comedy-only)

**\[AGREED, ví dụ user nêu\]:** Quần lót nam, xe bắt chó, bồn cầu. **\[PROPOSED\]** Chọn **2 decoy cho một session**, không trộn vào 8 real và không tính vào 12 category. Dùng art clay ngớ ngẩn thay vì đồ ghê rợn; không dùng trò gây kỳ thị hoặc nhắm vào đặc điểm cá nhân.

**\[PROPOSED\] Nhịp 10 lượt:**

| Lượt | Loại | Ý đồ |
| --- | --- | --- |
| 1 | Decoy | Cold open: “AI này ngốc thật!” |
| 2 | Real | Người chơi nhận ra có món hợp lý |
| 3 | Real | Nàng có agency phản ứng thật |
| 4 | Real | Tạo nhịp lựa chọn |
| 5 | Decoy | Callback gây cười, tránh đều đều |
| 6–10 | 5 Real | Dồn vào sở thích thực, tăng nhịp finale |

Có thể thử luân phiên thứ tự hai decoy (để giữ surprise), nhưng phải giữ đủ cả 8 real category, không ưu tiên vị trí đẹp cho một nhóm category mãi. **Không chèn hơn 2 đồ troll mặc định** vì kéo dài game và làm người chơi không nhận ra mục đích chính.

### 4.3 Image art

**\[AGREED\]** Look: clay-cute. **(v1.1) \[PROPOSED\]** Hai bước: **Spike A dùng sticker 2D** có bóng đổ/gradient để giả cảm giác clay (rẻ, nhanh); nâng lên clay render (WebP/PNG alpha) **chỉ khi Spike A đạt gate**. Không mặc nhiên nói SVG cho ra 3D thật. Làm 1 item prototype để so độ đẹp, độ nét và tải trên Android trước khi làm đủ 10.

---

## 5. GuBot — persona, micro-copy và hài bằng hành vi

### 5.1 Persona và thoại

**Persona \[PROPOSED\]:** hí hửng, khoe khoang, “trí tuệ nhân tạo cao cấp” nhưng thành tích toàn sai, biết tự trêu, **không chê nàng**. Nó có thể bị dính món đồ vào mặt, trượt ngã, chảy nhão, “chết đứng” 0.3 giây rồi lại tự tin. Hài đến từ **sự tương phản giữa tự tin và năng lực thực tế**; không cần diễn văn dài.

| Thời điểm | Lời thoại GuBot (gợi ý, chưa duyệt) |
| --- | --- |
| Mở game | “Chào em! Tôi là GuBot. Chuyên gia đọc vị sở thích. Tỷ lệ đúng: đang cập nhật.” |
| Vênh váo trước lần đoán 1 | “Dự đoán đầu tiên của tôi chắc chắn khiến em kinh ngạc!” |
| Hiện bồn cầu | “Tôi phát hiện một niềm đam mê rất... tiện nghi.” |
| Bồn cầu bị xả | “Ủa? Không thích thiết bị giải tỏa áp lực à?” |
| Hiện quần lót nam | “Cảm biến báo tín hiệu thời trang cực mạnh. Hơi... sai đối tượng.” |
| Hiện xe bắt chó | “Tôi không giải thích được. Nhưng thuật toán rất quả quyết.” |
| Hiện nước hoa | “Lần này tôi kiểm tra ba lần rồi. Chắc là mùi thơm thật.” |
| Hiện túi/ví | “Đây là túi. Tôi đang tiến bộ rõ rệt.” |
| Hiện trang sức | “Thấy chưa! Tôi cũng có lúc giống AI xịn.” |
| Thích (chạm bẹp) | “Á! Ghi nhận bằng... mặt!” |
| Không hợp (xả) | “Tín hiệu vừa đi xuống cống. Tôi tôn trọng khoa học.” |
| Bỏ qua | “Được. Tôi cũng chưa chắc lắm.” |
| 3 Thích liên tiếp | “Khả năng đoán gu của tôi tăng từ đáng ngại lên hơi đáng tin.” |
| Hoàn tất | “Sau nhiều mất mát, tôi đã sống sót qua bài kiểm tra.” |
| **Review (v1.1)** | “Giờ chữa cháy: món nào em **thật sự thích**? Chọn theo ý em, đừng lịch sự với tôi.” |
| **Xin chia sẻ (v1.1)** | “Tôi xin phép mách: gửi các món em vừa giữ cho người đã rủ em chơi nhé?” — nút: **Gửi đi** / **Giữ bí mật** |
| Kết thúc (đã gửi) | “Tín hiệu đã được chuyển đi. Tôi sẽ giả vờ là do mình đoán đúng.” |
| Kết thúc (không gửi) | “Không sao. Bí mật vẫn ở lại trong căn phòng này.” |

**Luật copy \[PROPOSED\]:** 1 câu/ngữ cảnh, thường ≤ \~14 từ/câu khi có animation nhanh; không thuyết minh 5 dòng liên tục; mỗi lần phản hồi ngẫu nhiên trong 2–3 câu ngắn để đỡ lặp, nhưng kết quả phải deterministic theo seed để replay/refresh không đổi tùy tiện. Tránh câu “món này mà tặng là bị ăn chửi” như khẳng định chắc chắn về nàng; nói về khả năng GuBot đoán sai.

**(v1.1) Luật S7:** Câu xin chia sẻ được phép có giọng GuBot, nhưng phải nói **rõ ràng** rằng lựa chọn của nàng sẽ được gửi cho người đã mời. Không đùa theo kiểu che mất việc dữ liệu được chia sẻ. Nút hai phía có trọng lượng ngang nhau, không dark pattern.

### 5.2 Mascot

**(v1.1) \[PROPOSED\]** Ứng viên còn lại: **blob mềm** hoặc **cây kem tan**. **Loại ứng viên “cục poop”** vì (a) quà cho người yêu và mood hunt cuối là cảm xúc/bí ẩn, (b) tránh biến cả brand thành toilet humor. Decoy bồn cầu vẫn giữ **\[AGREED\]** như món troll — hài toilet chỉ ở mức một món, không phải bản sắc mascot. **Chờ user duyệt.**

Quyết định bằng **3 concept sketches + thử phản ứng 5 người** (có thể gộp vào Spike A); chớ khóa hình trước khi thử animation “bẹp”, ngã, chảy nhão. Một mascot dễ nhận diện qua silhouette, có mắt/miệng linh hoạt, đẹp khi thu nhỏ ở mobile, và nối được về mood GiftU.

---

## 6. Data capture, kết quả trả cho chàng, privacy

### 6.1 Dữ liệu và consent

**\[PROPOSED\] Dữ liệu tối thiểu:**

- `session_id`, `room_id`, `scene_seed`, `catalog_version`, `age_segment`, `created_at`.
- `item_id`, `item_kind` (`real`/`decoy`), `category_id` (chỉ real), `reaction` (`like`/`dislike`/`skip`), `reaction_revision`, `order_index`.
- `final_categories`: mảng 0–3 `category_id` được nàng chọn/xác nhận; **không auto “top 3” theo độ do dự/thời gian nhìn**.
- `share_approved`, `share_approved_at`, `completed_at`, `expires_at`.
- `budget_band`: chỉ ở phía chàng; không để lộ ngân sách trong scene người nhận.

**\[PROPOSED\] Quy trình chọn top:** Nếu nàng Thích ≤3 item thật → đề xuất giữ chúng, cho phép bỏ bớt; nếu >3 → vòng cuối “chọn tối đa 3 món thực sự thích”. Nếu 0 Thích → cho phép kết thúc với report “chưa có tín hiệu đủ rõ” hoặc gợi mở xem lại; không tự bịa kết quả. Item troll dù được Thích không vào report quà.

**\[PROPOSED\] Sự đồng ý:** trước khi gửi report, giải thích rõ rằng **những sở thích nàng chọn sẽ được chia sẻ với người đã mời nàng chơi**. Không lừa rằng đó chỉ là AI đoán vô thưởng vô phạt. Không nhất thiết tiết lộ rằng chàng có thể mua quà; nhưng **không giấu việc dữ liệu sở thích được chia sẻ**.

**(v1.1) \[PROPOSED\] Self-censorship:** vì nàng biết kết quả đi đâu, tín hiệu có thể lệch (chọn cho lịch sự, tránh món đắt, chọn món “an toàn”). Giảm thiểu bằng copy ở S6 (mục 5.1) và **đo trong UAT** (mục 8) thay vì giả định đã giải quyết. Không thêm cơ chế đoán/đảo tín hiệu ngầm.

**Security \[PROPOSED\]:** unique room link là bearer link; report sender phải được phân quyền riêng, không suy ra từ URL receiver; không public directory, có rate limit, TTL/xóa; tránh nhúng dữ liệu report vào HTML phía receiver; event logging tối giản, tránh thu thông tin nhạy cảm. Nếu không có account creator, cần thiết kế creator secret riêng và cơ chế khôi phục phù hợp, không dùng một link cho cả hai vai trò.

### 6.2 Report v0 — để chàng *mua được* món cụ thể (v1.1) \[PROPOSED\]

**Mục tiêu:** sau khi đọc report, chàng nói được “mình sẽ mua \_\_\_”, không chỉ biết “nàng thích makeup”.

**Cấu trúc report cho chàng:**

- **Hướng nàng giữ** (0–3 category, chỉ những cái nàng đồng ý chia sẻ).
- Mỗi category là một **thẻ**: **3 hướng mua cụ thể** (ví dụ cho Makeup/son: son dưỡng có màu / son lì / set son mini), mỗi hướng gắn một **tag mức đầu tư** (tiết kiệm / vừa / thoải mái — định nghĩa band **\[OPEN\]**) để lọc theo `budget_band`.
- Mỗi thẻ có **1 mẹo quan sát** để chọn đúng chi tiết mà không cần hỏi thẳng và làm lộ bí mật (ví dụ: màu son/mùi nàng đang dùng, size, phong cách hay mặc).
- **Nhóm không thích** và nhóm **bỏ qua/không biết** tách riêng; không trộn “không thích” với “không phản hồi”.
- Không công bố chi tiết swipe, dwell time hay analytics không cần thiết. Mức độ theo **lựa chọn trực tiếp**, không gán xác suất khoa học giả.
- **Nếu nàng không đồng ý gửi, chàng không được thấy reactions của nàng.**

**Phạm vi nội dung MVP:** 12 category × 3 hướng = **36 mục** + 12 mẹo quan sát, viết **một lần**, gắn `catalog_version`. **Không giá cụ thể, không link bán, không affiliate** (giá cụ thể nhanh cũ; thương mại thuộc out of scope). Thay cho “12 trang riêng” của v2: dùng **12 thẻ trong cùng report**; trang hướng dẫn mua sắm đầy đủ làm sau UAT.

**Review nội dung:** ít nhất 2 người thuộc đúng tệp nhận quà đọc/chỉnh trước UAT (ai review: **\[OPEN\]**).

---

## 7. Technical boundaries & scope theo tier (v1.1)

> v1 gọi toàn bộ danh sách dưới là “MUST SHIP”. Thực tế đó là bản v1 đầy đủ. v1.1 tách thành ba tier để Turn 1 không ngốn hết thời gian dành cho treasure hunt 1A.

### Tier 0 — Spike A (7 ngày, bản rẻ) — **bắt buộc trước mọi thứ khác**

1. Receiver link riêng; scene mobile portrait; GuBot **2 trạng thái** biểu cảm (bình thường / chết đứng).
2. **Tái dùng hiệu ứng glitch/tear Binary Matrix đã có** cho reveal; **không** làm cinematic xé không-thời-gian riêng.
3. **Sticker 2D** (mục 4.3): **1 decoy (ví dụ bồn cầu) + 3–4 real** đủ cho một dọc trải nghiệm.
4. Thích (bẹp, bản đơn giản) / Không hợp (chìm; **flush sound tùy chọn, mặc định tắt**) / Bỏ qua; swipe + nút dự phòng.
5. Review 0–3 → S7 xin chia sẻ → **Report v0 cứng (hard-coded) cho vài category**.
6. Chạy được và đo được trên **1 máy Android thật tầm trung**.

### Tier 1 — UAT build (chỉ làm nếu qua Gate Spike A)

1. **8 real category** theo mapping chốt + **2 absurd decoys** (10 lượt), artwork nhất quán (sticker 2D hoặc nâng lên clay nếu đủ thời gian).
2. Report v0 đầy đủ 12 thẻ (mục 6.2); finale review 0–3; chia sẻ có consent; report creator tách quyền; chàng được dẫn quay lại 1A.
3. Stable scene seed, basic resume, lỗi mạng có fallback, event tracking tối thiểu.
4. Kiểm thử Android thật: touch, keyboard, load, layout, memory, sound, swipe vs scroll, refresh.

### Tier 2 — Nice-to-have sau UAT

- Clay render 3D thật; physics mềm nâng cao; nhiều vật dính trên glass layer cùng lúc.
- Haptic choreography khác nhau theo item; spatial audio; hiệu ứng rách không-thời-gian nhiều lớp.
- Diễn viên phụ / vật troll riêng theo nhân vật; thoại bằng giọng tổng hợp.
- Chia sẻ replay clip/GIF, multiplayer, AI personalization hoặc procedural joke generation.
- Trang hướng dẫn mua sắm đầy đủ thay cho thẻ.

### Out of scope MVP

- Mô hình AI suy luận sở thích thật, dự đoán từ hành vi ngầm.
- Marketplace, affiliate, đặt vé, thanh toán, nhà bán hàng, shipping.
- Quảng cáo, email/SMS service tự gửi, tạo video 3D runtime, dữ liệu nhận diện người nhận.
- Bộ dựng game phức tạp hoặc điều khiển mọi câu thoại theo LLM.

### Technical guardrails \[PROPOSED\]

- Kế thừa Binary Matrix đã UAT Android; **không giả định GiftU app hoặc backend đã tồn tại**.
- Tách renderer/interaction ra khỏi item catalog, comedy script, selection state, report state — **để Fallback F (mục 9.3) dùng lại được nguyên data/report/consent**.
- Animation dùng asset cache, chỉ 1 item nặng trên màn hình; giảm particle khi low-end device; kiểm thử độ mượt bằng máy thật, không hứa FPS khi chưa đo.
- Phân biệt `visual_asset` và `semantic_category`: cùng một category có thể đổi artwork mà report vẫn chính xác.

---

## 8. Telemetry & success criteria của prototype

**Funnel \[PROPOSED\]**: `invite_created` → `receiver_opened` → `game_started` → `first_reaction` → `all_real_seen` → `review_completed` → `share_approved` (hoặc `share_denied`) → `report_viewed` → `sender_returned_to_1A` → `hunt_published`.\
**(v1.1)** Thêm sự kiện tối giản: `undo_used`, `skip_used`, `review_changed`. Không thu dwell time để suy luận sở thích.

**Outcome cần quan sát khi UAT:**

- **H1:** Nàng có **cười thật** (không chỉ khen “cute”) và có hiểu chỉ dẫn swipe mà không cần người hướng dẫn?
- **H2 (v1.1):** Hỏi thẳng sau khi chơi: “giống trò chơi hay giống bảng khảo sát?”
- Nàng có hiểu item real đại diện cho một **hướng quà**, không phải mã mua món cụ thể?
- Nàng có thấy bị hỏi cung/checklist hoặc cảm thấy bị lừa khi được xin chia sẻ phản ứng?
- Nàng có phân biệt **Không hợp** với **Bỏ qua**? Có muốn sửa kết quả trước khi gửi?
- **(v1.1) Self-censorship:** “Em có chọn khác đi vì biết người kia sẽ nhận được không?” Nếu có, khác theo hướng nào (rẻ hơn / lịch sự hơn / an toàn hơn)?
- **H3 (v1.1):** Đưa Report v0 mẫu cho 2–3 người đóng vai chàng: “Mày sẽ mua gì?” — họ có nêu được món/loại cụ thể không?

### Gate Spike A (7 ngày) — ngưỡng khởi điểm \[PROPOSED\]

Đây là **tín hiệu định tính với 5 người, không phải thống kê**; ngưỡng chỉnh được sau khi thấy phản ứng thật.

- ≥ **3/5** người cười thật ít nhất một lần (ghi lại khoảnh khắc nào).
- ≥ **4/5** chơi xong không cần hướng dẫn swipe.
- ≥ **3/5** trả lời “giống trò chơi” cho câu hỏi H2.
- Hiểu item real là *hướng quà*, không nhầm món cụ thể: ≥ **4/5**.
- **0** case data integrity lỗi (Thích decoy lọt vào report, report lộ khi chưa consent, bẹp che nút tiếp tục, refresh mất tiến độ nặng).
- Không giật rõ rệt trên máy Android thật đã chọn (không hứa FPS khi chưa đo).

Các ngưỡng conversion định lượng chỉ đặt sau khi có baseline thực tế; không bịa KPI trước.

---

## 9. Kế hoạch triển khai (v1.1)

### 9.1 Spike A — 7 ngày \[PROPOSED\]

Ngày/mốc là đề xuất, phụ thuộc quỹ thời gian thực của user.

| Ngày | Việc |
| --- | --- |
| D1 (11-22) | Chốt mascot bằng 3 sketch (blob / kem tan); chọn 1 decoy + 1–2 real làm mẫu; chọn 1 máy Android test |
| D2–D3 | Reveal bằng glitch Matrix có sẵn; sticker 2D cho 1 decoy + 3–4 real; flow swipe + nút + Undo |
| D4 | Bẹp / chìm bản đơn giản; GuBot 2 trạng thái; thoại bản đầu |
| D5 | Review → S7 xin chia sẻ → Report v0 cứng; giả lập các case: chỉ Thích troll / dislike hết / skip / refresh / không đồng ý gửi |
| D6 | Test trên Android thật, sửa lỗi nặng |
| D7 (11-28) | 5 người ngoài nhóm thiết kế chơi không hướng dẫn (người hỗ trợ lo tìm người); ghi hình/ghi chú khoảnh khắc cười + điểm kẹt; **go/no-go** |

### 9.2 Quyết định sau D7

- **Đạt gate** → Tier 1 UAT build, **chặn thời gian cứng** (đề xuất kết thúc \~**12-06**), rồi dồn toàn lực vào treasure hunt 1A.
- **Không đạt gate** → **Fallback F ngay**, không sửa thêm “thêm một vòng nữa”.

### 9.3 Fallback F — scene tĩnh 8 vật thể (đã duyệt trước đó) \[PROPOSED\]

- Một scene Binary Matrix tĩnh, 8 real items (mỗi vật = một hướng quà), chạm để **Thích / Không hợp / Bỏ qua**, review 0–3, consent, report.
- Bỏ mascot và decoy (hoặc chỉ giữ một dòng chữ hài). Micro-animation nhẹ nếu rẻ.
- **Dùng chung** data model, Report v0, consent, creator link với bản đầy đủ. Mục tiêu: chuyển qua lại mà không viết lại backend.
- Đây là đường lui chính thức, không phải “plan B bị quên”.

### 9.4 Spike B — Data integrity (song song, nhỏ) \[PROPOSED\]

Mô phỏng hết các case (chỉ Thích troll / Thích 5 real / dislike hết / skip / refresh / deny share) và xác minh report đúng, không rò rỉ. Chạy ngay từ D5 của Spike A trên dữ liệu mẫu.

**Gate sang build 1A:** Khi GuBot turn có tín hiệu hài thật (hoặc đã chuyển sang Fallback F), report đáng tin, UX mobile đạt — đừng tiếp tục thêm comedy effects vô hạn; hoàn thiện treasure hunt lõi trước Noel.

---

## 10. Rủi ro chính (v1.1)

| Rủi ro | Mức | Hướng xử lý |
| --- | --- | --- |
| **Funnel dài làm tụt conversion:** mời → nàng chơi → chàng đọc report → chàng mua → quay lại 1A. Hài hay không giải quyết cấu trúc nhiều turn | Cao | Đo drop-off từng bước (mục 8); giữ Turn 1 90–150s; Fallback F |
| **Scope Turn 1 nuốt thời gian 1A trước Noel** | Cao | Tier 0/1/2; Spike A 7 ngày; chặn thời gian cứng ở 9.2 |
| **Hài không thành** (chỉ còn checklist dài) | Cao | Gate H1/H2; không sản xuất đủ 10 món khi 2 cú tương tác chưa buồn cười |
| **Tín hiệu lệch do nàng biết dữ liệu đi đâu** | Vừa | Copy S6; đo ở UAT; không đảo tín hiệu ngầm |
| **Report không đủ cụ thể để mua** | Cao | Report v0 (6.2); test H3 với “người đóng vai chàng” |
| **Cửa sổ Noel:** từ lúc mời tới lúc có quà (đặc biệt quà vật lý cần ship) có thể quá ngắn nếu bắt đầu trễ | **\[OPEN\]** | Cần xác định mốc muộn nhất để 1B còn khả thi; có thể ảnh hưởng nhóm category nên đẩy lên (dịch vụ/trải nghiệm nhận nhanh) |
| **Tone whiplash** giữa Turn 1 hài và hunt cuối cảm xúc | Vừa | Mascot không poop; giữ “Bí mật vẫn ở lại trong căn phòng này” làm cầu nối mood |

---

## 11. Open decisions cần chốt trước khi build production

1. **Mascot:** blob mềm hay kem tan (đã đề xuất loại poop — cần user duyệt). Silhouette, độ hài, phù hợp brand GiftU.
2. **Tuổi:** duyệt đề xuất **18–21 / 22–27 / 28+**; chốt 2 category theo tuổi mỗi nhóm.
3. **Finale:** nàng giữ tối đa 3 lựa chọn hay được phép gửi 1–n; UX của trường hợp 0 Thích.
4. **Copy tone:** mức “nhảm”/toilet humor, cho phép quần lót nam/xe bắt chó/bồn cầu trong bản chính thức đến đâu.
5. **Asset format:** *(đã định hướng)* Spike A dùng sticker 2D; quyết định clay render (WebP/PNG) sau gate.
6. **Creator identity:** cách phân quyền sender/report; expiration + repeat play; policy chia sẻ kết quả.
7. **Content (đã thu hẹp):** 36 mục + 12 mẹo trong Report v0; còn mở: ai viết, ai review, định nghĩa band tiết kiệm/vừa/thoải mái, cập nhật bằng cách nào.
8. **Scope animation:** *(đã định hướng)* tái dùng glitch Matrix có sẵn; cinematic riêng thuộc Tier 2.
9. **Cửa sổ Noel và hạn chót:** xác nhận mốc muộn nhất để chàng mời + mua + còn kịp hunt; xác nhận mốc go/no-go 11-28 và chặn thời gian 12-06.
10. **Ngưỡng gate Spike A:** duyệt hoặc chỉnh các ngưỡng khởi điểm ở mục 8.

---

**Tuyên ngôn:** *GuBot có thể ngu. Dữ liệu sở thích thì không được ngu.*