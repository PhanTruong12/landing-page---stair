import type { StairCalculatorInputs } from "./calculatePrice";

export type CalculatorDraft = {
  steps: string;
  stepLengthM: string;
  stepWidthM: string;
  riserHeightM: string;
  landings: string;
  landingLengthM: string;
  landingWidthM: string;
  wallLengthM: string;
  wallSkirting: boolean;
  edgeBorder: boolean;
};

/** Ô trống; placeholder «0»; khi parse, rỗng → 0. */
export const EMPTY_DRAFT: CalculatorDraft = {
  steps: "",
  stepLengthM: "",
  stepWidthM: "",
  riserHeightM: "",
  landings: "",
  landingLengthM: "",
  landingWidthM: "",
  wallLengthM: "",
  wallSkirting: false,
  edgeBorder: false,
};

export function sanitizeIntDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function sanitizeDecimalRaw(raw: string): string {
  let t = raw.replace(/,/g, ".");
  t = t.replace(/[^\d.]/g, "");
  const dot = t.indexOf(".");
  if (dot === -1) return t;
  return t.slice(0, dot + 1) + t.slice(dot + 1).replace(/\./g, "");
}

export function parseDecimalDraft(s: string): number {
  const t = s.trim();
  if (t === "" || t === ".") return 0;
  const v = parseFloat(t.replace(",", "."));
  return Number.isFinite(v) && v >= 0 ? v : 0;
}

export function draftToInputs(d: CalculatorDraft): StairCalculatorInputs {
  return {
    steps: Math.floor(parseDecimalDraft(d.steps)),
    stepLengthM: parseDecimalDraft(d.stepLengthM),
    stepWidthM: parseDecimalDraft(d.stepWidthM),
    riserHeightM: parseDecimalDraft(d.riserHeightM),
    landings: Math.floor(parseDecimalDraft(d.landings)),
    landingLengthM: parseDecimalDraft(d.landingLengthM),
    landingWidthM: parseDecimalDraft(d.landingWidthM),
    wallSkirting: d.wallSkirting,
    wallLengthM: parseDecimalDraft(d.wallLengthM),
    edgeBorder: d.edgeBorder,
  };
}

/** Gợi ý / cảnh báo nhẹ — không chặn tính toán. */
export function getCalculatorHints(
  draft: CalculatorDraft,
  parsed: StairCalculatorInputs,
): string[] {
  const hints: string[] = [];

  if (parsed.steps > 0 && parsed.landings > parsed.steps) {
    hints.push(
      "Số chiếu nghỉ lớn hơn số bậc — phần diện tích mặt bậc đang được tính bằng 0.",
    );
  }

  if (draft.wallSkirting && parsed.wallLengthM <= 0) {
    hints.push("Len tường đang bật: nhập chiều dài (m) để tính đúng chi phí len.");
  }

  const draftHasText = (
    [
      "steps",
      "stepLengthM",
      "stepWidthM",
      "riserHeightM",
      "landings",
      "landingLengthM",
      "landingWidthM",
      "wallLengthM",
    ] as const
  ).some((k) => draft[k].trim() !== "");

  const hasParsedGeometry =
    parsed.steps > 0 ||
    parsed.landings > 0 ||
    parsed.stepLengthM > 0 ||
    parsed.stepWidthM > 0 ||
    parsed.riserHeightM > 0 ||
    parsed.landingLengthM > 0 ||
    parsed.landingWidthM > 0;

  if (!draftHasText && !hasParsedGeometry) {
    hints.push("Nhập kích thước để xem diện tích và chi phí ước tính.");
  }

  return hints;
}
