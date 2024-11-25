import React from "react";
import queryString from "query-string";
import config from "../json/config.json";
import cartservice from "../service/cartservice";
import productservice from "../service/productservice";
import icon_quick_cart from "../resource/img/icon/icon_quick_cart.svg";
import icon_sub_label_discount from "../resource/img/icon/icon_sub_label_discount.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storecode: queryString.parse(window.location.search).store,
      product: [],
      cart: [],
    };
  }

  componentDidMount() {
    cartservice.getCart(sessionStorage.getItem("username")).then((res) => {
      this.setState({ cart: res.data });
    });
    productservice.getProductStore(this.state.storecode).then((res) => {
      this.setState({ product: res.data });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div class="header_area">
            <nav id="gnb">
              <div class="gnb_container">
                <a
                  style={{ cursor: "pointer" }}
                  class="go_back"
                  onClick={() => {
                    window.location.href = `/?code=${sessionStorage.getItem(
                      "code"
                    )}`;
                  }}
                ></a>
                <div class="gnb_title">
                  <h2>상품</h2>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <section>
            <div class="main_title pd_24">
              <div class="title">
                <em>판매 상품</em>
              </div>
              <div class="t_line"></div>
            </div>
            <div class="product_list_wrap pb_60">
              <div class="product_list">
                {this.state.product.map((product) => (
                  <div class="product_item_wrap">
                    <div class="product_item">
                      <div class="product_price">
                        <div class="txt_wrap">
                          <h3>
                            <b>{product.name}</b>
                          </h3>
                          <p class="origin">{product.orign}</p>
                        </div>
                        <div class="price_wrap">
                          <span class="unit">가격 : </span>
                          <div class="price">
                            {product.discount === "y" ? (
                              <div class="price">
                                <span class="retail_price price_line">
                                  {product.price.replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )}
                                  원
                                </span>
                                <span class="selling_price">
                                  <em>
                                    {product.discount_price.replace(
                                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}
                                    원
                                  </em>
                                </span>
                              </div>
                            ) : (
                              <div class="price">
                                <span class="selling_price">
                                  {product.price.replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )}
                                  원
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="price_wrap">
                          <span class="unit">단위 : </span>
                          <div class="price">{product.amount}</div>
                        </div>
                      </div>
                      <div class="product_img">
                        <img
                          class="prod_img"
                          src={config.host + `/getProductImg/${product.code}`}
                          onError={(event) => {
                            event.target.src = require("../resource/img/icon/no_img.png");
                          }}
                        />
                        {product.discount === "y" ? (
                          <img
                            class="discount_icon"
                            src={icon_sub_label_discount}
                            alt="세일중 아이콘"
                          />
                        ) : null}
                        <button type="button">
                          <img
                            class="quick_cart"
                            src={icon_quick_cart}
                            alt="장바구니 바로담기"
                            onClick={() => {
                              cartservice
                                .cartRegist(
                                  this.state.storecode,
                                  product.code,
                                  product.regnumber,
                                  product.storename,
                                  product.name,
                                  product.amount,
                                  product.price,
                                  product.discount,
                                  product.discount_price
                                )
                                .then(() => {
                                  cartservice
                                    .getCart(sessionStorage.getItem("username"))
                                    .then((res) => {
                                      toast("장바구니에 담았습니다", {
                                        position: "bottom-center",
                                        autoClose: 1000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        type: "success",
                                        theme: "light",
                                      });
                                      this.setState({ cart: res.data });
                                    });
                                });
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <ToastContainer />
              </div>
            </div>
          </section>
        </main>
        <aside id="dock">
          <div className="dock_container">
            <nav className="dock_menu">
              <a
                href={`/?code=${sessionStorage.getItem("code")}`}
                className={this.props.active === "index" ? "active" : ""}
              >
                <i className="home"></i>
                <span className="dock_label">홈</span>
              </a>
              <a
                href="/map"
                className={this.props.active === "map" ? "active" : ""}
              >
                <i className="map"></i>
                <span className="dock_label">시장 약도</span>
              </a>
              <a
                href="/cart"
                className={this.props.active === "cart" ? "active" : ""}
              >
                <i className="cart"></i>
                <i className="cart_count">{this.state.cart.length}</i>
                <span className="dock_label">장바구니</span>
              </a>
              <a href="/mypage">
                <img
                  style={{ marginTop: "8px", width: "25px" }}
                  src="https://cdn-icons-png.flaticon.com/512/81/81227.png"
                />
                <span className="dock_label">주문조회</span>
              </a>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}
export default product;
