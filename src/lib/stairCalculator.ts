/**
 * Re-export — logic nằm tại `src/utils/calculatePrice.ts` (pure, dễ test).
 */
export {
  type StoneKind,
  STONE_RATES,
  EDGE_BORDER_PER_M2,
  CALC_LIMITS,
  type StairCalculatorInputs,
  type StairQuoteBreakdown,
  sanitizeStairInputs,
  calculateStairPrice,
  computeStairQuote,
  formatVndInteger,
  formatM2,
} from "../utils/calculatePrice";
