import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { CatalogGetProduct } from "../../routes";
import { Table } from "antd";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [atrs, setAtrs] = useState([]);
  useEffect(() => {
    axios.get(CatalogGetProduct, { params: { product: id } }).then((resp) => {
      console.log(resp.data);
      setProduct(resp.data);
      setAtrs(
        resp.data.attributes.map((s) => {
          return { value: s.value, ...s.entityAttribute };
        })
      );
    });
  }, [id]);

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Значение",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <>
      <CatalogNavigation />
      {product === null ? (
        <p>Загрузка</p>
      ) : (
        <div className="container" style={{ marginTop: 80 }}>
          <div className="row">
            <h1>{product.name}</h1>
            <h3>
              <b>Категория:</b> {product.category.name}
            </h3>
            <h3>
              <b>Цена:</b> {product.price}
            </h3>
            <h3>
              <b>Теги:</b>{" "}
              {product.tags
                .map(function (item) {
                  return item.name;
                })
                .join(" ")}
            </h3>
            <h3>
              <b>Характеристики:</b>
            </h3>
            <div>
              <Table dataSource={atrs} columns={columns} pagination={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
