import { useState, useEffect } from "react";
import { CatalogNavigation } from "./../../components/navigationCatalog";
import {
  CatalogGetCategories,
  CatalogGetCategoryTags,
  CatalogGetWithFilter,
} from "./../../routes";
import "./Catalog.css";
import axios from "axios";
import ProductList from "../../components/Catalog/ProductList";

const Catalog = () => {
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState({
    category: null,
    pricefrom: null,
    priceto: null,
    tag: null,
    page: 0,
  });
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.post(CatalogGetWithFilter, filter).then((resp) => {
      setProducts(resp.data);
    });
  }, [filter]);

  useEffect(() => {
    axios.get(CatalogGetCategories).then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(CatalogGetCategoryTags, { params: { category: filter.category } })
      .then((resp) => {
        setTags(resp.data);
      });
  }, [filter]);

  return (
    <>
      <CatalogNavigation />
      <div className="container" id="catalog">
        <div className="row">
          <div
            className="col-xs-3"
            style={{ paddingLeft: 100, paddingRight: 100 }}
          >
            <h3 style={{ textAlign: "center" }}>Фильтр</h3>
            <form validate>
              <div className="form-group">
                <h5>Категория</h5>
                <select
                  value={filter.category}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setFilter({
                      ...filter,
                      category: Number(event.target.value),
                    });
                  }}
                >
                  <option value={null}>{"Все категории"}</option>
                  {categories.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <h5>Поиск</h5>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="form-control"
                  placeholder="Поиск"
                  value={filter.search}
                  onChange={(e) => {
                    setFilter({ ...filter, search: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <h5>Цена (от)</h5>
                <input
                  type="number"
                  id="pricefrom"
                  name="pricefrom"
                  className="form-control"
                  placeholder="Цена (от)"
                  value={filter.pricefrom}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    setFilter({ ...filter, pricefrom: value > 0 ? value : 0 });
                  }}
                />
              </div>
              <div className="form-group">
                <h5>Цена (до)</h5>
                <input
                  type="number"
                  id="priceto"
                  name="priceto"
                  className="form-control"
                  placeholder="Цена (до)"
                  value={filter.priceto}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    setFilter({ ...filter, priceto: value > 0 ? value : 0 });
                  }}
                />
              </div>
              {tags != null && tags.length > 0 && (
                <div className="form-group">
                  <h5>Теги</h5>
                  <div className="row">
                    {tags.map((tag) => (
                      <button
                        style={{ background: "red", margin: 5 }}
                        className="btn btn-custom"
                        onClick={(e) => {
                          e.preventDefault();
                          if (e.currentTarget.style.backgroundColor === "red") {
                            e.currentTarget.style.backgroundColor = "green";
                            setFilter({
                              ...filter,
                              tag: e.currentTarget.outerText,
                            });
                          } else if (
                            e.currentTarget.style.backgroundColor === "green"
                          ) {
                            e.currentTarget.style.backgroundColor = "red";
                            setFilter({
                              ...filter,
                              tag: null,
                            });
                          }
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="form-group">
                <h5>Номер страницы</h5>
                <input
                  type="number"
                  id="page"
                  name="page"
                  className="form-control"
                  placeholder="Номер страницы"
                  value={filter.page}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    setFilter({ ...filter, page: value > 0 ? value : 0 });
                  }}
                />
              </div>
              <button
                className="btn btn-custom btn-lg"
                onClick={(e) => {
                  setFilter({
                    pricefrom: null,
                    priceto: null,
                    tags: [],
                    page: 0,
                  });
                }}
              >
                Сбросить
              </button>
            </form>
          </div>
          <div className="col-xs-7">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
