import React from "react";
import Image from "next/image";

export default function Delivery() {
  return (
    <section className="relative mt-10 mb-8 w-[80%] flex items-center justify-center  flex-col ">
      <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
        <span className="py-1">Доставка</span>
      </div>
      <div className="w-full pt-20 pb-10 shadow-2xl flex flex-wrap text-[12px] text-center font-semibold justify-around items-center">
        <div className="w-[300px]  flex justify-center flex-col ">
          <div className="w-full flex justify-center  mb-3 ">
            <Image
              src={"/deliveryman1.jpg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full ">
            <p className="cursor-default text-lg">
              Бесплатная доставка до любой станции метро, в любое удобное для
              вас время.
            </p>
          </div>
        </div>
        <div className="w-[300px]  flex justify-center flex-col ">
          <div className="w-full flex justify-center mb-3  ">
            <Image
              src={"/deliveryman3.jpg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full ">
            <p className="cursor-default text-lg">
              Доставка до адреса в черте города Баку в любое удобное для вас
              время.
            </p>
          </div>
        </div>
        <div className="w-[300px]  flex justify-center flex-col">
          <div className="w-full flex justify-center mb-3  ">
            <Image
              src={"/deliveryman2.jpg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full  ">
            <p className="cursor-default text-lg">
              Отправка заказов в районы почтой или курьерскими службами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
