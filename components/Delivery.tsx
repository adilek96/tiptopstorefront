import React from "react";
import DeliveryTruck from "@/public/DeliveryTruck";

export default function Delivery() {
  return (
    <section className="relative mt-10 mb-8 w-[80%] flex items-center justify-center  flex-col ">
      <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
        <span className="py-1">Доставка</span>
      </div>
      <div className="w-full py-20 bg-gray-200 flex flex-wrap text-[12px] text-center font-semibold justify-around items-center">
        <div className="w-64 h-48 flex justify-center flex-col ">
          <div className="w-full h-32 bg-red-500 "></div>
          <div className="w-full h-16">
            <p className="cursor-default">
              Бесплатная доставка до любой станции метро, в любое удобное для
              вас время.
            </p>
          </div>
        </div>
        <div className="w-64 h-48 flex justify-center flex-col ">
          <div className="w-full h-32 ">
            <DeliveryTruck />
          </div>
          <div className="w-full h-16 ">
            <p className="cursor-default">
              Доставка до адреса в черте города Баку в любое удобное для вас
              время.
            </p>
          </div>
        </div>
        <div className="w-64 h-48 flex justify-center flex-col">
          <div className="w-full h-32 bg-red-500 "></div>
          <div className="w-full h-16 ">
            <p className="cursor-default">
              Отправка заказов в районы почтой или курьерскими службами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
