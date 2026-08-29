// Результаты зависят от запроса и от свежих цен — кэшировать нечего.
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/app/services/searchProducts";
import { getProductsByIds } from "@/app/services/getProductsByIds";
import ProductList from "@/components/ProductList";
import Loading from "@/app/loading";

const RESULTS_LIMIT = 24;

export const metadata: Metadata = {
  title: "Поиск — TipTop",
  description: "Поиск подарков и сувениров в интернет-магазине TipTop",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  if (!query) {
    return (
      <div className="w-full flex flex-col items-center py-24">
        <h1 className="text-calc3xl font-bold text-gray-700">Поиск по магазину</h1>
        <p className="mt-4 text-calcsm text-gray-500">
          Введите название товара в строке поиска наверху.
        </p>
      </div>
    );
  }

  const found = await searchProducts(query, RESULTS_LIMIT);
  const hits = found.data?.hits ?? [];
  const products = hits.length
    ? (await getProductsByIds(hits.map((hit) => hit.id))).data ?? []
    : [];

  return (
    <div className="w-full flex flex-col items-center">
      <section className="relative mt-8 mb-8 w-[96%] flex items-center justify-center flex-col">
        <div className="ribbon mt-5 absolute top-5 text-calc2xl left-0 z-50">
          <span className="px-6">Поиск</span>
        </div>

        <div className="w-full bg-white shadow-2xl px-6 md:px-10 py-20 rounded-md">
          <h1 className="text-calc2xl font-bold text-gray-700 text-center">
            «{query}»
          </h1>
          <p className="mt-2 text-center text-calcsm text-gray-500">
            {found.data?.count
              ? `Найдено товаров: ${found.data.count}`
              : "Ничего не нашлось"}
          </p>

          {products.length ? (
            <Suspense fallback={<Loading />}>
              <ProductList data={products} />
            </Suspense>
          ) : (
            <p className="mt-10 text-center text-calcsm text-gray-500">
              Попробуйте другое написание или более короткий запрос.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
