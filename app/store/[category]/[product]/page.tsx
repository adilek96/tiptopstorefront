import { getProduct } from "@/app/services/getProduct";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ImageSlider from "@/components/ImageSlider";
import ProductButtons from "@/components/ProductButtons";
import ProductVariationsSection from "@/components/ProductVariationsSection";

export default async function Page({ params }: { params: any }) {
  const slug = await params;

  const data = await getProduct(slug.product);

  if (!data) {
    return <div>Загрузка...</div>;
  }

  if (!data.data.product && data.data.type === "not_found") {
    return <div>Продукт не найден</div>;
  }
  const product = data.data.product;

  // console.log(product.variants[0].options);

  return (
    <div className="w-full flex flex-col justify-center items-center my-10 cursor-default">
      <ProductVariationsSection product={product} />

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
