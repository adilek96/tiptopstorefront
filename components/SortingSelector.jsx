"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortingSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentSort, setCurrentSort] = useState("");

  useEffect(() => {
    const sortFromUrl = searchParams.get("sort") || "created_at";
    setCurrentSort(sortFromUrl);
  }, [searchParams]);

  const handleSortChange = (value) => {
    console.log("🔄 Sort changed to:", value);
    setCurrentSort(value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    const newUrl = `${pathname}?${params.toString()}`;
    console.log("🔗 Navigating to:", newUrl);
    
    // Принудительная перезагрузка
    router.push(newUrl);
    router.refresh();
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
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
