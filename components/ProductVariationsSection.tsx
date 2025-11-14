"use client";

import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import ProductButtons from "./ProductButtons";

export default function ProductVariationsSection({
  product,
}: {
  product: any;
}) {
  const [selectedVariant, setSelectedVariant] = useState<any>(
    product.variants[0]
  );

  return (
    <section className="flex flex-row bg-white w-[95%] shadow-xl rounded-md z-10 py-16 flex-wrap gap-10 justify-center ">
      <div className="mdx:w-[40%] relative px-3 w-full">
        {product.variants[0].calculated_price.is_calculated_price_price_list ? (
          <div className="ribbon-sale text-calcxl    bg-red-500  z-50 ">
            <p className="whitespace-nowrap animate-marquee w-[150px] ">
              Распродажа
              {/* <span className="text-black"> "Black Friday"</span> */}
            </p>
          </div>
        ) : (
          <></>
        )}

        <ImageSlider images={product.images} thumbnail={product.thumbnail} />
      </div>
      <div className="mdx:w-[40%] w-full px-10 mdx:px-1 flex flex-col justify-between gap-10 items-center md:py-14">
        <div className="w-full">
          <div>
            <h1 className="text-calc3xl font-bold text-gray-700">
              {product.title}
            </h1>
            <p className="text-calcsm text-gray-600">{product.subtitle}</p>
          </div>

          <div className="mt-5">
            <h3 className="text-calclg font-semibold mb-2 text-gray-600">
              Вариация:
            </h3>
            <div className="flex gap-2 flex-wrap ">
              {product.variants.map((variant: any, index: string) => (
                <div
                  key={index}
                  onClick={() => setSelectedVariant(variant)}
                  className={`border-[2px] px-3 py-2 h-10 cursor-pointer rounded-md flex justify-center items-center text-calcsm  font-semibold text-gray-600   transition-all duration-300 ${
                    variant.id === selectedVariant.id
                      ? "bg-amber-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className="pr-1">{variant.title}. </p>
                  <p>
                    {variant.options.map((option: any) => (
                      <span key={option.id}>
                        {option.option.title + ": " + option.value + ". "}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex space-x-2">
          {product.tags.map((tag: any, index: number) => (
            <div
              key={index}
              className={` border-[2px] px-3 py-2 h-10 rounded-md flex justify-center items-center text-calcsm  font-semibold text-gray-600  transition-all duration-300  `}
            >
              <p>{tag.value}</p>
            </div>
          ))}
        </div>
        <div className="w-full">
          {selectedVariant.calculated_price.is_calculated_price_price_list ? (
            <>
              <p className="text-xl line-through font-bold text-nowrap text-green-900 mb-5">
                Цена: {selectedVariant.calculated_price.original_amount}
                &#8380;
              </p>

              <div className="text-2xl flex flex-row flex-nowrap gap-2  font-bold text-nowrap text-red-700 mb-5">
                <p>Скидочная цена: </p>
                <p className="animate-bounce text-3xl">
                  {selectedVariant.calculated_price.calculated_amount}
                  &#8380;
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold text-nowrap text-green-900 mb-5">
                <span>Цена: </span>
                {selectedVariant.calculated_price.original_amount}
                &#8380;
              </p>
            </>
          )}

          <ProductButtons id={selectedVariant.id} />
        </div>
      </div>
    </section>
  );
}
