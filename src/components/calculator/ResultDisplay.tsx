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
import { FORMULA_NOTE_LINES } from "./calculatorConstants";

export type ResultDisplayProps = {
  quote: StairQuoteBreakdown;
  stone: StoneKind;
  formulaNote?: string;
  /** Giao diện gọn cho widget dự toán phụ */
  compact?: boolean;
};

function ResultDisplayInner({
  quote,
  stone,
  formulaNote,
  compact = false,
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

  const totalCell = reduce ? (
    <>{formatVndInteger(animTotal)} đ</>
  ) : (
    <motion.span
      key={safeTotal}
      initial={{ opacity: 0.88 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      {formatVndInteger(animTotal)} đ
    </motion.span>
  );

  if (compact) {
    return (
      <aside className="result-card result-card--compact">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
        >
          <p className="result-compact__label">Ước tính tham khảo</p>
          {!quote.trustedEstimate ? (
            <p className="result-alert" role="alert">
              Không hiển thị số an toàn — kiểm tra số đo hoặc giảm diện tích.
            </p>
          ) : (
            <>
              <p className="result-compact__total">{totalCell}</p>
              <p className="result-compact__area">
                ~{formatM2(safeArea)} m² ốp đá · {stoneLabel}
              </p>
              <p className="result-compact__detail">
                Bậc {formatM2(safeStep)} · cổ {formatM2(safeRiser)} · chiếu{" "}
                {formatM2(safeLanding)} m²
              </p>
            </>
          )}

          {quote.trustedEstimate ? (
            <details className="result-compact__details">
              <summary>Xem chi tiết hạng mục</summary>
              <div className="result-table-wrap">
                <table className="result-table">
                  <tbody>
                    <tr>
                      <td>
                        Đá
                        <span>{formatVndInteger(rate.pricePerM2)} đ/m²</span>
                      </td>
                      <td>{formatVndInteger(animStone)} đ</td>
                    </tr>
                    <tr>
                      <td>Len tường</td>
                      <td>{formatVndInteger(animWall)} đ</td>
                    </tr>
                    <tr>
                      <td>Chỉ vuông</td>
                      <td>{formatVndInteger(animEdge)} đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          ) : null}

          <p className="result-compact__note">
            Chỉ tham khảo — báo giá chuẩn sau khảo sát.
          </p>
          <Button
            href={CONTACT.zaloUrl}
            tone="emerald"
            target="_blank"
            rel="noreferrer"
            className="btn--block"
          >
            Zalo — báo giá chi tiết
          </Button>
        </motion.div>
      </aside>
    );
  }

  return (
    <aside className="result-card">
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
      >
        <div>
          <p className="result-card__kicker">Kết quả tham khảo</p>
          <h3 id="result-heading">Diện tích và chi phí</h3>
          {!quote.trustedEstimate ? (
            <p className="result-alert" role="alert">
              Không thể hiển thị số tiền an toàn — xem cảnh báo bên form hoặc
              giảm số liệu.
            </p>
          ) : null}
          {formulaNote ? (
            <p className="result-card__formula">{formulaNote}</p>
          ) : (
            <ul className="result-card__formula">
              {FORMULA_NOTE_LINES.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </div>

        {quote.trustedEstimate ? (
          <div className="result-area">
            <span className="result-area__label">Tổng diện tích ốp đá</span>
            <span className="result-area__value">
              {formatM2(safeArea)} m²
            </span>
            <span className="result-area__detail">
              Gồm mặt bậc {formatM2(safeStep)} m² · cổ {formatM2(safeRiser)} m² ·
              chiếu {formatM2(safeLanding)} m²
            </span>
          </div>
        ) : null}

        <div className="result-table-wrap">
          <table className="result-table">
            <caption>
              Báo giá thi công đá cầu thang — {stoneLabel}
            </caption>
            <thead>
              <tr>
                <th>Hạng mục</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Đá ({stoneLabel})
                  <span>{formatVndInteger(rate.pricePerM2)} đ/m²</span>
                </td>
                <td>{formatVndInteger(animStone)} đ</td>
              </tr>
              <tr>
                <td>Len tường</td>
                <td>{formatVndInteger(animWall)} đ</td>
              </tr>
              <tr>
                <td>Chỉ vuông</td>
                <td>{formatVndInteger(animEdge)} đ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Tổng (ước tính)</th>
                <td>{totalCell}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="result-footnote">
          Giá chỉ mang tính tham khảo. Liên hệ để nhận báo giá thi công đá cầu
          thang chính xác.
        </p>

        <div className="result-cta">
          <Button
            href={CONTACT.zaloUrl}
            tone="emerald"
            target="_blank"
            rel="noreferrer"
            className="btn--block"
          >
            Nhận báo giá chi tiết trong 5 phút
          </Button>
          <p>
            Tư vấn miễn phí — phù hợp mẫu cầu thang đá đẹp tại công trình
          </p>
        </div>
      </motion.div>
    </aside>
  );
}

export const ResultDisplay = memo(ResultDisplayInner);
