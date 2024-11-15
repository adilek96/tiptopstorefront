"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SortingSelector() {
  const router = useRouter();
  return (
    <Select
      onValueChange={(e) => {
        Cookies.set("sortOption", e);
        router.refresh();
      }}
    >
      <SelectTrigger className="w-[180px] bg-white shadow-lg z-10">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="created_at">Дата &#8593;</SelectItem>
        <SelectItem value="-created_at">Дата &#8595;</SelectItem>
        <SelectItem value="title">Название</SelectItem>
        {/* <SelectItem value="variants.prices.amount">Цена &#8593;</SelectItem>
        <SelectItem value="-variants.prices.amount">Цена &#8595;</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
