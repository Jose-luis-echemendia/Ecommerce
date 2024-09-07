import { createContext, useState } from "react";

//creando contexto
export const FiltersOrdersContext = createContext();
//proveer contexto
export function FiltersOrdersProvider({ children }) {
  const [filters, setFilters] = useState({
    statusOrder: "all",
    priceOrder: 0,
    transactionId: "",
  });
  return (
    <FiltersOrdersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersOrdersContext.Provider>
  );
}
