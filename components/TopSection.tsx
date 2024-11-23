import React from "react";
import ProductCard from "./ProductCard";
import { getTopProducts } from "@/app/services/getTopProducts";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Loading from "@/app/loading";

export default async function TopSection() {
  const products = await getTopProducts();

  return (
    <section className="relative mt-5 mb-8 w-[96%] flex items-center justify-center flex-col ">
      <div className="ribbon mt-5 absolute top-5 text-calc2xl left-0 z-50">
        <span className="px-6">Топ 10</span>
      </div>
      <div className="w-full bg-white shadow-2xl px-10 py-24 rounded-md">
        <Suspense fallback={<Loading />}>
          <div className="w-full    flex flex-wrap justify-center gap-10">
            {products.data.map((item: any, i: number) =>
              item.variants.map((variant: any) => (
                <div key={variant.id} className="relative w-[360px] max-w-sm">
                  <ProductCard data={item} variant={variant} />
                  <div className="top-10 right-10 absolute">
                    <div className="ribbon-top ">{i + 1}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
