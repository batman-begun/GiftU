# GiftU — v1.2 Bidirectional Product & Code-Ready Addendum

**Ngày:** 2026-11-21 (Asia/Ho_Chi_Minh)  
**Trạng thái:** PRE-CODE ARCHITECTURE / review; chưa code, chưa kiểm chứng stack/repo.  
**Kế thừa:** `GiftU_checkpoint_2026-11-21_v2.md` và `GiftU — Turn 1_ GuBot Comedy Room MVP Spec v1.1.md`.

> **Quyết định từ user [AGREED]:** GiftU phải phục vụ **cả nam → nữ và nữ → nam**. Hai vai trong sản phẩm luôn là **người tặng (sender)** và **người nhận (receiver)**. Không tạo hai game engine, không buộc giới tính người tặng quyết định bộ quà cho người nhận. Các mục [PROPOSED]/[OPEN] dưới đây chưa phải phê duyệt của user.

## A. Bản sửa quan trọng nhất: vai trò ≠ giới tính ≠ catalog

1. **Business flow chung:**
   - **1A:** người tặng *đã có quà* → tạo hunt → chia sẻ unique receiver URL → người nhận chơi.
   - **1B:** người tặng *chưa biết quà* → chọn bộ gợi ý phù hợp với người nhận + tuổi + ngân sách → mời người nhận chơi GuBot → xin consent → người tặng xem report → tự mua quà → đi qua 1A.
2. **Hai chiều phải chạy cùng một quy trình và cùng engine**, không copy-paste component/screen cho từng giới.
3. **Catalog profile là lựa chọn định hướng gợi ý quà, KHÔNG phải tuyên bố về giới tính/bản dạng của người nhận.** Gợi ý ba profile UI: `Quà cho nàng` / `Quà cho chàng` / `Để mở (trung tính)` [PROPOSED]. Khi cần MVP chỉ hai profile `for_her` và `for_him`, vẫn thiết kế schema/renderer cho `open` về sau. Không suy ra profile từ giới tính người gửi; người gửi tự chọn và được sửa trước khi phát link.
4. **Không giả định mọi quan hệ đều là nam–nữ**. Nam gửi nam, nữ gửi nữ, bạn bè… về logic vẫn hoạt động. Hạn chế chỉ nằm ở độ phủ và độ chính xác của catalog/copy khi chưa có dữ liệu.
5. **1A dùng chung toàn bộ:** quà vật lý, clue, reveal, mood, decoy và final treasure hunt không cần biết giới tính. `catalog_profile` của 1B là ngữ cảnh tùy chọn, không phải điều kiện để vào 1A.

## B. Contract cụ thể cho GuBot hai chiều

| Hạng mục | Engine chung | Config theo profile |
|---|---|---|
| Matrix room & tear | 1 renderer, 1 scene-state-machine | Không |
| Mascot GuBot | 1 rig/animation/persona | Thoại có thể biến thể nhỏ, không đổi tính cách |
| Splat/Flush | 1 interaction & sound contract | Không |
| Reaction | `like / dislike / skip`, Undo, Review 0–3 | Không |
| Real gift items | 8 món / session | Lấy từ bộ category tương ứng người nhận |
| Absurd decoys | 2 món / session, `item_kind=decoy` | Mặc định pool chung, không nhắm vào giới |
| Creator invite | Chàng/nàng tự gửi qua Zalo/Messenger | Copy gợi ý trung tính/chỉnh được |
| Consent | Nói rõ sẽ gửi kết quả cho người đã mời | Không |
| Report | 0–3 category + 3 hướng mua/category + mẹo chọn | Nội dung gợi ý theo category + mức chi |
| 1A continuation | Cùng luồng tạo hunt | Không |

**Copy mời mặc định [PROPOSED]:** “Tớ mới làm một cái app AI đoán sở thích. Test thử coi nó đoán có ngu không =)))” — người tặng được sửa thành “Anh…” hoặc “Em…” theo cách họ nói chuyện. **Không hardcode `anh`, `em`, `nàng`, `chàng` trong engine hoặc dữ liệu gốc.** GuBot gọi người chơi là “bạn”/“bạn ơi”, có thể dùng “em” trong pack thoại đã duyệt nếu muốn.

**Mood [AGREED]:** GuBot tự tin ngớ ngẩn, “đoán” cả món ngớ ngẩn lẫn hướng quà thật; Matrix tear hoành tráng; artwork clay-cute; Thích → item đập **bẹp** vào mặt kính; Không hợp → Matrix nhấn chìm + tiếng xả nước nếu bật sound. Đừng nhầm “AI character có kịch bản” với AI inference thật.

## C. Catalog strategy: không tự bịa dữ liệu tuổi/giới

### C1. Bộ `for_her` — GIỮ như v2/v1.1 [AGREED ở mức hướng đi]

- **Core (5):** makeup/son; nước hoa & skincare; trang sức/phụ kiện; túi/ví; self-care/spa.
- **Age-candidate (5):** thời trang/giày; cá nhân hóa/handmade; hẹn hò/ăn uống; chuyến đi ngắn/nghỉ dưỡng; sức khỏe/đồ dùng tốt cho nhà.
- **Wildcard (2):** hoa; công nghệ.
- Quy tắc: **5 core + 2 theo tuổi + 1 wildcard = 8 real**, cộng **2 troll** = 10 lượt.
- Mapping chính xác 2 category theo tuổi **vẫn OPEN**, không coi dữ liệu khảo sát hỗ trợ điều này.

### C2. Bộ `for_him` — ĐỀ XUẤT MỚI, CHƯA DUYỆT / CHƯA MARKET VALIDATION

Để có thiết kế đối xứng về số lượng mà **không ép hai giới thích những thứ đối nghịch**, khởi tạo bộ 12 category candidate:

- **Core (5, PROPOSED):** công nghệ/gadget; đồng hồ/ví/phụ kiện; nước hoa/grooming; quần áo/giày; sở thích cá nhân (thể thao, gaming, nhạc, mô hình — phải làm rõ subcategory khi báo cáo).
- **Age-candidate (5, PROPOSED):** cá nhân hóa/handmade; hẹn hò/ẩm thực; chuyến đi/trải nghiệm; setup bàn làm việc/công cụ hữu ích; chăm sóc bản thân/thư giãn.
- **Wildcard (2, PROPOSED):** sách/đồ sưu tầm; hoa (để kiểm định giả định, không mặc định nam ghét hoa).
- Không tự chốt mapping tuổi. Tuổi và “người yêu/vợ/chồng” **không đủ** để suy ra sở thích, đặc biệt về đồ gia dụng. Có thể mở `for_him` với 8 candidate thủ công được review rồi mới cấu hình mapping; **không được lặng lẽ mượn category nữ và đổi hình minh họa**.

### C3. Phương án `open` [OPEN — architectural hook]

- Một bộ 8 category trung tính có thể dựng từ những category dùng chung (trải nghiệm, công nghệ, chăm sóc bản thân, đồ cá nhân, sách, quà cá nhân hóa…), chưa cần tạo mới trong MVP.
- Ưu tiên kiến trúc chịu được `open`, **không hứa UI/support đầy đủ khi content chưa sẵn sàng**.

**Editorial rule:** `category_id` ổn định giữa các catalog khi ý nghĩa trùng nhau (ví dụ `fragrance`, `travel_experience`). Một nhãn có thể khác theo audience hoặc style, nhưng **category semantics không đổi vì ảnh vẽ khác**. Một category quá rộng (`hobbies`) phải có hướng cụ thể trong Report v0, không được in “mua đồ theo sở thích” rồi coi là xong.

## D. Code contract sơ bộ (TypeScript minh họa, CHƯA IMPLEMENT)

```ts
type AudienceProfile = 'for_her' | 'for_him' | 'open';
type SceneType = 'GUBOT_GUESS' | 'TREASURE_HUNT';
type Reaction = 'like' | 'dislike' | 'skip';
type ItemKind = 'real' | 'decoy';
type AgeBand = '18_21' | '22_27' | '28_plus'; // proposed boundaries

type GiftCategory = {
  id: string;                    // stable semantic ID
  labelVi: string;
  tags: string[];
  eligibleProfiles: AudienceProfile[];
  artworkId: string;
  reportCardId: string;
};

type SceneCatalog = {
  id: string;                    // e.g. giftu-for-him-v1
  version: number;
  audienceProfile: AudienceProfile;
  coreIds: string[];            // five
  ageCandidateIds: string[];    // five
  wildcardIds: string[];        // two
  ageRules: Record<AgeBand, string[]>; // two per band, after editorial approval
  decoyPoolIds: string[];
};

type GiftRoom = {
  id: string;
  senderSecretId: string;       // NEVER expose to receiver
  receiverTokenHash: string;    // separate bearer access
  sceneType: SceneType;
  audienceProfile?: AudienceProfile;
  catalogId?: string;
  catalogVersion?: number;
  ageBand?: AgeBand;
  sceneSeed: string;
  createdAt: string;
  expiresAt: string;
};

type ReceiverOutcome = {
  roomId: string;
  reactions: { itemId: string; itemKind: ItemKind; reaction: Reaction }[];
  finalCategoryIds: string[];   // 0..3; only explicit real choices
  shareApproved: boolean;
  sharedAt?: string;
};
```

**Server invariants:**

- Cả hai profile đi qua **cùng state machine S0–S9** của v1.1.
- Catalog là dữ liệu phiên bản hóa, không phân nhánh lớn `if (receiverGender === ...)` trong UI/game engine.
- Đồ troll bị loại khỏi report bất kể người chơi Like, dislike hay Skip.
- Không lấy dwell time/swipe thử/animation trigger làm suy luận về gu. Chỉ nhận lựa chọn chủ động, được sửa ở Review.
- Nếu `shareApproved=false`, sender **không đọc được** reactions hay final picks.
- Link receiver không cho truy cập report sender; sender secret không được lộ trong HTML/asset public.
- Khóa snapshot `catalogId + catalogVersion + sceneSeed` cho room khi đã phát link; chỉnh catalog mới không làm đổi 8 vật thể của room cũ.
- Không để ngân sách của sender lộ cho receiver; lọc gợi ý mua trong report.
- Đếm unique item ids, giới hạn số chọn, kiểm tra category thuộc catalog hợp lệ **phía server**.
- `open` chưa có catalog hoàn chỉnh → chọn profile đã sẵn sàng hoặc báo chưa hỗ trợ, không render danh mục lỗi.

## E. Report v0 — riêng cho loại category, KHÔNG riêng cho giới người gửi

- `finalCategoryIds` 0–3, chia sẻ chỉ sau consent.
- Mỗi category có 3 lựa chọn mua cụ thể, 1 mẹo xác minh gu, 1 cảnh báo mua nhầm. Ưu tiên mức ngân sách gắn ở sender dashboard.
- Với hai master catalog 12 category: **tối đa** 72 gợi ý và 24 mẹo nếu không có category dùng chung; số thực tế có thể thấp hơn do tái sử dụng nội dung.
- Ít nhất một đề xuất đường ra khi người gửi **không biết size/mùi/gu**; đừng biến 1B thành “đã chọn nước hoa nhưng vẫn không biết loại nào”.
- Hai profile phải được UAT bằng người nhận và người tặng tương ứng. Không nói đã có nghiên cứu thị trường cho bộ `for_him`.

## F. UI changes trước khi code

1. **Sender setup 1B:** `Bộ gợi ý dành cho ai?` → `Cho nàng / Cho chàng` (tùy chọn `Để mở` sau khi có catalog); nhập **tuổi người nhận** và ngân sách; preview 8 hướng quà trước khi publish [PROPOSED].
2. **Receiver:** không thấy tuổi, ngân sách, “profile”; chỉ thấy GuBot ngáo, reveal 10 món và phản ứng hài. Không làm nữ chơi khác nam về chất lượng animation.
3. **1A sender:** không hỏi giới tính bắt buộc; title, item, mood/decoy đều dùng ngôn ngữ trung tính mặc định; người tặng tự chọn lời nhắn tình cảm nếu muốn.
4. **Copy/translation:** mọi string `sender`, `receiver`/`người tặng`, `người nhận`. Không đặt tên component `BoyCreatesGirlHunt`, `GiftsForGirlfriend`, v.v.
5. **Sound/animation:** giữ mobile-first, âm thanh OFF mặc định, reduced motion, nút thay thế swipe, Undo, tiến độ bền khi reload như v1.1.

## G. Kiểm thử chấp nhận trước khi release

| Case | Expected |
|---|---|
| Nam → Nữ, 1B | Chọn `for_her`, real items đúng catalog, hoàn thành Report rồi 1A |
| Nữ → Nam, 1B | Chọn `for_him`, **cùng** engine/animation, Report mua quà nam có nghĩa |
| Nam → Nam hoặc Nữ → Nữ | Vai trò không bị ép theo giới; flow vẫn hoạt động |
| 1A trực tiếp bất kỳ người tặng/người nhận | Không bị chặn bởi `catalog_profile` |
| Like 2 troll, bỏ qua tất cả real | Report 0 category; không tự suy ra thứ thích |
| Thích 5 real, Review còn 2 | Report đúng 2 đã chốt, không lộ 3 lựa chọn bị bỏ |
| Receiver từ chối chia sẻ | Sender không thấy kết quả |
| Ai có receiver URL thử vào report | Bị từ chối |
| Copy catalog version mới sau khi room được tạo | Room cũ ổn định, không đổi item bất ngờ |
| Refresh khi đang swipe + có sound OFF | Tiến độ an toàn, không autoplay âm thanh |
| Chàng đổi profile trước publish | Preview/report phải đồng bộ; không trộn dữ liệu của profile trước |
| Template Zalo nữ → nam | Không xuất hiện “anh gửi nàng”, hoặc lời thoại gender sai |

**UAT định tính tối thiểu [PROPOSED]:** có người chơi ở **cả hai chiều**, đo khoảnh khắc cười, có thấy như checklist không, hiểu lựa chọn được gửi ai, và báo cáo có giúp người tặng nói được “mình sẽ mua ___” không. Không coi 3/5 cười là chứng minh thống kê.

## H. Thứ tự triển khai hạn chế rework

1. **Domain model & auth/room contract:** sender/receiver roles, two bearer access paths, audience profile, catalog version/seed, consent.
2. **Catalog JSON + report contracts:** build registry cho `for_her` và `for_him`; viết giả lập một ít content nhưng đánh dấu placeholder rõ ràng. Không publish pack thiếu review.
3. **Shared Matrix engine/interaction:** GuBot, tear, splat, flush; scene recipe bằng data, không fork gender.
4. **Spike A hai chiều:** 1 troll + 2 real/category profile → mobile UAT với 2 chiều, cùng sound/FX.
5. **Build 1A song hành:** ưu tiên tầng shared room/asset/hunt; tránh GuBot chặn đường tất cả công việc.
6. **Fill full catalog & Report v0**, kiểm thử permission và refresh; chỉ sau đó mới publish Tier 1.

## I. Các quyết định [OPEN] trước production

- Có mở profile `Để mở` ngay trong MVP hay chỉ chuẩn bị kỹ thuật? **Ưu tiên đề xuất: hai profile đầu tiên, mở đường cho profile thứ ba.**
- Duyệt 12 category `for_him`, và mapping 2 theo từng nhóm tuổi cho **cả hai profile**. Các nhóm tuổi 18–21 / 22–27 / 28+ cũng chưa khóa.
- Có cần người tặng tự sửa 8 category trong preview không, hay chỉ đổi profile? (Rủi ro phụ thuộc vào gu từng người.)
- Chọn mascot và mức độ joke/decoy để không làm mất chất GiftU.
- Kiểm chứng repo/công nghệ thực tế: không mặc định đã có Cloudflare Workers, DB, hay tear reusable.
- Đặt gate và mốc Noel sau khi đã có bản Android chạy thật; không để làm GuBot nuốt hết tài nguyên của 1A.

---

**Tuyên ngôn v1.2:** *GuBot chỉ có một cái não ngu. Nhưng nó phải ngu công bằng với mọi người.*
