import React from "react";
import { getProducts } from "@/app/services/getProducts";
import ProductList from "@/components/ProductList";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const slug = (await params).category;

  const data = await getProducts(slug);

  return (
    <section className="relative  w-[96%] flex items-center justify-center mt-8  flex-col ">
      <ProductList data={data.data} />
    </section>
  );
}
