import axios from "axios";
import { host } from "../../routes";
import { OrderProduct } from "./OrderProduct";

export const AdminOrder = ({ id, orderLines, comment, date, state, user }) => {
  const states = ["Заказ в обработке", "Заказ готов к выдаче", "Заказ забран"];
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-7">
          <h1>Заказ №{id}</h1>
          <p>Пользователь: {user}</p>
          Статус заказа:{" "}
          <select
            onChange={(event) => {
              console.log(event.target.value);
              axios.get(host + "Admin/ChangeState", {
                params: { order: id, state: event.target.value },
              });
            }}
          >
            <option>{state}</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
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
                id={orderLine.product.id}
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
