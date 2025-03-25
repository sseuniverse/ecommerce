import { clsx, type ClassValue } from "clsx"
import { twMerge } from "../script/merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
