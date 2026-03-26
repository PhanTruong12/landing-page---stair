export type StaircaseDesign = {
  /** Tên loại đá / phong cách — hiển thị nổi bật trên card */
  stoneName: string;
  title: string;
  /** Đặc tính nổi bật (bullet) */
  features: readonly string[];
  benefit: string;
  imageUrl: string;
  alt: string;
};

// Ảnh: đặt file trong public/images/showcase/ — 01.jpg … 08.jpg (hoặc đổi đuôi trong code).
const showcase = (n: string) => `/images/showcase/${n}.jpg`;

export const STAIRCASE_DESIGNS: StaircaseDesign[] = [
  {
    stoneName: "Đá nung kết xám vân tự nhiên",
    title: "Nung kết xám vân bắt mắt",
    features: ["Chống trầy xước cao", "Bề mặt đồng nhất"],
    benefit: "Phù hợp gia đình đông người, dễ vệ sinh hàng ngày.",
    imageUrl: showcase("01"),
    alt: "Mẫu cầu thang đá đẹp — đá nung kết xám thi công tại Đà Nẵng",
  },
  {
    stoneName: "Đá nung kết xám xanh",
    title: "Vân mây loang mạnh",
    features: ["Vân mây đối xứng", "Chống thấm bề mặt"],
    benefit: "Tạo điểm nhấn sang trọng cho phòng khách thông tầng.",
    imageUrl: showcase("02"),
    alt: "Mẫu cầu thang đá đẹp vân mây đá nung kết ốp cầu thang",
  },
  {
    stoneName: "Đá nung kết họa tiết",
    title: "Điểm nhấn ánh sáng",
    features: ["Chi tiết sắc nét", "Bền màu lâu dài"],
    benefit: "Kết hợp đèn LED và lan can kính hiện đại.",
    imageUrl: showcase("03"),
    alt: "Cầu thang đá nung kết cao cấp với chiếu sáng",
  },
  {
    stoneName: "Đá nung kết tối giản",
    title: "Phong cách tối giản cao cấp",
    features: ["Ít đường vân", "Dễ phối nội thất"],
    benefit: "Tông trung tính — dễ phối sàn gỗ và tường sơn.",
    imageUrl: showcase("04"),
    alt: "Thi công đá cầu thang phong cách tối giản",
  },
  {
    stoneName: "Đá nung kết thực tế",
    title: "Hoàn thiện chuẩn kỹ thuật",
    features: ["Khớp nối chuẩn", "Đường ron tinh tế"],
    benefit: "Báo giá thi công đá cầu thang rõ ràng theo bản vẽ.",
    imageUrl: showcase("05"),
    alt: "Công trình đá nung kết ốp cầu thang tại công trình",
  },
  {
    stoneName: "Đá nung kết vân gỗ cổ trắng",
    title: "Vân gỗ cổ trắng",
    features: ["Vân gỗ tự nhiên", "Tăng độ sang nhà phố"],
    benefit: "Cân bằng giữa ấm áp và độ bền đá kỹ thuật.",
    imageUrl: showcase("06"),
    alt: "Mẫu cầu thang đá đẹp vân gỗ đá nung kết",
  },
  {
    stoneName: "Đá nung kết đen xám",
    title: "Tối giản & LED",
    features: ["Chống trầy xước", "Tối ưu không gian"],
    benefit: "Phù hợp penthouse và biệt thự hiện đại.",
    imageUrl: showcase("07"),
    alt: "Cầu thang đá nung kết tối màu với đèn LED",
  },
  {
    stoneName: "Đá nung kết trắng vân mây",
    title: "Trắng vân mây bóng nhẹ",
    features: ["Vân mây đối xứng", "Bề mặt bóng nhẹ sang trọng"],
    benefit: "Tùy biến kích thước theo bản vẽ — báo giá minh bạch.",
    imageUrl: showcase("08"),
    alt: "Đá nung kết trắng vân mây ốp cầu thang cao cấp",
  },
];

/** Đổi thành `showcase("hero")` khi đã thêm /images/showcase/hero.jpg */
export const HERO_IMAGE_URL = showcase("01");
