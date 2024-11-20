import CarouselJs from "@/components/CarouselJs";
import Delivery from "@/components/Delivery";
import TopSection from "@/components/TopSection";

export default async function Home() {
  return (
    <div className="w-full flex-col flex items-center   justify-center">
      <section className="relative  w-[96%] flex items-center justify-center mt-8  flex-col ">
        <div className="ribbon  mt-5  absolute top-4 text-calc2xl left-0 z-50">
          <span className="px-6">Новинки</span>
        </div>
        <CarouselJs />
      </section>
      {/* 2 */}
      <Delivery />
      {/* 3 */}
      <TopSection />
    </div>
  );
}
