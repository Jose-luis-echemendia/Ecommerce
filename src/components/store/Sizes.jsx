import { Disclosure} from "@headlessui/react";
import {
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useId } from "react";
import { useSizes } from "../../hooks/useSizes";
import { Input } from "./Input";

export const Sizes = () => {
  const { stateSizes, getSizes } = useSizes();

  const allId = useId()

  useEffect(() => {
    getSizes();
  }, []);

  return (
    <>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">sizes</span>
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
                
              <Input inputName={"sizes"} data={{id: allId, name: 'all'}} value={'all'}></Input>
                {stateSizes.sizes &&
                  stateSizes.sizes !== null &&
                  stateSizes.sizes !== undefined &&
                  stateSizes.sizes.map((size) => (
                    <Input
                      key={size.id}
                      data={size}
                      inputName={"sizes"}
                      value={size.name}
                    ></Input>
                  ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
