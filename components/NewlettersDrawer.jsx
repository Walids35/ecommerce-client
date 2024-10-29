import Image from "next/image";
import { useEffect, useState } from "react";

const NewlettersDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Open the popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      document.body.classList.add("overflow-hidden"); // Disable background scroll
    }, 2000);

    return () => {
      clearTimeout(timer); // Clear timer if component unmounts
      document.body.classList.remove("overflow-hidden"); // Re-enable background scroll
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden"); // Re-enable background scroll
  };

  function onSubmit(e) {
    e.preventDefault();
    closePopup();
  }

  return (
    <div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-40"
          onClick={closePopup}
        >
          {/* Popup Box */}
          <div
            className="bg-white p-6 shadow-lg max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-0 right-0 text-white bg-black p-2 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
              <div className="h-80 w-80 relative self-center">
                <Image
                  src={"/affiche-pc-promotion.jpg"}
                  fill
                  alt="promotion-image"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <h1 className="font-bold text-2xl">Newsletter MYSTORE</h1>
                <p>
                  Subscribe to our newsletter, get our latest news and enjoy our
                  exclusive offers, made specially for you.
                </p>
                <form onSubmit={onSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-gray-300 p-2 w-60"
                    required
                  />
                  <button type="submit" className="bg-black text-white px-3 py-2 mt-2 hover:bg-gray-900">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewlettersDrawer;
