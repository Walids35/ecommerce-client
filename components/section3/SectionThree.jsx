const SectionThree = () => {
  return (
    <>
      <div className="pb-20 px-10 sm:px-20 md:px-32 xl:px-60">
        <h1 className=" font-semibold text-2xl">Get Up to 70% off</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
          <img src="section3Images/leftImage.svg" className="w-full" alt="" />
          <div>
            <img src="section3Images/topRightImage.svg" alt="" />
            <img
              className="mt-5"
              src="section3Images/bottomRightImage.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="my-10 bg-sect4-img w-full text-center pt-40 text-white" style={{height: "500px"}}>
        <p className="font-bold text-4xl">GET 5% CASH BACK ON 200$</p>
        <p className="mt-2">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
        <button className="text-white border-white border-2 mt-10 py-3 px-6 rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:mt-8">Learn More</button>
        </div>
    </>
  );
};

export default SectionThree;
