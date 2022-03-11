export const CartProduct = ({ id, name, price, count }) => {
  var store = require("store");
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6">
          <h1>{name}</h1>
          <p>Стоимость {price}</p>
        </div>
        <div className="col-xs-2">
          <h3>Количество: {count}</h3>
          <button
            style={{ width: 30 }}
            onClick={() => {
              let cart = store.get("cart");
              if (cart === undefined) return;
              let index = cart.indexOf(id);
              delete cart[index];
              store.set(
                "cart",
                cart.filter((c) => c !== null)
              );
              window.location.reload();
            }}
          >
            -
          </button>
          <button
            style={{ width: 30 }}
            onClick={() => {
              let cart = store.get("cart");
              if (cart === undefined) cart = [];
              cart = [...cart, id];
              store.set("cart", cart);
              window.location.reload();
            }}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-custom"
          style={{ height: 40, marginTop: 20 }}
          onClick={() => {
            var cart = store.get("cart");
            if (cart === undefined) return;
            console.log(cart);
            console.log(id);
            cart = cart.filter((c) => !(c === id));
            console.log(cart);
            store.set("cart", cart);
            window.location.reload();
          }}
        >
          Удалить из корзины
        </button>
      </div>
    </div>
  );
};
