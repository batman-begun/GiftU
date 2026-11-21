# GiftU

GiftU giúp người tặng chọn quà và trao quà qua một cuộc săn kho báu trong Binary Matrix. Nhánh **1A** dành cho người đã có quà. Nhánh **1B** dùng GuBot để khám phá gu người nhận rồi dẫn người tặng về 1A sau khi mua quà.

## Bắt đầu tại đây

1. [AGENTS.md](AGENTS.md) — quy tắc làm việc cho mọi agent.
2. [Spec hiện hành](docs/PRODUCT.md) — luồng, quyết định, phạm vi Spike A.
3. [Bàn giao hiện tại](docs/HANDOFF.md) — trạng thái, kiểm chứng và bước tiếp theo.
4. [Lịch sử hình thành](docs/HISTORY.md) — ý tưởng khởi nguồn, các bản memo và spec.
5. [Triển khai](docs/RELEASE.md) — quy trình ChatGPT Sites do Codex phụ trách.

Trạng thái hiện tại là **Spike A chạy local**. Dùng Node.js 24+, chạy `npm start` rồi mở `http://localhost:3000`. Chạy `npm test` để kiểm tra luồng API. Repo này là nguồn bàn giao giữa các môi trường và agent.
