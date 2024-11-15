'use server'
import { cookies } from "next/headers";
import { getMedusaURL } from "@/lib/utils";
import { getCategoriesId } from "./getCategories";


export async function getProducts(slug : string) {

  const cookieStore = cookies();

  let sortOption = (await cookieStore).get("sortOption")?.value || "created_at";
  if(sortOption === "price" || sortOption === "-price"){
    sortOption = "created_at"
  }

  const categoryId = await getCategoriesId(slug)
  const regionid = "reg_01JCJKAS5JFH0706TQKGJDRPEZ";
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/products?region_id=${regionid}&category_id=${categoryId}&order=${sortOption}`, baseUrl);
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



