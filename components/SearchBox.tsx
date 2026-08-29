"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { searchProducts, type SearchHit } from "@/app/services/searchProducts";

const DEBOUNCE_MS = 300;
const SUGGESTION_LIMIT = 6;

export default function SearchBox({ className = "" }: { className?: string }) {
  const [term, setTerm] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Подсказки на каждое нажатие клавиши, но с паузой: иначе на каждый
  // символ уходил бы отдельный запрос к бэкенду.
  useEffect(() => {
    const query = term.trim();

    if (query.length < 2) {
      setHits([]);
      setCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    let cancelled = false;

    const timer = setTimeout(async () => {
      const response = await searchProducts(query, SUGGESTION_LIMIT);
      // Ответ на устаревший запрос игнорируем — иначе он может перезаписать
      // результат более свежего ввода.
      if (cancelled) return;

      setHits(response.data?.hits ?? []);
      setCount(response.data?.count ?? 0);
      setLoading(false);
      setOpen(true);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [term]);

  // Закрытие по клику вне поля и по Escape.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const goToResults = () => {
    const query = term.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const openProduct = (hit: SearchHit) => {
    setOpen(false);
    setTerm("");
    // Тот же вид ссылки, что и у карточек в каталоге: страница товара
    // читает только последний сегмент и ищет товар по id.
    router.push(`/store/products/${hit.id}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToResults();
        }}
        className="relative"
      >
        <label htmlFor="site-search" className="sr-only">
          Поиск по товарам
        </label>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          id="site-search"
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => hits.length && setOpen(true)}
          placeholder="Поиск товаров"
          autoComplete="off"
          className="w-full h-10 pl-9 pr-9 rounded-full border-2 border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none transition-colors focus:border-amber-500 focus:bg-white"
        />
        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 animate-spin" />
        ) : term ? (
          <button
            type="button"
            onClick={() => {
              setTerm("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Очистить поиск"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {open && term.trim().length >= 2 ? (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
          {hits.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-gray-500">
              {loading ? "Ищем…" : "Ничего не нашлось"}
            </p>
          ) : (
            <>
              <ul className="max-h-96 overflow-y-auto">
                {hits.map((hit) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => openProduct(hit)}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-amber-50"
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-gray-100">
                        {hit.thumbnail ? (
                          <Image
                            src={hit.thumbnail}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-gray-700">
                          {hit.title}
                        </span>
                        {hit.subtitle ? (
                          <span className="block truncate text-xs text-gray-500">
                            {hit.subtitle}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="block w-full border-t border-gray-100 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
              >
                Показать все результаты{count > hits.length ? ` (${count})` : ""}
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
