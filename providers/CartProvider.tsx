"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { createCart } from "@/app/services/createCart";
import { getCartItems } from "../app/services/getCartItems";
import { addItemsToCart } from "@/app/services/addItemsToCart";
import { updateProductQuantity } from "@/app/services/updateProductQuantity";
import { deleteProductFromCart } from "@/app/services/deleteProductFromCart";
import { addShippingMethod } from "@/app/services/addShippingMethod";
import { completeCart } from "@/app/services/completeCart";

// Типы данных

interface CartContextType {
  cartId: string | null;
  cart: any;
  singleCartId: string | null;
  singleCart: any;
  loading: boolean;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  addSingleItem: (variantId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchSingleCart: () => Promise<void>;
  deleteProduct: (variantId: string) => Promise<void>;
  deleteSingleProduct: (variantId: string) => Promise<void>;
  resetCartState: () => void;
  addShippingMethodToCart: (
    optionId: string,
    shippingData: object,
    validCartId: string,
    validType: string
  ) => Promise<
    | {
        ok: boolean;
        data:
          | {
              ok: boolean;
              data: null;
              error: any;
            }
          | {
              ok: boolean;
              data: any;
              error: null;
            };
        error?: undefined;
      }
    | {
        ok: boolean;
        error: unknown;
        data?: undefined;
      }
    | undefined
  >;
  closeCart: (validCartId: string) => Promise<
    | {
        ok: boolean;
        error: any;
        data?: undefined;
      }
    | {
        ok: boolean;
        data:
          | {
              ok: boolean;
              data: null;
              error: any;
            }
          | {
              ok: boolean;
              data: any;
              error: null;
            };
        error?: undefined;
      }
    | undefined
  >;
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [singleCartId, setSingleCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<any>(null);
  const [singleCart, setSingleCart] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  // Проверка корзины и создание новой при необходимости

  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem("cart_id");
      const singleStoreCartId = localStorage.getItem("singleCart_id");

      if (storedCartId) {
        setCartId(storedCartId);
        await fetchCart(storedCartId);
      } else {
        const response = await createCart();
        const newCartId = response.data.cart.id;
        setCartId(newCartId);
        localStorage.setItem("cart_id", newCartId);
        await fetchCart(newCartId);
      }
      // для единичной покупки
      if (singleStoreCartId) {
        setSingleCartId(singleStoreCartId);
        await fetchSingleCart(singleStoreCartId);
      } else {
        const response = await createCart();
        const newSingleCartId = response.data.cart.id;
        setSingleCartId(newSingleCartId);
        localStorage.setItem("singleCart_id", newSingleCartId);
        await fetchSingleCart(newSingleCartId);
      }

      setLoading(false);
    };

    initializeCart();
  }, [trigger]);

  // Функция для получения содержимого корзины единичной покупки
  const fetchSingleCart = async (id: string | null = cartId) => {
    if (!id) return;
    try {
      const response = await getCartItems(id);
      if (response?.data) {
        setSingleCart(response.data);
      } else {
        console.error("Нет данных о корзине:", response);
      }
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  };

  // Добавление единичного товара в корзину
  const addSingleItem = async (variants: string, quantity: number) => {
    if (!singleCartId) return;

    if (singleCart.cart.items.length === 0) {
      try {
        const response = await addItemsToCart(variants, quantity, singleCartId);
        console.log(response);
        if (response.ok) {
          await fetchSingleCart(singleCartId);
        } else {
          console.error("Ошибка добавления товара:", response);
        }
      } catch (error) {
        console.error("Ошибка добавления товара:", error);
      }
    } else {
      for (const item of singleCart.cart.items) {
        try {
          await deleteSingleProduct(item.id);
        } catch (error) {
          console.error("Очистка корзины не удалась:", error);
        }
      }
      try {
        const response = await addItemsToCart(variants, quantity, singleCartId);
        if (response.ok) {
          await fetchSingleCart(singleCartId);
        } else {
          console.error("Ошибка добавления товара:", response);
        }
      } catch (error) {
        console.error("Ошибка добавления товара:", error);
      }
    }
  };
  // Удаление единичного товара из корзины
  const deleteSingleProduct = async (variants: string) => {
    if (!singleCartId) return;

    try {
      const response = await deleteProductFromCart(variants, singleCartId);
      if (response.ok) {
        await fetchSingleCart(singleCartId);
      } else {
        console.error("Ошибка добавления товара:", response);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
    }
  };

  // Функция для получения содержимого корзины
  const fetchCart = async (id: string | null = cartId) => {
    if (!id) return;
    try {
      const response = await getCartItems(id);
      if (response?.data) {
        setCart(response.data);
      } else {
        console.error("Нет данных о корзине:", response);
      }
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  };
  // Добавление товара в корзину
  const addItem = async (variants: string, quantity: number) => {
    if (!cartId) return;
    try {
      const response = await addItemsToCart(variants, quantity, cartId);
      if (response.ok) {
        await fetchCart(cartId);
      } else {
        console.error("Ошибка добавления товара:", response);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
    }
  };

  // удаление продукта

  const deleteProduct = async (variants: string) => {
    if (!cartId) return;

    try {
      const response = await deleteProductFromCart(variants, cartId);
      if (response.ok) {
        await fetchCart(cartId);
      } else {
        console.error("Ошибка добавления товара:", response);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
    }
  };

  // обновление количества продукта

  const updateQuantity = async (variants: string, quantity: number) => {
    if (!cartId) return;

    if (quantity <= 0) {
      await deleteProduct(variants);
    }

    try {
      const response = await updateProductQuantity(variants, quantity, cartId);
      if (response.ok) {
        await fetchCart(cartId);
      } else {
        console.error("Ошибка добавления товара:", response);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
    }
  };

  // добавления опции доставки

  const addShippingMethodToCart = async (
    optionId: string,
    shippingData: object,
    validCartId: string,
    validType: string
  ) => {
    if (!validCartId) return;
    try {
      const response = await addShippingMethod(
        optionId,
        shippingData,
        validCartId
      );
      if (response.ok) {
        if (validType !== "multi") {
          await fetchSingleCart(validCartId);
        } else {
          await fetchCart(validCartId);
        }

        return { ok: true, data: response };
      } else {
        console.error("Ошибка добавления метода доставки:", response);
        return { ok: false, error: response };
      }
    } catch (error) {
      console.error("Ошибка добавления метода доставки:", error);
      return { ok: false, error };
    }
  };

  const closeCart = async (validCartId: string) => {
    if (!validCartId) return;

    try {
      const response = await completeCart(validCartId);
      if (response.error) {
        console.error("Ошибка завершения корзины:", response.error);
        return { ok: false, error: response.error };
      }
      console.log("Корзина успешно завершена", response);
      return { ok: true, data: response };
    } catch (error) {
      console.error("Ошибка завершения корзины:", error);
      return { ok: false, error };
    }
  };

  // сброс состояния
  const resetCartState = () => {
    setTrigger(!trigger);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        loading,
        singleCartId,
        singleCart,
        fetchSingleCart,
        addSingleItem,
        deleteSingleProduct,
        addItem,
        updateQuantity,
        fetchCart,
        deleteProduct,
        closeCart,
        addShippingMethodToCart,
        resetCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
};
