import { useState, useEffect } from "react";
import axios from "axios";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { CatalogGetProduct } from "../../routes";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(CatalogGetProduct, { params: { product: id } }).then((resp) => {
      console.log(resp.data);
      setProduct(resp.data);
    });
  }, [id]);
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
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
