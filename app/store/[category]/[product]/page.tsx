import { ShoppingCart, Pointer } from "lucide-react";
import { getProduct } from "@/app/services/getProduct";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ImageSlider from "@/components/ImageSlider";

export default async function Page({ params }: { params: any }) {
  const slug = await params;

  const data = await getProduct(slug.product);

  if (!data) {
    return <div>Загрузка</div>;
  }

  if (!data.data.product && data.data.type === "not_found") {
    return <div>Продукт не найден</div>;
  }
  const product = data.data.product;

  return (
    <div className="w-full flex flex-col justify-center items-center my-10 cursor-default">
      <section className="flex flex-row bg-white w-[95%] shadow-xl rounded-md z-10 py-16 flex-wrap gap-10 justify-center ">
        <div className="mdx:w-[40%] px-3 w-full">
          <ImageSlider images={product.images} thumbnail={product.thumbnail} />
        </div>
        <div className="mdx:w-[40%] w-full px-10 mdx:px-1 flex flex-col justify-between gap-10 items-center md:py-14">
          <div className="w-full">
            <div>
              <h1 className="text-calc3xl font-bold text-gray-700">
                {product.title}
              </h1>
              <p className="text-calcsm text-gray-600">{product.subtitle}</p>
            </div>

            <div className="mt-5">
              <h3 className="text-calclg font-semibold mb-2 text-gray-600">
                Вариация:
              </h3>
              <div className="flex gap-2 flex-wrap ">
                {product.variants[0].options.map(
                  (variant: any, index: string) => (
                    <div
                      key={index}
                      className={` border-[2px] px-3 py-2 h-10 rounded-md flex justify-center items-center text-calcsm  font-semibold text-gray-600 hover:text-amber-600 hover:scale-105  transition-all duration-300 `}
                    >
                      <p className="pr-1">{variant.option.title}:</p>
                      <p>{variant.value}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex space-x-2">
            {product.tags.map((tag: any, index: number) => (
              <div
                key={index}
                className={` border-[2px] px-3 py-2 h-10 rounded-md flex justify-center items-center text-calcsm  font-semibold text-gray-600 hover:text-amber-600 hover:scale-5 transition-all duration-300  `}
              >
                <p>{tag.value}</p>
              </div>
            ))}
          </div>
          <div className="w-full">
            <p className="text-3xl font-bold text-nowrap text-green-900 mb-5">
              Цена {product.variants[0].calculated_price.calculated_amount}
              &#8380;
            </p>

            <div className="flex space-x-2 ">
              <Button className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 text-calclg text-white ">
                <ShoppingCart className="mr-2 h-6 w-6 " />
                <span>Добавить в корзину</span>
              </Button>
              <Button className="bg-amber-600 sm:flex-1  h-12 hover:bg-amber-700 border-amber-700 text-white  ">
                <Pointer className="h-4 w-4" />{" "}
                <span className="sm:block hidden">Купить сейчас</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 relative bg-white w-[95%] shadow-xl rounded-md z-10 py-20 px-10">
        <div>
          <div className="ribbon text-calcxl py-3 mt-5  absolute top-10 left-0 z-50">
            <span className=" px-16">Описание</span>
          </div>

          <p className="text-gray-600 mt-10">{product.description}</p>
        </div>
        <div className="mt-8 mx-auto bg-gray-200 md:w-[60%] w-[100%] shadow-xl rounded-md z-10  px-10 box">
          <div className="w-full flex justify-center items-center">
            <div className="ribbon-delivery flex justify-center text-calcxl  z-50">
              <p className="my-5 px-2 py-4 text-center text-calclg  ">
                Характиристика упаковки
              </p>
            </div>
          </div>
          <div className="container mx-auto p-4">
            {product.weight === null ? (
              <div className="py-32 flex justify-center items-center  font-semibold text-calcxl">
                <p className="text-center">
                  Ууупс. Похоже мы забыли указать характиристики товара.
                </p>
              </div>
            ) : (
              <Table className="w-full max-w-md mx-auto mb-10">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Вес</TableCell>
                    <TableCell>{product.weight}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Длинна</TableCell>
                    <TableCell>{product.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Высота</TableCell>
                    <TableCell>{product.height}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Ширина</TableCell>
                    <TableCell>{product.width}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
