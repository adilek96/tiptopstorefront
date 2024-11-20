"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { createCart } from "@/app/services/createCart";
import { getCartItems } from "../app/services/getCartItems";
import { addItemsToCart } from "@/app/services/addItemsToCart";

// Типы данных
interface CartContextType {
  cartId: string | null;
  cart: any;
  loading: boolean;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<any>(null);
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
      if (response?.data) {
        await fetchCart(cartId);
      } else {
        console.error("Ошибка добавления товара:", response);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, cart, loading, addItem, fetchCart }}>
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
