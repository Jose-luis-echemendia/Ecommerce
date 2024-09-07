import { Disclosure } from "@headlessui/react";
import { prices } from "../../helpers/fixedPrices";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Input } from "./Input";

export const Prices = () => {
  return (
    <>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Prices</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-6">
                {prices &&
                  prices !== null &&
                  prices !== undefined &&
                  prices.map((price, index) => {
                    if (price.id === 0) {
                      return (
                        <Input
                          key={index}
                          data={price}
                          inputName={"priceRange"}
                          value={price.name}
                        ></Input>
                      );
                    } else {
                      return (
                        <Input
                          key={index}
                          data={price}
                          inputName={"priceRange"}
                          value={price.name}
                        ></Input>
                      );
                    }
                  })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
