import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { X, Menu as MenuIcon } from "react-feather";
import { Link, NavLink } from "react-router-dom";
import { Navigation } from "../components/dashboard/Navigation";
import { UserNavigation } from "../components/dashboard/UserNavigation";
import { useFiltersOrders } from "../hooks/useFiltersOrders";
import { useCart } from "../hooks/useCart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Dashboard = ({ children }) => {
  const { filters, handleChangeFilters } = useFiltersOrders();
  const { statusOrder, priceOrder, transactionId } = filters;
  const { stateCart } = useCart()

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link to={"/"}>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <Navigation></Navigation>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to={"/"}>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <Navigation></Navigation>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-24 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form
                  className="w-full grid grid-cols-3 gap-2 mx-2 mt-2 md:ml-0"
                  action="#"
                  method="GET"
                >
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search to order id or categories products"
                      type="search"
                      name="transactionId"
                      value={transactionId}
                      onChange={handleChangeFilters}
                    />
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <label htmlFor={priceOrder} className="text-sm">
                      Price order
                    </label>
                    <input
                      type="range"
                      id={priceOrder}
                      min="0"
                      max="1000"
                      value={priceOrder}
                      name="priceOrder"
                      onChange={handleChangeFilters}
                    />
                    <span>${priceOrder}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <label className="text-sm">Status Order: </label>
                    <select onChange={handleChangeFilters} value={statusOrder} name="statusOrder" className="border-2 pl-4 w-1/2">
                      <option value="all" className="">
                        all
                      </option>
                      <option value="not_processed" className="">
                        not processed
                      </option>
                      <option value="processed" className="">
                        processed
                      </option>
                      <option value="shipped" className="">
                        shipped
                      </option>
                      <option value="delivered" className="">
                        delivered
                      </option>
                      <option value="cancelled" className="">
                      cancelled
                      </option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
              <NavLink
                to="/cart"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {/* CARRITO */}
                <div className="relative scale-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-8 w-8 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {stateCart.totalItems > 0 && (
                    <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                      {stateCart.totalItems}
                    </span>
                  )}
                </div>
              </NavLink>

                {/* Profile dropdown */}
                <UserNavigation></UserNavigation>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="container mx-auto">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
