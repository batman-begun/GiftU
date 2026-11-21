# GiftU

GiftU giúp người tặng chọn quà và trao quà qua một cuộc săn kho báu trong Binary Matrix. Nhánh **1A** dành cho người đã có quà. Nhánh **1B** dùng GuBot để khám phá gu người nhận rồi dẫn người tặng về 1A sau khi mua quà.

**[Mở GiftU live](https://giftu.batmanbegun.chatgpt.site/)** · [Trạng thái bản live và việc tiếp theo](docs/HANDOFF.md) · [PR #1 — ứng viên v0.4.0](https://github.com/batman-begun/GiftU/pull/1)

## Chạy từ repo root

Cần Node.js 24+. Repo dùng thư viện có sẵn trong Node.js.

```sh
npm run dev
npm test
```

Mở [localhost:4173](http://127.0.0.1:4173). Preview chạy cùng frontend và Worker với bản phát hành, dùng SQLite trong bộ nhớ cho luồng hai link. Khởi động lại preview sẽ xóa các phòng thử. `npm test` build rồi chạy test Matrix và Worker.

## Tìm đúng source

| Đường dẫn | Dùng khi |
| --- | --- |
| [`sites/web/`](sites/web/) | Sửa UI, Matrix, chữ, âm thanh và PWA. |
| [`sites/worker.mjs`](sites/worker.mjs), [`sites/drizzle/`](sites/drizzle/) | Sửa API phòng, link, consent và schema. |
| [`assets/`](assets/) | Tìm mockup đã duyệt, dữ liệu và media mẫu. |
| [`prototypes/node-spike/`](prototypes/node-spike/) | Tra cứu hoặc chạy bản thử Node/SQLite đầu tiên. |

Đọc [AGENTS.md](AGENTS.md), [spec hiện hành](docs/PRODUCT.md) và [bàn giao](docs/HANDOFF.md) trước khi nhận việc. [Lịch sử](docs/HISTORY.md) giải thích các quyết định cũ. [Hướng dẫn release](docs/RELEASE.md) dành cho lần phát hành lên Sites.
