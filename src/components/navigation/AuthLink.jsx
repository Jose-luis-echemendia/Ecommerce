/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "../Avatar";
import { useAuth } from "../../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import { LogOut } from "react-feather";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const AuthLink = () => {
  const [redirect, setRedirect] = useState(false);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Menu as="div" className="relative inline-block text-left z-50 opacity-100">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <Avatar></Avatar>
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
        <Menu.Items className="origin-top-right absolute right-0 w-40 rounded-md shadow-lg bg-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 opacity-100">
          <div className="z-50 opacity-100">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/Dashboard-User/Information"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 rounded-md"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 rounded-md"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 rounded-md"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        "flex items-center w-full",
                        active
                          ? "bg-gray-100 text-gray-900 rounded-md"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      <span className="mr-2">Sign out</span>
                      <LogOut size={17} />
                    </button>
                  </div>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
