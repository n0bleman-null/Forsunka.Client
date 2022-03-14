import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./OrderPage.css";
import { OrderGetOrders } from "../../routes";
import { OrderList } from "../../components/Catalog/OrderList";

const OrderPage = () => {
  var store = require("store");
  const [token, _] = useState(store.get("tokens").accessToken);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(OrderGetOrders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setOrders(resp.data);
      });
  }, [token]);
  return (
    <>
      <CatalogNavigation />
      <div className="container" style={{ marginTop: 80 }}>
        <h1>Мои заказы</h1>
        <OrderList orders={orders} />
      </div>
    </>
  );
};

export default OrderPage;
