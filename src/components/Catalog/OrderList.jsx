import { Order } from "./Order";

export const OrderList = ({ orders }) => {
  return (
    <>
      {orders !== null ? (
        orders.map((order) => (
          <Order
            id={order.id}
            orderLines={order.orderLines}
            comment={order.comment}
            date={order.date}
          />
        ))
      ) : (
        <b>Нет товаров</b>
      )}
    </>
  );
};
