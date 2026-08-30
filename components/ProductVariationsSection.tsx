"use client";

import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import ProductButtons from "./ProductButtons";
import { findPricedVariant, readPrice } from "@/lib/price";

export default function ProductVariationsSection({
  product,
}: {
  product: any;
}) {
  const variants = Array.isArray(product?.variants) ? product.variants : [];

  // Открываем товар на варианте, который можно купить: если у первого
  // варианта цены нет, а у второго есть, покупатель не должен упираться
  // в «цена уточняется» на ровном месте.
  const [selectedVariant, setSelectedVariant] = useState<any>(
    findPricedVariant(product) ?? variants[0] ?? null
  );

  const price = readPrice(selectedVariant);

  // Картинки вариации кладёт плагин medusa-variant-images — в metadata самой
  // вариации, отдельного поля под них в модели Medusa нет. Если у вариации
  // своих фото не задано, показываем общие фото товара.
  const variantMedia = (selectedVariant?.metadata ?? {}) as {
    thumbnail?: string;
    images?: { url: string }[];
  };
  const variantImages = Array.isArray(variantMedia.images)
    ? variantMedia.images.filter((image) => image?.url)
    : [];

  const media = {
    thumbnail:
      variantMedia.thumbnail || variantImages[0]?.url || product.thumbnail,
    images: variantImages.length ? variantImages : product.images,
  };

  if (!selectedVariant) {
    return null;
  }

  return (
    <section className="flex flex-row bg-white w-[95%] shadow-xl rounded-md z-10 py-16 flex-wrap gap-10 justify-center ">
      <div className="mdx:w-[40%] relative px-3 w-full">
        {price?.isSale ? (
          <div className="ribbon-sale text-calcxl    bg-red-500  z-50 ">
            <p className="whitespace-nowrap animate-marquee w-[150px] ">
              Распродажа
              {/* <span className="text-black"> "Black Friday"</span> */}
            </p>
          </div>
        ) : (
          <></>
        )}

        <ImageSlider images={media.images} thumbnail={media.thumbnail} />
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
              {variants.map((variant: any, index: string) => (
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
                    {(variant.options ?? []).map((option: any) => (
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
          {(product.tags ?? []).map((tag: any, index: number) => (
            <div
              key={index}
              className={` border-[2px] px-3 py-2 h-10 rounded-md flex justify-center items-center text-calcsm  font-semibold text-gray-600  transition-all duration-300  `}
            >
              <p>{tag.value}</p>
            </div>
          ))}
        </div>
        <div className="w-full">
          {!price ? (
            <p className="text-2xl font-bold text-nowrap text-gray-500 mb-5">
              Цена уточняется
            </p>
          ) : price.isSale ? (
            <>
              <p className="text-xl line-through font-bold text-nowrap text-green-900 mb-5">
                Цена: {price.original}
                &#8380;
              </p>

              <div className="text-2xl flex flex-row flex-nowrap gap-2  font-bold text-nowrap text-red-700 mb-5">
                <p>Скидочная цена: </p>
                <p className="animate-bounce text-3xl">
                  {price.calculated}
                  &#8380;
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold text-nowrap text-green-900 mb-5">
                <span>Цена: </span>
                {price.original}
                &#8380;
              </p>
            </>
          )}

          {/* Без цены корзина вариант не примет — кнопки прячем. */}
          {price ? <ProductButtons id={selectedVariant.id} /> : null}
        </div>
      </div>
    </section>
  );
}
