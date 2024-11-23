"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function Summary({ cart, type }: { cart: any; type: string }) {
  const router = useRouter();

  return (
    <Card className="z-10 relative rounded-md shadow-xl">
      <div className="ribbon  absolute top-10 text-[16px] left-0 z-50">
        <span className="px-6">Итого</span>
      </div>
      {!cart ? (
        <div>Загрузка...</div>
      ) : (
        <>
          <CardContent className="mt-28">
            <div className="space-y-2">
              {cart.cart.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_title} x{item.quantity}
                  </span>
                  <span>{item.unit_price * item.quantity} &#8380;</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            {type === "cart" ? (
              <></>
            ) : (
              <>
                <div className="flex justify-between ">
                  <span>Сумма товара</span>
                  <span>{cart.cart.original_item_total} &#8380;</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Доставка</span>
                  <span>{cart.cart.shipping_total} &#8380;</span>
                </div>
              </>
            )}

            <div className="flex justify-between font-semibold">
              <span>Итого</span>
              <span>{cart.cart.original_total} &#8380;</span>
            </div>
          </CardContent>
          <CardFooter>
            {type === "checkout" ? (
              <></>
            ) : (
              <Button
                onClick={() => router.push("/checkout/multi")}
                className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300"
              >
                Оформить заказ
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
