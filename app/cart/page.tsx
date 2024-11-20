"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const { cart, addItem, loading } = useCart();

  //   const updateQuantity = (id: number, newQuantity: number) => {
  //     setItems(
  //       items.map((item) =>
  //         item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
  //       )
  //     );
  //   };

  //   const removeItem = (id: number) => {
  //     setItems(items.filter((item) => item.id !== id));
  //   };

  //   const total = items.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );
  //   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="mx-auto px-4 py-8  ">
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 z-10 relative rounded-md shadow-xl">
          <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
            <span className="py-1">Ваша корзина</span>
          </div>
          <div className="ribbon  absolute top-20 text-[16px] left-0 z-50">
            <span className="px-6">
              Всего товаров: {cart.cart.items.length}
            </span>
          </div>

          <CardContent className="space-y-4 mt-36">
            <AnimatePresence>
              {cart.cart.items.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.product_title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.unit_price} &#8380; за шт.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      //   onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      //   onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    // onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
        <Card className="z-10 relative rounded-md shadow-xl">
          <div className="ribbon  absolute top-10 text-[16px] left-0 z-50">
            <span className="px-6">Итого</span>
          </div>

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
            <div className="flex justify-between font-semibold">
              <span>Итого</span>
              <span>{cart.cart.original_item_total} &#8380;</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300">
              Оформить заказ
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
