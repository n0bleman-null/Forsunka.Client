import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./OrderPage.css";
import { OrderGetOrders } from "../../routes";

const OrderPage = () => {
  var store = require("store");
  const [token, _] = useState(store.get("tokens").accessToken);
  useEffect(() => {
    axios
      .get(OrderGetOrders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
      });
  });
  return (
    <>
      <CatalogNavigation />
    </>
  );
};

export default OrderPage;
