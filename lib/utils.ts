import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getMedusaURL() {
  // Старый сервер 194.163.151.112 мёртв — молчаливого запасного адреса
  // больше нет: без переменной падаем сразу, а не на первом запросе.
  const url = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_MEDUSA_BACKEND_URL не задан");
  }
  return url;
}
// Идентификаторы из базы Medusa. При переезде на другую базу они меняются,
// поэтому живут в переменных окружения, а не в коде. Значения подставляются
// на этапе сборки — NEXT_PUBLIC_* инлайнятся Next.js в бандл.
export function getRegionId() {
  return process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? "";
}

export function getTopProductsTagId() {
  return process.env.NEXT_PUBLIC_MEDUSA_TOP_TAG_ID ?? "";
}

export const shippingOptionIds = {
  metro: process.env.NEXT_PUBLIC_SHIPPING_OPTION_METRO_ID ?? "",
  city: process.env.NEXT_PUBLIC_SHIPPING_OPTION_CITY_ID ?? "",
  country: process.env.NEXT_PUBLIC_SHIPPING_OPTION_COUNTRY_ID ?? "",
};
