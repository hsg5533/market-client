import React from "react";
import Dock from "./Dock";
import config from "../json/config.json";
import cartservice from "../service/cartservice";
import btn_x_light from "../resource/img/icon/btn_x_light.svg";

class cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: sessionStorage.getItem("username"),
      cart: [],
      sum: [],
    };
  }

  componentDidMount() {
    cartservice.getCart(this.state.cookie).then((res) => {
      this.setState({ cart: res.data });
    });
    cartservice.cartPrice(this.state.cookie).then((res) => {
      this.setState({ sum: res.data.total });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="header_area">
            <div id="gnb">
              <div className="gnb_container">
                <a
                  style={{ cursor: "pointer" }}
                  className="go_back"
                  onClick={() => {
                    window.location.href = `/?code=${sessionStorage.getItem(
                      "code"
                    )}`;
                  }}
                ></a>
                <h2>장바구니</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="top_sort">
            <span>
              전체 <em>{this.state.cart.length}</em> 개
            </span>
            <button
              className="cart_all_delete"
              type="button"
              onClick={() => {
                cartservice
                  .deleteCartAll(sessionStorage.getItem("username"))
                  .then(() => {
                    alert("장바구니를 비웠습니다.");
                    window.location.reload();
                  });
              }}
            >
              전체삭제
            </button>
          </div>
          <div className="cart_list">
            {this.state.cart.map((cart) => (
              <div className="product_wrap">
                <div className="product_item">
                  <div className="item_img">
                    <img
                      src={config.host + `/getProductImg/${cart.product_code}`}
                      onError={(event) => {
                        event.target.src = require("../resource/img/icon/no_img.png");
                      }}
                    />
                    <span className="img_count">{cart.amount}</span>
                  </div>
                  <div className="prod_txt">
                    <h3>{cart.storename}</h3>
                    <p>{cart.product_name}</p>
                    {cart.discount === "y" ? (
                      <span>
                        {cart.amount}&nbsp;:&nbsp;
                        <span
                          style={{ display: "inline-block" }}
                          className="price_line"
                        >
                          {(cart.price * cart.amount)
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                        &nbsp;&nbsp;
                        {(cart.discount_price * cart.amount)
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                    ) : (
                      <div className="price">
                        <span className="selling_price">
                          {cart.amount}&nbsp;:&nbsp;
                          {cart.price.replace(
                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                          원
                        </span>
                      </div>
                    )}
                  </div>
                  <button type="button">
                    <img
                      className="delete"
                      src={btn_x_light}
                      alt="장바구니 물건 삭제"
                      onClick={() => {
                        cartservice
                          .deleteCart(cart.product_code, this.state.cookie)
                          .then(() => {
                            alert("삭제되었습니다.");
                            window.location.reload();
                          });
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="product_total_wrap">
            <div className="product_total">
              <div className="total_count">
                <span>{this.state.cart.length} 개 상품</span>
                <span>
                  <em>총 {this.state.cart.length}개</em>
                </span>
              </div>
              <div className="total_price">
                <span>
                  합계
                  <em>
                    &nbsp;
                    {this.state.sum
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </em>
                </span>
              </div>
            </div>
          </div>
          <button
            className="btn_order"
            onClick={() => {
              if (this.state.cart.length === 0) {
                alert("주문하실 상품이 없습니다.");
              } else {
                window.location.href = "/order";
              }
            }}
            type="button"
          >
            <strong>
              {this.state.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </strong>
            &nbsp; 주문하기
          </button>
        </main>
        <Dock active="cart" />
      </div>
    );
  }
}
export default cart;
