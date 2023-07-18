
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { CpuChipIcon, ComputerDesktopIcon, RectangleGroupIcon, TvIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid'

const category = [
    {
      name: 'Ordinateur Portable',
      description: 'PC Portable - PC Portable Pro - PC Portable Gamer',
      href: '/category/ordinateur-portable',
      icon: ComputerDesktopIcon,
    },
    {
      name: 'Accessoires et Peripheriques',
      description: 'Headphones - Sacoche - Mouse - Keyboard',
      href: '/category/accessoires-et-peripheriques',
      icon: RectangleGroupIcon,
    },
    {
      name: 'Ordinateur de Bureau',
      description: 'Ecran - PC de Bureau - PC de Bureau Gamer',
      href: '/category/ordinateur-de-bureau',
      icon: TvIcon,
    },
    {
      name: 'Composants Informatique',
      description: 'Disque Dur - Carte Mere - Carte Graphique',
      href: '/category/composants-informatiques',
      icon: CpuChipIcon,
    },
    {
      name: 'Telephonie',
      description: 'Telephone Portable et Smartphone',
      href: '/category/telephonie',
      icon: DevicePhoneMobileIcon,
    },
  ]

const PopoverButton = () => {
  return (
    <div className=" top-16 w-full max-w-sm px-4">
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Categories
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full w-auto mt-7 overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4 grid grid-cols-2 xl:grid-cols-3" style={{width: "calc(100vw/1.6)"}}>
                  {category.map((item) => (
                    <div
                      key={item.name}
                      className="group w-60 relative flex items-center gap-x-6 p-2 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-bold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </div>
  )
}

export default PopoverButton