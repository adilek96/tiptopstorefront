"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CategorySelector({ data }) {
  const router = useRouter();
  const categories = data.data.product_categories;

  return (
    <Select onValueChange={(e) => router.push(e)}>
      <SelectTrigger className="w-[180px] bg-white shadow-lg z-10">
        <SelectValue placeholder="Категория" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((item) => {
          return (
            <SelectItem key={item.id} value={`/store/${item.handle}`}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
