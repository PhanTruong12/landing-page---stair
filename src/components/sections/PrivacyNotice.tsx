import { Container } from "../layout/Container";

export function PrivacyNotice() {
  return (
    <section
      id="privacy"
      className="privacy-section"
      aria-labelledby="privacy-heading"
    >
      <Container>
        <h2 id="privacy-heading">Chính sách bảo mật và xử lý dữ liệu</h2>
        <p>
          Khi bạn gửi họ tên, số điện thoại hoặc địa chỉ công trình qua biểu mẫu
          trên trang này, TND Granite chỉ dùng thông tin để liên hệ tư vấn, báo
          giá và phối hợp thi công theo yêu cầu của bạn. Chúng tôi không bán dữ
          liệu cho bên thứ ba. Dữ liệu có thể được lưu trong hệ thống nội bộ hoặc
          bảng tính phục vụ quản lý khách hàng; bạn có thể yêu cầu chỉnh sửa hoặc
          xóa thông tin liên hệ bằng cách nhắn qua Zalo hoặc gọi số hotline trên
          trang.
        </p>
      </Container>
    </section>
  );
}
