import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";
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

function openFromHash() {
  return (
    typeof window !== "undefined" &&
    window.location.hash === "#tinh-gia-cau-thang"
  );
}

export function StairPriceCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalcState);
  const [expanded, setExpanded] = useState(openFromHash);

  useEffect(() => {
    const sync = () => {
      if (openFromHash()) setExpanded(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

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
      className="section section--calc-widget"
      aria-labelledby="calc-section-heading"
      {...sectionReveal}
    >
      <Container className="section-inner">
        <div className="calc-widget">
          <div className="calc-widget__intro">
            <h2 id="calc-section-heading" className="calc-widget__title">
              Dự toán nhanh
            </h2>
            <p className="calc-widget__lede">
              Thêm phụ trên trang — nhập vài số đo để ước diện tích và giá tham
              khảo. Báo giá chính xác khi khảo sát tại công trình.
            </p>
          </div>

          {!expanded ? (
            <div className="calc-teaser">
              <p className="calc-teaser__hint">
                Dành cho bạn muốn tham khảo trước khi liên hệ.
              </p>
              <button
                type="button"
                className="calc-teaser__open"
                aria-expanded="false"
                aria-controls="calc-widget-panel"
                onClick={() => setExpanded(true)}
              >
                Mở ước giá
              </button>
            </div>
          ) : (
            <div id="calc-widget-panel" className="calc-widget__panel">
              <div className="calc-widget__bar">
                <button
                  type="button"
                  className="calc-widget__collapse"
                  aria-expanded="true"
                  aria-controls="calc-widget-panel"
                  onClick={() => setExpanded(false)}
                >
                  Thu gọn
                </button>
              </div>
              <div className="calc-layout calc-layout--widget">
                <CalculatorForm
                  stone={state.stone}
                  draft={state.draft}
                  nungKetLocked={nungKetLocked}
                  hints={hints}
                  onStoneChange={onStoneChange}
                  onPatchDraft={onPatchDraft}
                  onReset={onReset}
                  compact
                />
                <ResultDisplay quote={quote} stone={state.stone} compact />
              </div>
            </div>
          )}
        </div>
      </Container>
    </motion.section>
  );
}
