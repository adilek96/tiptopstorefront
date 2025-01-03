"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SocialHeader from "./SocialHeader";
import { useCart } from "@/providers/CartProvider";

export default function Component() {
  const { cart } = useCart();

  const navItems = [
    {
      href: "/",
      title: "Новинки",
      color: "md:bg-blue-500",
    },
    {
      href: "/store",
      title: "Магазин",
      color: "md:bg-purple-600",
    },
    {
      href: "/contact",
      title: "Контакты",
      color: "md:bg-amber-600",
    },
  ];

  return (
    <header className="bg-white shadow-2xl w-full block-border">
      <div className="container h-32 mx-auto px-4 py-6 flex items-center justify-between ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex justify-center items-center">
              <Link href="/">
                <Image
                  src="/tiptop.svg"
                  alt="Store Logo"
                  width={200}
                  height={60}
                />
              </Link>
            </div>
            <nav className="mt-6 flex justify-center">
              <ul className="ribbon-nav ">
                {navItems.map((item) => {
                  return (
                    <li key={item.href}>
                      <Link
                        className="py-2 hover:text-amber-600 px-10 text-calc3xl"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:block"></div>

        <div className="absolute left-1/2 transform -translate-x-1/2 ">
          <Link href="/">
            <Image src="/tiptop.svg" alt="Store Logo" width={200} height={60} />
          </Link>
        </div>
        <Link
          href="/cart"
          className="text-gray-600 relative hover:text-amber-600 hover:scale-125 transition-all duration-300"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart?.cart.items.length > 0 ? (
            <div className="bg-red-500 w-4 h-4 absolute animate-bounce -top-3 -right-3 flex text-[12px]  justify-center items-center text-white  rounded-full">
              <p>{cart.cart.items.length}</p>
            </div>
          ) : (
            <></>
          )}

          <span className="sr-only">View cart</span>
        </Link>
      </div>
      {/* bottom */}
      <div className=" w-[100vw] relative flex justify-end ">
        <nav className="hidden md:block absolute left-7">
          <ul className="flex space-x-2">
            {navItems.map((item) => {
              return (
                <li
                  key={item.href}
                  className={`hover:scale-110 transition-all duration-300 ribbon-menu z-10 ${item.color}`}
                >
                  <Link href={item.href} className={` px-3   `}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SocialHeader size={6} />
      </div>
    </header>
  );
}
