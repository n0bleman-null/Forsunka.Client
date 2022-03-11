import { Link } from "react-router-dom";

export const CatalogNavigation = (props) => {
  var store = require("store");
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            ForsunkaShop
          </Link>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
            {store.get("tokens") === undefined && (
              <>
                {" "}
                <li>
                  <Link to="/register">Регистрация</Link>
                </li>
                <li>
                  <Link to="/login">Войти</Link>
                </li>
              </>
            )}
            {!(store.get("tokens") === undefined) && (
              <>
                <li>
                  <Link to="/orders">Мои заказы</Link>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={() => {
                      store.remove("tokens");
                    }}
                  >
                    ВЫЙТИ: {store.get("tokens").username}
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
