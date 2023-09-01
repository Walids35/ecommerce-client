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
          <h2 style={{ whiteSpace: "nowrap" }} className="block text-xl font-semibold">
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
