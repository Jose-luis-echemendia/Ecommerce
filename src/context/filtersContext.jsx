import { createContext, useState} from "react";


//creando contexto
export const FiltersContext = createContext()
//proveer contexto
export function FiltersProvider ({children}) {
    const [filters, setFilters] = useState({
        filtered: false,
        categoryId: '0',
        search: '',
        priceRange: 'Any',
        sortBy: 'created',
        order: 'desc',
        color: 'all',
        sizes: 'all',
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
        {children}
        </FiltersContext.Provider>
    )
}

