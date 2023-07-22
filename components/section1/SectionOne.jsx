import Link from "next/link";

const SectionOne = () => {
  const cards = [
    { name: "Laptops", href: "/laptops", image: "cardsImages/laptops.svg" },
    { name: "Phones", href: "/phones", image: "cardsImages/phones.svg" },
    {
      name: "Headphones",
      href: "/headphones",
      image: "cardsImages/headphones.svg",
    },
    { name: "Screens", href: "/screens", image: "cardsImages/screens.svg" },
  ];

  return (
    <>
      <div className="py-20 px-10 sm:px-20 md:px-32 xl:px-60">
        <h1 className=" font-semibold text-2xl">Shop our top categories</h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10 md:flex xl:justify-between">
          {cards.map((card, index) => {
            return (
              <>
                <div key={index}>
                  <Link href={card.href}>
                    <img
                      src={card.image}
                      className="w-48 hover:opacity-40 hover:w-52 transition-all duration-300 cursor-pointer"
                    />
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SectionOne;
