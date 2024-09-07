import { Disclosure } from "@headlessui/react";
import { Minus, Plus } from "react-feather";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export const SectionDetailsProduct = ({detail}) => {
  return (
    <div>
      <Disclosure as="div" key={detail.name}>
        {({ open }) => (
          <>
            <h3>
              <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                <span
                  className={classNames(
                    open ? "text-indigo-600" : "text-gray-900",
                    "text-sm font-medium"
                  )}
                >
                  {detail.name}
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <Minus
                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <Plus
                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
              <ul role="list" className="space-y-2 text-gray-600 text-sm">
                {detail.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
