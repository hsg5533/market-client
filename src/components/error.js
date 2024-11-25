import React from "react";

class error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <main>
          <section className="order_sheet">
            <div className="orderer">
              <h3
                className="order_tit"
                style={{ textAlign: "center", marginTop: "10vh" }}
              >
                ※정상적인 방법으로 접근하여 주세요※
              </h3>
              <div className="order_box" style={{ textAlign: "center" }}>
                <div className="order_cont">
                  <p>이용의 불편을 드려서 죄송합니다.&nbsp;</p>
                </div>
              </div>
              <div>
                <div className="price_sum" style={{ textAlign: "center" }}>
                  <h3 className="order_tit">
                    다시 QR코드를 스캔하면 정상적인 이용이 가능합니다.
                  </h3>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn_payment"
              onClick={() => {
                window.close();
              }}
            >
              확인
            </button>
          </section>
        </main>
      </div>
    );
  }
}
export default error;
