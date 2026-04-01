import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gộp class Tailwind + điều kiện; `twMerge` xử lý xung đột utility. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
