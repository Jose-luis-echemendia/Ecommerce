import React, { useState, useEffect } from "react";
import { Dashboard } from "../../hocs/Dashboard";
import { useOrders } from "../../hooks/useOrders";
import { Orders } from "../../components/dashboard/Orders";
import { useFiltersOrders } from "../../hooks/useFiltersOrders";

export const ListOrders = () => {
  const { stateOrders, getOrders } = useOrders();

  const { filterOrders } = useFiltersOrders();
  const [ordersFiltered, setOrdersFiltered] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const { orders } = stateOrders;

  useEffect(() => {
    if (orders !== null && orders !== undefined) setOrdersFiltered(orders);
  }, [orders]);

  const filteredOrders = filterOrders(ordersFiltered);

  return (
    <Dashboard>
      <div className="bg-white">
        <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Order List
          </h1>

          <section>
            <Orders orders={orders && filteredOrders}></Orders>
          </section>
        </div>
      </div>
    </Dashboard>
  );
};
