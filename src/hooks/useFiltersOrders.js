
import { useContext } from 'react';
import { FiltersOrdersContext } from '../context/filtersOrdersContext';


export const useFiltersOrders = () => {
  const { filters, setFilters } = useContext(FiltersOrdersContext)

  const filterOrders = (orders) => {
    return orders.filter((order) => {
      return (
        order.transaction_id.toLowerCase().includes(filters.transactionId.toLowerCase()) &&
        order.amount_total >= filters.priceOrder &&
        (filters.statusOrder === "all" || order.status === filters.statusOrder)
      );
    });

  };

  const handleChangeFilters = (event) => {
    const { name, value } = event.target
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  return {
    filters,
    setFilters,
    filterOrders,
    handleChangeFilters
  }

}
