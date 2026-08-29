"use server";
import { getMedusaURL, getRegionId } from "@/lib/utils";

/**
 * Догружает товары по списку id из поиска.
 *
 * Meilisearch хранит только текст для поиска, без цен: цена зависит от региона
 * и списков скидок и протухла бы в индексе. Поэтому карточки рисуем по свежим
 * данным Medusa — теми же полями, что и остальные страницы каталога.
 */
export async function getProductsByIds(ids: string[]) {
  if (!ids.length) {
    return { ok: true, data: [], error: null };
  }

  const baseUrl = getMedusaURL();
  const params = new URLSearchParams({ region_id: getRegionId() });
  for (const id of ids) {
    params.append("id", id);
  }
  const url = new URL(`/store/products?${params.toString()}`, baseUrl);
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

    // Medusa возвращает товары в своём порядке — восстанавливаем ранжирование поиска.
    const byId = new Map<string, any>(
      (data.products ?? []).map((p: any) => [p.id, p])
    );
    const ordered = ids.map((id) => byId.get(id)).filter(Boolean);

    return { ok: true, data: ordered, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}
