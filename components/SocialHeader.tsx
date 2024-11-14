import Link from "next/link";
import React from "react";
import Insta from "@/public/Insta";
import Face from "@/public/Face";
import Telegram from "@/public/Telegram";
import Tiktok from "@/public/Tiktok";
import Watsup from "@/public/Watsup";

export default function SocialHeader() {
  return (
    <ul className="flex mb-1  justify-center mr-7 ">
      <li className="w-6 h-6 hover:scale-125 transition-all duration-300">
        <Link href="#">
          <Insta />
        </Link>
      </li>
      <li className="w-6 h-6 hover:scale-125 transition-all duration-300">
        <Link href="#">
          <Face />
        </Link>
      </li>
      <li className="w-6 h-6 hover:scale-125 transition-all duration-300">
        <Link href="#">
          <Tiktok />
        </Link>
      </li>
      <li className="w-6 h-6 hover:scale-125 transition-all duration-300">
        <Link href="#">
          <Watsup />
        </Link>
      </li>
      <li className="w-6 h-6 hover:scale-125 transition-all duration-300">
        <Link href="#">
          <Telegram />
        </Link>
      </li>
    </ul>
  );
}
