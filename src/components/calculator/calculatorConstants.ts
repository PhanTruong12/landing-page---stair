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

export const FORMULA_NOTE =
  "Tổng diện tích = (dài×rộng mặt bậc)×(số bậc−số chiếu nghỉ) + (dài×rộng chiếu nghỉ)×số chiếu + (dài mặt bậc×cao cổ)×số bậc. Nếu số chiếu nghỉ ≥ số bậc, phần mặt bậc = 0.";
