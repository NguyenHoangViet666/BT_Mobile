# Bài luyện tập 8 — Props, tách component và Product List

- [Lời giải 5 câu lý thuyết](./Ly_Thuyet.md)
- [Bài thực hành, giải thích và ảnh chạy thử](./Thuc_Hanh.md)
- [Ứng dụng chính](./App.js)

## Chạy ứng dụng

Yêu cầu Node.js 20.19.4 trở lên và npm. Đây là project Expo độc lập, chạy được trên React Native và web.

```powershell
cd "Bài Luyện Tập 8"
npm ci
npm start
```

Quét mã QR bằng Expo Go có hỗ trợ SDK 54, hoặc dùng emulator tương thích. Nếu Expo Go trên điện thoại không hỗ trợ SDK của project, dùng bản Expo Go phù hợp cho Android hoặc development build. Chạy web để xem nhanh:

```powershell
npm run web
```

- Tab **Bài dễ · ProductCard**: ba sản phẩm với ba bộ props khác nhau.
- Tab **Product List**: 10 sản phẩm dùng `FlatList`; bấm một sản phẩm để mở Detail.
- Bấm **Quay lại danh sách** hoặc nút Back Android để trở về.

Ứng dụng chuyển màn bằng state và truyền trực tiếp props, đúng lựa chọn “props/params” trong đề; không cần thư viện điều hướng. Dữ liệu và giá chỉ là mock phục vụ bài tập.

## Cấu trúc

```text
App.js
app.json
components/ProductCard.js
screens/ProductListScreen.js
screens/ProductDetailScreen.js
data/products.js
utils/formatPrice.js
Ly_Thuyet.md
Thuc_Hanh.md
Ảnh/
```

## Nộp bài

Đẩy mã nguồn lên GitHub, nộp link repository kèm ảnh List và Detail trong thư mục `Ảnh/`. Nếu hệ thống yêu cầu một file duy nhất, gộp phần lý thuyết, thực hành, link repo và hai ảnh vào PDF rồi nộp; sau đó nhấn Done trên hệ thống học tập.

## Kiểm tra và chụp lại ảnh

```powershell
npx playwright install chromium
npm run test:e2e
npm run export:web
```

Bài kiểm tra mở lần lượt cả 10 sản phẩm, đối chiếu mã/tên/giá ở Detail, quay lại danh sách và kiểm tra ba thẻ của bài dễ. Ba ảnh trong `Ảnh/` được tạo lại khi chạy kiểm tra. Nếu đã có Microsoft Edge trên Windows, có thể dùng `$env:PLAYWRIGHT_CHANNEL = "msedge"` trước khi chạy để sử dụng trình duyệt đó.
