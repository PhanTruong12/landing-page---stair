import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Button } from "../ui/Button";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";
import { DURATION, EASE_OUT } from "../motion/transition";
import {
  formatM2,
  formatVndInteger,
  STONE_RATES,
  type StairQuoteBreakdown,
  type StoneKind,
} from "../../utils/calculatePrice";
import { FORMULA_NOTE } from "./calculatorConstants";

export type ResultDisplayProps = {
  quote: StairQuoteBreakdown;
  stone: StoneKind;
  formulaNote?: string;
};

function ResultDisplayInner({
  quote,
  stone,
  formulaNote = FORMULA_NOTE,
}: ResultDisplayProps) {
  const reduce = useReducedMotion();
  const safeTotal = quote.trustedEstimate ? quote.total : 0;
  const safeArea = quote.trustedEstimate ? quote.totalAreaM2 : 0;
  const safeStone = quote.trustedEstimate ? quote.stoneCost : 0;
  const safeWall = quote.trustedEstimate ? quote.wallCost : 0;
  const safeEdge = quote.trustedEstimate ? quote.edgeCost : 0;
  const safeStep = quote.trustedEstimate ? quote.stepSurfaceM2 : 0;
  const safeRiser = quote.trustedEstimate ? quote.riserM2 : 0;
  const safeLanding = quote.trustedEstimate ? quote.landingM2 : 0;

  const animTotal = useAnimatedNumber(safeTotal);
  const animStone = useAnimatedNumber(safeStone);
  const animWall = useAnimatedNumber(safeWall);
  const animEdge = useAnimatedNumber(safeEdge);

  const rate = STONE_RATES[stone];
  const stoneLabel = rate.label;

  return (
    <aside className="lg:col-span-5 lg:sticky lg:top-24">
      <motion.div
        className="glass-panel p-5 sm:p-8"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
      >
        <div className="border-b border-charcoal/10 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Phiếu dự toán tham khảo
          </p>
          <h3
            id="result-heading"
            className="mt-2 text-lg font-bold tracking-tight text-charcoal"
          >
            Bảng kê chi tiết chi phí
          </h3>
          {!quote.trustedEstimate ? (
            <p
              className="mt-2 rounded-card border border-amber-200/90 bg-amber-50/95 px-3 py-2 text-xs font-medium text-amber-950"
              role="alert"
            >
              Không thể hiển thị số tiền an toàn — xem cảnh báo bên form hoặc
              giảm số liệu.
            </p>
          ) : null}
          <p className="mt-2 text-xs leading-[1.6] text-text-secondary">
            {formulaNote}
          </p>
        </div>

        <div className="mt-5 overflow-x-auto rounded-card border border-charcoal/10 bg-marble-card/25 backdrop-blur-xl">
          <table className="w-full min-w-[280px] border-collapse text-sm">
            <caption className="sr-only">
              Chi tiết diện tích và báo giá thi công đá cầu thang theo loại{" "}
              {stoneLabel}
            </caption>
            <thead>
              <tr className="border-b border-charcoal/10 bg-marble-muted/90 text-left">
                <th className="px-3 py-2.5 font-semibold text-charcoal">
                  Hạng mục
                </th>
                <th className="px-3 py-2.5 font-semibold text-charcoal">
                  Chi tiết
                </th>
                <th className="px-3 py-2.5 text-right font-semibold text-charcoal">
                  Giá trị
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/[0.08] text-text-secondary">
              <tr className="bg-marble-card/55">
                <td className="px-3 py-2.5 text-charcoal">Mặt bậc (bậc thẳng)</td>
                <td className="px-3 py-2.5 tabular-nums">
                  {formatM2(safeStep)} m²
                </td>
                <td className="px-3 py-2.5 text-right text-xs text-text-secondary">
                  —
                </td>
              </tr>
              <tr className="bg-marble-card/35">
                <td className="px-3 py-2.5 text-charcoal">Cổ bậc (riser)</td>
                <td className="px-3 py-2.5 tabular-nums">
                  {formatM2(safeRiser)} m²
                </td>
                <td className="px-3 py-2.5 text-right text-xs">—</td>
              </tr>
              <tr className="bg-marble-card/55">
                <td className="px-3 py-2.5 text-charcoal">Chiếu nghỉ</td>
                <td className="px-3 py-2.5 tabular-nums">
                  {formatM2(safeLanding)} m²
                </td>
                <td className="px-3 py-2.5 text-right text-xs">—</td>
              </tr>
              <tr className="border-t-2 border-charcoal/10 bg-gold/[0.06] font-medium text-charcoal">
                <td className="px-3 py-2.5" colSpan={2}>
                  Tổng diện tích ốp đá
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {formatM2(safeArea)} m²
                </td>
              </tr>
              <tr className="bg-marble-card/55">
                <td className="px-3 py-2.5 leading-snug text-charcoal">
                  Đá ({stoneLabel})
                  <span className="mt-0.5 block text-[11px] font-normal text-text-secondary">
                    Đơn giá {formatVndInteger(rate.pricePerM2)} đ/m²
                  </span>
                </td>
                <td className="px-3 py-2.5 align-top text-xs text-text-secondary">
                  Theo diện tích
                </td>
                <td className="px-3 py-2.5 text-right align-top tabular-nums text-charcoal">
                  {formatVndInteger(animStone)} đ
                </td>
              </tr>
              <tr className="bg-marble-card/35">
                <td className="px-3 py-2.5 text-charcoal">Len tường</td>
                <td className="px-3 py-2.5 text-xs">Theo md</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-charcoal">
                  {formatVndInteger(animWall)} đ
                </td>
              </tr>
              <tr className="bg-marble-card/55">
                <td className="px-3 py-2.5 text-charcoal">Chỉ vuông (edge)</td>
                <td className="px-3 py-2.5 text-xs">Theo m² tổng</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-charcoal">
                  {formatVndInteger(animEdge)} đ
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gold/25 bg-charcoal text-marble-card">
                <th
                  className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                  scope="row"
                  colSpan={2}
                >
                  Tổng cộng (ước tính)
                </th>
                <td className="px-3 py-4 text-right text-lg font-bold tabular-nums sm:text-xl">
                  {reduce ? (
                    <>{formatVndInteger(animTotal)} đ</>
                  ) : (
                    <motion.span
                      key={safeTotal}
                      initial={{ opacity: 0.88 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className="inline-block"
                    >
                      {formatVndInteger(animTotal)} đ
                    </motion.span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-5 text-center text-xs leading-[1.6] text-text-secondary">
          Giá chỉ mang tính tham khảo. Liên hệ để nhận báo giá thi công đá cầu
          thang chính xác.
        </p>

        <div className="mt-5">
          <Button
            href={CONTACT.zaloUrl}
            className="w-full rounded-card py-4 text-base"
            tone="emerald"
            target="_blank"
            rel="noreferrer"
          >
            Nhận báo giá chi tiết trong 5 phút
          </Button>
          <p className="mt-3 text-center text-sm leading-[1.6] text-text-secondary">
            Tư vấn miễn phí — phù hợp mẫu cầu thang đá đẹp tại công trình
          </p>
        </div>
      </motion.div>
    </aside>
  );
}

export const ResultDisplay = memo(ResultDisplayInner);
