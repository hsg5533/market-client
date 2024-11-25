import React from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./resource/css/common.css";
import "./resource/css/layout.css";
import map from "./components/map";
import pay from "./components/pay";
import cart from "./components/cart";
import error from "./components/error";
import index from "./components/index";
import order from "./components/order";
import Modal from "./components/Modal";
import manual from "./components/manual";
import search from "./components/search";
import mypage from "./components/mypage";
import product from "./components/product";
import recommend from "./components/recommend";
import sale_items from "./components/sale_items";
import order_detail from "./components/order_detail";
import sub_store_detail from "./components/sub_store_detail";
import sub_map_location from "./components/sub_map_location";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={index} exact={true} />
        <Route
          path="/map"
          component={sessionStorage?.getItem("username") ? map : error}
          exact={true}
        />
        <Route
          path="/pay"
          component={sessionStorage?.getItem("username") ? pay : error}
          exact={true}
        />
        <Route
          path="/cart"
          component={sessionStorage?.getItem("username") ? cart : error}
          exact={true}
        />
        <Route
          path="/modal"
          component={sessionStorage?.getItem("username") ? Modal : error}
          exact={true}
        />
        <Route
          path="/order"
          component={sessionStorage?.getItem("username") ? order : error}
          exact={true}
        />
        <Route
          path="/manual"
          component={sessionStorage?.getItem("username") ? manual : error}
          exact={true}
        />
        <Route
          path="/search"
          component={sessionStorage?.getItem("username") ? search : error}
          exact={true}
        />
        <Route
          path="/mypage"
          component={sessionStorage?.getItem("username") ? mypage : error}
          exact={true}
        />
        <Route
          path="/product"
          component={sessionStorage?.getItem("username") ? product : error}
          exact={true}
        />
        <Route
          path="/recommend"
          component={sessionStorage?.getItem("username") ? recommend : error}
          exact={true}
        />
        <Route
          path="/sale_items"
          component={sessionStorage?.getItem("username") ? sale_items : error}
          exact={true}
        />
        <Route
          path="/order_detail"
          component={sessionStorage?.getItem("username") ? order_detail : error}
          exact={true}
        />
        <Route
          path="/sub_map_location"
          component={
            sessionStorage?.getItem("username") ? sub_map_location : error
          }
          exact={true}
        />
        <Route
          path="/sub_store_detail"
          component={
            sessionStorage?.getItem("username") ? sub_store_detail : error
          }
          exact={true}
        />
        <Route path="/error" component={error} exact={true} />
      </BrowserRouter>
    );
  }
}
export default App;
