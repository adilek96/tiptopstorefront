import React from "react";
import Image from "next/image";

export default function Delivery() {
  return (
    <section className="relative mt-10 mb-8 w-[80%] flex items-center justify-center bg-gray-100  flex-col  box z-10">
      <div className="w-full flex justify-center items-center">
        <div className="ribbon-delivery flex justify-center text-calc2xl  z-50">
          <span className="py-4 px-2">Доставка</span>
        </div>
      </div>

      <div className="w-full h-full pt-5 pb-20 shadow-2xl flex flex-wrap text-[12px] text-center  font-semibold justify-around items-center ">
        <div className="w-[300px]  flex justify-center items-center flex-col">
          <div className=" flex justify-center items-center mb-3 w-[200px] h-[240px]">
            <Image
              src={"/del3.svg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full ">
            <p className="cursor-default text-lg font-bold">
              Доставка до адреса в черте города Баку в любое удобное для вас
              время.
            </p>
          </div>
        </div>
        <div className="w-[300px]  flex justify-center items-center flex-col ">
          <div className=" flex justify-center items-center  mb-3 w-[200px] h-[240px] ">
            <Image
              src={"/del1.svg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full ">
            <p className="cursor-default pt-5 text-lg font-bold">
              Бесплатная доставка до любой станции метро, в любое удобное для
              вас время.
            </p>
          </div>
        </div>

        <div className="w-[300px]  flex justify-center flex-col items-center">
          <div className="flex justify-center items-center mb-3 w-[200px] h-[240px] ">
            <Image
              src={"/del2.svg"}
              alt="Futuristic delivery"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full  ">
            <p className="cursor-default text-lg font-bold">
              Отправка заказов в районы почтой или курьерскими службами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
