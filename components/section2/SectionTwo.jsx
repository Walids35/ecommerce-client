import ProductCard from "../product/ProductCard";

const SectionTwo = () => {
  const productCards = [
    {
      title: "JBL Pro 2",
      price: 200.99,
      description: "Noise Cancellation Feature",
      stars: 4,
      reviewsNumber: 121,
    },
    {
      title: "JBL Pro 2",
      price: 200.99,
      description: "Noise Cancellation Feature",
      stars: 4,
      reviewsNumber: 121,
    },
    {
      title: "JBL Pro 2",
      price: 200.99,
      description: "Noise Cancellation Feature",
      stars: 4,
      reviewsNumber: 121,
    },
  ];

  return (
    <>
      <div className="pb-20 px-10 sm:px-20 md:px-32 xl:px-60">
        <h1 className=" font-semibold text-2xl">New Arrivals</h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {productCards.map((product, index) => {
            return <ProductCard key={index} product={product} />
        })}
        </div>
      </div>
    </>
  );
};

export default SectionTwo;
