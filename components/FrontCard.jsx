import Star from "@/components/Star";
import Image from "next/image";

const FrontCard = () => {
  return (
    <>
      <div style={{height:"70vh"}} className="flex justify-center sm:items-center py-10 px-32 bg-gray-200">
        <div className=" flex flex-col gap-5 md:gap-10">
          <h1 className="w-full text-4xl xl:text-5xl font-bold">
            SHOP COMPUTERS <br></br>& ACCESSORIES
          </h1>
          <p className="w-full xl:w-2/4 text-sm xl:text-normal font-medium">
            Shop laptops, desktops, monitors, tablets, PC gaming, hard drives
            and storage, and accessories and more
          </p>
          <button className="w-fit bg-black text-white px-3 py-2 transition-all duration-300 hover:bg-white hover:text-black border border-black">
            Learn More
          </button>
        </div>
        <div className="p-10 hidden xl:flex">
          <Image src="/card.svg" alt=""  width={800} height={800} />
        </div>
      </div>
    </>
  );
};

export default FrontCard;
