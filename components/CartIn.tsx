"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import Summary from "./Summary";

export default function CartProducts() {
  const { cart, updateQuantity, deleteProduct, loading } = useCart();

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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteProduct(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
        <Summary cart={cart} type={"cart"} />
      </div>
    </div>
  );
}
