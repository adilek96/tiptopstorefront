import CheckOut from "@/components/CheckOut";

export default async function Checkout({ params }: { params: any }) {
  const slug = await params;
  return (
    <div className="mx-auto px-4 py-8  ">
      <div className="mx-auto px-4 py-8  ">
        <CheckOut slug={slug} />
      </div>
    </div>
  );
}
