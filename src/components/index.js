import React from "react";
import Dock from "./Dock";
import Modal from "./Modal";
import queryString from "query-string";
import hashing from "../modules/hashing";
import config from "../json/config.json";
import visitservice from "../service/visitservice";
import storeservice from "../service/storeservice";
import searchservice from "../service/searchservice";
import productservice from "../service/productservice";
import connectservice from "../service/connectservice";
import categoryservice from "../service/categoryservice";
import main_prod_bg from "../resource/img/main_prod_bg.svg";
import btn_x_light from "../resource/img/icon/btn_x_light.svg";
import icon_main_label_discount from "../resource/img/icon/icon_main_label_discount.svg";
import { isMobile } from "react-device-detect";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: queryString.parse(window.location.search)?.code
        ? queryString.parse(window.location.search).code
        : sessionStorage?.getItem("code")
        ? sessionStorage.getItem("code")
        : null,
      store: {},
      product: [],
      category: [],
      ip: "",
      platform: "",
      word: null,
      active: null,
      storecode: null,
      modal: false,
    };
  }

  componentDidMount() {
    window.history.replaceState({}, null, window.location.pathname);
    isMobile
      ? this.setState({ platform: "모바일" })
      : this.setState({ platform: "컴퓨터" });
    storeservice.getStoreLink(this.state.code).then((res) => {
      this.setState({ store: res.data, storecode: res.data.code });
      productservice.getProductStore(res.data.code).then((res) => {
        this.setState({ product: res.data });
      });
      categoryservice.getCategoryActive().then((res) => {
        this.setState({ category: res.data });
      });
      visitservice.getInfo().then((res, date = new Date()) => {
        this.setState({ ip: res.data.ip });
        visitservice
          .visitRegist(
            this.state.code,
            this.state.store.code,
            this.state.store.name,
            res.data.ip,
            this.state.platform,
            date.getDay()
          )
          .then((res) => {
            let sessionStorage = window.sessionStorage;
            sessionStorage.setItem(
              "username",
              hashing.enc(res.data).substring(0, 6)
            );
            sessionStorage.setItem("code", this.state.code);
          });
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.modal === true ? (
          <div>
            <div className="dimm"></div>
            <div className="modal">
              <div className="modal_head_wrap">
                <div className="modal_head">
                  <h2>공유하기</h2>
                  <button type="button" className="close">
                    <img
                      src={btn_x_light}
                      alt="닫기 버튼"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                      }}
                    ></img>
                  </button>
                </div>
              </div>
              <Modal storecode={this.state.storecode} />
            </div>
          </div>
        ) : null}
        <header className="header_area">
          <nav id="gnb" className="main_gnb">
            <a className="logo">
              <h1>
                <b>{this.state.store.name}</b>
              </h1>
            </a>
            <button
              type="button"
              className="share"
              onClick={() => {
                this.setState({ modal: !this.state.modal });
              }}
            ></button>
          </nav>
        </header>
        <main className="mt_68 bg_bg3">
          <section id="main_product">
            <div className="main_product">
              <ul>
                {this.state.product.slice(0, 4).map((product) => (
                  <li className="main_img_list">
                    <a
                      style={{ cursor: "pointer" }}
                      href={`/product?store=${product.storecode}`}
                    >
                      {product.discount === "y" ? (
                        <img
                          className="main_discount_icon"
                          src={icon_main_label_discount}
                          alt="할인상품라벨"
                        />
                      ) : null}
                      <img
                        style={{ height: "120px", width: "120px" }}
                        className="main_img"
                        src={config.host + `/getProductImg/${product.code}`}
                        onError={(event) => {
                          event.target.src = require("../resource/img/icon/no_img.png");
                        }}
                      />
                      <span className="main_img_bg"></span>
                      <p className="main_img_name">{product.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
              <ul>
                {this.state.product.slice(4, 8).map((product) => (
                  <li className="main_img_list">
                    <a
                      style={{ cursor: "pointer" }}
                      href={`/product?store=${product.storecode}`}
                    >
                      {product.discount === "y" ? (
                        <img
                          className="main_discount_icon"
                          src={icon_main_label_discount}
                          alt="할인상품라벨"
                        />
                      ) : null}
                      <img
                        id={product.code}
                        style={{ height: "120px", width: "120px" }}
                        className="main_img"
                        src={config.host + `/getProductImg/${product.code}`}
                        onError={(event) => {
                          event.target.src = require("../resource/img/icon/no_img.png");
                        }}
                      />
                      <span className="main_img_bg"></span>
                      <p className="main_img_name">{product.name}</p>
                    </a>
                  </li>
                ))}
                <li className="main_img_list">
                  <a
                    style={{ cursor: "pointer" }}
                    href={`/product?store=${this.state.store.code}`}
                  >
                    <img
                      className="img_box1"
                      src={main_prod_bg}
                      alt="상품 더 보기"
                    />
                    <p className="main_img_txt">
                      +<br />더 보기
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section id="main_title">
            <div className="tm_title">
              <ul>
                <li>
                  <div className="line_01"></div>
                </li>
                <li>
                  <div className="title_txt">
                    행복시장 <b>판매품목</b>
                  </div>
                </li>
                <li>
                  <div className="line_02"></div>
                </li>
              </ul>
            </div>
          </section>
          <section id="search_box">
            <div className="container search_box">
              <form className="keyword_search" target="iframe">
                <input
                  type="text"
                  id="word"
                  className="frm_search"
                  value={this.state.word}
                  placeholder="상품 또는 상호를 찾아보세요"
                  style={{ fontsize: "16px", border: "none" }}
                  onChange={(event) => {
                    this.setState({ word: event.target.value });
                  }}
                  required
                />
                <input
                  type="submit"
                  className="search_submit"
                  value="&nbsp;"
                  style={{ fontsize: "16px", border: "none" }}
                  onClick={() => {
                    if (document.getElementById("word").value !== "") {
                      searchservice
                        .searchRegist(
                          this.state.ip,
                          this.state.platform,
                          this.state.word
                        )
                        .then(() => {
                          window.location.href = `/search?word=${this.state.word}`;
                        });
                    }
                  }}
                />
              </form>
              <iframe name="iframe" style={{ display: "none" }}></iframe>
            </div>
          </section>
          <section className="main_category">
            <div className="main_category_link">
              <ul className="link_wrap01">
                {this.state.category.slice(0, 5).map((category) => (
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        connectservice
                          .connectRegist(
                            this.state.ip,
                            this.state.platform,
                            category.code,
                            category.name
                          )
                          .then(() => {
                            window.location.href = `/sale_items?category=${category.code}`;
                          });
                      }}
                    >
                      <img
                        className="category_img"
                        src={config.host + `/getCategoryImg/${category.code}`}
                      />
                      <p>{category.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="link_wrap02">
                {this.state.category.slice(5, 10).map((category) => (
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        connectservice
                          .connectRegist(
                            this.state.ip,
                            this.state.platform,
                            category.code,
                            category.name
                          )
                          .then(() => {
                            window.location.href = `/sale_items?category=${category.code}`;
                          });
                      }}
                    >
                      <img
                        className="category_img"
                        src={config.host + `/getCategoryImg/${category.code}`}
                      />
                      <p>{category.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section id="main_bn">
            <div className="bn_01">
              <a href="/recommend?category=0">
                <img
                  src={require("../resource/img/main_bn_01.png")}
                  alt="메인배너1번"
                />
              </a>
            </div>
            <div className="bn_02">
              <a href="/manual">
                <img
                  src={require("../resource/img/main_bn_02.png")}
                  alt="메인배너2번"
                />
              </a>
            </div>
          </section>
        </main>
        <Dock active="index" />
      </div>
    );
  }
}

export default home;
