import Star from "@/components/Star";
import Image from "next/image";

const FrontCard = () => {
  return (
    <>
      <div className="flex justify-center items-center py-10 px-32 bg-gray-200">
        <div className=" flex flex-col gap-10">
          <h1 className="text-6xl font-bold leading-tight">
            SHOP COMPUTERS <br></br>& ACCESSORIES
          </h1>
          <p className="w-2/4 font-medium">
            Shop laptops, desktops, monitors, tablets, PC gaming, hard drives
            and storage, and accessories and more
          </p>
          <button className="w-fit bg-black text-white px-3 py-2 transition-all duration-300 hover:bg-white hover:text-black border border-black">
            Learn More
          </button>
        </div>
        <div className="p-10 w-auto hidden md:relative col-span-2    md:flex md:justify-end">
          <Image src="/card.svg" alt="" width={800} height={800} />
        </div>
      </div>
    </>
  );
};

export default FrontCard;
