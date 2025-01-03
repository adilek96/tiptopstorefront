"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Pointer, Check } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({
  data,
  variant,
}: {
  data: any;
  variant: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { addItem, addSingleItem, cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart) {
      cart.cart.items.map((item: any) => {
        if (item.variant_id === variant.id) {
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
    <div className="relative">
      <Card
        className="w-[360px]  max-w-sm bg-opacity-20 backdrop-filter backdrop-blur-lg  shadow-xl  overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6 cursor-pointer relative">
          <Link href={`/store/products/${data.id}`}>
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
              <motion.img
                src={data.thumbnail}
                alt="Futuristic Gift"
                className="object-cover w-full h-full"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <h3 className="text-calc2xl  font-bold mb-2 md:h-24  h-16 text-gray-700">
              {data.title}
            </h3>
            <p className="text-sm text-gray-600 h-14 mb-4">{data.subtitle}</p>
            <p className="text-[12px] text-gray-600 mb-4">{variant.title}</p>
            <div className="flex items-center justify-start gap-3 mb-4">
              {variant.calculated_price.is_calculated_price_price_list ? (
                <>
                  <span className="text-xl line-through font-bold text-green-900">
                    {variant.calculated_price.original_amount} &#8380;
                  </span>
                  <span className="text-3xl font-bold text-red-700 animate-bounce">
                    {variant.calculated_price.calculated_amount} &#8380;
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold text-green-900">
                    {variant.calculated_price.original_amount} &#8380;
                  </span>
                </>
              )}
            </div>
          </Link>
          <div className="flex space-x-2">
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
                onClick={() => addItem(variant.id, 1)}
                className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-6 w-6 " />
                Добавить в корзину
              </Button>
            )}

            <Button
              onClick={() => singleHandler(variant.id)}
              className="bg-amber-600 h-12 hover:bg-amber-700 border-amber-700 text-white transition-all duration-300"
            >
              <Pointer className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {variant.calculated_price.is_calculated_price_price_list ? (
        // вариант с анимацией
        // <div className="ribbon-sale text-calcxl    bg-red-500  z-50 ">
        //   <p className="whitespace-nowrap animate-marquee w-[150px] ">
        //     Распродажа <span className="text-black"> "Black Friday"</span>
        //   </p>
        // </div>

        <div className="ribbon-sale text-[14px]    bg-red-500  z-50 ">
          <p className="text-center w-[190px] ">Распродажа</p>
          {/* <p className="text-black text-center"> "Black Friday"</p> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
