import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  LightBulbIcon,
  MenuIcon,
  XIcon,
  AcademicCapIcon,
  SearchIcon,
  SearchCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { getAuth } from "firebase/auth";
import firebase from "../firebase/clientapp";
import { useAuthState } from "react-firebase-hooks/auth";
import Searchbar from "./searchbar";
import { AuthContext } from "./auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function NavbarTest({ navlinks }) {
  const auth = getAuth(firebase);
  const router = useRouter();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  //const [currentUser, loading, error] = useAuthState(auth);
  const [imageLink, setImageLink] = useState("");
  const { theme, setTheme } = useTheme();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  const handleSearchToggle = (e) => {
    e.preventDefault();
    setSearchbar(!searchbar);
  };
  /*   useEffect(() => {
    if (currentUser) {
      //getData(currentUser, db);
      //changeImage(currentUser?.photoURL);
      setForceUpdate(false);
      console.log("EFFECT");
      console.log(currentUser);
      console.log("EFFECT");
    }
  }, [forceUpdate]); */

  return (
    <>
      <Disclosure
        as="nav"
        className=" bg-gradient-to-r to-blue-400 from-blue-500 shadow fixed w-full z-20"
      >
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:pr-6 lg:pr-16 lg:pl-6">
              <div className="relative flex justify-between h-16">
                <div className="inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-500 hover:bg-gray-500 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center  sm:items-stretch sm:justify-start">
                  {navlinks ? (
                    <div className="flex">
                      <div className=" justify-center items-center flex pr-4">
                        {router.pathname == "" ? (
                          <div></div>
                        ) : (
                          <Link href="/">
                            <a className="hidden md:block">
                              <HomeIcon className=" w-8 h-8 text-white dark:text-black" />
                            </a>
                          </Link>
                        )}
                      </div>
                      <Searchbar />
                      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                        {navlinks?.map((i) => (
                          <Link href={i.path} key={i.name}>
                            <a
                              className={
                                router.asPath == i.path
                                  ? " border-purple-300 text-gray-300 dark:text-gray-900 hover:border-gray-300 hover:text-gray-500 dark:hover:text-gray-400 inline-flex items-center px-1 border-b-2 text-sm font-medium"
                                  : "border-transparent  text-gray-300 dark:text-gray-900 hover:border-gray-300 hover:text-gray-500 dark:hover:text-gray-400 inline-flex items-center px-1 border-b-2 text-sm font-medium"
                              }
                            >
                              {i.name}
                            </a>
                          </Link>
                        ))}
                        {/* <a
										href="#"
										className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
										>
										Calendar
									</a> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex">
                      <div className=" justify-center items-center flex pr-4">
                        <Link href="/">
                          <a>
                            <HomeIcon className=" w-8 h-8 text-white " />
                          </a>
                        </Link>
                      </div>
                      <Searchbar />
                    </div>
                  )}
                </div>
                <div className="inset-y-0 right-0 flex items-center justify-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className=" w-8 h-8 bg-white p-1 rounded-full dark:bg-black dark:text-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Darkmode</span>
                    <LightBulbIcon
                      className="h-6 w-6 "
                      aria-hidden="true"
                      onClick={switchTheme}
                    />
                  </button>
 */}
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open currentUser menu</span>
                        <img
                          className={
                            currentUser
                              ? "h-10 w-10 rounded-full text-transparent object-cover"
                              : "hidden h-10 w-10 rounded-full"
                          }
                          src={currentUser?.photoURL}
                          alt=""
                        />
                        <UserCircleIcon
                          className={
                            currentUser
                              ? "hidden"
                              : "h-8 w-8 text-gray-400 rounded-full "
                          }
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={
                                currentUser !== null &&
                                currentUser !== undefined
                                  ? "/profile"
                                  : "/signup"
                              }
                            >
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  " block px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                                )}
                              >
                                {currentUser !== null &&
                                currentUser !== undefined
                                  ? "Your Profile"
                                  : "Signup"}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={
                                currentUser !== null &&
                                currentUser !== undefined
                                  ? "/settings"
                                  : "/login"
                              }
                            >
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  " block px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                                )}
                              >
                                {currentUser !== null &&
                                currentUser !== undefined
                                  ? "Settings"
                                  : "Login"}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/logout">
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  currentUser !== null &&
                                    currentUser !== undefined
                                    ? " block px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                                    : "hidden"
                                )}
                              >
                                Sign out
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pb-4 space-y-1 flex flex-col pl-4">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                {navlinks?.map((i) => (
                  <Link href={i.path} key={i.name}>
                    <a
                      className={
                        router.asPath == i.path
                          ? " text-purple-400 dark:text-gray-900 inline-flex items-center px-1 pt-1  text-sm font-medium"
                          : " text-gray-300 dark:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                      }
                    >
                      {i.name}
                    </a>
                  </Link>
                ))}
                {/* <a
								href="#"
								className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
							>
								Calendar
							</a> */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
export default NavbarTest;
