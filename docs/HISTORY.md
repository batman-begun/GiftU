# Lịch sử hình thành GiftU

1. **Khởi nguồn.** Binary Matrix đã được thử trên Android và trở thành nền trải nghiệm. Ý tưởng Noel là người tặng giấu quà vào một cuộc săn kho báu. Setup được bàn theo ba nhóm quà chính, mood và mồi nhử. Dài hạn, nhánh chọn quà có thể kết nối voucher, đặt vé, đặt chỗ và điện hoa. Xem [checkpoint đầu tiên](archive/01-checkpoint-v1.md) và [spec Matrix](archive/binary-matrix-spec.md).
2. **Tách 1A và 1B.** Người có quà làm hunt ngay. Người chưa biết mua gì mời chính người nhận chọn hướng quà trong Matrix, tự mua rồi quay lại 1A. Bản đầu của 1B là scene tĩnh tám vật thể. Xem [checkpoint v2](archive/02-checkpoint-v2.md).
3. **GuBot ra đời.** Ý tưởng mời qua Zalo với câu kiểu “anh mới dùng AI làm cái app…” dẫn đến GuBot đoán gu ngớ ngẩn, đồ thật lẫn đồ troll, màn xé Matrix và phản ứng bẹp/chìm. Bản tinh chỉnh thêm Report v0, consent rõ ràng, Spike A và fallback tĩnh. Xem [spec đầu](archive/03-gubot-v1.md) và [v1.1](archive/04-gubot-v1.1.md).
4. **Hai chiều.** Chủ dự án yêu cầu hỗ trợ nam → nữ và nữ → nam với một engine, vai sender/receiver và catalog cấu hình riêng. Xem [addendum v1.2](archive/05-bidirectional-v1.2.md).
5. **Bàn giao qua GitHub.** Repo giữ spec hiện hành, nguồn lịch sử và trạng thái mỗi commit. Codex phụ trách publish qua Sites.

Các bản archive giữ nội dung nguồn truy xuất được, kể cả đề xuất cũ. Hiện chưa có transcript đầy đủ của buổi brainstorm đầu tiên hay nguyên văn góp ý của Claude. Phần trên là tóm tắt có đối chiếu. Source renderer Gate D đã qua Android UAT chưa được định vị, còn spec Matrix nằm trong archive.
