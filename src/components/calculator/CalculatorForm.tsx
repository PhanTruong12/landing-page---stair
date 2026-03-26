import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { DURATION, EASE_OUT, TRUST_STAGGER } from "../motion/transition";
import {
  CALC_LIMITS,
  EDGE_BORDER_PER_M2,
  STONE_RATES,
  formatVndInteger,
  type StoneKind,
} from "../../utils/calculatePrice";
import type { CalculatorDraft } from "../../utils/calculatorDraft";
import { STONE_OPTIONS } from "./calculatorConstants";
import { DraftDecimalInput, DraftIntInput } from "./DraftInputs";
import { OptionToggle } from "./OptionToggle";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function stepsFromDraft(s: string): number {
  const n = parseInt(s, 10);
  if (!Number.isFinite(n)) return 18;
  return clamp(Math.floor(n), 1, CALC_LIMITS.maxSteps);
}

function metersFromDraft(s: string, fallback: number): number {
  const n = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(n)) return fallback;
  return clamp(n, 0.2, CALC_LIMITS.maxSideMeters);
}

const FORM_TRUST = [
  "Báo giá nhanh",
  "Không phát sinh chi phí",
  "Đo đạc miễn phí",
] as const;

export type CalculatorFormProps = {
  stone: StoneKind;
  draft: CalculatorDraft;
  nungKetLocked: boolean;
  hints: string[];
  onStoneChange: (stone: StoneKind) => void;
  onPatchDraft: (partial: Partial<CalculatorDraft>) => void;
  onReset: () => void;
};

function CalculatorFormInner({
  stone,
  draft,
  nungKetLocked,
  hints,
  onStoneChange,
  onPatchDraft,
  onReset,
}: CalculatorFormProps) {
  const skirtingRate = STONE_RATES[stone].skirtingPerMd;
  const reduce = useReducedMotion();

  const trustParent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : TRUST_STAGGER,
      },
    },
  };

  const trustChild = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.25, ease: EASE_OUT },
    },
  };

  return (
    <div className="lg:col-span-7">
      <motion.div
        className="rounded-card border border-charcoal/12 bg-marble-card/45 p-6 shadow-soft ring-1 ring-charcoal/[0.03] sm:p-8"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
      >
        <div className="flex flex-col gap-3 border-b border-charcoal/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-charcoal">Loại đá</p>
          <Button
            type="button"
            variant="secondary"
            className="shrink-0 rounded-card px-4 py-2 text-xs sm:text-sm"
            onClick={onReset}
          >
            Làm mới số liệu
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STONE_OPTIONS.map((opt) => {
            const active = stone === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onStoneChange(opt.id)}
                aria-pressed={active}
                className={`rounded-card border px-4 py-4 text-left transition duration-200 ${
                  active
                    ? "border-charcoal/35 bg-marble-card/75 shadow-sm ring-1 ring-charcoal/10"
                    : "border-charcoal/15 bg-marble-card/45 hover:border-charcoal/25 hover:bg-marble-card/55 hover:shadow-sm"
                }`}
              >
                <div
                  className={`text-sm font-semibold ${
                    active ? "text-charcoal" : "text-charcoal"
                  }`}
                >
                  {opt.title}
                </div>
                <div className="mt-1 text-xs text-text-secondary">{opt.priceLine}</div>
              </button>
            );
          })}
        </div>

        {nungKetLocked ? (
          <p
            className="mt-4 rounded-xl border border-amber-200/90 bg-amber-50/90 px-3 py-2.5 text-xs leading-relaxed text-amber-950"
            role="status"
          >
            Với <strong>Nung Kết</strong>, hạng mục{" "}
            <strong>len tường</strong> và <strong>chỉ vuông</strong> được áp dụng
            mặc định theo quy trình thi công.
          </p>
        ) : null}

        {hints.length > 0 ? (
          <ul
            className="mt-4 list-inside list-disc space-y-1 rounded-xl border border-sky-200/80 bg-sky-50/80 px-3 py-2.5 text-xs leading-relaxed text-sky-950"
            role="status"
          >
            {hints.map((h, i) => (
              <li key={`${i}-${h.slice(0, 48)}`}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 space-y-10">
          <section aria-labelledby="calc-heading-treads">
            <h3
              id="calc-heading-treads"
              className="text-base font-semibold text-charcoal"
            >
              Thông tin bậc thang
            </h3>
            <div className="mt-5 rounded-card border border-charcoal/12 bg-marble-muted/60 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-soft">
                Thanh trượt — chỉnh nhanh
              </p>
              <div className="mt-4 space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Số bậc</span>
                    <span className="tabular-nums font-medium text-charcoal">
                      {stepsFromDraft(draft.steps)} bậc
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={Math.min(50, CALC_LIMITS.maxSteps)}
                    value={stepsFromDraft(draft.steps)}
                    onChange={(e) => onPatchDraft({ steps: e.target.value })}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-charcoal/10 accent-gold"
                    aria-label="Chỉnh số bậc"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Chiều dài mặt bậc (m)</span>
                    <span className="tabular-nums font-medium text-charcoal">
                      {metersFromDraft(draft.stepLengthM, 0.95).toFixed(2)} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.05}
                    value={metersFromDraft(draft.stepLengthM, 0.95)}
                    onChange={(e) =>
                      onPatchDraft({
                        stepLengthM: String(parseFloat(e.target.value)),
                      })
                    }
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-charcoal/10 accent-gold"
                    aria-label="Chỉnh chiều dài mặt bậc"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Chiều rộng mặt bậc (m)</span>
                    <span className="tabular-nums font-medium text-charcoal">
                      {metersFromDraft(draft.stepWidthM, 1.05).toFixed(2)} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.05}
                    value={metersFromDraft(draft.stepWidthM, 1.05)}
                    onChange={(e) =>
                      onPatchDraft({
                        stepWidthM: String(parseFloat(e.target.value)),
                      })
                    }
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-charcoal/10 accent-gold"
                    aria-label="Chỉnh chiều rộng mặt bậc"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <DraftIntInput
                id="calc-steps"
                label="Số bậc"
                value={draft.steps}
                onChange={(v) => onPatchDraft({ steps: v })}
                placeholder="18"
                hint="Ví dụ: 18 bậc cho cầu thang nhà ống 3 tầng"
              />
              <DraftDecimalInput
                id="calc-step-len"
                label="Chiều dài mặt bậc"
                value={draft.stepLengthM}
                onChange={(v) => onPatchDraft({ stepLengthM: v })}
                suffix="m"
                placeholder="0.95"
                hint="Thường trong khoảng 0,9–1,2 m"
              />
              <DraftDecimalInput
                id="calc-step-w"
                label="Chiều rộng mặt bậc"
                value={draft.stepWidthM}
                onChange={(v) => onPatchDraft({ stepWidthM: v })}
                suffix="m"
                placeholder="1.05"
                hint="Phụ thuộc độ rộng hộp thang"
              />
              <DraftDecimalInput
                id="calc-riser"
                label="Chiều cao cổ bậc (riser)"
                value={draft.riserHeightM}
                onChange={(v) => onPatchDraft({ riserHeightM: v })}
                suffix="m"
                placeholder="0.175"
                hint="Thường khoảng 0,17–0,19 m"
              />
            </div>
          </section>

          <section aria-labelledby="calc-heading-landings">
            <h3
              id="calc-heading-landings"
              className="text-base font-semibold text-charcoal"
            >
              Chiếu nghỉ
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <DraftIntInput
                id="calc-landings-count"
                label="Số chiếu nghỉ"
                value={draft.landings}
                onChange={(v) => onPatchDraft({ landings: v })}
                placeholder="1"
                hint="Nhập 0 nếu cầu thang không có chiếu nghỉ"
              />
              <DraftDecimalInput
                id="calc-landing-l"
                label="Chiều dài chiếu nghỉ"
                value={draft.landingLengthM}
                onChange={(v) => onPatchDraft({ landingLengthM: v })}
                suffix="m"
                placeholder="1.2"
                hint="Theo kích thước từng chiếu trên bản vẽ"
              />
              <DraftDecimalInput
                id="calc-landing-w"
                label="Chiều rộng chiếu nghỉ"
                value={draft.landingWidthM}
                onChange={(v) => onPatchDraft({ landingWidthM: v })}
                suffix="m"
                placeholder="1.05"
                hint="Thường bằng hoặc lớn hơn bề rộng mặt bậc"
              />
            </div>
          </section>

          <section
            aria-labelledby="calc-heading-options"
            className="rounded-card border border-charcoal/10 bg-marble-card/45 p-5 sm:p-6"
          >
            <h3
              id="calc-heading-options"
              className="text-base font-semibold text-charcoal"
            >
              Tùy chọn thi công
            </h3>
            <div className="mt-5 space-y-5">
              <OptionToggle
                inputId="calc-opt-wall"
                checked={draft.wallSkirting}
                disabled={nungKetLocked}
                onCheckedChange={(wallSkirting) => onPatchDraft({ wallSkirting })}
                title={
                  <>
                    Len tường (wall skirting)
                    {nungKetLocked ? (
                      <span className="ml-2 text-xs font-normal text-amber-800">
                        (bắt buộc)
                      </span>
                    ) : null}
                  </>
                }
                meta={<>{formatVndInteger(skirtingRate)} đ/md</>}
              />

              {draft.wallSkirting ? (
                <div className="border-l-2 border-gold/30 pl-4 sm:max-w-xs">
                  <DraftDecimalInput
                    id="calc-wall-len"
                    label="Chiều dài len tường"
                    value={draft.wallLengthM}
                    onChange={(v) => onPatchDraft({ wallLengthM: v })}
                    suffix="m"
                    placeholder="8.5"
                    hint="Tổng chiều dài cạnh chạy len (ước lượng)"
                  />
                </div>
              ) : null}

              <OptionToggle
                inputId="calc-opt-edge"
                checked={draft.edgeBorder}
                disabled={nungKetLocked}
                onCheckedChange={(edgeBorder) => onPatchDraft({ edgeBorder })}
                title={
                  <>
                    Chỉ vuông (edge border)
                    {nungKetLocked ? (
                      <span className="ml-2 text-xs font-normal text-amber-800">
                        (bắt buộc)
                      </span>
                    ) : null}
                  </>
                }
                meta={
                  <>
                    {formatVndInteger(EDGE_BORDER_PER_M2)} đ/m² trên tổng diện
                    tích
                  </>
                }
              />
            </div>
          </section>
        </div>

        <motion.ul
          variants={trustParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex flex-col gap-2.5 border-t border-charcoal/10 pt-6 text-sm text-charcoal-soft"
        >
          {FORM_TRUST.map((label) => (
            <motion.li
              key={label}
              variants={trustChild}
              className="flex items-start gap-2"
            >
              <span className="mt-0.5 shrink-0 text-accent-emerald" aria-hidden>
                ✓
              </span>
              <span>{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

export const CalculatorForm = memo(CalculatorFormInner);
