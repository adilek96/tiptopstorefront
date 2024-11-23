"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";

export function Confirm({ isComplete }: { isComplete: boolean }) {
  const { resetCartState } = useCart();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    resetCartState();
  };
  return (
    <Dialog open={isComplete} onOpenChange={() => handleNavigation("/store")}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="order-confirmation-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            Заказ успешно оформлен!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription
          id="order-confirmation-description"
          className="text-center py-4"
        >
          Спасибо за ваш заказ! В ближайшее время мы свяжемся с вами по
          указанному номеру телефона для подтверждения заказа.
        </DialogDescription>
        <DialogFooter>
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300  font-semibold"
            onClick={() => handleNavigation("/store")}
          >
            Посмотреть другие товары
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
