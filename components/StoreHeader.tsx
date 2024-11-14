"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SocialHeader from "./SocialHeader";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavItems = () => (
    <>
      <li className="hover:scale-125 transition-all duration-300 ribbon-menu md:bg-blue-500">
        <Link
          href="/"
          className=" hover:animate-pulse px-3  transition-all duration-300 "
        >
          Новинки
        </Link>
      </li>
      <li className="hover:scale-125 transition-all duration-300 ribbon-menu md:bg-purple-600">
        <Link
          href="/store"
          className=" hover:animate-pulse px-3  transition-all duration-300 "
        >
          Магазин
        </Link>
      </li>
      <li className="hover:scale-125  transition-all duration-300 ribbon-menu md:bg-amber-600">
        <Link
          href="/contact"
          className=" hover:animate-pulse px-3  transition-all duration-300"
        >
          Контакты
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-2xl w-full">
      <div className="container h-32 mx-auto px-4 py-6 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="mt-6">
              <ul className="space-y-4">
                <NavItems />
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:block"></div>

        <div className="absolute left-1/2 transform -translate-x-1/2 ">
          <Link href="/">
            <Image
              src="/logotip.svg"
              alt="Store Logo"
              width={200}
              height={60}
            />
          </Link>
        </div>
        <Link
          href="/cart"
          className="text-gray-600 hover:text-amber-600 hover:scale-125 transition-all duration-300"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">View cart</span>
        </Link>
      </div>
      {/* bottom */}
      <div className=" w-[100vw] relative flex justify-end ">
        <nav className="hidden md:block absolute left-7">
          <ul className="flex space-x-2">
            <NavItems />
          </ul>
        </nav>
        <SocialHeader />
      </div>
    </header>
  );
}
