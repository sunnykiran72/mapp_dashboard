import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatAmount({value , showCurrency , fraction } : {value: number ,showCurrency? :boolean , fraction?:number}): string {
  const formatter = new Intl.NumberFormat("en-IN", {
        style: showCurrency ? "currency" : "decimal",
        currency: showCurrency ? "INR" : undefined,
        minimumFractionDigits: fraction ?? 0,
    });
  return formatter.format(value);
}

