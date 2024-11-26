"use client";
import React, { useState } from "react";

import Image from "next/image";

export default function ImageSlider({
  images,
  thumbnail,
}: {
  images: any;
  thumbnail: string;
}) {
  const [mainImage, setMainImage] = useState(thumbnail);
  console.log(mainImage);
  return (
    <div className="space-y-4 min-w-[360px]  px-4 sm:px-0">
      <div className="relative aspect-square border-[4px] rounded-lg border-amber-500">
        <Image
          src={mainImage}
          alt="Product image"
          fill
          loading="lazy"
          placeholder="empty"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-2">
        {images &&
          images.map((img: any, index: number) => (
            <button
              key={index}
              onClick={() => setMainImage(img.url)}
              className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Image
                src={img.url}
                alt={`Product image thumbnail ${index + 1}`}
                fill
                loading="lazy"
                placeholder="empty"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
      </div>
    </div>
  );
}
