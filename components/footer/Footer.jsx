const Footer = () => {
  return (
    <>
      <div className="pb-10 px-10 sm:px-20 md:px-32 xl:px-60  bg-neutral-900 pt-10 text-white">
        <div className="w-full h-0.5 bg-slate-300 rounded-full"></div>
        <div className="grid p-10 grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-2">
            <img src="/mini-logo-white.svg" alt="" className="w-14 " />
            <p className="w-72 mt-5 text-sm text-justify leading-relaxed">At MYSTORE, we bring you the latest tech innovations to simplify your life. Whether it's computers, smartphones, tablets, or accessories, we carefully select the best products to meet your needs, offering unbeatable prices and a customer service that’s always here to help.</p>
            <p className="mt-5 font-medium">Accepted Payments</p>
            <img src="/payment-methods.svg" className="w-40 mt-2" alt="" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-500">Need help?</h2>
            <div className="flex flex-col gap-2 mt-5 text-sm">
            <p>Help Center</p>
            <p>Shipping & Returns</p>
            <p>FAQ</p>
            <p>Contact Us</p>
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="font-semibold text-gray-500">Popular Categories</h2>
            <div className="flex flex-col gap-2 mt-5 text-sm">
              <p>Laptops</p>
              <p>Tablets</p>
              <p>Smartphones</p>
              <p>Accessories</p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-500">Join Our Community</h2>
            <div className="flex flex-col gap-2 mt-5 text-sm">
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>
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
