// import { useState, useEffect } from "react";
import "./Register.css";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import { useState } from "react";
import { AccountRegister } from "../../routes";
import axios from "axios";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <CatalogNavigation />
      <div id="register">
        <div className="container" style={{ marginTop: 100 }}>
          <div className="row">
            <div className="col-md-4 col-md-offset-4 intro-text align-middle">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Логин"
                    value={register.username}
                    onChange={(e) => {
                      setRegister({ ...register, username: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={register.password}
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Повторите пароль"
                  />
                </div>
                <button
                  className="btn btn-custom btn-lg"
                  onClick={(e) => {
                    console.log(register);
                    e.preventDefault();
                    axios.post(AccountRegister, register).then((resp) => {
                      window.location.assign("/login");
                    });
                  }}
                >
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
