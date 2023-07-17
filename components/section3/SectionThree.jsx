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
    </>
  );
};

export default SectionThree;
