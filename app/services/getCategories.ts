'use server'

import { getMedusaURL } from "@/lib/utils";


export async function getCategories() {
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/product-categories`, baseUrl);
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
    return { ok: true, data: data, error: null }
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}


export async function getCategoriesId(slug: string) {
    const baseUrl = getMedusaURL();
    const url = new URL(`/store/product-categories?handle=${slug}`, baseUrl);
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
      return data.product_categories[0].id
    } catch (error) {
      return { ok: false, data: null, error: error };
    }
  }