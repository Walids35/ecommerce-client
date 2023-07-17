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
      <div className="px-60 py-20">
        <h1 className="font-bold text-2xl">Shop our top categories</h1>
        <div className="mt-10 flex justify-between">
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
