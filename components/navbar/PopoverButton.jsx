
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, DevicePhoneMobileIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { FlagIcon } from '@heroicons/react/24/solid'


const category = [
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: FlagIcon,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: FlagIcon,
    },
    {
      name: 'Reports',
      description: 'Keep track of your growth',
      href: '##',
      icon: FlagIcon,
    },
  ]

const PopoverButton = () => {
  return (
    <div className=" top-16 w-full max-w-sm px-4">
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
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
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {category.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
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