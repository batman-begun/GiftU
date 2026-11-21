# Source GiftU chạy trên Sites

Từ root, chạy `npm run dev` để thử cả demo lẫn luồng hai link ở [127.0.0.1:4173](http://127.0.0.1:4173). Dùng `PORT=4174 npm run dev` nếu cổng mặc định đang bận. Preview chạy Worker đã build và áp dụng migration vào SQLite trong bộ nhớ. Khởi động lại để nạp sửa đổi và làm mới phòng thử.

`npm run build` ở root hoặc `node build.mjs` trong thư mục này đóng gói `web/` thành `dist/server/`. `worker.mjs` phục vụ cả web shell và API. Môi trường live dùng D1 qua binding `DB`. Xem [quy trình release](../docs/RELEASE.md).
