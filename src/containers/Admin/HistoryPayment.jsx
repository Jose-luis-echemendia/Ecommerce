import React from "react";
import { Dashboard } from "../../hocs/Dashboard";

import { useEffect } from "react";
import { usePayment } from "../../hooks/usePayment";
import { ItemHistoryOrder } from "../../components/dashboard/ItemHistoryOrder";

export const HistoryPayment = () => {
  const { statePayment, getHistoryPayment } = usePayment();

  useEffect(() => {
    getHistoryPayment();
  }, []);

  const { historyPayment } = statePayment;

  return (
    <Dashboard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          history payment
        </h1>

        <section>
          {historyPayment &&
            historyPayment !== null &&
            historyPayment !== undefined &&
            historyPayment.map((order) => (
              <div key={order.transaction_id} className="mb-40">
                <ItemHistoryOrder order={order}></ItemHistoryOrder>
              </div>
            ))}
        </section>
      </div>
    </Dashboard>
  );
};
