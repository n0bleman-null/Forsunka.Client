import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./Cart.css";
import {
  CatalogGetProducts,
  OrderConfirmOrder,
} from "../../routes";
import { CartProduct } from "../../components/Catalog/CartProduct";

const Cart = () => {
  var store = require("store");

  const [cart, setCart] = useState([]);
  const [storage, setStorage] = useState([]);
  const [sum, setSum] = useState(0);
  const [token, _] = useState(store.get("tokens").accessToken);
  const [comment, setComment] = useState("");

  useEffect(() => {
    var localstorage = store.get("cart");
    setStorage(localstorage);
    axios.post(CatalogGetProducts, localstorage).then((resp) => {
      setCart(resp.data);
    });
  }, []);

  useEffect(() => {
    let x = 0;
    cart.map((p) => (x += p.price * storage.filter((x) => x === p.id).length));
    setSum(x);
  }, [cart, storage]);

  return (
    <>
      <CatalogNavigation />
      <div id="cart">
        <div style={{ marginTop: 80 }}></div>
        {cart != null &&
          cart.length > 0 &&
          cart.map((p) => (
            <CartProduct
              name={p.name}
              price={p.price}
              id={p.id}
              count={storage.filter((x) => x === p.id).length}
            />
          ))}
        <div className="container">
          <div className="row">
            <h1 className="col-xs-3">
              Сумма: {cart != null && cart.length > 0 ? sum : 0}
            </h1>
            {!(store.get("tokens") === undefined) && (
              <button
                className="btn btn-custom"
                style={{ marginTop: 20 }}
                onClick={() => {
                  axios
                    .post(
                      OrderConfirmOrder,
                      {
                        productList: storage,
                        comment: comment,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((resp) => {
                      console.log(resp);
                    });
                  setTimeout(() => {
                    store.set("cart", []);
                    window.location.assign("/catalog");
                  }, 2000);
                }}
              >
                Оформить заказ
              </button>
            )}
            {!(store.get("tokens") === undefined) && (
              <div className="form-group">
                <h5>Комментарий</h5>
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  className="form-control"
                  placeholder="Коментарий"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
