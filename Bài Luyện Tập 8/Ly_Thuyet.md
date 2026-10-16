# Bài luyện tập 8 — A. Câu hỏi ôn tập lý thuyết

## 1. Default export và named export

`default export` xuất một giá trị chính của module; mỗi file chỉ có tối đa một default export. Khi import, có thể đặt tên tùy ý và không dùng dấu ngoặc nhọn.

```js
// ProductCard.js
export default function ProductCard() { /* ... */ }
// App.js
import ProductCard from './components/ProductCard';
```

`named export` xuất các giá trị có tên; một file có thể có nhiều named export. Khi import phải dùng đúng tên trong dấu ngoặc nhọn hoặc đổi tên bằng `as`.

```js
export const products = [];
export const currency = 'VND';
// File sử dụng:
import { products, currency as productCurrency } from './data';
```

Khi file chỉ chứa một component chính, có thể chọn **default export** để thể hiện vai trò chính và import gọn, chẳng hạn `ProductCard.js`. Đây là lựa chọn quy ước, không phải yêu cầu bắt buộc; named export vẫn phù hợp nếu nhóm muốn thống nhất tên import.

## 2. Props và tính read-only

Props là các dữ liệu component cha truyền xuống component con dưới dạng thuộc tính JSX. Ví dụ `<ProductCard name="Bàn phím cơ" price={890000} />`: cha sở hữu dữ liệu, con nhận `name`, `price` để hiển thị. Luồng dữ liệu một chiều giúp xác định nơi dữ liệu được tạo và cập nhật.

Component con phải coi props là **chỉ đọc**, bao gồm cả object hoặc array nhận qua props. Gán lại props hoặc sửa thuộc tính của object không phải cách cập nhật dữ liệu hợp lệ trong React. Tùy chế độ chạy, thao tác có thể bị chặn/báo lỗi; nếu mutation vẫn xảy ra, React không được thông báo như khi gọi setter state, khiến giao diện không cập nhật đúng và các component dùng chung dữ liệu có thể bị ảnh hưởng. Component con nên gọi callback do cha truyền xuống; cha cập nhật state bằng setter và truyền props mới xuống con.

## 3. Vì sao cần tách component nhỏ?

- **Tái sử dụng:** `Button`, `InputField`, `ProductCard` dùng ở nhiều màn hình với props khác nhau, tránh sao chép JSX.
- **Bảo trì:** sửa giao diện hoặc hành vi chung tại một nơi; ví dụ đổi cách hiển thị giá trong `ProductCard` sẽ áp dụng cho mọi thẻ.
- **Mở rộng:** ghép `Header`, các `InputField` và `Button` thành form; thêm tính năng bằng props hoặc component mới.
- **Dễ đọc và kiểm tra:** mỗi component có trách nhiệm rõ ràng, giúp khoanh vùng lỗi.

Nên tách theo trách nhiệm hoặc khả năng tái sử dụng, tránh chia vụn mọi thẻ JSX. Tách component không tự động bảo đảm hiệu năng tốt hơn; component con vẫn có thể render lại cùng cha.

## 4. Quan hệ giữa props, state và hooks trong form

**State** lưu dữ liệu có thể thay đổi theo tương tác. **Props** truyền dữ liệu và callback giữa các component. **Hooks** như `useState` cho function component sử dụng state, và `useEffect` đồng bộ với hệ thống bên ngoài khi cần.

Với form đăng ký, component cha `RegisterForm` có thể quản lý `name`, `email`, `password`, lỗi validation và trạng thái gửi bằng state. Mỗi `InputField` nhận `label`, `value`, `onChangeText`, `error`, `secureTextEntry` qua props. Như vậy một giá trị là state ở cha, đồng thời là prop ở con; hai khái niệm không loại trừ nhau.

```jsx
const [email, setEmail] = useState('');
<InputField label="Email" value={email} onChangeText={setEmail} />
```

Luồng cập nhật: người dùng gõ → con gọi callback `onChangeText` → setter cập nhật state ở cha → cha render lại → con nhận `value` mới. Không cần `useEffect` chỉ để lưu nội dung gõ hoặc validation lúc nhấn nút; có thể xử lý ngay trong sự kiện.

## 5. Controlled component với TextInput và validation

`TextInput` là controlled component khi giá trị hiển thị được điều khiển bởi state thông qua `value`, còn `onChangeText` cập nhật state:

```jsx
const [email, setEmail] = useState('');
<TextInput value={email} onChangeText={setEmail}
  keyboardType="email-address" autoCapitalize="none" />
```

State cung cấp dữ liệu nhất quán để hiển thị, kiểm tra, xóa form và xử lý khi gửi. Ví dụ validation khi submit:

```js
const errors = {};
if (!name.trim()) errors.name = 'Vui lòng nhập họ tên';
if (!email.trim()) errors.email = 'Vui lòng nhập email';
else if (!email.trim().includes('@')) errors.email = 'Email phải có ký tự @';
if (!password) errors.password = 'Vui lòng nhập mật khẩu';
else if (password.length < 6) errors.password = 'Mật khẩu cần ít nhất 6 ký tự';
```

Chỉ cho phép gửi khi không có lỗi; hiển thị lỗi cạnh ô tương ứng giúp người dùng sửa đúng chỗ. Kiểm tra có `@` là tiêu chí đơn giản của bài tập, chưa đủ xác nhận địa chỉ email tồn tại. Không tự động `trim()` mật khẩu vì khoảng trắng có thể là ký tự người dùng chủ ý nhập. Trong ứng dụng thực tế, phía máy chủ cũng phải kiểm tra dữ liệu.
