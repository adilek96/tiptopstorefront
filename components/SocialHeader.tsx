import Link from "next/link";
import React from "react";
import Insta from "@/public/Insta";
import Face from "@/public/Face";
import Telegram from "@/public/Telegram";
import Tiktok from "@/public/Tiktok";
import Watsup from "@/public/Watsup";

const sosialIcons = [
  {
    url: "#",
    icon: <Insta />,
  },
  {
    url: "#",
    icon: <Face />,
  },
  {
    url: "#",
    icon: <Tiktok />,
  },
  {
    url: "#",
    icon: <Watsup />,
  },
  {
    url: "#",
    icon: <Telegram />,
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
