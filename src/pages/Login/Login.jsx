// import { useState, useEffect } from "react";
import "./Login.css";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import { useState } from "react";
import axios from "axios";
import { AccountLogin } from "../../routes";

const Login = () => {
  var store = require("store");
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <CatalogNavigation />
      <div id="login">
        <div className="container" style={{ marginTop: 100 }}>
          <div className="row">
            <div className="col-md-4 col-md-offset-4 intro-text">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Логин"
                    value={auth.username}
                    onChange={(e) => {
                      setAuth({ ...auth, username: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={auth.password}
                    onChange={(e) => {
                      setAuth({ ...auth, password: e.target.value });
                    }}
                  />
                </div>
                <button
                  className="btn btn-custom btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    axios.post(AccountLogin, auth).then((resp) => {
                      store.set("tokens", resp.data);
                      axios.defaults.headers.common[
                        "Authorization"
                      ] = `Bearer ${resp.data.accessToken}`;
                    });
                    setTimeout(() => {
                      window.location.assign("/catalog");
                    }, 2000);
                  }}
                >
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
