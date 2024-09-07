import { ItemOrder } from "./ItemOrder";

export const Orders = ({ orders }) => {
  return (
    <>
      {orders &&
        orders !== null &&
        orders !== undefined &&
        orders.map((order) => (
          <div key={order.transaction_id} className="mb-40">
            <ItemOrder order={order}></ItemOrder>
          </div>
        ))}
    </>
  );
};
