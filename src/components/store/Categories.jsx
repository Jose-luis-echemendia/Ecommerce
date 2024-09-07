import { useState, useEffect } from "react";
import { Input } from "./Input";
import { useCategory } from "../../hooks/useCategory";
import { useFilters } from "../../hooks/useFilters";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useId } from "react";

export const Categories = () => {
  const { stateCategory, getCategories } = useCategory();
  const allId = useId()

  useEffect(() => {
    getCategories();
  }, []);

  const { categories } = stateCategory;

  return (
    <>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Category</span>
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
                <Input inputName={"categoryId"} data={{id: allId, name: 'all'}}  value={'all'}></Input>
                {categories &&
                  categories !== null &&
                  categories !== undefined &&
                  categories.map((category) => {
                    category.id = category.id.toString();
                    if (category.sub_categories.length === 0) {
                      return (
                        <Input
                          key={category.id}
                          data={category}
                          inputName={"categoryId"}
                          value={category.id}
                        ></Input>
                      );
                    } else {
                      let result = [];
                      result.push(
                        <Input
                          key={category.id}
                          data={category}
                          inputName={"categoryId"}
                          value={category.id}
                        ></Input>
                      );

                      category.sub_categories.map((sub_category) => {
                        sub_category.id = sub_category.id.toString();
                        result.push(
                          <div className="ml-5">
                            <Input
                              key={sub_category.id}
                              data={sub_category}
                              inputName={"categoryId"}
                              value={sub_category.id}
                            ></Input>
                          </div>
                        );
                      });

                      return result;
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
