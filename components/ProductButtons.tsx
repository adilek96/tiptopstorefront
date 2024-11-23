"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Pointer, ShoppingCart, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";

export default function ProductButtons(id: string | any) {
  const [isInCart, setIsInCart] = useState(false);
  const { addItem, addSingleItem, cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart) {
      cart.cart.items.map((item: any) => {
        if (item.variant_id === id.id) {
          setIsInCart(true);
        }
      });
    }
  }, [cart]);

  const singleHandler = async (id: string) => {
    try {
      await addSingleItem(id, 1);
    } catch (error) {
      console.log("Ошибка при добавлении товара в корзину");
    }

    router.push(`/checkout/${id}`);
  };

  return (
    <div className="flex space-x-2 ">
      {isInCart ? (
        <Button
          onClick={() => router.push("/cart")}
          className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-calclg text-white "
        >
          <Check className="mr-2 h-6 w-6 " />
          <span>В корзине</span>
        </Button>
      ) : (
        <Button
          onClick={() => addItem(id.id, 1)}
          className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 text-calclg text-white "
        >
          <ShoppingCart className="mr-2 h-6 w-6 " />
          <span>Добавить в корзину</span>
        </Button>
      )}

      <Button
        onClick={() => singleHandler(id.id)}
        className="bg-amber-600 sm:flex-1  h-12 hover:bg-amber-700 border-amber-700 text-white  "
      >
        <Pointer className="h-4 w-4" />
        <span className="sm:block hidden">Купить сейчас</span>
      </Button>
    </div>
  );
}
