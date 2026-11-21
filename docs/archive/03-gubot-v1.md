# GiftU — Turn 1: GuBot Comedy Room
## UX Flow · Comic Script · Interaction Contract · MVP Spec

**Ngày:** 2026-11-21  
**Trạng thái:** Product design / spec nháp để UAT; **chưa code, chưa xác nhận stack**.  
**Nguồn:** GiftU checkpoint v1/v2 và các quyết định trong cuộc trao đổi hiện tại.

> **North Star:** Nàng không bước vào một checklist tặng quà; nàng bước vào trò hề nơi một con AI tự tin quá mức cứ đoán gu sai bét. Những phản ứng của nàng, nếu được nàng đồng ý chia sẻ, giúp chàng chọn **hướng quà thật**. Turn này phải tự nó đáng chơi và gây cười.

### Ký hiệu trạng thái
- **[AGREED]** Ý tưởng đã được user đưa ra / đồng ý ở mức concept.
- **[PROPOSED]** Chi tiết thiết kế cần review hoặc UAT, không mặc nhiên là yêu cầu đã chốt.
- **[OPEN]** Chưa quyết định.

---

## 1. Product contract và phạm vi

**[AGREED]** GiftU giữ hai bài toán **WHAT TO GIFT → HOW TO GIFT**. Nhánh 1A: chàng đã có quà → thiết lập treasure hunt. Nhánh 1B: chàng chưa biết quà → mời nàng chơi turn đoán gu → xem tín hiệu → tự mua quà → quay lại 1A để tạo treasure hunt. Turn đoán gu là một **trải nghiệm độc lập, quan trọng**, mood **buồn cười**; treasure hunt cuối giữ mood bí ẩn/cảm xúc, không bị turn đầu thay thế.

**[AGREED]** Lời mời từ Zalo do chàng tự gửi, kiểu: “Anh mới dùng AI làm cái app đoán sở thích của em! Test thử đi =))”. Căn phòng Binary Matrix có **một nhân vật AI** ngây ngô, phấn khích, tự tin vô lý; đưa cả **đồ cực ngớ ngẩn** lẫn **category thật**; item xuất hiện qua vết xé Binary Matrix, ở phong cách **clay 3D cute**; like → **bẹp** vào màn hình; dislike → bị Matrix nuốt/chôn kèm tiếng **xả nước**. Form mascot chính xác **TBD** (blob mềm/kem chảy/cục poop dễ thương là các candidate, chưa duyệt).

**[PROPOSED]** Tên nội bộ: **GuBot Comedy Room**; tên/voice mascot chưa chốt. GuBot là **nhân vật được viết kịch bản**, không cần model AI dự đoán thật, không có lý do gọi LLM ở runtime chỉ để diễn màn đoán gu.

**Chỉ tiêu trải nghiệm [PROPOSED]:** 90–150 giây cho người chơi bình thường, có thể skip animation; điện thoại Android là nền tảng ưu tiên; không ép âm thanh; người chơi có thể bỏ qua bất kỳ item nào, quay lại/sửa lựa chọn, và kết thúc mà không cần chọn đúng 3.

---

## 2. Core gameplay loop: GUESS → REACT → FAIL → LEARN

1. **GUESS:** GuBot huênh hoang đưa ra dự đoán, Matrix bị xé, một vật clay rơi ra (đồ lố hoặc category thật).
2. **REACT:** Nàng khám phá item, **thích/khả thi** hoặc **không thích**, bằng thao tác swipe hoặc nút tương đương. Không có bảng 8 ô hoặc nút checkbox.
3. **FAIL:** Phản ứng vật lý cường điệu: like = clay đập “bẹp” lên mặt kính, rồi co về khay; dislike = Matrix kéo chìm, tiếng xả nước ngắn. GuBot phản ứng tự tin ngớ ngẩn.
4. **LEARN:** Chỉ *reaction với item thật* mới tạo tín hiệu sở thích. GuBot có thể sai và tự chữa ngượng. Cuối game, nàng chọn/xác nhận tối đa ba tín hiệu mà nàng thực sự thấy hợp.

**Luật quan trọng [PROPOSED]:** Đồ troll dùng làm nhịp hài, **không bao giờ là tín hiệu quà**. Nếu nàng cố like bồn cầu, GuBot có thể hoảng hốt biểu diễn, nhưng backend không được suy ra “nàng thích bồn cầu”; không đánh tráo ý nghĩa dữ liệu.

**Luật thứ hai:** Thao tác xem item **khác** thao tác xác nhận thích. Không suy ra thích từ thời gian dừng, số lần chạm, biểu cảm hoặc swipes thử nghiệm. **Chỉ ghi sở thích từ hành động chủ động.**

**Luật thứ ba:** Khi item thật hiện rõ, phải có nhãn category dễ hiểu. Artwork/animation không được khiến người chơi chọn vì tưởng nó là một món cụ thể không đại diện cho category.

---

## 3. End-to-end UX / scene states

| State | Trigger → Hành vi | Nội dung hiển thị | Điều kiện chuyển |
|---|---|---|---|
| **S0 Invite Created** | Chàng nhập tuổi nàng + ngân sách, tạo link riêng | Copy share qua Zalo; bản preview | Link được tạo (chưa coi là nàng đã mở) |
| **S1 Enter / Consent-lite** | Nàng mở link, touch bắt đầu; audio OFF mặc định | Căn phòng Binary Matrix, GuBot xuất hiện với tạo hình khờ khạo | Nàng bấm Bắt đầu |
| **S2 Cold Open** | GuBot khoe năng lực rồi đoán bậy cú đầu tiên | “Tôi biết rất rõ gu của em. Độ chính xác... đang tải.” | First reveal |
| **S3 Reveal** | Binary Matrix rạn, xé màng không gian, item clay lộ diện | Nhãn item + 1 punchline ngắn | Animation xong hoặc Skip |
| **S4 Reaction** | Like / Dislike / Bỏ qua; haptic/sound nếu được phép | Bẹp vào kính hoặc chìm xuống Matrix | Ghi state; tới item kế |
| **S5 Finale** | Đã xem đủ 8 real items; không buộc finish troll nếu skip | GuBot khổ sở “Tôi đã bị sự thật đánh bẹp.” | Nàng mở bản đoán cuối |
| **S6 Review** | Hiện tối đa 3 hướng nàng muốn giữ (ưu tiên nàng xác nhận, không AI tự bịa) | Có thể sửa, giữ 1–3 hoặc không giữ gì | Nàng chốt kết quả |
| **S7 Share Permission** | Nàng quyết định gửi hay không | “Gửi những lựa chọn này cho người đã mời em chứ?” | Đồng ý hoặc từ chối |
| **S8 Done** | Nếu đồng ý: tạo report riêng cho chàng; nếu không: kết thúc không gửi | Lời chốt hài + nút xem lại / chơi lại | Kết thúc |
| **S9 Sender Returns** | Chàng vào creator link riêng | Thấy category đã được cho phép chia sẻ, gợi ý theo ngân sách; tiếp tục 1A sau khi mua | Chàng tự mua quà, setup hunt |

**[PROPOSED] Cú pháp chọn nhanh:** Đồ vật card ở giữa; swipe phải = “có cửa”, swipe trái = “không hợp”; hai icon/tap affordance luôn tồn tại để người không biết swipe vẫn chơi được. Mỗi phản hồi có **Undo** 3–5 giây hoặc mục xem lại cuối game. Vertical scroll trên Android không được va chạm swipe ngang. Bấm **Bỏ qua** để tránh ép chọn.

**[PROPOSED] Like animation:** item lao về camera trong 180–320 ms, méo ra thành một mảng clay dính trên “mặt kính”, trượt 300–600 ms rồi co thành sticker nhỏ ở mép dưới; không che item kế. Reaction “bẹp” phải nổi bật nhưng không gây giật mạnh/motion sickness.

**[PROPOSED] Dislike animation:** glyph 0/1 tràn lên, item bị kéo xuống như chìm vào nền, âm thanh nước xả **ngắn, hài hước**, GuBot mất biểu cảm khoảng 300 ms. Không dùng âm thanh xả dài hoặc lặp liên tục.

**[PROPOSED] Mobile safety:** Có chế độ Reduce Motion/Skip; sound OFF cho tới thao tác bật âm thanh; chỉ dùng vibration khi thiết bị/trình duyệt hỗ trợ; mọi interaction chạy được không cần sound/haptic. Khi tab bị background, giảm/tạm ngưng animation; giữ tiến độ khi refresh.

---

## 4. Item catalog, pacing, và ranh giới giữa đồ ngu/đồ thật

### 4.1 Real gift categories — kế thừa checkpoint v2

**[AGREED]** Master list 12 category. Mỗi scene = **5 core + 2 age-dependent + 1 wildcard = 8 real items**.

| Group | Categories |
|---|---|
| **Core — 5** | Makeup/son; Nước hoa & skincare; Trang sức/phụ kiện; Túi/ví; Chăm sóc bản thân (spa/massage/dưỡng tóc) |
| **Theo tuổi — chọn 2/5** | Thời trang/giày; Cá nhân hóa/handmade; Hẹn hò/ăn uống; Chuyến đi ngắn/nghỉ dưỡng; Sức khỏe/đồ dùng tốt cho nhà |
| **Wildcard — chọn 1/2** | Hoa; Công nghệ |

**[OPEN]** Chưa chốt hai age-dependent category cho từng nhóm; các nhóm tuổi gốc 18–22 / 22–28 / 28+ **bị chồng ở tuổi 22 và 28**, cần chuẩn hóa thành khoảng không giao nhau trước khi code. Mapping tuổi là giả thuyết chưa có bằng chứng khảo sát trực tiếp; không mặc định “vợ 28+ sẽ thích đồ nhà”. Budget chỉ dùng để tùy biến report cho chàng, không quyết định 8 vật thể của nàng (mới là đề xuất từ v2, chưa khóa).

### 4.2 Absurd decoys (comedy-only)

**[AGREED, ví dụ user nêu]:** Quần lót nam, xe bắt chó, bồn cầu. **[PROPOSED]** Chọn **2 decoy cho một session**, không trộn vào 8 real và không tính vào 12 category. Dùng art clay ngớ ngẩn thay vì đồ ghê rợn; không dùng trò gây kỳ thị hoặc nhắm vào đặc điểm cá nhân.

**[PROPOSED] Nhịp 10 lượt:**

| Lượt | Loại | Ý đồ |
|---:|---|---|
| 1 | Decoy | Cold open: “AI này ngốc thật!” |
| 2 | Real | Người chơi nhận ra có món hợp lý |
| 3 | Real | Nàng có agency phản ứng thật |
| 4 | Real | Tạo nhịp lựa chọn |
| 5 | Decoy | Callback gây cười, tránh đều đều |
| 6–10 | 5 Real | Dồn vào sở thích thực, tăng nhịp finale |

Có thể thử luân phiên thứ tự hai decoy (để giữ surprise), nhưng phải giữ đủ cả 8 real category, không ưu tiên vị trí đẹp cho một nhóm category mãi. **Không chèn hơn 2 đồ troll mặc định** vì kéo dài game và làm người chơi không nhận ra mục đích chính.

**[PROPOSED] Image art:** 3D clay-cute *look*, có thể dựng bằng SVG gradient/illustration hoặc WebP/PNG có nền alpha; **không mặc nhiên nói SVG cho ra 3D thật**. Làm 1 item prototype để so độ đẹp, độ nét và tải trên Android trước khi làm đủ 10.

---

## 5. GuBot — persona, micro-copy và hài bằng hành vi

**Persona [PROPOSED]:** hí hửng, khoe khoang, “trí tuệ nhân tạo cao cấp” nhưng thành tích toàn sai, biết tự trêu, **không chê nàng**. Nó có thể bị dính món đồ vào mặt, trượt ngã, chảy nhão, “chết đứng” 0.3 giây rồi lại tự tin. Hài đến từ **sự tương phản giữa tự tin và năng lực thực tế**; không cần diễn văn dài.

| Thời điểm | Lời thoại GuBot (gợi ý, chưa duyệt) |
|---|---|
| Mở game | “Chào em! Tôi là GuBot. Chuyên gia đọc vị sở thích. Tỷ lệ đúng: đang cập nhật.” |
| Vênh váo trước lần đoán 1 | “Dự đoán đầu tiên của tôi chắc chắn khiến em kinh ngạc!” |
| Hiện bồn cầu | “Tôi phát hiện một niềm đam mê rất... tiện nghi.” |
| Bồn cầu bị xả | “Ủa? Không thích thiết bị giải tỏa áp lực à?” |
| Hiện quần lót nam | “Cảm biến báo tín hiệu thời trang cực mạnh. Hơi... sai đối tượng.” |
| Hiện xe bắt chó | “Tôi không giải thích được. Nhưng thuật toán rất quả quyết.” |
| Hiện nước hoa | “Lần này tôi kiểm tra ba lần rồi. Chắc là mùi thơm thật.” |
| Hiện túi/ví | “Đây là túi. Tôi đang tiến bộ rõ rệt.” |
| Hiện trang sức | “Thấy chưa! Tôi cũng có lúc giống AI xịn.” |
| Like (chạm bẹp) | “Á! Ghi nhận bằng... mặt!” |
| Dislike (xả) | “Tín hiệu vừa đi xuống cống. Tôi tôn trọng khoa học.” |
| Bỏ qua | “Được. Tôi cũng chưa chắc lắm.” |
| 3 like liên tiếp | “Khả năng đoán gu của tôi tăng từ đáng ngại lên hơi đáng tin.” |
| Hoàn tất | “Sau nhiều mất mát, tôi đã sống sót qua bài kiểm tra.” |
| Review | “Trong đống dự đoán này, cái nào thật sự có cửa?” |
| Xin chia sẻ | “Gửi các lựa chọn này cho người đã rủ em chơi nhé? Chỉ gửi khi em đồng ý.” |
| Kết thúc (đã gửi) | “Tín hiệu đã được chuyển đi. Tôi sẽ giả vờ là do mình đoán đúng.” |
| Kết thúc (không gửi) | “Không sao. Bí mật vẫn ở lại trong căn phòng này.” |

**Luật copy [PROPOSED]:** 1 câu/ngữ cảnh, thường ≤ ~14 từ/câu khi có animation nhanh; không thuyết minh 5 dòng liên tục; mỗi lần phản hồi ngẫu nhiên trong 2–3 câu ngắn để đỡ lặp, nhưng kết quả phải deterministic theo seed để replay/refresh không đổi tùy tiện. Tránh câu “món này mà tặng là bị ăn chửi” như khẳng định chắc chắn về nàng; nói về khả năng GuBot đoán sai.

**Mascot [OPEN]:** Cục shit cute / cây kem tan / blob AI đều đang là candidate. Quyết định bằng **3 concept sketches + thử phản ứng 5 người**; chớ khóa hình trước khi thử animation “bẹp”, ngã, chảy nhão. Một mascot dễ nhận diện qua silhouette, có mắt/miệng linh hoạt, đẹp khi thu nhỏ ở mobile, và nối được về mood GiftU mà không biến cả brand thành trò toilet humor.

---

## 6. Data capture, kết quả trả cho chàng, privacy

**[PROPOSED] Dữ liệu tối thiểu:**

- `session_id`, `room_id`, `scene_seed`, `catalog_version`, `age_segment`, `created_at`.
- `item_id`, `item_kind` (`real`/`decoy`), `category_id` (chỉ real), `reaction` (`like`/`dislike`/`skip`), `reaction_revision`, `order_index`.
- `final_categories`: mảng 0–3 `category_id` được nàng chọn/xác nhận; **không auto “top 3” theo độ do dự/thời gian nhìn**.
- `share_approved`, `share_approved_at`, `completed_at`, `expires_at`.
- `budget_band`: chỉ ở phía chàng; không để lộ ngân sách trong scene người nhận.

**[PROPOSED] Report sender:** Tên hướng quà nàng đồng ý chia sẻ; mức độ “có cửa” theo lựa chọn trực tiếp (không gán xác suất khoa học giả); nhóm **không thích** rõ ràng, nhóm **bỏ qua/không biết** để riêng, không trộn “không thích” với “không phản hồi”; mỗi category có link tới 1 trong 12 trang hướng dẫn mua sắm dự kiến ở checkpoint v2. Không công bố chi tiết swipe, dwell time hay analytics không cần thiết. Nếu nàng **không đồng ý gửi**, chàng không được thấy reactions của nàng.

**[PROPOSED] Quy trình chọn top:** Nếu nàng like ≤3 item thật → đề xuất giữ chúng, cho phép bỏ bớt; nếu >3 → vòng cuối “chọn tối đa 3 món thực sự có cửa”. Nếu 0 like → cho phép kết thúc với report “chưa có tín hiệu đủ rõ” hoặc gợi mở xem lại; không tự bịa kết quả. Item troll dù được like không vào report quà.

**[PROPOSED] Sự đồng ý:** trước khi gửi report, giải thích rõ rằng **những sở thích nàng chọn sẽ được chia sẻ với người đã mời nàng chơi**. Không lừa rằng đó chỉ là AI đoán vô thưởng vô phạt. Không nhất thiết tiết lộ rằng chàng có thể mua quà; nhưng **không giấu việc dữ liệu sở thích được chia sẻ**.

**Security [PROPOSED]:** unique room link là bearer link; report sender phải được phân quyền riêng, không suy ra từ URL receiver; không public directory, có rate limit, TTL/xóa; tránh nhúng dữ liệu report vào HTML phía receiver; event logging tối giản, tránh thu thông tin nhạy cảm. Nếu không có account creator, cần thiết kế creator secret riêng và cơ chế khôi phục phù hợp, không dùng một link cho cả hai vai trò.

---

## 7. Technical boundaries & MVP scope

### MUST SHIP cho bản UAT
1. Receiver link riêng; scene mobile portrait; GuBot mascot với **2–3 trạng thái biểu cảm**.
2. Binary Matrix room + một **tear/reveal cinematic sequence** tái sử dụng cho tất cả items.
3. **8 real category** theo mapping đã chốt ở v2 + **2 absurd decoys** (10 lượt mặc định), artwork clay-cute nhất quán.
4. Like/dislike/skip (swipe + nút dự phòng); **splat** và **Matrix flush**; âm thanh optional, user-gesture gated.
5. Finale review 0–3 real categories; chia sẻ có consent; report creator tách quyền; người tặng được dẫn quay lại 1A.
6. Stable scene seed, basic resume, lỗi mạng có fallback, event tracking tối thiểu.
7. Kiểm thử Android thật: touch, keyboard, load, layout, memory, sound, swipe vs scroll, refresh.

### NICE-TO-HAVE sau UAT
- GuBot có physics mềm nâng cao, tương tác camera glass layer nhiều vật dính cùng lúc.
- Haptic choreography khác nhau theo item; spatial audio; hiệu ứng rách không-thời-gian nhiều lớp.
- Các diễn viên phụ / vật troll riêng theo nhân vật; nội dung nói thoại bằng giọng tổng hợp.
- Chia sẻ replay clip/GIF, multiplayer, AI personalization hoặc procedural joke generation.

### OUT OF SCOPE MVP
- Mô hình AI suy luận sở thích thật, dự đoán từ hành vi ngầm.
- Marketplace, affiliate, đặt vé, thanh toán, nhà bán hàng, shipping.
- Quảng cáo, email/SMS service tự gửi, tạo video 3D runtime, dữ liệu nhận diện người nhận.
- Bộ dựng game phức tạp hoặc điều khiển mọi câu thoại theo LLM.

### Technical guardrails [PROPOSED]
- Kế thừa Binary Matrix đã UAT Android; **không giả định GiftU app hoặc backend đã tồn tại**.
- Tách renderer/interaction ra khỏi item catalog, comedy script, selection state, report state.
- Animation dùng asset cache, chỉ 1 item nặng trên màn hình; giảm particle khi low-end device; kiểm thử độ mượt bằng máy thật, không hứa FPS khi chưa đo.
- Phân biệt `visual_asset` và `semantic_category`: cùng một category có thể đổi artwork mà report vẫn chính xác.

---

## 8. Telemetry & success criteria của prototype

**Funnel [PROPOSED]**: `invite_created` → `receiver_opened` → `game_started` → `first_reaction` → `all_real_seen` → `review_completed` → `share_approved` → `report_viewed` → `sender_returned_to_1A` → `hunt_published`.

**Outcome cần quan sát khi UAT:**
- Nàng có **cười thật** (không chỉ khen “cute”) và có hiểu chỉ dẫn swipe/like mà không cần người hướng dẫn?
- Nàng có hiểu item real đại diện cho một **hướng quà**, không phải mã mua món cụ thể?
- Nàng có thấy bị hỏi cung/checklist hoặc cảm thấy bị lừa khi được xin chia sẻ phản ứng?
- Nàng có phân biệt **dislike** với **skip**? Có muốn sửa kết quả trước khi gửi?
- Sau report, **chàng có mua được món quà cụ thể** hay vẫn mơ hồ?

**Gate D / UAT acceptance [PROPOSED]:** Demo bằng Android thực; mời tối thiểu 5 người ngoài nhóm thiết kế chơi không hướng dẫn; ghi lại ít nhất một khoảnh khắc gây cười thật và tất cả điểm kẹt UX; đảm bảo không có case like decoy làm bẩn report, không có report lộ khi chưa consent, không có UI bẹp che nút tiếp tục, và refresh không mất tiến độ nghiêm trọng. Các ngưỡng conversion định lượng chỉ đặt sau khi có baseline thực tế; không bịa KPI trước.

---

## 9. Open decisions cần chốt trước khi build production

1. **Mascot:** poop / melted ice cream / neutral blob? Silhouette, độ hài và sự phù hợp với GiftU brand.
2. **Tuổi:** các khoảng 18–22 / 22–28 / 28+ chồng lấn; chốt luật tuổi 22/28, cùng 2 category theo tuổi mỗi nhóm.
3. **Finale:** nàng giữ tối đa 3 lựa chọn hay được phép gửi 1–n; UX của trường hợp 0 likes.
4. **Copy tone:** mức “nhảm”/toilet humor, cho phép quần lót nam/xe bắt chó/bồn cầu trong bản chính thức đến đâu.
5. **Asset format:** SVG 2.5D clay giả lập vs PNG/WebP clay render; chất lượng/performance mobile.
6. **Creator identity:** cách phân quyền sender/report; expiration + repeat play; policy chia sẻ kết quả.
7. **Content page:** 12 trang chưa viết, mua ở đâu theo ngân sách sẽ được cập nhật bằng cách nào và ai review?
8. **Scope animation:** tear effect cinematic ở mức nào để không ăn hết thời gian làm treasure hunt 1A?

---

## 10. Thứ tự triển khai đề nghị

**Spike A — 1 dọc trải nghiệm:** GuBot xuất hiện → xé Matrix → **1 món troll** → dislike/flush → **1 món thật** → like/splat → review → xin chia sẻ. Nếu hai cú tương tác chưa gây cười và chưa mượt trên Android, **đừng sản xuất đủ 10 món**.

**Spike B — Data integrity:** mô phỏng hết các case (chỉ like troll / like 5 real / dislike hết / skip / refresh / deny share) và xác minh report đúng và không rò rỉ.

**Spike C — Content & production:** cố định 8 real + 2 troll theo logic seed, nhân bản asset, hoàn thiện bộ copy, creator report, link quay về 1A.

**Gate sang build 1A:** Khi GuBot turn có tín hiệu hài thật, report đáng tin, UX mobile đạt, đừng tiếp tục thêm comedy effects vô hạn: tập trung hoàn thiện treasure hunt lõi trước Noel.

**Tuyên ngôn:** *GuBot có thể ngu. Dữ liệu sở thích thì không được ngu.*