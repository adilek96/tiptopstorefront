import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getMedusaURL() {
  return process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://194.163.151.112:9000";
}