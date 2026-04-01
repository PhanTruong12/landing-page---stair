import {
  STONE_RATES,
  formatVndInteger,
  type StoneKind,
} from "../../utils/calculatePrice";

export const STONE_OPTIONS: readonly {
  id: StoneKind;
  title: string;
  priceLine: string;
}[] = [
  {
    id: "granite",
    title: STONE_RATES.granite.label,
    priceLine: `${formatVndInteger(STONE_RATES.granite.pricePerM2)} đ/m²`,
  },
  {
    id: "nungKet",
    title: STONE_RATES.nungKet.label,
    priceLine: `${formatVndInteger(STONE_RATES.nungKet.pricePerM2)} đ/m²`,
  },
];

/** Một dòng — dùng khi cần chuỗi đơn (export, meta). */
export const FORMULA_NOTE =
  "Tổng diện tích = (dài×rộng mặt bậc)×(số bậc−số chiếu nghỉ) + (dài×rộng chiếu nghỉ)×số chiếu + (dài mặt bậc×cao cổ)×số bậc. Nếu số chiếu nghỉ ≥ số bậc, phần mặt bậc = 0.";

/** Hiển thị dạng gạch đầu dòng — dễ đọc hơn một khối văn dài. */
export const FORMULA_NOTE_LINES: readonly string[] = [
  "Mặt bậc: (dài × rộng) × (số bậc − số chiếu nghỉ).",
  "Chiếu nghỉ: (dài × rộng chiếu) × số chiếu.",
  "Cổ bậc: (dài mặt bậc × cao cổ) × số bậc.",
  "Nếu số chiếu nghỉ ≥ số bậc → phần mặt bậc = 0.",
];
