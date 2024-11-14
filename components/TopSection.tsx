"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import "swiper/css";
import { getTopProducts } from "@/app/services/getTopProducts";

export default function TopSection() {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: any = await getTopProducts();
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="relative mt-5 mb-8 w-[96%] flex items-center justify-center flex-col">
      <div className="ribbon mt-5 absolute top-10 left-0 z-50">
        <span className="px-6">Топ 10</span>
      </div>
      <div className="w-full bg-gray-200 px-10 py-24">
        {!products ? (
          <div className="w-full h-24 flex justify-center items-center">
            <p>Загрузка...</p>
          </div>
        ) : (
          <Swiper
            loop={false}
            slidesPerView={4} // Можно уменьшить, чтобы лучше подходило для различных экранов
            spaceBetween={10} // Устанавливаем расстояние между слайдами
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1080: { slidesPerView: 4 },
            }}
            speed={2000}
            centeredSlides={true}
            className="w-full"
          >
            {products.map((item: any, i: number) =>
              item.variants.map((variant: any) => (
                <SwiperSlide className="relative" key={variant.id}>
                  <ProductCard data={item} variant={variant} />
                  <div className="top-10 right-20 absolute">
                    <div className="ribbon-top ">{i + 1}</div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        )}
      </div>
    </section>
  );
}
