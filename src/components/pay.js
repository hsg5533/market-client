import React from "react";
import payservice from "../service/payservice";

class pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid: this.props.location.state.orderid,
    };
  }

  render() {
    return (
      <div>
        <header>
          <div class="header_area">
            <div id="gnb">
              <div class="gnb_container">
                <a
                  style={{ cursor: "pointer" }}
                  class="go_back"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                ></a>
                <h2>결제</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <section class="order_sheet">
            <div class="orderer">
              <h3 class="order_tit" style={{ textAlign: "center" }}>
                ※결제가 진행 중입니다※
              </h3>
              <div class="order_box">
                <div class="order_cont">
                  <p style={{ textAlign: "center" }}>
                    <em>*</em>&nbsp;결제가 완료되면 아래의 버튼을
                    눌러주세요&nbsp;<em>*</em>
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn_payment"
              onClick={() => {
                payservice.getPaylog(this.state.orderid).then((res) => {
                  if (res.data.length !== 0) {
                    this.props.history.push(
                      `/order_detail?orderid=${this.state.orderid}`
                    );
                  } else {
                    alert(
                      "정상적으로 결제가 되지 않았습니다. 다시 주문을 진행해주세요"
                    );
                    window.location.href = "/order";
                  }
                });
              }}
            >
              결제완료
            </button>
          </section>
        </main>
      </div>
    );
  }
}
export default pay;
