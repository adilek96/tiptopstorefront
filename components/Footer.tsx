import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" bg-white shadow-top  py-5 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-20">
        <div className="flex  flex-col items-center md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
          {/* Logo */}
          <div className="flex items-start justify-center w-full md:w-auto md:justify-start">
            <Link href="/" className="flex  flex-col justify-start">
              <Image
                src="/logotip.svg"
                alt="Store Logo"
                width={250}
                height={40}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex  flex-col justify-center items-center md:items-start space-y-4">
            <Link
              href="/contact#about-us"
              className="hover:text-amber-600 transition-colors"
            >
              Контакты
            </Link>
            <Link
              href="/store"
              className="hover:text-amber-600 transition-colors"
            >
              Магазин
            </Link>
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Новинки
            </Link>
          </nav>

          {/* Additional Links */}
          <nav className="flex  flex-col justify-center items-center md:items-start space-y-4">
            {/* <Link
              href="/profile"
              className="hover:text-amber-600 transition-colors"
            >
              Личный кабинет
            </Link> */}
            <Link
              href="/contact#delivery"
              className="hover:text-amber-600 transition-colors"
            >
              Доставка
            </Link>
            <Link
              href="/contact#refound-policy"
              className="hover:text-amber-600 transition-colors"
            >
              Политика возрата
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12">
          <p className="text-sm cursor-default">
            &copy; {new Date().getFullYear()} TipTop.az. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
