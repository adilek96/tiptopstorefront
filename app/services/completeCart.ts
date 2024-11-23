'use server'
import { getMedusaURL } from "@/lib/utils";

 // ------------------------------------------------------------------------------------------------------

async function createPaymentSession(collectionid:string) {
    const provider_id = "pp_system_default";
    const baseUrl = getMedusaURL();
    const url = new URL(`/store/payment-collections/${collectionid}/payment-sessions`, baseUrl);
    const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": `${key}`,
        },
        body: JSON.stringify({
          provider_id
        }),
      });
  
  
      const data = await response.json();
      if (data.error) return { ok: false, data: null, error: data.error };
  
      return { ok: true, data: data, error: null };
      
    } catch (error) {
      return { ok: false, data: null, error: error };
    }
  }
  
  
  
 


// -----------------------------------------------------------------------------------------------
async function createPaymentCollection(cartid:string) {
  const baseUrl = getMedusaURL();
  const url = new URL(`/store/payment-collections`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
  let collectionid;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      },
      body: JSON.stringify({
        cart_id: cartid,
      }),
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    collectionid = data.payment_collection.id;

    if(collectionid){
        try {
            await createPaymentSession(collectionid);
            return "ok"
        } catch (error) {
            return { ok: false, data: null, error: error };
        }
    }

  } catch (error) {
    return { ok: false, data: null, error: error };
  }

}
// ------------------------------------------------------------------------------------------------------



export async function completeCart(cartid: string) {

   


  const baseUrl = getMedusaURL();
  const url = new URL(`/store/carts/${cartid}/complete`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

  try {
    const paymentsSession = await createPaymentCollection(cartid)
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
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
 




  
}



