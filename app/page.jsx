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
        <div className="relative bg-blue" style={{ height: "90vh" }}>
          <FrontCard />
          <div className="hidden sm:bottom-0 md:block sm:absolute sm:w-3/4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
            <div className="h-32 bg-black flex justify-around items-center">
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
            <p className="font-bold text-xl">{props.name}</p>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
