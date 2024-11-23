"use client";
import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import { useCart } from "@/providers/CartProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CheckOutForm from "./CheckOutForm";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CheckOut({ slug }: { slug: any }) {
  const {
    cart,
    singleCart,
    cartId,
    singleCartId,
    deleteSingleProduct,
    closeCart,
    addShippingMethodToCart,
  } = useCart();
  const [validCart, setValidCart] = useState<any>();
  const [validCartId, setValidCartId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (slug.type === "multi") {
      if (cart && cartId) {
        setValidCart(cart);
        setValidCartId(cartId);
      }
    }

    if (slug.type !== "multi") {
      if (singleCart && singleCartId) {
        setValidCart(singleCart);
        setValidCartId(singleCartId);
      }
    }
  }, [slug, cart, singleCart]);

  if (!validCart) {
    return <div>Загрузка</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Card className="md:col-span-2 z-10 relative rounded-md shadow-xl">
        <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
          <span className="py-1">Оформление заказа</span>
        </div>
        {validCart.cart.items.length <= 0 ? (
          <div className="px-10 py-44 mx-auto flex justify-center items-center gap-5 flex-col">
            <p>Вы еще не выбрали товары для оформления.</p>
            <p>Перейдите в магазин для выбора товара.</p>
            <Button
              onClick={() => router.push("/store")}
              className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300  font-semibold"
            >
              Перейти в магазин
            </Button>
          </div>
        ) : (
          <CheckOutForm
            closeCart={closeCart}
            addShippingMethodToCart={addShippingMethodToCart}
            validCartId={validCartId}
            validType={slug.type}
          />
        )}
      </Card>
      <Summary cart={validCart} type={"checkout"} />
    </div>
  );
}
