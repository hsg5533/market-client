import axios from "axios";
import config from "../json/config.json";

class cartservice {
  cartRegist(
    storecode,
    product_code,
    regnumber,
    storename,
    product_name,
    amount,
    price,
    discount,
    discount_price
  ) {
    return axios({
      url: config.host + "/cartRegist",
      method: "post",
      data: {
        storecode: storecode,
        product_code: product_code,
        regnumber: regnumber,
        storename: storename,
        product_name: product_name,
        amount: amount,
        price: price,
        discount: discount,
        discount_price: discount_price,
        cookie: sessionStorage.getItem("username"),
      },
    });
  }

  getCart(cookie) {
    return axios({
      url: config.host + "/getCart",
      method: "post",
      data: { cookie: cookie },
    });
  }

  cartPrice(cookie) {
    return axios({
      url: config.host + "/cartPrice",
      method: "post",
      data: { cookie: cookie },
    });
  }

  deleteCart(product_code, cookie) {
    return axios({
      url: config.host + "/deleteCart",
      method: "delete",
      data: {
        cookie: cookie,
        product_code: product_code,
      },
    });
  }

  deleteCartAll(cookie) {
    return axios({
      url: config.host + "/deleteCartAll",
      method: "delete",
      data: {
        cookie: cookie,
      },
    });
  }
}
export default new cartservice();
