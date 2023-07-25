import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { DropdownProps } from '../../../Interfaces/NavigationInterfaces/NavigationInterface';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const DropdownHeader = ({ routes }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block pl-3 text-left">
      <div>
        <Menu.Button className="flex w-full items-center justify-center gap-x-1.5 rounded-md  p-1 text-amber-400  hover:border-b-4 hover:border-b-neutral-700   hover:bg-neutral-800 hover:text-amber-500 hover:duration-300 hover:ease-in-out active:text-amber-500 xl:py-2 xl:px-3 ">
          <h2 className="text-base lg:text-lg ">ABM</h2>
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-neutral-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-16 z-10 mt-2 w-44 min-w-max origin-top-right rounded-md  bg-neutral-100 shadow-lg
         ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 md:left-0"
        >
          <div className="">
            {routes.map((route, index) => (
              <Menu.Item key={'Ruta' + index}>
                {({ active }) => (
                  <Link
                    to={`/employee/${route.type}/${route.route}`}
                    className={classNames(
                      active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700',
                      'border-box block whitespace-nowrap px-4 py-2 text-sm hover:rounded-r-md hover:border-r-8 hover:border-r-amber-500 hover:bg-amber-300 hover:duration-500 hover:ease-out active:border-r-amber-700 active:bg-amber-500 active:text-neutral-100  '
                    )}
                  >
                    {route.dropdown}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
