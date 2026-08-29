'use server'
import { getMedusaURL, getRegionId, getTopProductsTagId } from "@/lib/utils";



export async function getTopProducts() {

  const tag = getTopProductsTagId();
  const regionid = getRegionId();
  const baseUrl = getMedusaURL();
  const params = new URLSearchParams({ region_id: regionid });
  // Тег «Топ товаров» задаётся вручную в админке. Пока он не проставлен —
  // отдаём просто последние товары, а не пустой список.
  if (tag) {
    params.set("tag_id", tag);
  }
  const url = new URL(`/store/products?${params.toString()}`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
 

  

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      }
    });


    const data = await response.json();

    if (data.error) return { ok: false, data: null, error: data.error };

   
    return { ok: true, data: data.products, error: null };
    
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}



