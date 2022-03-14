import { OrderProduct } from "./OrderProduct";

export const Order = ({ id, orderLines, comment, date }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-7">
          <h1>Заказ №{id}</h1>
          <p>
            Дата заказа:{" "}
            {date.toLocaleString([], {
              month: "2-digit",
              year: "4-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {orderLines !== null ? (
            orderLines.map((orderLine) => (
              <OrderProduct
                name={orderLine.product.name}
                amount={orderLine.amount}
              />
            ))
          ) : (
            <p />
          )}
          <p>
            <b>Комментарий:</b> {comment}
          </p>
        </div>
      </div>
    </div>
  );
};
