import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  CpuChipIcon,
  ComputerDesktopIcon,
  RectangleGroupIcon,
  TvIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const products = [
  {
    name: "Ordinateur Portable",
    description: "PC Portable - PC Portable Pro - PC Portable Gamer",
    href: "/category/64b5771bc77e31b3067398f9",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Accessoires et Peripheriques",
    description: "Headphones - Sacoche - Mouse - Keyboard",
    href: "/category/64b5bf7e9675ed81b8afb815",
    icon: RectangleGroupIcon,
  },
  {
    name: "Ordinateur de Bureau",
    description: "Ecran - PC de Bureau - PC de Bureau Gamer",
    href: "/category/ordinateur-de-bureau",
    icon: TvIcon,
  },
  {
    name: "Composants Informatique",
    description: "Disque Dur - Carte Mere - Carte Graphique",
    href: "/category/composants-informatiques",
    icon: CpuChipIcon,
  },
  {
    name: "Telephonie",
    description: "Telephone Portable et Smartphone",
    href: "/category/649859618d58b1d82eae1708",
    icon: DevicePhoneMobileIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DialogMobile = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="mini-logo.svg" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Categories
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {products.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  All Products
                </a>
              </div>
            </div>
            <div className="w-full flex flex-row gap-2 justify-center items-end" style={{height:"70vh"}}>
                  <Link href="/wishlist"
                    type="button"
                    className="rounded-md w-full text-center py-2 border-black border-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                    type="button"
                    className="rounded-md w-full text-center py-2 bg-black border-2 text-white"
                  >
                    Cart
                  </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default DialogMobile;
