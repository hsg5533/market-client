import axios from "axios";
import config from "../json/config.json";

class orderservice {
  getOrderLog(order_name, password, order_phone) {
    return axios({
      url: config.host + "/getOrderLog",
      method: "post",
      data: {
        order_name: order_name,
        password: password,
        order_phone: order_phone,
      },
    });
  }

  getOrderDetail(orderid) {
    return axios({
      url: config.host + "/getOrderDetail",
      method: "post",
      data: { orderid: orderid },
    });
  }

  getOrderProductDetail(orderid) {
    return axios({
      url: config.host + "/getOrderProductDetail",
      method: "post",
      data: { orderid: orderid },
    });
  }

  orderPrice(orderid) {
    return axios({
      url: config.host + "/orderPrice",
      method: "post",
      data: { orderid: orderid },
    });
  }
}
export default new orderservice();
