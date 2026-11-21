# GiftU

GiftU giúp người tặng chọn quà và trao quà qua một cuộc săn kho báu trong Binary Matrix. Nhánh **1A** dành cho người đã có quà. Nhánh **1B** dùng GuBot để khám phá gu người nhận rồi dẫn người tặng về 1A sau khi mua quà.

**[Mở GiftU live](https://giftu.batmanbegun.chatgpt.site/)** · Public Testbed v0.1.0. Dùng chính URL này để review từng build và làm production khi GiftU hoàn tất.

## Bắt đầu tại đây

1. [AGENTS.md](AGENTS.md) — quy tắc làm việc cho mọi agent.
2. [Spec hiện hành](docs/PRODUCT.md) — luồng, quyết định, phạm vi Spike A.
3. [Bàn giao hiện tại](docs/HANDOFF.md) — trạng thái, kiểm chứng và bước tiếp theo.
4. [Lịch sử hình thành](docs/HISTORY.md) — ý tưởng khởi nguồn, các bản memo và spec.
5. [Triển khai](docs/RELEASE.md) — quy trình ChatGPT Sites do Codex phụ trách.

Trên live, GuBot chơi được bằng ba ngôn ngữ với dữ liệu lưu trên thiết bị. Backend phòng riêng và báo cáo đã có trong **Spike A chạy local**, đang chờ tích hợp lên Sites. Xem [bàn giao](docs/HANDOFF.md) để biết bước tiếp theo. Dùng Node.js 24+, chạy `npm start` rồi mở `http://localhost:3000`. Chạy `npm test` để kiểm tra luồng API. Repo này là nguồn bàn giao giữa các môi trường và agent.
