# HÍ BLACK SHOP — iOS SOURCE

Đây là bộ source Capacitor để đóng gói website Hí Black thành app iOS.

## Cần có
- Máy Mac
- Node.js
- Xcode
- Apple ID (để test trên iPhone)
- Apple Developer Program nếu muốn phân phối rộng rãi/App Store

## Build lần đầu

Mở Terminal tại thư mục này:

1. Cài thư viện:
   npm install

2. Tạo project iOS:
   npx cap add ios

3. Đồng bộ web:
   npx cap sync ios

4. Mở Xcode:
   npx cap open ios

Trong Xcode:
- Chọn target `App`
- Đặt Bundle Identifier: `com.hiblack.shop` (hoặc ID riêng của bạn)
- Vào Signing & Capabilities
- Chọn Team / Apple ID
- Chọn iPhone của bạn để test
- Product > Archive để tạo bản phân phối

## Tạo IPA
Sau khi Archive:
Xcode > Window > Organizer > Archives > chọn bản build > Distribute App.

## Lưu ý
- Bộ source này chưa chứa chứng chỉ Apple, provisioning profile hay file IPA; các phần đó phải được ký bằng tài khoản Apple của người build.
- API key/token bí mật KHÔNG được đặt trong `www/app.js`. Khi nối API thật, nên đưa secret vào backend/server.
- Website hiện tại là bản demo localStorage; database, thanh toán và API thật cần nối thêm.

App ID mặc định: com.hiblack.shop
Tên app: Hí Black
