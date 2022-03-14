import { Link } from "react-router-dom";

export const OrderProduct = ({ name, id, amount }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-7">
          <Link to={`/products/${id}`}>
            <p>{name}</p>
          </Link>
        </div>
        <div className="col-xs-5">
          <p>
            <b>Количество:</b> {amount}
          </p>
        </div>
      </div>
    </div>
  );
};
