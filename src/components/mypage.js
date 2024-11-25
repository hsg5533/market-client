import React from "react";
import orderservice from "../service/orderservice";

class mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };
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
                <h2>주문조회</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <section className="order_sheet">
            <div className="orderer">
              <h3 className="order_tit">
                ※주문하시는 분의 정보를 입력해주세요
              </h3>
              <div className="order_box">
                <div className="order_cont">
                  <p>
                    이름&nbsp;<em>*</em>
                  </p>
                  <div>
                    <input type="text" id="ordername" name="ordername" />
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
                    <input type="password" id="password" name="password" />
                  </div>
                </div>
                <div className="order_cont">
                  <p>
                    휴대폰 번호 <em>*</em>
                  </p>
                  <div>
                    <input
                      type="tel"
                      id="orderphone"
                      name="orderphone"
                      placeholder="01012345678"
                    />
                  </div>
                </div>
              </div>
              <div>
                {this.state.order.map((order, index) =>
                  order.orderid === "empty" ? (
                    <div className="price_sum">
                      <h3 className="order_tit">조회된 주문내역이 없습니다.</h3>
                    </div>
                  ) : (
                    <a href={`/order_detail?orderid=${order.orderid}`}>
                      <div className="price_sum" key={index}>
                        <h3 className="order_tit">주문 정보</h3>
                        <p>주문번호: {order.orderid}</p>
                        <p>주문요약: {order.summary}</p>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>
            <button
              type="button"
              className="btn_payment"
              onClick={() => {
                orderservice
                  .getOrderLog(
                    document.getElementById("ordername").value,
                    document.getElementById("password").value,
                    document.getElementById("orderphone").value
                  )
                  .then((res) => {
                    this.setState({ order: res.data });
                  });
              }}
            >
              조회하기
            </button>
          </section>
        </main>
      </div>
    );
  }
}
export default mypage;
