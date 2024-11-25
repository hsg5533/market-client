import React from "react";
import moment from "moment";
import queryString from "query-string";
import payservice from "../service/payservice";
import orderservice from "../service/orderservice";

class order_detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid: queryString.parse(window.location.search).orderid,
      order: {},
      paydate: "",
      payprice: "",
      orderdate: "",
      orderPrice: "",
      order_products: [],
      statusOpen: false,
    };
  }

  componentDidMount() {
    orderservice.getOrderDetail(this.state.orderid).then((res) => {
      this.setState({ order: res.data, orderdate: res.data.orderdate });
    });
    orderservice.getOrderProductDetail(this.state.orderid).then((res) => {
      this.setState({ order_products: res.data });
    });
    orderservice.orderPrice(this.state.orderid).then((res) => {
      this.setState({ orderPrice: res.data.total });
    });
    payservice.getPaylog(this.state.orderid).then((res) => {
      this.setState({
        payprice: res.data.price || 0,
        paydate: res.data.paydate,
      });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div class="header_area">
            <div id="gnb">
              <div class="gnb_container">
                <a
                  class="go_back"
                  onClick={() => {
                    window.location.href = "/mypage";
                  }}
                ></a>
                <h2>주문 상세 내역</h2>
              </div>
            </div>
          </div>
        </header>
        <main class="order_detail">
          <section class="order_sheet">
            <div class="product_info">
              <h3 class="order_tit">주문 번호</h3>
              <p class="order_txt">{this.state.order.orderid}</p>
            </div>
            {this.state.order_products.map((order_product, index) => (
              <div class="order_detail_box" key={index}>
                <div class="order_product">
                  <h3 class="order_tit">주문 상품</h3>
                  <ul>
                    <li>
                      <p class="order_txt">{order_product.product_name}</p>
                    </li>
                    <li>
                      <span class="order_label">{order_product.status}</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>수량</span>
                      <span>{order_product.product_amount}</span>
                    </li>
                    <li>
                      <span>판매가</span>
                      {order_product.discount === "y" ? (
                        <span>
                          {order_product.discount_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                      ) : (
                        <span>
                          {order_product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                      )}
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>주문금액</span>
                      {order_product.discount === "y" ? (
                        <span>
                          {(
                            order_product.product_amount *
                            order_product.discount_price
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                      ) : (
                        <span>
                          {(order_product.product_amount * order_product.price)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
                {this.state.statusOpen === true ? (
                  <div>
                    <ul class="order_state">
                      <li>
                        <h3 class="order_tit">주문 상태</h3>
                      </li>
                      <li>
                        <a
                          class="order_label"
                          onClick={() => {
                            this.setState({
                              statusOpen: !this.state.statusOpen,
                            });
                          }}
                        >
                          닫기
                        </a>
                      </li>
                    </ul>
                    <ul class="order_state_step">
                      <li>
                        <p
                          class={
                            order_product.status === "주문"
                              ? "state_active"
                              : ""
                          }
                        >
                          {order_product.status === "주문" ? "1" : "0"}
                        </p>
                        <i></i>
                        <p
                          class={
                            order_product.status === "입금"
                              ? "state_active"
                              : ""
                          }
                        >
                          {order_product.status === "입금" ? "1" : "0"}
                        </p>
                        <i></i>
                        <p
                          class={
                            order_product.status === "준비"
                              ? "state_active"
                              : ""
                          }
                        >
                          {order_product.status === "준비" ? "1" : "0"}
                        </p>
                        <i></i>
                        <p
                          class={
                            order_product.status === "배송"
                              ? "state_active"
                              : ""
                          }
                        >
                          {order_product.status === "배송" ? "1" : "0"}
                        </p>
                        <i></i>
                        <p
                          class={
                            order_product.status === "완료"
                              ? "state_active"
                              : ""
                          }
                        >
                          {order_product.status === "완료" ? "1" : "0"}
                        </p>
                      </li>
                      <li>
                        <p
                          class={
                            order_product.status === "주문"
                              ? "state_active"
                              : ""
                          }
                        >
                          주문
                        </p>
                        <p
                          class={
                            order_product.status === "입금"
                              ? "state_active"
                              : ""
                          }
                        >
                          입금
                        </p>
                        <p
                          class={
                            order_product.status === "준비"
                              ? "state_active"
                              : ""
                          }
                        >
                          준비
                        </p>
                        <p
                          class={
                            order_product.status === "배송"
                              ? "state_active"
                              : ""
                          }
                        >
                          배송
                        </p>
                        <p
                          class={
                            order_product.status === "완료"
                              ? "state_active"
                              : ""
                          }
                        >
                          완료
                        </p>
                      </li>
                    </ul>
                    <ul class="order_state_cont">
                      <li>
                        <span>주문</span>주문이 접수되었습니다.
                      </li>
                      <li>
                        <span>입금</span>입금(결제)이 완료되었습니다.
                      </li>
                      <li>
                        <span>준비</span>상품이 준비 중입니다.
                      </li>
                      <li>
                        <span>배송</span>상품이 배송 중입니다.
                      </li>
                      <li>
                        <span>완료</span>상품 배송이 완료되었습니다.
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul class="order_state">
                    <li>
                      <h3 class="order_tit">주문 상태</h3>
                    </li>
                    <li>
                      <a
                        class="order_label"
                        onClick={() => {
                          this.setState({ statusOpen: !this.state.statusOpen });
                        }}
                      >
                        열기
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            ))}
            <div class="detail_total">
              <div>
                <span>주문 총액</span>
                <span>
                  {this.state.payprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </div>
              <div>
                <span class="order_tit">총계</span>
                <span class="order_tit">
                  {this.state.payprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </div>
            </div>
            <div class="detail_info">
              <h3 class="order_tit">결제 정보</h3>
              <ul>
                <li>
                  <span>주문 번호</span>
                  {this.state.order.orderid}
                </li>
                <li>
                  <span>주문 일시</span>
                  {moment(this.state.orderdate).format("YYYY-MM-DD HH:mm:ss")}
                </li>
                <li>
                  <span>결제 방식</span>신용카드
                </li>
                <li>
                  <span>결제 금액</span>
                  {this.state.payprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </li>
                <li>
                  <span>결제 일시</span>
                  {moment(this.state.paydate).format("YYYY-MM-DD HH:mm:ss")}
                </li>
              </ul>
            </div>
            <div class="detail_orderer">
              <h3 class="order_tit">주문하신 분</h3>
              <ul>
                <li>
                  <span>이름</span>
                  <span>{this.state.order.order_name}</span>
                </li>
                <li>
                  <span>핸드폰</span>
                  <span>{this.state.order.order_phone}</span>
                </li>
                <li>
                  <span>주소</span>
                  <span>
                    ({this.state.order.order_postcode})&nbsp;
                    {this.state.order.order_address}&nbsp;
                    {this.state.order.order_address_detail}
                  </span>
                </li>
                <li>
                  <span>이메일</span>
                  <span>{this.state.order.email}</span>
                </li>
              </ul>
            </div>
            <div class="detail_deliver">
              <h3 class="order_tit">받으시는 분</h3>
              <ul>
                <li>
                  <span>이름</span>
                  <span>{this.state.order.receive_name}</span>
                </li>
                <li>
                  <span>핸드폰</span>
                  <span>{this.state.order.receive_phone}</span>
                </li>
                <li>
                  <span>주소</span>
                  <span>
                    ({this.state.order.receive_postcode})&nbsp;
                    {this.state.order.receive_address}&nbsp;
                    {this.state.order.receive_address_detail}
                  </span>
                </li>
              </ul>
            </div>
            <div class="detail_order_sum">
              <h3 class="order_tit">결제 합계</h3>
              <ul>
                <li>
                  <span>총 구매액</span>
                  <span>
                    {this.state.payprice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </li>
                <li>
                  <span>미결제액</span>
                  <span>
                    {(this.state.orderPrice - this.state.payprice)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </li>
              </ul>
            </div>
            <div class="detail_amount_sum">
              <p class="order_tit">결제액</p>
              <p class="order_tit">
                {this.state.payprice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default order_detail;
