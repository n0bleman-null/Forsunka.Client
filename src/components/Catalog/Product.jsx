import { Link } from "react-router-dom";

export const Product = ({ id, name, price }) => {
  var store = require("store");
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-7">
          <Link to={`/products/${id}`}>
            <h1>{name}</h1>
          </Link>
          <p>Стоимость {price}</p>
        </div>
        <button
          className="btn btn-custom"
          style={{ height: 40, marginTop: 20 }}
          onClick={() => {
            let cart = store.get("cart");
            if (cart === undefined) cart = [];
            cart = [...cart, id];
            store.set("cart", cart);
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};
