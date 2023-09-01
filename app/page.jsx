"use client";
import FrontCard from "@/components/FrontCard";
import {
  TruckIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

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
