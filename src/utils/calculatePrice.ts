/**
 * Pure pricing + diện tích cầu thang (React-free, dễ unit test).
 *
 * SPEC (nguồn sự thật cho QA / kinh doanh):
 * - Mặt bậc (bậc thẳng): (dài×rộng mặt bậc) × max(0, số bậc − số chiếu nghỉ)
 * - Chiếu nghỉ: (dài×rộng chiếu) × số chiếu
 * - Cổ bậc: (dài mặt bậc × cao cổ) × số bậc
 * - Đá: tổng diện tích × đơn giá theo loại đá
 * - Len tường: chiều dài (md) × đơn giá/md (Granite / Nung Kết khác nhau)
 * - Chỉ vuông: tổng diện tích × EDGE_BORDER_PER_M2 (khi bật)
 */

export type StoneKind = "granite" | "nungKet";

export const STONE_RATES = {
  granite: {
    label: "Granite",
    shortLabel: "Granite",
    pricePerM2: 1_200_000,
    skirtingPerMd: 150_000,
  },
  nungKet: {
    label: "Nung Kết (Sintered Stone)",
    shortLabel: "Nung Kết",
    pricePerM2: 1_600_000,
    skirtingPerMd: 300_000,
  },
} as const;

export const EDGE_BORDER_PER_M2 = 300_000;

/** Trần an toàn: chống Infinity, NaN và nhập liệu phi thực tế. */
export const CALC_LIMITS = {
  maxSteps: 500,
  maxLandings: 100,
  /** Cạnh kích thước một chiều (m) */
  maxSideMeters: 50,
  /** Tổng diện tích tối đa chấp nhận (m²) */
  maxTotalAreaM2: 25_000,
  /** Chiều dài len tường tối đa (m) */
  maxWallLengthM: 5_000,
} as const;

export type StairCalculatorInputs = {
  steps: number;
  stepLengthM: number;
  stepWidthM: number;
  riserHeightM: number;
  landings: number;
  landingLengthM: number;
  landingWidthM: number;
  wallSkirting: boolean;
  wallLengthM: number;
  edgeBorder: boolean;
};

export type StairQuoteBreakdown = {
  /** Mặt bậc: (dài×rộng)×max(0, số bậc−số chiếu nghỉ) */
  stepSurfaceM2: number;
  /** Cổ bậc: (dài mặt bậc×cao cổ)×số bậc */
  riserM2: number;
  /** Chiếu nghỉ: (dài×rộng chiếu nghỉ)×số chiếu */
  landingM2: number;
  totalAreaM2: number;
  stoneCost: number;
  wallCost: number;
  edgeCost: number;
  total: number;
  /** false nếu số liệu vượt trần hoặc kết quả không hữu hạn */
  trustedEstimate: boolean;
};

function clampNonNegative(n: number): number {
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function clampUpper(n: number, max: number): number {
  return Math.min(n, max);
}

const EMPTY_TRUSTED_QUOTE: StairQuoteBreakdown = {
  stepSurfaceM2: 0,
  riserM2: 0,
  landingM2: 0,
  totalAreaM2: 0,
  stoneCost: 0,
  wallCost: 0,
  edgeCost: 0,
  total: 0,
  trustedEstimate: false,
};

function allFinite(...values: number[]): boolean {
  return values.every((v) => Number.isFinite(v));
}

export function sanitizeStairInputs(
  raw: StairCalculatorInputs,
): StairCalculatorInputs {
  const { maxSteps, maxLandings, maxSideMeters, maxWallLengthM } = CALC_LIMITS;

  return {
    steps: Math.floor(
      clampUpper(clampNonNegative(raw.steps), maxSteps),
    ),
    stepLengthM: clampUpper(
      clampNonNegative(raw.stepLengthM),
      maxSideMeters,
    ),
    stepWidthM: clampUpper(clampNonNegative(raw.stepWidthM), maxSideMeters),
    riserHeightM: clampUpper(
      clampNonNegative(raw.riserHeightM),
      maxSideMeters,
    ),
    landings: Math.floor(
      clampUpper(clampNonNegative(raw.landings), maxLandings),
    ),
    landingLengthM: clampUpper(
      clampNonNegative(raw.landingLengthM),
      maxSideMeters,
    ),
    landingWidthM: clampUpper(
      clampNonNegative(raw.landingWidthM),
      maxSideMeters,
    ),
    wallSkirting: raw.wallSkirting,
    wallLengthM: clampUpper(
      clampNonNegative(raw.wallLengthM),
      maxWallLengthM,
    ),
    edgeBorder: raw.edgeBorder,
  };
}

/**
 * Tổng diện tích =
 *   (dài×rộng mặt bậc)×max(0, số bậc−số chiếu)
 * + (dài×rộng chiếu)×số chiếu
 * + (dài mặt bậc×cao cổ)×số bậc
 */
export function calculateStairPrice(
  stone: StoneKind,
  input: StairCalculatorInputs,
): StairQuoteBreakdown {
  const rates = STONE_RATES[stone];
  const i = sanitizeStairInputs(input);

  const treadUnitM2 = i.stepLengthM * i.stepWidthM;
  const treadCount = Math.max(0, i.steps - i.landings);
  const stepSurfaceM2 = treadCount * treadUnitM2;

  const landingM2 = i.landings * i.landingLengthM * i.landingWidthM;

  const riserUnitM2 = i.stepLengthM * i.riserHeightM;
  const riserM2 = i.steps * riserUnitM2;

  const totalAreaM2 = stepSurfaceM2 + riserM2 + landingM2;

  if (
    !allFinite(stepSurfaceM2, riserM2, landingM2, totalAreaM2) ||
    totalAreaM2 < 0 ||
    totalAreaM2 > CALC_LIMITS.maxTotalAreaM2
  ) {
    return { ...EMPTY_TRUSTED_QUOTE };
  }

  const stoneCost = totalAreaM2 * rates.pricePerM2;
  const wallCost = i.wallSkirting ? i.wallLengthM * rates.skirtingPerMd : 0;
  const edgeCost = i.edgeBorder ? totalAreaM2 * EDGE_BORDER_PER_M2 : 0;
  const total = stoneCost + wallCost + edgeCost;

  if (!allFinite(stoneCost, wallCost, edgeCost, total)) {
    return { ...EMPTY_TRUSTED_QUOTE };
  }

  return {
    stepSurfaceM2,
    riserM2,
    landingM2,
    totalAreaM2,
    stoneCost,
    wallCost,
    edgeCost,
    total,
    trustedEstimate: true,
  };
}

/** @deprecated Dùng calculateStairPrice */
export const computeStairQuote = calculateStairPrice;

const EM_DASH = "—";

export function formatVndInteger(amount: number): string {
  if (!Number.isFinite(amount)) return EM_DASH;
  return Math.round(amount).toLocaleString("en-US");
}

export function formatM2(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value)) return EM_DASH;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
