import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="w-[96%]  flex justify-around items-center h-[300px]  md:h-[500px] relative bg-black bg-cover bg-center mt-8">
      <div className="relative w-[500px] h-[80%] hidden md:block   ">
        <Image src={"/gifts.svg"} fill alt="bf text" />
      </div>

      <div className="relative w-[800px] h-full  ">
        <Image src={"/saletext.svg"} fill alt="bf text" />
      </div>
      <div className="relative w-[500px] h-[80%] lg:block hidden  ">
        <Image src={"/gifts.svg"} fill alt="bf text" />
      </div>
    </div>
  );
}
