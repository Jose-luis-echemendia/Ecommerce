import { Search } from "react-feather";
import { useCategory } from "../../hooks/useCategory";
import { useEffect, useState } from "react";
import { initialSearchProductsForm } from "../../helpers/formInitialState";
import { useProduct } from "../../hooks/useProduct";
import { useFilters } from "../../hooks/useFilters"; 
import { Navigate } from "react-router-dom";
import { X } from "react-feather";

export const SearchBar = () => {
  const { stateCategory, getCategories } = useCategory();
  const { getSearchProducts } = useProduct();
  const { filters, handleChangeFilters, HandleChangeisFiltered, setFilters} = useFilters()

  const { categoryId, search, filtered } = filters;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const { categories } = stateCategory;

  const onSubmit = (event) => {
    event.preventDefault();
    getSearchProducts(search, categoryId);
    setRedirect(true);
    HandleChangeisFiltered(true)
  };

  if (redirect && filtered) {
    return <Navigate to="/search" />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      <div>
        <div className="mt-1 flex rounded-md shadow-sm border border-gray-200">
          <div className="mt-1 mx-1 px-2 py-1">
            <select
              onChange={handleChangeFilters}
              name="categoryId"
              className="rounded-full"
            >
              <option name="categoryId" value={0}>
                All
              </option>
              {categories &&
                categories !== null &&
                categories !== undefined &&
                categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    name="categoryId"
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="text"
              name="search"
              value={search}
              required
              onChange={handleChangeFilters}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
              placeholder="Que buscas hoy?"
            />
            {search && (
              <button
                type="button"
                onClick={() => setFilters(prevstate=>({
                  ...prevstate,
                  search: '',
                  categoryId: 0
                }))}
                className="absolute right-0 top-0 mt-3 mr-2"
              >
                <X className="h-4 w-4 text-blue-500" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
};
