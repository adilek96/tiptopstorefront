/**
 * Чтение цены варианта.
 *
 * Medusa считает цену под конкретный регион и присылает её в
 * calculated_price. Если у варианта нет цены в валюте региона — товар
 * завели, а цену проставить забыли, — приходит null. Раньше это роняло
 * страницу целиком: один такой вариант в списке, и белый экран вместо
 * магазина. Поэтому цену читаем только через эти помощники.
 */

export type VariantPrice = {
  /** Цена ниже обычной: показываем старую зачёркнутой и ленту «Распродажа». */
  isSale: boolean
  /** Цена до скидки — она же обычная цена, когда скидки нет. */
  original: number
  /** Сколько покупатель платит сейчас. */
  calculated: number
}

/**
 * Сумма или null.
 *
 * Через Number() напрямую нельзя: Number(null) — это 0, и вариант без цены
 * превратился бы в товар за ноль манат. Ноль при этом остаётся допустимой
 * ценой, поэтому пустые значения отсеиваем до преобразования.
 */
function amount(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

/** Цена варианта или null, если её нет. */
export function readPrice(variant: any): VariantPrice | null {
  const price = variant?.calculated_price

  if (!price) {
    return null
  }

  const original = amount(price.original_amount)
  const calculated = amount(price.calculated_amount)

  if (original === null && calculated === null) {
    return null
  }

  const before = original ?? (calculated as number)
  const now = calculated ?? (original as number)

  return {
    // Не по флагу прайс-листа: он лишь говорит, откуда взялась цена.
    // Товар, у которого цену завели только в прайс-листе и не завели
    // базовую, тоже приходит с этим флагом — и вся витрина оказывалась
    // «в распродаже», причём старая цена совпадала с новой. Скидка есть
    // только тогда, когда платить нужно меньше.
    isSale: now < before,
    original: before,
    calculated: now,
  }
}

/**
 * Первый вариант товара, который можно продать.
 *
 * Списки показывают товар одной карточкой по первому варианту. Если у
 * первого варианта цены нет, а у второго есть — покажем второй, вместо
 * того чтобы прятать товар целиком.
 */
export function findPricedVariant(product: any): any | null {
  const variants = Array.isArray(product?.variants) ? product.variants : []
  return variants.find((variant: any) => readPrice(variant)) ?? null
}
