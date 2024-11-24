import type { Metadata } from "next";
import { getCategories } from "@/app/services/getCategories";

export const metadata: Metadata = {
  title: "TipTop - онлайн магазин подарков и сувениров в Азербайджане",
  description:
    "TipTop - онлайн магазин подарков, сувениров, декоративного освещения в Азербайджане",
};

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getCategories();

  return (
    <div className="flex justify-center flex-col items-center">{children}</div>
  );
}
