import React from "react";
import { getProducts } from "@/app/services/getProducts";
import ProductList from "@/components/ProductList";
import CategorySelector from "@/components/CategorySelector";
import SortingSelector from "@/components/SortingSelector";
import { getCategories } from "@/app/services/getCategories";

export default async function Page({ params }: { params: any }) {
  const slug = await params;

  const data = await getProducts(slug.category);
  const category = await getCategories();

  return (
    <>
      <section className="w-[90%] mx-auto mt-10  py-3 px-2   flex gap-2 items-center justify-around shadow-lg   rounded-xl border bg-card z-10 ">
        <CategorySelector data={category} />
        <SortingSelector />
      </section>
      <section className="relative w-[96%] flex items-center justify-center mt-8 flex-col">
        <ProductList data={data.data} />
      </section>
    </>
  );
}
