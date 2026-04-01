/** Gộp chuỗi className, bỏ qua giá trị falsy. */
export function cx(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}
