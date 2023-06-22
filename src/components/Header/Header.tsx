import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, MoonIcon, SunIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { EmployeeStaticRoutes } from '../../routes/EmployeeRoutesConfigs';
import { ClientStaticRoutes } from '../../routes/ClientRoutesConfigs';
import { DropdownHeader } from './HeaderComponents/DropdownHeader';
import EmployeeRoutes from '../../Interfaces/NavigationInterfaces/EmployeeRoutes.json';
import { useTheme } from '../../context/ThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Header.module.css';
import { frontend_url } from '../../Utils/ConstUtils';

export const Header = () => {
  const { userRoles } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const navigation = userRoles.includes('employee') ? EmployeeStaticRoutes : ClientStaticRoutes;
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="px-2 py-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <Link
                  to={!userRoles.includes('employee') ? '/' : '/employee'}
                  className="inline-flex items-center gap-2.5 text-lg font-bold uppercase text-amber-400 md:text-3xl"
                  aria-label="logo"
                >
                  <img src="./logo5.png" alt="logo" className='object-contain max-w-100 '/>
                </Link>
                <div className="hidden md:ml-6 md:flex md:items-center">
                  <div className="flex gap-2.5 items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center rounded-md p-1 text-sm text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500 lg:text-lg xl:px-3 xl:py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {userRoles.includes('employee') && <DropdownHeader routes={EmployeeRoutes} />}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                {/* Perfil dropdown */}
                <button
                  onClick={toggleTheme}
                  type="button"
                  className="rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
                >
                  {isDarkMode ? (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                      <span className="rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isAuthenticated ? (
                        <Menu.Item>
                          <Link
                            to="/perfil"
                            className={`inline-block  px-3 py-2 text-start text-sm font-semibold
                            text-neutral-900  outline-none  transition duration-100
                             focus-visible:ring 
                             ${styles.header_button} w-full hover:bg-gray-200`}
                          >
                            {user?.name}
                          </Link>
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          <button
                            onClick={() => {
                              console.log(`${frontend_url}/cargar_domicilio?new=true`);
                              loginWithRedirect({
                                authorizationParams: {
                                  screen_hint: 'signup',
                                  redirect_uri: `${frontend_url}/cargar_domicilio?new=true`,
                                },
                              });
                            }}
                            className={`inline-block px-3 py-2 text-start text-sm font-semibold
                            text-neutral-900  outline-none  transition duration-100
                             focus-visible:ring 
                             ${styles.header_button} w-full hover:bg-gray-200`}
                          >
                            Registrarse
                          </button>
                        </Menu.Item>
                      )}
                      {isAuthenticated ? (
                        <Menu.Item>
                          <button
                            onClick={() =>
                              logout({ logoutParams: { returnTo: window.location.origin } })
                            }
                            className={`inline-block px-3 py-2 text-start text-sm font-semibold
            text-neutral-900  outline-none  transition duration-100
             focus-visible:ring 
             ${styles.header_button} w-full hover:bg-gray-200`}
                          >
                            Cerrar sesion
                          </button>
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          <button
                            onClick={() => loginWithRedirect()}
                            className={`inline-block px-3 py-2 text-start text-sm font-semibold
                            text-neutral-900  outline-none  transition duration-100
                             focus-visible:ring 
                             ${styles.header_button} w-full hover:bg-gray-200`}
                          >
                            Iniciar sesión
                          </button>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.path}
                  as="a"
                  href={item.path}
                  className="block rounded-md px-3 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button>
                {userRoles.includes('employee') && <DropdownHeader routes={EmployeeRoutes} />}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
