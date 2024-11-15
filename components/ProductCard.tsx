"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, ShoppingCart } from "lucide-react";

export default function ProductCard({
  data,
  variant,
}: {
  data: any;
  variant: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-[360px] max-w-sm bg-opacity-20 backdrop-filter backdrop-blur-lg  shadow-xl  overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 cursor-pointer ">
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
        <h3 className="text-calc3xl font-bold mb-2 h-20 text-gray-700">
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{data.subtitle}</p>
        <p className="text-[12px] text-gray-600 mb-4">{variant.title}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-green-900">
            {variant.calculated_price.calculated_amount} &#8380;
          </span>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1 h-12 bg-amber-500 hover:bg-amber-600">
            <ShoppingCart className="mr-2 h-6 w-6 " /> Add to Cart
          </Button>
          <Button className="bg-amber-600 h-12 hover:bg-amber-700 border-amber-700 text-white h">
            <Gift className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
