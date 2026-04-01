import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { DURATION, EASE_OUT } from "../motion/transition";
import {
  EDGE_BORDER_PER_M2,
  STONE_RATES,
  formatVndInteger,
  type StoneKind,
} from "../../utils/calculatePrice";
import type { CalculatorDraft } from "../../utils/calculatorDraft";
import { STONE_OPTIONS } from "./calculatorConstants";
import { DraftDecimalInput, DraftIntInput } from "./DraftInputs";
import { OptionToggle } from "./OptionToggle";

export type CalculatorFormProps = {
  stone: StoneKind;
  draft: CalculatorDraft;
  nungKetLocked: boolean;
  hints: string[];
  onStoneChange: (stone: StoneKind) => void;
  onPatchDraft: (partial: Partial<CalculatorDraft>) => void;
  onReset: () => void;
  /** Chế độ tối giản: gom chiếu nghỉ & tùy chọn vào mục mở rộng */
  compact?: boolean;
};

function CalculatorFormInner({
  stone,
  draft,
  nungKetLocked,
  hints,
  onStoneChange,
  onPatchDraft,
  onReset,
  compact = false,
}: CalculatorFormProps) {
  const skirtingRate = STONE_RATES[stone].skirtingPerMd;
  const reduce = useReducedMotion();

  const advanced = (
    <>
      <section
        className="calc-subsection"
        aria-labelledby="calc-heading-landings"
      >
        <h3 id="calc-heading-landings">Chiếu nghỉ (nếu có)</h3>
        <div className="calc-fields calc-fields--cols">
          <DraftIntInput
            id="calc-landings-count"
            label="Số chiếu"
            value={draft.landings}
            onChange={(v) => onPatchDraft({ landings: v })}
            placeholder="1"
            hint="0 nếu không có"
          />
          <DraftDecimalInput
            id="calc-landing-l"
            label="Dài chiếu"
            value={draft.landingLengthM}
            onChange={(v) => onPatchDraft({ landingLengthM: v })}
            suffix="m"
            placeholder="1.2"
            hint="Theo bản vẽ"
          />
          <DraftDecimalInput
            id="calc-landing-w"
            label="Rộng chiếu"
            value={draft.landingWidthM}
            onChange={(v) => onPatchDraft({ landingWidthM: v })}
            suffix="m"
            placeholder="1.05"
            hint="Thường ≥ rộng mặt bậc"
          />
        </div>
      </section>

      <section
        className="calc-subsection"
        aria-labelledby="calc-heading-options"
      >
        <h3 id="calc-heading-options">Thêm vào dự toán</h3>
        <div className="calc-options-stack">
          <OptionToggle
            inputId="calc-opt-wall"
            checked={draft.wallSkirting}
            disabled={nungKetLocked}
            onCheckedChange={(wallSkirting) => onPatchDraft({ wallSkirting })}
            title={
              <>
                Len tường (wall skirting)
                {nungKetLocked ? <span> (bắt buộc)</span> : null}
              </>
            }
            meta={<>{formatVndInteger(skirtingRate)} đ/md</>}
          />

          {draft.wallSkirting ? (
            <DraftDecimalInput
              id="calc-wall-len"
              label="Chiều dài len tường"
              value={draft.wallLengthM}
              onChange={(v) => onPatchDraft({ wallLengthM: v })}
              suffix="m"
              placeholder="8.5"
              hint="Tổng chiều dài cạnh chạy len (ước lượng)"
            />
          ) : null}

          <OptionToggle
            inputId="calc-opt-edge"
            checked={draft.edgeBorder}
            disabled={nungKetLocked}
            onCheckedChange={(edgeBorder) => onPatchDraft({ edgeBorder })}
            title={
              <>
                Chỉ vuông (edge border)
                {nungKetLocked ? <span> (bắt buộc)</span> : null}
              </>
            }
            meta={
              <>
                {formatVndInteger(EDGE_BORDER_PER_M2)} đ/m² trên tổng diện tích
              </>
            }
          />
        </div>
      </section>
    </>
  );

  return (
    <div className={compact ? "calc-form calc-form--compact" : "calc-form"}>
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
      >
        <div className="calc-form__toolbar">
          <p>Loại đá</p>
          <Button type="button" variant="secondary" onClick={onReset}>
            {compact ? "Xóa số" : "Làm mới số liệu"}
          </Button>
        </div>

        <div className="stone-picker">
          {STONE_OPTIONS.map((opt) => {
            const active = stone === opt.id;
            return (
              <button
                key={opt.id}
                className="stone-picker__btn"
                type="button"
                onClick={() => onStoneChange(opt.id)}
                aria-pressed={active}
              >
                <span className="stone-picker__btn-title">{opt.title}</span>
                <span className="stone-picker__btn-meta">{opt.priceLine}</span>
              </button>
            );
          })}
        </div>

        {nungKetLocked ? (
          <p className="calc-form__note" role="status">
            Với <strong>Nung Kết</strong>, hạng mục <strong>len tường</strong> và{" "}
            <strong>chỉ vuông</strong> được áp dụng mặc định theo quy trình thi
            công.
          </p>
        ) : null}

        {hints.length > 0 ? (
          <ul
            className={
              compact
                ? "calc-form__hints calc-form__hints--compact"
                : "calc-form__hints"
            }
            role="status"
          >
            {hints.map((h, i) => (
              <li key={`${i}-${h.slice(0, 48)}`}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div>
          <section className="calc-subsection" aria-labelledby="calc-heading-treads">
            <h3 id="calc-heading-treads">Bậc thang</h3>
            <div className="calc-fields calc-fields--cols">
              <DraftIntInput
                id="calc-steps"
                label="Số bậc"
                value={draft.steps}
                onChange={(v) => onPatchDraft({ steps: v })}
                placeholder="18"
                hint="Ví dụ: 18"
              />
              <DraftDecimalInput
                id="calc-step-len"
                label="Dài mặt bậc"
                value={draft.stepLengthM}
                onChange={(v) => onPatchDraft({ stepLengthM: v })}
                suffix="m"
                placeholder="0.95"
                hint="Thường 0,9–1,2 m"
              />
              <DraftDecimalInput
                id="calc-step-w"
                label="Rộng mặt bậc"
                value={draft.stepWidthM}
                onChange={(v) => onPatchDraft({ stepWidthM: v })}
                suffix="m"
                placeholder="1.05"
                hint="Theo hộp thang"
              />
              <DraftDecimalInput
                id="calc-riser"
                label="Cao cổ bậc (riser)"
                value={draft.riserHeightM}
                onChange={(v) => onPatchDraft({ riserHeightM: v })}
                suffix="m"
                placeholder="0.175"
                hint="Thường ~0,17–0,19 m"
              />
            </div>
          </section>

          {compact ? (
            <details className="calc-advanced">
              <summary className="calc-advanced__summary">
                Chiếu nghỉ và tùy chọn len / chỉ (nếu cần)
              </summary>
              <div className="calc-advanced__body">{advanced}</div>
            </details>
          ) : (
            advanced
          )}
        </div>

        <p className="calc-form__footer">
          Ước tính theo số đo bạn nhập — khảo sát thực tế sẽ chính xác hơn.
        </p>
      </motion.div>
    </div>
  );
}

export const CalculatorForm = memo(CalculatorFormInner);
