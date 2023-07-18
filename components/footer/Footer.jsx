const Footer = () => {
  return (
    <>
      <div className="pb-20 px-10 sm:px-20 md:px-32 xl:px-60">
        <div className="w-full h-0.5 bg-slate-300 rounded-full"></div>
        <div className="grid p-10 grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-2">
            <img src="/mini-logo.svg" alt="" className="w-14" />
            <p className="w-72 mt-5 text-sm">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            <p className="mt-5 font-medium">Accepted Payments</p>
            <img src="/payment-methods.svg" className="w-40 mt-2" alt="" />
          </div>
          <div>
            <h2 className="font-medium">Department</h2>
            <p className="mt-2">test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
          <div>
            <h2 className="font-medium">About Us</h2>
            <p className="mt-2">test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
          <div>
            <h2 className="font-medium">Services</h2>
            <p className="mt-2">test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
          <div>
            <h2 className="font-medium">Help</h2>
            <p className="mt-2">test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
        </div>
        <div className="w-full h-0.5 bg-slate-300 rounded-full"></div>
        <div className="flex text-sm gap-10 my-3 justify-end">
          <p>Terms of Service</p>
          <p>Prvacy & Policy</p>
          <p>All right reserved by MYSTORE | 2023</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
