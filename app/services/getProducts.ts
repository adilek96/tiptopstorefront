'use server'
import { getMedusaURL, getRegionId } from "@/lib/utils";
import { getCategoriesId } from "./getCategories";


export async function getProducts(slug : string, sortParam?: string) {

  let sortOption = sortParam || "created_at";
  if(sortOption === "price" || sortOption === "-price"){
    sortOption = "created_at"
  }

  console.log("🔍 getProducts called with:", { slug, sortParam, finalSortOption: sortOption });

  const categoryId = await getCategoriesId(slug)
  const regionid = getRegionId();
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/products?region_id=${regionid}&category_id=${categoryId}`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
 


  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      },
      cache: "no-store",
      next: { revalidate: 0 }
    });


    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };

    console.log("📦 API Response:", data.products?.length, "products");

    return { ok: true, data: data.products, error: null };
    
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}



