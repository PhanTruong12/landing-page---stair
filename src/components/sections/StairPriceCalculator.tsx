import { useCallback, useMemo, useReducer } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { useSectionReveal } from "../motion/useSectionReveal";
import { CalculatorForm } from "../calculator/CalculatorForm";
import { ResultDisplay } from "../calculator/ResultDisplay";
import {
  CALC_LIMITS,
  calculateStairPrice,
  type StoneKind,
} from "../../utils/calculatePrice";
import {
  EMPTY_DRAFT,
  draftToInputs,
  getCalculatorHints,
  type CalculatorDraft,
} from "../../utils/calculatorDraft";

type CalcState = {
  stone: StoneKind;
  draft: CalculatorDraft;
};

type CalcAction =
  | { type: "SET_STONE"; stone: StoneKind }
  | { type: "PATCH_DRAFT"; partial: Partial<CalculatorDraft> }
  | { type: "RESET" };

const initialCalcState: CalcState = {
  stone: "granite",
  draft: EMPTY_DRAFT,
};

function calculatorReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case "SET_STONE": {
      const { stone } = action;
      let draft = state.draft;
      if (stone === "nungKet") {
        draft = { ...draft, wallSkirting: true, edgeBorder: true };
      } else if (state.stone === "nungKet") {
        draft = { ...draft, wallSkirting: false, edgeBorder: false };
      }
      return { stone, draft };
    }
    case "PATCH_DRAFT":
      return { ...state, draft: { ...state.draft, ...action.partial } };
    case "RESET": {
      const next = { ...EMPTY_DRAFT };
      if (state.stone === "nungKet") {
        next.wallSkirting = true;
        next.edgeBorder = true;
      }
      return { ...state, draft: next };
    }
    default:
      return state;
  }
}

export type StairPriceCalculatorProps = {
  embedded?: boolean;
};

export function StairPriceCalculator({ embedded = false }: StairPriceCalculatorProps) {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalcState);

  const onStoneChange = useCallback((stone: StoneKind) => {
    dispatch({ type: "SET_STONE", stone });
  }, []);

  const onPatchDraft = useCallback((partial: Partial<CalculatorDraft>) => {
    dispatch({ type: "PATCH_DRAFT", partial });
  }, []);

  const onReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const parsedInputs = useMemo(
    () => draftToInputs(state.draft),
    [state.draft],
  );

  const quote = useMemo(
    () => calculateStairPrice(state.stone, parsedInputs),
    [state.stone, parsedInputs],
  );

  const hints = useMemo(() => {
    const base = getCalculatorHints(state.draft, parsedInputs);
    if (!quote.trustedEstimate) {
      return [
        ...base,
        `Ước tính không hiển thị an toàn: tổng diện tích vượt ${CALC_LIMITS.maxTotalAreaM2.toLocaleString("en-US")} m² hoặc số không hợp lệ. Giảm kích thước / số bậc / số chiếu (mỗi cạnh tối đa ${CALC_LIMITS.maxSideMeters} m).`,
      ];
    }
    return base;
  }, [state.draft, parsedInputs, quote.trustedEstimate]);

  const nungKetLocked = state.stone === "nungKet";
  const sectionReveal = useSectionReveal();

  return (
    <motion.section
      id="tinh-gia-cau-thang"
      className={`relative isolate overflow-hidden ${
        embedded ? "border-t-0 py-0" : "border-t border-charcoal/10 py-16 sm:py-20 lg:py-24"
      }`}
      aria-labelledby="calc-section-heading"
      {...sectionReveal}
    >
      <SectionBackdrop variant="calc" />
      <Container className={embedded ? "max-w-none px-0 sm:px-0 lg:px-0" : ""}>
        <header className="max-w-3xl">
          <div className="min-w-0">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
              Công cụ trực tuyến
            </p>
            <div className="mt-2 h-px w-16 bg-gold/15" aria-hidden />
            <h2
              id="calc-section-heading"
              className="font-display mt-1 text-heading font-bold text-balance text-charcoal"
            >
              Công Cụ Dự Toán Chi Phí Tự Động
            </h2>
            <p className="mt-4 text-base leading-[1.6] text-text-secondary">
              Nhập kích thước hoặc kéo thanh trượt — xem{" "}
              <span className="font-medium text-charcoal">
                báo giá thi công đá cầu thang
              </span>{" "}
              tham khảo theo từng hạng mục (đá nung kết / granite). Dịch vụ{" "}
              <span className="font-medium text-charcoal">
                thi công cầu thang đá tại Đà Nẵng
              </span>{" "}
              trọn gói: đo đạc &amp; thi công.
            </p>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
          <CalculatorForm
            stone={state.stone}
            draft={state.draft}
            nungKetLocked={nungKetLocked}
            hints={hints}
            onStoneChange={onStoneChange}
            onPatchDraft={onPatchDraft}
            onReset={onReset}
          />
          <ResultDisplay quote={quote} stone={state.stone} />
        </div>
      </Container>
    </motion.section>
  );
}
