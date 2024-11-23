import React, { Suspense } from "react";
import ProductCard from "./ProductCard";
import Loading from "@/app/loading";

export default function ProductList({ data }: { data: any }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <h1>Нет доступных продуктов</h1>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-[100%]  py-5 px-2 mt-5 mb-10 flex flex-wrap justify-center gap-10">
        {data.map((item: any) =>
          item.variants.map((variant: any, i: number) => (
            <ProductCard
              key={variant.id}
              data={item}
              variant={item.variants[i]}
            />
          ))
        )}
      </div>
    </Suspense>
  );
}
