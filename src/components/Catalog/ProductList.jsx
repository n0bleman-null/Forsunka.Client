import { Product } from "./Product";
import PropTypes from "prop-types";

const ProductList = ({ products }) => {
  return (
    <>
      {products !== null ? (
        products.map((prod) => (
          <Product name={prod.name} price={prod.price} id={prod.id} />
        ))
      ) : (
        <p>Нет товаров</p>
      )}
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
