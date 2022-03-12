import { useState } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import { ConversationSendConversation } from "../routes";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  let contactdata = {
    address: "Минск, Колесникова 777, Беларусь",
    phone: "+1 123 456 1234",
    email: "info@company.com",
    facebook: "https://fb.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Остались вопросы?</h2>
                <p>Заполните поля ниже и мы оперативно на них ответим.</p>
              </div>
              <form name="sentMessage" validate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Имя"
                        required
                        value={data.name}
                        onChange={(e) => {
                          setData({ ...data, name: e.target.value });
                        }}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Электронная почта"
                        required
                        value={data.email}
                        onChange={(e) => {
                          setData({ ...data, email: e.target.value });
                        }}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Сообщение"
                    required
                    value={data.message}
                    onChange={(e) => {
                      setData({ ...data, message: e.target.value });
                    }}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button
                  className="btn btn-custom btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post(ConversationSendConversation, data)
                      .then((resp) => {
                        setTimeout(() => {
                          window.location.reload();
                        }, 2000);
                      });
                  }}
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Наши контакты</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Адресс
                </span>
                {contactdata.address}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Телефон
                </span>{" "}
                {contactdata.phone}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Электронная почта
                </span>{" "}
                {contactdata.email}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={contactdata.email}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={contactdata.twitter}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={contactdata.youtube}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; Copyright 2022 ForsunkaShop.by</p>
        </div>
      </div>
    </div>
  );
};
