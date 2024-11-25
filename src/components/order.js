import React from "react";
import axios from "axios";
import config from "../json/config.json";
import cartservice from "../service/cartservice";
import DaumPostcodeEmbed from "react-daum-postcode";
import { loadTossPayments } from "@tosspayments/payment-sdk";

class order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: sessionStorage.getItem("username"),
      cart: [],
      pg: "",
      sum: "",
      flag: "",
      order_name: "",
      order_phone: "",
      order_postcode: "",
      order_address: "",
      order_address_detail: "",
      order_isOpenPost: false,
      receive_name: "",
      receive_phone: "",
      receive_postcode: "",
      receive_address: "",
      receive_address_detail: "",
      receive_isOpenPost: false,
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
                  className="go_back"
                  href="#"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                ></a>
                <h2>주문서 작성</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <section className="order_sheet">
            <div className="product_info">
              <h3 className="order_tit">주문상품</h3>
              <div className="order_box">
                <ul>
                  {this.state.cart.map((cart) => (
                    <li>
                      <p>{cart.product_name}</p>
                      <span>
                        {cart.discount === "y" ? (
                          <span>
                            <span
                              style={{ display: "inline-block" }}
                              className="price_line"
                            >
                              {cart.price.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                              )}
                              원
                            </span>
                            &nbsp;
                            {cart.discount_price.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </span>
                        ) : (
                          <span>
                            {cart.price.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </span>
                        )}
                        &nbsp; X {cart.amount}
                      </span>
                    </li>
                  ))}
                </ul>
                <div>
                  <p>
                    총 상품금액&nbsp;&nbsp;
                    <span className="product_amount">
                      {this.state.sum
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="orderer">
              <h3 className="order_tit">주문하시는 분</h3>
              <div className="order_box">
                <div className="order_cont" style={{ display: "none" }}>
                  <p>
                    주문번호&nbsp;<em>*</em>
                  </p>
                  <div>
                    <input
                      type="text"
                      id="orderid"
                      name="orderid"
                      readOnly
                      value={
                        new Date().getFullYear().toString() +
                        (new Date().getMonth() + 1).toString() +
                        new Date().getDate().toString() +
                        Math.random().toString().substr(2, 7)
                      }
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    이름&nbsp;<em>*</em>
                  </p>
                  <div>
                    <input
                      type="text"
                      id="order_name"
                      name="customerName"
                      value={this.state.order_name}
                      onChange={(event) => {
                        this.setState({ order_name: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    비밀번호&nbsp;<em>*</em>
                    <span className="pw_cont">
                      영문,숫자 3~20자(주문서 조회 시 필요)
                    </span>
                  </p>
                  <div>
                    <input type="password" id="password" />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    휴대폰 번호 <em>*</em>
                  </p>
                  <div>
                    <input
                      type="tel"
                      id="order_phone"
                      placeholder="' - ' 없이 숫자만 입력해주세요"
                      value={this.state.order_phone}
                      onChange={(event) => {
                        this.setState({ order_phone: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>전화번호</p>
                  <div>
                    <input
                      type="tel"
                      id="ordertel"
                      placeholder="' - ' 없이 숫자만 입력해주세요"
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    주소 <em>*</em>
                  </p>
                  <ul className="order_address">
                    <li className="btn_address">
                      <input
                        type="text"
                        id="order_postcode"
                        value={this.state.order_postcode}
                        placeholder="우편번호를 입력해주세요"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          this.setState({
                            order_isOpenPost: !this.state.order_isOpenPost,
                          });
                        }}
                      >
                        주소 검색
                      </button>
                    </li>
                    {this.state.order_isOpenPost ? (
                      <DaumPostcodeEmbed
                        onComplete={(data) => {
                          this.setState({
                            order_postcode: data.zonecode,
                            order_address: data.address,
                          });
                        }}
                      />
                    ) : null}
                    <li>
                      <input
                        type="text"
                        id="order_address"
                        value={this.state.order_address}
                        placeholder="배송받을 주소지를 입력해주세요"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        id="order_address_detail"
                        value={this.state.order_address_detail}
                        onChange={(event) => {
                          this.setState({
                            order_address_detail: event.target.value,
                          });
                        }}
                        placeholder="상세주소를 입력해주세요"
                      />
                    </li>
                  </ul>
                </div>
                <div className="order_cont">
                  <p>
                    이메일 주소 <em>*</em>
                  </p>
                  <div>
                    <input type="email" id="email" />
                  </div>
                </div>
              </div>
            </div>
            <div className="deliver">
              <h3 className="order_tit">받으시는 분</h3>
              <div className="order_box">
                <div className="same_orderer">
                  <input
                    style={{ width: "20px" }}
                    id="checkbox"
                    type="checkbox"
                    onClick={() => {
                      if (document.getElementById("checkbox").checked) {
                        this.setState({
                          receive_name: this.state.order_name,
                          receive_phone: this.state.order_phone,
                          receive_postcode: this.state.order_postcode,
                          receive_address: this.state.order_address,
                          receive_address_detail:
                            this.state.order_address_detail,
                        });
                      } else {
                        this.setState({
                          receive_name: "",
                          receive_phone: "",
                          receive_postcode: "",
                          receive_address: "",
                          receive_address_detail: "",
                        });
                      }
                    }}
                  />
                  <span>주문자와 동일</span>
                </div>
                <div className="order_cont">
                  <p>
                    이름 <em>*</em>
                  </p>
                  <div>
                    <input
                      type="text"
                      id="receive_name"
                      value={this.state.receive_name}
                      onChange={(event) => {
                        this.setState({ receive_name: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    휴대폰번호 <em>*</em>
                  </p>
                  <div>
                    <input
                      type="tel"
                      id="receive_phone"
                      placeholder="' - ' 없이 숫자만 입력해주세요"
                      required
                      value={this.state.receive_phone}
                      onChange={(event) => {
                        this.setState({ receive_phone: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    주소 <em>*</em>
                  </p>
                  <ul className="order_address">
                    <li className="btn_address">
                      <input
                        type="text"
                        id="receive_postcode"
                        value={this.state.receive_postcode}
                        placeholder="우편번호를 입력해주세요"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          this.setState({
                            receive_isOpenPost: !this.state.receive_isOpenPost,
                          });
                        }}
                      >
                        주소 검색
                      </button>
                    </li>
                    {this.state.receive_isOpenPost ? (
                      <DaumPostcodeEmbed
                        onComplete={(data) => {
                          this.setState({
                            receive_postcode: data.zonecode,
                            receive_address: data.address,
                          });
                        }}
                      />
                    ) : null}
                    <li>
                      <input
                        type="text"
                        id="receive_address"
                        value={this.state.receive_address}
                        placeholder="배송받을 주소지를 입력해주세요"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        id="receive_address_detail"
                        placeholder="상세주소를 입력해주세요"
                        value={this.state.receive_address_detail}
                        onChange={(event) => {
                          this.setState({
                            receive_address_detail: event.target.value,
                          });
                        }}
                      />
                    </li>
                  </ul>
                </div>
                <div className="order_cont">
                  <p>전하실 말씀</p>
                  <div>
                    <input type="text" id="message" />
                  </div>
                </div>
              </div>
            </div>
            <div className="price_sum">
              <h3 className="order_tit">결제 정보</h3>
              <div>
                <p>총 결제 금액</p>
                <p>
                  {this.state.sum
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              </div>
            </div>
            <div className="payment_info">
              <h3 className="order_tit">결제 수단</h3>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="payment"
                    name="payment"
                    value="toss"
                    style={{ width: "20px" }}
                    onClick={(event) => {
                      this.setState({ pg: event.target.value });
                    }}
                  />
                  <span>토스결제</span>
                </li>

                <li>
                  <input
                    type="radio"
                    id="payment"
                    name="payment"
                    value="tosspay"
                    style={{ width: "20px" }}
                    onClick={(event) => {
                      this.setState({ pg: event.target.value });
                    }}
                  />
                  <span>토스페이</span>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payment"
                    name="payment"
                    value=""
                    style={{ width: "20px" }}
                    onClick={(event) => {
                      this.setState({ pg: event.target.value });
                    }}
                  />
                  <span>제로페이</span>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payment"
                    name="payment"
                    value="html5_inicis"
                    style={{ width: "20px" }}
                    onClick={(event) => {
                      this.setState({ pg: event.target.value });
                    }}
                  />
                  <span>실시간 계좌이체</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className="btn_payment"
              onClick={() => {
                if (this.state.order_name === "") {
                  alert("주문하시는 분의 이름을 입력해주세요");
                  document.getElementById("order_name").focus();
                } else if (document.getElementById("password").value === "") {
                  alert("비밀번호를 입력해주세요");
                  document.getElementById("password").focus();
                } else if (this.state.order_phone === "") {
                  alert("주문하시는 분의 휴대폰 번호를 입력해주세요");
                  document.getElementById("order_phone").focus();
                } else if (this.state.order_postcode === "") {
                  alert("주문하시는 분의 우편번호를 입력해주세요");
                  document.getElementById("order_postcode").focus();
                } else if (this.state.order_address === "") {
                  alert("주문하시는 분의 주소를 입력해주세요");
                  document.getElementById("order_address").focus();
                } else if (this.state.order_address_detail === "") {
                  alert("주문하시는 분의 상세주소를 입력해주세요");
                  document.getElementById("order_address_detail").focus();
                } else if (document.getElementById("email").value === "") {
                  alert("이메일를 입력해주세요");
                  document.getElementById("email").focus();
                } else if (this.state.receive_name === "") {
                  alert("받으시는 분의 이름을 입력해주세요");
                  document.getElementById("receive_name").focus();
                } else if (this.state.receive_phone === "") {
                  alert("받으시는 분의 휴대폰번호를 입력해주세요");
                  document.getElementById("receive_phone").focus();
                } else if (this.state.receive_postcode === "") {
                  alert("받으시는 분의 우편번호를 입력해주세요");
                  document.getElementById("receive_postcode").focus();
                } else if (this.state.receive_address === "") {
                  alert("받으시는 분의 주소를 입력해주세요");
                  document.getElementById("receive_address").focus();
                } else if (this.state.receive_address_detail === "") {
                  alert("받으시는 분의 상세주소를 입력해주세요");
                  document.getElementById("receive_address_detail").focus();
                } else if (this.state.pg === "") {
                  alert("결제수단을 선택해주세요");
                } else {
                  axios({
                    url: config.host + "/orderRegist",
                    method: "post",
                    data: {
                      orderid: document.getElementById("orderid").value,
                      summary:
                        this.state.cart[0]?.product_name +
                        " 외 " +
                        (this.state.cart.length - 1) +
                        "건",
                      order_name: this.state.order_name,
                      password: document.getElementById("password").value,
                      order_phone: this.state.order_phone,
                      ordertel: document.getElementById("ordertel").value,
                      order_postcode: this.state.order_postcode,
                      order_address: this.state.order_address,
                      order_address_detail: this.state.order_address_detail,
                      email: document.getElementById("email").value,
                      receive_name: this.state.receive_name,
                      receive_phone: this.state.receive_phone,
                      receive_postcode: this.state.receive_postcode,
                      receive_address: this.state.receive_address,
                      receive_address_detail: this.state.receive_address_detail,
                      message: document.getElementById("message").value,
                    },
                  }).then(() => {
                    this.state.cart.map((cart) => {
                      axios({
                        url: config.host + "/orderProductRegist",
                        method: "post",
                        data: {
                          orderid: document.getElementById("orderid").value,
                          product_code: cart.product_code,
                          product_name: cart.product_name,
                          product_amount: cart.amount,
                          storecode: cart.storecode,
                          regnumber: cart.regnumber,
                          storename: cart.storename,
                          price: cart.price,
                          discount: cart.discount,
                          discount_price: cart.discount_price,
                        },
                      });
                      if (this.state.pg === "toss") {
                        loadTossPayments(
                          "test_ck_dP9BRQmyarYmXvoAQb9rJ07KzLNk"
                        ).then((tossPayments) => {
                          tossPayments
                            .requestPayment("카드", {
                              amount: parseInt(this.state.sum),
                              orderId: document.getElementById("orderid").value,
                              orderName:
                                this.state.cart[0]?.product_name +
                                " 외 " +
                                (this.state.cart.length - 1) +
                                "건",
                              customerName:
                                document.getElementById("order_name").value,
                              successUrl: config.host + "/toss",
                              failUrl: config.host + "/fail",
                            })
                            .catch(function (error) {
                              if (error.code === "USER_CANCEL") {
                                alert("사용자 결제취소");
                              } else if (
                                error.code === "INVALID_CARD_COMPANY"
                              ) {
                                alert("유효하지 않는 카드입니다.");
                              }
                            });
                        });
                      } else {
                        const IMP = window.IMP;
                        IMP.init("imp71187578");
                        IMP.request_pay(
                          {
                            pg: this.state.pg,
                            pay_method: "card",
                            merchant_uid:
                              document.getElementById("orderid").value,
                            name:
                              this.state.cart[0]?.product_name +
                              " 외 " +
                              (this.state.cart.length - 1) +
                              "건",
                            amount: parseInt(this.state.sum),
                            buyer_email: document.getElementById("email").value,
                            buyer_name: this.state.order_name,
                            buyer_tel:
                              document.getElementById("ordertel").value,
                            buyer_addr: this.state.order_address,
                            buyer_postcode: this.state.order_postcode,
                          },
                          (rsp) => {
                            if (rsp.success) {
                              axios({
                                url: config.host + "/payments",
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                data: {
                                  imp_uid: rsp.imp_uid,
                                  merchant_uid: rsp.merchant_uid,
                                },
                              }).then((res) => {
                                switch (res.data.status) {
                                  case "vbankIssued":
                                    console.log(res.data.config);
                                    break;
                                  case "success":
                                    console.log(res.data.status);
                                    break;
                                }
                              });
                            } else {
                              console.log(rsp);
                            }
                          }
                        );
                      }
                      return this.props.history.push({
                        pathname: "/pay",
                        state: {
                          orderid: document.getElementById("orderid").value,
                        },
                      });
                    });
                  });
                }
              }}
            >
              <strong>
                {this.state.sum
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </strong>
              &nbsp;결제하기
            </button>
          </section>
        </main>
      </div>
    );
  }
}
export default order;
