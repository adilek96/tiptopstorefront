'use server'
import { getMedusaURL } from "@/lib/utils";

export async function createCart() {

//   const regionid = "reg_01JCJKAS5JFH0706TQKGJDRPEZ";
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/carts`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
 


  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      }
    });


    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data: data, error: null };
    
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}



