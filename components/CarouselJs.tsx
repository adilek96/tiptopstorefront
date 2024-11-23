"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample product data
const products = [
  {
    id: 1,
    name: "Гирлянда 'Мишура'",
    image: "testimg.jpg",
  },
  {
    id: 2,
    name: "Гирлянда занавес 'Хвойная лапа'",
    image: "testimg2.jpg",
  },
  {
    id: 3,
    name: "Гирлянда 'Феерверк'",
    image: "testimg3.jpg",
  },
  {
    id: 4,
    name: "Гирлянда 'Роса'",
    image: "testimg4.jpeg",
  },
];

export default function CarouselJs() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [api]);

  return (
    <div className="w-full relative ">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="relative">
              <div className="h-[400px] w-full overflow-hidden">
                <div className="w-full h-full  bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-xl backdrop-blur-2xl" />

                <h3 className=" absolute bottom-12 left-10 text-2xl md:text-3xl lg:text-4xl font-bold text-amber-500">
                  {product.name}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute w-full  bottom-0 py-4 text-center">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={cn(
              "w-3 h-3 p-0 rounded-full mx-1",
              index === current ? "bg-primary" : "bg-muted"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
