# Hướng dẫn cho mọi agent

Áp dụng cho Codex, Claude, Gemini và mọi người đóng góp. Đọc README, docs/PRODUCT.md và docs/HANDOFF.md, kiểm tra nhánh, HEAD và thay đổi đang có trước khi sửa. Đọc archive khi cần hiểu lý do hoặc nội dung chi tiết. Khi spec hiện hành thiếu chi tiết thì tham chiếu bản v1.2 rồi v1.1. Ghi rõ điểm mâu thuẫn hoặc quyết định còn mở, giữ dữ liệu giả lập có nhãn.

## GitHub là luồng làm việc chính

- Agent đến sau phải tự tiếp tục được từ repo mà không cần đọc các thread chat. README dẫn tới mục tiêu, trạng thái, nơi kiểm chứng và việc tiếp theo. Dùng [GiftU live](https://giftu.batmanbegun.chatgpt.site/) để kiểm chứng hành vi đã publish. Ghi rõ trạng thái local/PR và live nếu hai bản khác nhau.
- Mọi agent có quyền đều có thể commit lên nhánh làm việc và mở PR. Codex chịu trách nhiệm review cuối, merge vào main và publish lên Sites. Để PR ở trạng thái chờ Codex nếu chưa được review cuối.

## Mỗi commit phải tự bàn giao được

- Commit nhỏ, có tiêu đề mô tả thay đổi. Body ghi **Why**, **Changes**, **Verification**, **Open / Next**. Nêu mục tiêu liên quan, tiến độ thực tế, link live và build có thể kiểm chứng (hoặc ghi rõ đổi mới đang chờ publish). Verification nêu lệnh hoặc thao tác thực tế, kết quả và phần chưa thử. Không ghi pass nếu chưa chạy.
- Cập nhật docs/HANDOFF.md trong cùng commit để người đến sau biết đã làm gì, cách chạy hoặc kiểm tra, việc đầu tiên cần tiếp tục và blocker. Nếu đổi quyết định hay hành vi sản phẩm, cập nhật docs/PRODUCT.md và ghi lý do, trạng thái quyết định.
- Nếu sắp hết phiên hoặc chạm quota, ưu tiên đẩy checkpoint có thể đọc và tiếp tục. Dùng nhánh làm việc cho WIP, ghi cách tái hiện phần dở và đưa link nhánh hoặc SHA. Giữ main ở trạng thái bàn giao được. Khi dùng PR, giữ thông tin bàn giao trong cả commit được merge.
- Mọi agent có quyền repo đều có thể commit. Đồng bộ trước khi push, giữ thay đổi của người khác và tránh ghi đè lịch sử. Không commit secret, token thật, link receiver thật, dữ liệu người chơi hoặc media riêng tư.
- Codex phụ trách deploy qua ChatGPT Sites. Commit, push và merge không tự publish production.
