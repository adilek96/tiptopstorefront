'use server'
import { getMedusaURL } from "@/lib/utils";

export async function addShippingMethod( optionId: string, shippingdata: object, cartid: string) {


  const baseUrl = getMedusaURL();
  const url = new URL(`/store/carts/${cartid}/shipping-methods`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
 


  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      },
      body: JSON.stringify({
        option_id: optionId,
        data: shippingdata,
      }),
    });


    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data: data, error: null };
    
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}



