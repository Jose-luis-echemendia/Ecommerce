import { useContext } from "react";
import { FiltersContext } from "../context/filtersContext";

export const useFilters = () => {

  const { filters, setFilters } = useContext(FiltersContext)


  const handleChangeFilters = (event) => {
    const { name, value } = event.target
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const HandleChangeisFiltered = (isFiltered) =>{
    setFilters((prevState) =>({
        ...prevState,
        filtered: isFiltered
    }))
  }

  return {
    filters,
    handleChangeFilters,
    HandleChangeisFiltered,
    setFilters

  }
}
