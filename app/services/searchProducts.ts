"use server";
import { getMedusaURL } from "@/lib/utils";

export type SearchHit = {
  id: string;
  handle: string;
  title: string;
  subtitle: string | null;
  thumbnail: string | null;
  category_handles: string[];
};

/**
 * Поиск по каталогу. Ходит в Medusa, а не напрямую в Meilisearch:
 * поисковый движок закрыт внутри сети сервера и наружу не выставлен.
 */
export async function searchProducts(query: string, limit = 20, offset = 0) {
  const term = query.trim();
  if (!term) {
    return { ok: true, data: { hits: [] as SearchHit[], count: 0 }, error: null };
  }

  const baseUrl = getMedusaURL();
  const params = new URLSearchParams({
    q: term,
    limit: String(limit),
    offset: String(offset),
  });
  const url = new URL(`/store/search?${params.toString()}`, baseUrl);
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": `${key}`,
      },
      cache: "no-store",
    });

    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };

    return {
      ok: true,
      data: { hits: (data.hits ?? []) as SearchHit[], count: data.count ?? 0 },
      error: null,
    };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}
