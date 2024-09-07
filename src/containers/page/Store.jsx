import { Layout } from "../../hocs/Layout";
import { Categories } from "../../components/store/Categories";
import { Products } from "../../components/store/Products";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { ViewGridIcon } from "../../icons/ViewGridIcon";
import { useFilters } from "../../hooks/useFilters";
import { Colors } from "../../components/store/Colors";
import { Prices } from "../../components/store/Prices";
import { useProduct } from "../../hooks/useProduct";
import { sortOptions } from "../../helpers/sortOption";
import { Sizes } from "../../components/store/Sizes";
import { MoreFilters } from "../../components/store/MoreFilters";
import { ProductsFavorite } from "../../components/store/ProductsFavorite";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Store = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { getFilteredProducts } = useProduct();
  const { filters, HandleChangeisFiltered } = useFilters();
  const { categoryId, priceRange, sortBy, order, color, sizes } = filters;

  const onSubmit = (event) => {
    event.preventDefault();
    getFilteredProducts(categoryId, priceRange, sortBy, order, color, sizes);
    HandleChangeisFiltered(true);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="bg-white h-full">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
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
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form
                    className="mt-4 border-t border-gray-200"
                    onSubmit={onSubmit}
                  >
                    <div className="mx-4">
                      <div className="flex flex-col">
                        <Categories></Categories>

                        <Colors></Colors>

                        <Prices></Prices>

                        <Sizes></Sizes>

                        <MoreFilters></MoreFilters>

                        <button
                          type="submit"
                          className="w-1/2 mt-4 mx-auto inline-flex items-center text-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Shop
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="hidden lg:block" onSubmit={onSubmit}>
                  <div className="flex flex-col">
                    <Categories></Categories>

                    <Colors></Colors>

                    <Prices></Prices>

                    <Sizes></Sizes>

                    <MoreFilters></MoreFilters>

                    <button
                      type="submit"
                      className="w-1/2 mx-auto mt-4 inline-flex items-center text-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Filter
                    </button>
                  </div>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <div className="border-4 border-dashed border-gray-200 rounded-lg lg:h-full p-2">
                    <Products></Products>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </section>
            <section>
              <div>
                <ProductsFavorite></ProductsFavorite>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};
