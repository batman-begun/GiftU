# Tài sản thiết kế GiftU

| Đường dẫn | Nội dung |
| --- | --- |
| [`assets/mockups/`](mockups/) | Bản thiết kế theo tính năng để review, gồm hình, storyboard và mẫu chuyển động. |
| [`assets/samples/`](samples/) | Dữ liệu, file media mẫu và fixture để thử tính năng hoặc demo. |
| [`sites/web/`](../sites/web/) | Tài sản được build và phân phối cùng Sites, như icon PWA, CSS, code Matrix và asset runtime. |

## Index

- [GuBot](mockups/gubot/) — baseline tạo hình kem tan và nét cười bằng số.
- [Asset mẫu](samples/) — index sẽ được bổ sung khi có mẫu đầu tiên.

## Thêm file

1. Nhóm theo tính năng, ví dụ `mockups/gubot/` hoặc `samples/hunt/`. Đặt tên dạng `<tinh-nang>-<mo-ta>-v<so>.<duoi>`.
2. Ghi trong README nhóm tên file, mục đích, nguồn hoặc quyền dùng khi có liên quan, và trạng thái `draft`, `approved` hay `superseded`. Gắn link trực tiếp đến baseline đang dùng. Khi tạo biến thể từ bản đã duyệt, dùng tên phiên bản mới.
3. File thử dùng dữ liệu giả lập. Với video hoặc bộ ảnh lớn, cân nhắc lưu bản xem trước và trỏ đến nguồn có quyền truy cập ổn định, hoặc dùng Git LFS nếu repo đã cấu hình.
4. Khi một asset được sử dụng thật trong app, cập nhật source, build và tài liệu bàn giao cùng lần tích hợp. Hiện build Sites đóng gói các file trực tiếp trong `sites/web/`. Nếu cần thư mục runtime lồng nhau, cập nhật và test build trước khi dùng.
