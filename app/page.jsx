"use client";
import FrontCard from "@/components/FrontCard";
import {
  TruckIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const FeaturesArray = [
  {
    icon: TruckIcon,
    name: "FreeShipping",
    description: "Free Shipping on all order",
  },
  {
    icon: QuestionMarkCircleIcon,
    name: "Online Support",
    description: "Technical Support 24/7",
  },
  {
    icon: CreditCardIcon,
    name: "Secure Payment",
    description: "Stripe payment & All cards accepted",
  },
];

export default function Home() {
  return (
    <>
      <div className="p-10">
        <div className="relative" style={{ height: "88vh" }}>
          <FrontCard />
          <div className="bottom-0 md:bottom-10 xl:bottom-20 2xl:bottom-32 absolute md:w-3/4 left-1/2 transform -translate-x-1/2">
            <div className="p-4 sm:p-8 md:p-10 bg-black flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-around md:items-center ">
              {FeaturesArray.map((value, index) => {
                return (
                  <Features
                    icon={value.icon}
                    name={value.name}
                    description={value.description}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-10">
          <h2
            style={{ whiteSpace: "nowrap" }}
            className="block text-xl font-semibold"
          >
            Shop By Categories
          </h2>
          <div className="bg-black w-full" style={{ height: "1px" }}></div>
        </div>
        <div className="mt-5 gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className="bg-gray-200 py-5 pl-5">
            <div className="flex flex-col items-end">
              <Image src="/categoriesImg/1.svg" width={300} height={300} />
            </div>
            <p className="font-medium text-xl">Ordinateur Portable</p>
          </div>
          <div className="bg-gray-200 py-5 pl-5">
            <div className="flex flex-col items-end">
              <Image src="/categoriesImg/2.png" width={280} height={280} />
            </div>
            <p className="font-medium text-xl">Accessoires & peripheriques</p>
          </div>
          <div className="bg-gray-200 py-5 pl-5 flex flex-col justify-center">
            <div className="flex flex-col items-center py-10">
              <Image src="/categoriesImg/3.png" width={200} height={200} />
            </div>
            <p className="font-medium text-xl">Ordinateur De Bureau</p>
          </div>
          <div className="bg-gray-200 py-5 pl-5 flex flex-col justify-center">
            <div className="flex flex-col items-center py-20">
              <Image src="/categoriesImg/4.png" width={200} height={200} />
            </div>
            <p className="font-medium text-xl">Composants Informatiques</p>
          </div>
        </div>
        {/**Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          <div className="bg-gray-200 flex justify-center items-center py-4 md:py-2 xl:py-0">
            <div className="ml-8">
              <h2 className="font-bold text-2xl">MY STORE BASICS</h2>
              <p className="w-3/4 text-sm mt-2">
                Shop today's Deals, Lightning Deals, and limited-time discounts
              </p>
              <button
                type="button"
                className="flex mt-2 items-center gap-1 text-gray-500 hover:border-b-2 hover:border-gray-500 transition-all duration-200"
              >
                <p className="text-sm">See More</p>
                <p> &rarr;</p>
              </button>
            </div>
            <div>
              <Image src="/startbestdeals.svg" width={200} height={200} />
            </div>
          </div>
          <div className="bg-gray-200 pl-10 flex justify-start items-center py-4 md:py-2 xl:py-0">
            <div className="">
              <h2 className="font-bold text-2xl">Deals & Promotions</h2>
              <p className="w-full text-sm mt-2">
                Shop today's Deals, Lightning Deals, and limited-time discounts
              </p>
              <button
                type="button"
                className="flex mt-2 items-center gap-1 text-gray-500 hover:border-b-2 hover:border-gray-500 transition-all duration-200"
              >
                <p className="text-sm">See More</p>
                <p> &rarr;</p>
              </button>
            </div>
          </div>
        </div>
        {/**Discover Card */}
        <div className="bg-gray-200 h-80 px-5 pt-5 flex justify-center mt-10">
              <div className="flex flex-col justify-center gap-3">
                <p className="text-gray-500 font-semibold text-lg">Discover MYSTORE</p>
                <h1 className="font-bold text-4xl">MYSTORE DELIVERS<br></br>TO YOU</h1>
                <p className="text-sm w-3/4">Wordwild shipping. We ship over 100 countries and regions, right to your doorstep.</p>
                <div><button className="bg-black py-2 px-3 text-white mt-2">Learn More</button></div>
              </div>
              <div className="hidden md:flex flex-col justify-end">
                <Image src="/dogImage.svg" width={500} height={500} />
              </div>
        </div>
        {/**Best Products & Deals */}
        <div className="flex items-center gap-3 mt-10">
          <h2
            style={{ whiteSpace: "nowrap" }}
            className="block text-xl font-semibold"
          >
            Best Products & Deals
          </h2>
          <div className="bg-black w-full" style={{ height: "1px" }}></div>
        </div>
      </div>
      {/** <Footer />*/}
    </>
  );
}

function Features({ ...props }) {
  const Icon = props.icon;
  return (
    <>
      <div key={props.key}>
        <div className="flex w-fit gap-5 text-white items-center">
          <Icon className="w-14" />
          <div>
            <p className="font-bold text-normal xl:text-xl">{props.name}</p>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
