import Link from "next/link";
import React from "react";
import Insta from "@/public/Insta";
import Face from "@/public/Face";
import Tiktok from "@/public/Tiktok";
import Watsup from "@/public/Watsup";

const sosialIcons = [
  {
    url: "https://www.instagram.com/tiptop_az",
    icon: <Insta />,
  },
  {
    url: "https://www.facebook.com/TipTopShop.az?mibextid=ZbWKwL",
    icon: <Face />,
  },
  {
    url: "https://www.tiktok.com/@tiptop.az",
    icon: <Tiktok />,
  },
  {
    url: "https://wa.me/+994553023230",
    icon: <Watsup />,
  },
];

export default function SocialHeader({ size }: any) {
  return (
    <ul className="flex mb-1  justify-center mr-7 ">
      {sosialIcons.map((item: any, i: number) => {
        return (
          <li
            key={i}
            className={`w-${size} h-${size}  hover:scale-125 transition-all duration-300`}
          >
            <Link href={item.url}>{item.icon}</Link>
          </li>
        );
      })}
    </ul>
  );
}
