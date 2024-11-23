'use server'
import { getMedusaURL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getCartItems(slug : string) {

  
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/carts/${slug}`, baseUrl);
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

    revalidatePath("/cart")
    return { ok: true, data: data, error: null };
    
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}

