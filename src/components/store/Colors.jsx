import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useId } from "react";
import { useColors } from "../../hooks/useColors";
import { Input } from "./Input";

export const Colors = () => {
  const { stateColors, getColors } = useColors();

  const allId = useId()

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Colors</span>
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
                
              <Input inputName={"color"} data={{id: allId, name: 'all'}} value={'all'}></Input>
                {stateColors.colors &&
                  stateColors.colors !== null &&
                  stateColors.colors !== undefined &&
                  stateColors.colors.map((color) => (
                    <Input
                      key={color.id}
                      data={color}
                      inputName={"color"}
                      value={color.name}
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
