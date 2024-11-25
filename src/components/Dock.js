import React from "react";
import cartservice from "../service/cartservice";

class Dock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    cartservice.getCart(sessionStorage.getItem("username")).then((res) => {
      this.setState({ cart: res.data });
    });
  }

  render() {
    return (
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
    );
  }
}
export default Dock;
