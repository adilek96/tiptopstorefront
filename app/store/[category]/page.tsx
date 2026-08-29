// Данные тянутся из Medusa на каждый запрос — пререндер на этапе сборки
// потребовал бы живого бэкенда во время docker build.
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { getProducts } from "@/app/services/getProducts";
import ProductList from "@/components/ProductList";
import CategorySelector from "@/components/CategorySelector";
import SortingSelector from "@/components/SortingSelector";
import { getCategories } from "@/app/services/getCategories";
import Loading from "@/app/loading";

export default async function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const slug = await params;
  const search = await searchParams;

  const data = await getProducts(slug.category, search?.sort);
  const category = await getCategories();

  // Проверяем что категории загрузились
  if (!category || !category.ok) {
    console.error("Failed to load categories:", category?.error);
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section className="w-[90%] mx-auto mt-10  py-3 px-2   flex gap-2 items-center justify-around shadow-lg   rounded-xl border bg-card z-10 ">
          <CategorySelector data={category} />
          <SortingSelector />
        </section>
      </Suspense>
      <section className="relative w-[96%] flex items-center justify-center mt-8 flex-col">
        <ProductList data={data.data} />
      </section>
    </>
  );
}
