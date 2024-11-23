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
  cartProducts: any;
  loading: boolean;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  deleteProduct: (variantId: string) => Promise<void>;
  addShippingMethodToCart: (
    optionId: string,
    shippingData: object
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
  closeCart: () => Promise<
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
  const [cart, setCart] = useState<any>(null);
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Проверка корзины и создание новой при необходимости
  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem("cart_id");

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

      setLoading(false);
    };

    initializeCart();
  }, []);

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
    shippingData: object
  ) => {
    if (!cartId) return;
    try {
      const response = await addShippingMethod(optionId, shippingData, cartId);
      if (response.ok) {
        // console.log("Метод доставки успешно добавлен", response);
        await fetchCart(cartId);
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

  const closeCart = async () => {
    if (!cartId) return;

    try {
      const response = await completeCart(cartId);
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

  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        cartProducts,
        loading,
        addItem,
        updateQuantity,
        fetchCart,
        deleteProduct,
        closeCart,
        addShippingMethodToCart,
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
