import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./Cart.css";
import { AccountCurrentUser, CatalogGetProducts } from "../../routes";
import { CartProduct } from "../../components/Catalog/CartProduct";

const Cart = () => {
  var store = require("store");

  const [cart, setCart] = useState([]);
  const [storage, setStorage] = useState([]);
  const [sum, setSum] = useState(0);

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
          <h1>Сумма: {cart != null && cart.length > 0 ? sum : 0}</h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
