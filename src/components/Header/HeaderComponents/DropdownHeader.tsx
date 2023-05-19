import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { DropdownProps } from '../../../Interfaces/NavigationInterfaces/NavigationInterface';
import { useUser } from '../../../context/UserProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const DropdownHeader = ({ routes }: DropdownProps) => {
  const { userRoles } = useUser();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2  text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500">
          <h2 className="text-sm md:text-lg">ABM</h2>
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {routes.map((route,index) => (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    key={index} to={!userRoles.includes('employee') ? route.name : `/employee/${route.name}`}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {route.name}
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
