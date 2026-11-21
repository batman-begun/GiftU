# GiftU — Product Strategy Checkpoint v2

**Ngày checkpoint:** 2026-11-21 (Asia/Ho_Chi_Minh)
**Trạng thái:** Discovery / product strategy. **Chưa chốt PRD, chưa viết nội dung, chưa triển khai.**
**Mục đích:** Handoff sang thread mới. v2 cập nhật **nhánh 1B (WHAT TO GIFT / chưa biết tặng gì)** và các quyết định liên quan; các phần không đổi so với v1 được tóm tắt ở mục 9.

> **Nguyên tắc đọc:** **ĐÃ THỐNG NHẤT** = user đã duyệt/nêu rõ trong hội thoại. **ĐỀ XUẤT** = ý của assistant, chưa được user duyệt. **CHƯA CHỐT** = cần bàn tiếp. Không trộn ba loại.
> **Lưu ý:** user đang xem lại checkpoint này để suy nghĩ kỹ. Mọi mục "đã thống nhất" ở mức hướng đi có thể còn được đổi sau khi user review.

---

## 1. Thay đổi lớn so với v1

1. **1B không còn "bí".** Thay vì để AI hay danh sách curated tư vấn quà, câu hỏi "tặng gì" được **chuyển sang cho người nhận (nàng) trả lời** qua một scene Binary Matrix.
2. **Hành trình người dùng từ 1 turn thành phễu 3 turn cho nhánh 1B**, trong khi nhánh 1A vẫn là 1 turn.
3. **Danh sách hướng quà được chuẩn hóa thành 12 category** (master list), mỗi scene chỉ hiện 8 mục tùy tuổi nàng.
4. Đã làm market research bước đầu. Kết luận chính: **không có khảo sát nào tách theo tuổi cho quà tặng nữ**, nên phần mapping tuổi là suy luận (xem mục 6).

---

## 2. Tầm nhìn / insight cốt lõi — ĐÃ THỐNG NHẤT (giữ nguyên từ v1)

GiftU giải hai bài toán liên tiếp cho người tặng:

1. **WHAT TO GIFT?** Tặng cái gì.
2. **HOW TO GIFT?** Trao quà bằng cuộc săn kho báu / giải đố trong thế giới **Binary Matrix**.

Treasure hunt là **cách tặng**, không phải toàn bộ giá trị. USP: trải nghiệm gắn với chính vật lý/interaction của Binary Matrix (sóng, phản xạ, biến dạng, morph).
**Tránh:** quà số sến súa/generic do AI xào; biến GiftU thành "AI gift advisor" hay shopping mall. **Kịch liệt không muốn sa vào "tư vấn quà".**

---

## 3. Hành trình người dùng

### 3A. Nhánh 1A — đã có quà (1 turn) — ĐÃ THỐNG NHẤT (từ v1)
Chàng vào, chọn Người tặng, thiết lập item (quà chính, mood, decoy), publish, nhận unique URL, gửi nàng. Nàng mở URL và vào thẳng căn phòng.

### 3B. Nhánh 1B — chưa biết tặng gì (3 turn) — ĐÃ THỐNG NHẤT Ở MỨC HƯỚNG ĐI

1. **Turn 1 — Chàng mời:** nhập thông tin về nàng (xem mục 4) rồi gửi link scene cho nàng.
2. **Turn 2 — Nàng khám phá & chọn:** chơi một scene Binary Matrix tĩnh gồm 8 vật thể, mỗi vật là một hướng quà. Nàng giữ lại một số vật mình thích; kết quả được trả về cho chàng.
3. **Turn 3 — Chàng quay lại:** dựa trên kết quả, chàng tự đi mua quà rồi quay lại **1A** để giấu quà trong hunt.

Lý do: người biết gu nàng nhất là nàng. Cách này tránh bài toán "ai đó khác đoán gu nàng".

### 3C. Các điểm bổ sung — ĐỀ XUẤT (chưa duyệt)
- Nàng **phải biết** lựa chọn của mình được gửi cho người tặng (tránh cảm giác bị lấy dữ liệu lén).
- Ngoài "giữ lại", cho nàng thêm thao tác **loại 1 vật** (biết cái không nên mua cũng có giá trị).
- Sau khi nàng chơi xong, hệ thống **tự sinh khung hunt** từ lựa chọn của nàng. Việc của chàng chỉ còn: duyệt khung, đi mua, upload bằng chứng. (User đã nêu lo ngại "chàng thiết kế game flow" quá nặng; đây là hướng giảm tải.)
- Bản MVP gọn nhất của scene: **tĩnh, không puzzle**.

---

## 4. Setup phía chàng cho 1B — ĐÃ THỐNG NHẤT Ở MỨC HƯỚNG ĐI

Chàng điền (ý tưởng của user: **chàng nhập tuổi nàng**, không hỏi nàng):
1. **Tuổi nàng**, 3 nhóm: 18–22 / 22–28 / 28+.
2. **Ngân sách.**
3. **Nếu nhóm 28+:** nút "người yêu / vợ" (ĐỀ XUẤT; lý do: quà cho vợ lệch hẳn sang đồ dùng, sức khỏe, gia đình).

Ghi chú thiết kế (ĐỀ XUẤT): ngân sách chỉ quyết định **mức giá trong report cho chàng**, không đổi vật thể trong scene của nàng.

---

## 5. Master list 12 category — ĐÃ DUYỆT MAPPING (user "approve"), user đang review lại

**Core, hiện cho mọi tuổi (5):**
1. Makeup / son
2. Nước hoa và skincare
3. Trang sức / phụ kiện
4. Túi / ví
5. Chăm sóc bản thân (spa, massage, dưỡng tóc)

**Theo tuổi (5), mỗi scene lấy 2:**
- Thời trang / giày: hợp 18–22
- Cá nhân hóa / handmade: hợp 18–28
- Hẹn hò / ăn uống: hợp 18–28+
- Chuyến đi ngắn / nghỉ dưỡng: hợp 22+
- Sức khỏe / đồ dùng tốt cho nhà: hợp 28+

**Wildcard (2):** Hoa (đối chứng, vì hoa tươi đang tụt) và Công nghệ (probe, vì bằng chứng yếu).

**Quy tắc scene:** 5 core + 2 theo tuổi + 1 wildcard xoay vòng = 8 vật thể.
Wildcard để kiểm chứng mapping tuổi: nếu data thật lệch mapping thì chỉnh lại. Danh sách 8 vật thể ban đầu (hoa, trang sức, túi, nước hoa/mỹ phẩm, vali/vé, ly vang, tai nghe, nến/spa) **đã được thay bằng master list này**.

**CHƯA CHỐT:** chính xác 2 mục theo tuổi cho từng nhóm tuổi (mục trên chỉ là nhóm tuổi phù hợp).

---

## 6. Market research (bước đầu) — nguồn và giới hạn

**Kết luận gốc:** không tìm thấy khảo sát nào tách quà tặng nữ theo 3 nhóm tuổi trên. Chỉ có dữ liệu bán hàng, phỏng vấn lẻ, và nhiều bài SEO của shop quà (bỏ qua). **Mapping tuổi ở mục 5 là suy luận, không phải số liệu.**

**Metric.vn, 1–15/3/2025 (8/3), Shopee + Lazada + TikTok Shop** — https://metric.vn/blog/chi-trong-2-tuan-thi-truong-qua-tang-ngay-8-3-ghi-nhan-muc-tang-truong-an-tuong
- Thị trường quà 8/3 trên 3 sàn: 16,2 tỷ đồng (+127%).
- Làm đẹp: trang điểm dẫn đầu (1,2 tỷ trên tổng 1,5 tỷ của ngành). Phụ kiện và trang sức đạt 2,6 tỷ (khăn lụa, vòng, dây chuyền, đồng hồ).
- Hoa tươi dịch chuyển sang hoa sáp, hoa lụa; quà handmade (nến thơm, khung ảnh, thiệp) hút khách trẻ; nhóm chăm sóc cá nhân gồm set dưỡng tóc, spa tại nhà, máy massage.
- Giá: 100–500k chiếm tỷ trọng doanh thu lớn nhất; 500k–1 triệu tăng nhanh nhất (+210%).
- **Timing:** lượng tìm mua quà tăng mạnh 3–5 ngày trước ngày lễ, quyết định rất nhanh.
- **Giới hạn:** chỉ đếm hàng gắn nhãn "quà 8/3" trên sàn, không có tách tuổi, không phải Noel.

**Cimigo — online shopping (18–44 tuổi, 1.020 người)** — https://www.cimigo.com/en/trends/vietnam-online-shopping-2/
- Nhóm "Budget Gen Z" 18–28: mua ít, chi thấp, tập trung thời trang và hàng giá rẻ. Nhóm "Power shoppers" chủ yếu millennial khá giả 29–44. Đây là khảo sát mua sắm nói chung, không phải quà.

**Chi tiêu cho trải nghiệm (không riêng quà):** Decision Lab (2024): hơn 57% người trẻ ưu tiên chi cho trải nghiệm cá nhân. UOB và BCG (2024): 47% Gen Z Việt chi nhiều hơn cho trải nghiệm.

**Phỏng vấn lẻ (Tiền Phong, 19/10/2026):** các bạn 18, 25, 28 tuổi ưu tiên quà thiết thực, hợp nhu cầu người nhận; hoa tươi không còn là lựa chọn duy nhất; cá nhân hóa giá 100–400k phổ biến. Chỉ là phỏng vấn vài người.

**Cuối năm:** Metric Q3/2026 cho biết sức mua Q4 dồn vào 11/11, 12/12 và Giáng sinh.

---

## 7. Nội dung trang gợi ý — ĐỀ XUẤT, CHƯA VIẾT TRANG NÀO

12 trang (1 trang/category) viết tay, mỗi trang gồm:
- Tên hướng quà + 1 câu "vì sao nàng hay thích loại này".
- 3 ý cụ thể ở 3 mức giá (dưới 500k / 500k–2 triệu / trên 2 triệu), nói rõ là món gì và mua ở đâu.
- 1 cái bẫy hay dính (sai size, sai tông, sai gu).
- 1 câu hỏi chàng nên hỏi bạn thân của nàng trước khi mua.

Nguyên tắc: ngắn, thực dụng, không sến, không bán hàng; **không để AI viết rồi đăng nguyên**. Team viết tay, user review. Đề xuất viết thử 1 trang mẫu (makeup/son) để duyệt giọng trước khi giao 11 trang còn lại.

---

## 8. Gửi link tới nàng, bảo mật, và CR

### 8A. Kênh gửi link — CHƯA CHỐT
- **Ý của user:** link đến từ "our service" dưới sự duyệt của chàng thì mới bí ẩn; nhưng user tự lo nàng thấy giống scammer hoặc vào mail rác.
- **Ý kiến assistant (ĐỀ XUẤT):** service gửi thẳng dễ chết vì (1) link lạ ở VN bị coi là lừa đảo mặc định, domain `chatgpt.site` càng đáng ngờ, cần domain thật; (2) email/SMS từ domain mới dễ vào spam (cần SPF/DKIM, warm-up); (3) cho phép gửi tin "bí ẩn" tới liên hệ người khác khi họ chưa đồng ý là rủi ro quấy rối/dữ liệu cá nhân, nếu làm thì bắt buộc hiện tên người gửi.
- **Phương án thay thế:** chàng tự gửi link qua Zalo/Messenger (kênh nàng đã tin), bí ẩn nằm **trong phòng**: câu mở đầu từ nhân vật GiftU, có thể thêm mật hiệu chỉ hai người hiểu. Không lộ đây là bài test quà.
- **Trade-off:** nàng biết chàng đứng sau nên mất một phần bất ngờ, nhưng không biết mục đích.

### 8B. Giảm tụt CR của phễu 3 turn — ĐỀ XUẤT
- So sánh phải là phễu 1B với "người bỏ đi" (CR 0%), không phải 3 turn vs 1 turn. Tách hai phễu 1A và 1B, không nhét bắt buộc.
- Chỗ chảy máu là **handoff** (nàng phải mở, nàng phải chơi xong, chàng phải quay lại), không phải số turn.
- Chàng chỉ làm 2 việc nặng (duyệt khung, đi mua + upload), còn lại tự động.
- Đặt deadline cho phòng của nàng (ví dụ ~10/12, khớp nhịp sale 12/12; đây là suy luận) và nhắc chàng ngay khi nàng chơi xong.
- Mở phễu 1B sớm vì thói quen mua quà dồn sát ngày lễ (mục 6). Phễu 1B chỉ phục vụ nhóm lên kế hoạch sớm.
- Đo 3 con số khi ship: bao nhiêu nàng mở / chơi xong / chàng quay lại.

### 8C. Bảo mật và lạm dụng — ĐỀ XUẤT
URL là bearer link (ai có link đều vào được). Không nhúng quà nhạy cảm vào frontend. Cần rate limit, private media, TTL xóa, nút report, giới hạn upload, tránh lộ hóa đơn/ảnh nhạy cảm.

---

## 9. Các phần giữ từ v1 (tóm tắt)

- **3 nhóm item của sender (1A):** Group 1 quà chính (1–2 item, clue vs reveal), Group 2 mood (1–2, tùy chọn), Group 3 decoy (1–2, AI sinh, sender approve). Một màn chơi 3–6 item. Camo chưa chốt.
- **Gameplay Matrix:** candidate ECHO / RESONANCE / MORPH; ưu tiên thử **ECHO** (chưa khóa chính thức). Tránh bấm mò, có hint fallback cho người ít chơi game.
- **Upload:** mốc tạm ≤10 MB/file; không hứa nén video lớn trong browser.
- **Tài sản kỹ thuật:** Binary Matrix showcase đã UAT trên Android và đạt. Không coi GiftU đã build.
- **Kiến trúc (ĐỀ XUẤT):** tách Gift Content/Assets khỏi Game Objects/Behaviors; module Gift Setup / Treasure Hunt / Binary Matrix; stack dự kiến Cloudflare Workers + D1 + R2, chưa xác nhận.
- **Dài hạn:** nếu thành công, 1B thành nơi nối vendor/partner (voucher, booking, điện hoa…). **Không thuộc scope MVP Noel 2026.** Event tracking ngay từ đầu để có data nói chuyện với partner sau này.
- **Ước lượng scope trong ~33 ngày tới 24/12 (ĐỀ XUẤT):** ECHO + 1A + decoy auto + link riêng + tracking; 1B là scene tĩnh, không build engine mới.

---

## 10. Quyết định còn mở — KHÔNG ĐƯỢC TỰ CHỐT

1. Kênh gửi link tới nàng (service gửi hay chàng tự gửi) và việc dùng domain thật.
2. 2 mục theo tuổi cho từng nhóm tuổi (mục 5).
3. **Bất ngờ nguyên vẹn có phải điều kiện không thể bỏ của GiftU không?** (Phễu 1B làm nàng biết trước có quà; assistant đã hỏi, user chưa trả lời.)
4. Có thêm thao tác "loại 1 vật" không; cách hiển thị report cho chàng.
5. Việc tự sinh khung hunt từ lựa chọn của nàng: mức tự động hóa, mức chàng được chỉnh.
6. Ai viết 12 trang, thứ tự viết, có viết trang mẫu makeup/son trước không.
7. Với 1A: kiểm tra quà đã mua, phân biệt clue và reveal, upload/preview.
8. Tỷ lệ decoy/camo; luật chơi do sender tùy chỉnh hay chỉ duyệt.
9. Receiver save progress, replay, thời hạn/xóa quà, quy tắc chia sẻ link, privacy.
10. Pricing và ai trả tiền (chưa có dòng nào); ads, conversion, A/B: chưa có data.
11. Domain thật, repo, hosting, quota, chi phí: kiểm chứng khi bắt đầu build.

---

## Prompt khởi động thread mới (copy/paste)

> Tiếp tục dự án GiftU từ file `GiftU_checkpoint_2026-11-21_v2.md`. Nhánh 1B đã có hướng: nàng chơi scene Binary Matrix 8 vật thể từ master list 12 category, chàng nhập tuổi nàng + ngân sách. Chưa viết nội dung, chưa code. Tao muốn bàn tiếp [chọn: kênh gửi link / mapping 2 mục theo tuổi / bất ngờ nguyên vẹn / viết trang mẫu / cách tự sinh khung hunt]. Đề xuất lựa chọn có trade-off, không chốt hộ tao.

---

**Checkpoint kết thúc.** Không có claim rằng GiftU đã deploy, 12 trang đã được viết, hay các mục "đề xuất" đã được duyệt.